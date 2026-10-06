import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { searchCompanies, COMPANY_CATALOG, CompanySearchRecord } from './src/utils/companyDatabase.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

/**
 * Online CNPJ search resolver for companies or entrepreneurs not in the local catalog.
 * Searches public web indexing for Brazilian CNPJs and extracts candidate records.
 */
async function searchOnlineCnpj(query: string): Promise<CompanySearchRecord[]> {
  try {
    const cleanSearch = query.trim().replace(/[^\w\s\.-]/g, '');
    if (cleanSearch.length < 2) return [];

    const searchQuery = encodeURIComponent(`${cleanSearch} cnpj receita federal`);
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${searchQuery}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(ddgUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return [];

    const html = await res.text();
    const results: CompanySearchRecord[] = [];
    const seenCnpjs = new Set<string>();

    // Split into result blocks
    const blocks = html.split(/class="result\s+results_links/g);

    for (const block of blocks.slice(1)) {
      const titleMatch = block.match(/class="result__title"[^>]*>([\s\S]*?)<\/h2>/);
      const snippetMatch = block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);

      const rawText = `${titleMatch ? titleMatch[1] : ''} ${snippetMatch ? snippetMatch[1] : ''}`;
      const cleanText = rawText.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

      const cnpjMatch = cleanText.match(/\b(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\b/);
      if (cnpjMatch) {
        const rawDigits = cnpjMatch[1].replace(/\D/g, '');
        if (rawDigits.length === 14 && !seenCnpjs.has(rawDigits)) {
          seenCnpjs.add(rawDigits);

          // Extract best company title guess
          let companyName = cleanText.split(/[-–—|·]/)[0].trim();
          companyName = companyName.replace(/^(CNPJ:?|Empresa|Consulta|Ficha Cadastral)\s+/i, '').trim();
          if (companyName.length > 50) {
            companyName = companyName.slice(0, 50).trim();
          }

          // Try to extract UF
          const ufMatch = cleanText.match(/\b([A-Z]{2})\b/);
          const uf = ufMatch ? ufMatch[1] : 'BR';

          results.push({
            cnpj: rawDigits,
            razaoSocial: companyName.toUpperCase() || `EMPRESA CNPJ ${rawDigits}`,
            nomeFantasia: query.trim().toUpperCase(),
            empresarios: [query.trim()],
            uf,
            municipio: 'Brasil',
            segmento: 'Busca Pública Online',
          });
        }
      }

      if (results.length >= 5) break;
    }

    return results;
  } catch (err) {
    console.error('Error during online CNPJ lookup:', err);
    return [];
  }
}

// 1. API Route: Search Company by Name, Trade Name or Entrepreneur
app.get('/api/search-company', async (req, res) => {
  const query = String(req.query.q || req.query.query || '').trim();
  const mode = String(req.query.mode || 'all') as 'all' | 'cnpj' | 'razao' | 'empresario';

  if (!query) {
    return res.json({ results: [] });
  }

  // 1. Local catalog search (instant)
  const localMatches = searchCompanies(query, mode);

  if (localMatches.length > 0) {
    return res.json({ results: localMatches, source: 'catalog' });
  }

  // 2. If nothing found locally, try online search
  const onlineMatches = await searchOnlineCnpj(query);
  return res.json({ results: onlineMatches, source: 'online' });
});

// 2. API Proxy Route: Proxy requests to publica.cnpj.ws with CORS bypass
app.get('/api/cnpj-proxy/:cnpj', async (req, res) => {
  const cleanCnpj = req.params.cnpj.replace(/\D/g, '');

  if (cleanCnpj.length !== 14) {
    return res.status(400).json({ message: 'CNPJ inválido' });
  }

  const targetUrl = `https://publica.cnpj.ws/cnpj/${cleanCnpj}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const apiRes = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ message: 'Tempo limite esgotado ao consultar a Receita Federal.' });
    }
    return res.status(500).json({ message: 'Erro ao conectar à API da Receita Federal.' });
  }
});

// 3. API Proxy Route: Proxy requests to brasilapi.com.br with CORS bypass
app.get('/api/brasilapi-proxy/:cnpj', async (req, res) => {
  const cleanCnpj = req.params.cnpj.replace(/\D/g, '');

  if (cleanCnpj.length !== 14) {
    return res.status(400).json({ message: 'CNPJ inválido' });
  }

  const targetUrl = `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const apiRes = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ message: 'Tempo limite esgotado ao consultar a BrasilAPI.' });
    }
    return res.status(500).json({ message: 'Erro ao conectar à BrasilAPI.' });
  }
});

// Mount Vite or static server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ready at http://0.0.0.0:${PORT}`);
  });
}

startServer();
