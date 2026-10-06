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

function isValidCnpjChecksum(cnpj: string): boolean {
  const clean = cnpj.replace(/\D/g, '');
  if (clean.length !== 14 || /^(\d)\1{13}$/.test(clean)) return false;
  const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let n = 0;
  for (let i = 0; i < 12; n += Number(clean[i]) * b[++i]);
  if (Number(clean[12]) !== ((n %= 11) < 2 ? 0 : 11 - n)) return false;
  n = 0;
  for (let i = 0; i <= 12; n += Number(clean[i]) * b[i++]);
  return Number(clean[13]) === ((n %= 11) < 2 ? 0 : 11 - n);
}

/**
 * Online CNPJ search resolver for companies or entrepreneurs not in the local catalog.
 * Searches public web indexing (Bing Brasil + DuckDuckGo + Yahoo) for Brazilian CNPJs and enriches via BrasilAPI.
 */
async function searchOnlineCnpj(query: string): Promise<CompanySearchRecord[]> {
  try {
    const cleanSearch = query.trim().replace(/[^\w\s\.-]/g, '');
    if (cleanSearch.length < 2) return [];

    const seenCnpjs = new Set<string>();
    const searchTerms = `${cleanSearch} cnpj`;

    const extractValidCnpjsFromText = (text: string) => {
      // 1. Formatted CNPJs: XX.XXX.XXX/XXXX-XX
      const formatted = text.match(/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g) || [];
      for (const m of formatted) {
        const digits = m.replace(/\D/g, '');
        if (isValidCnpjChecksum(digits)) seenCnpjs.add(digits);
      }

      // 2. Unformatted 14-digit sequences
      const unformatted = text.match(/\b\d{14}\b/g) || [];
      for (const m of unformatted) {
        if (isValidCnpjChecksum(m)) seenCnpjs.add(m);
      }

      // 3. URLs with CNPJ patterns: /cnpj/XXXXXXXXXXXXXX or cnpj.biz/XXXXXXXXXXXXXX
      const urlCandidates = text.match(/(?:cnpj|empresa|cadastro|consulta)[^\d]{0,10}(\d{14})/gi) || [];
      for (const c of urlCandidates) {
        const digits = c.replace(/\D/g, '');
        if (digits.length === 14 && isValidCnpjChecksum(digits)) {
          seenCnpjs.add(digits);
        }
      }
    };

    // 1. Primary engine: Bing (highly reliable, returns 200 OK without blocking)
    try {
      const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerms)}&setlang=pt-br`;
      const bController = new AbortController();
      const bTimeout = setTimeout(() => bController.abort(), 4500);

      const bRes = await fetch(bingUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
        },
        signal: bController.signal,
      });
      clearTimeout(bTimeout);

      if (bRes.ok) {
        const bHtml = await bRes.text();
        extractValidCnpjsFromText(bHtml);
      }
    } catch (bErr) {
      console.warn('Bing search lookup error:', bErr);
    }

    // 2. Secondary engine: DuckDuckGo
    if (seenCnpjs.size === 0) {
      try {
        const ddgUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(searchTerms)}`;
        const ddgController = new AbortController();
        const ddgTimeout = setTimeout(() => ddgController.abort(), 4500);

        const ddgRes = await fetch(ddgUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
          },
          signal: ddgController.signal,
        });
        clearTimeout(ddgTimeout);

        if (ddgRes.ok) {
          const ddgHtml = await ddgRes.text();
          extractValidCnpjsFromText(ddgHtml);
        }
      } catch (ddgErr) {
        console.warn('DuckDuckGo search lookup error:', ddgErr);
      }
    }

    // 3. Tertiary fallback: Yahoo Brasil
    if (seenCnpjs.size === 0) {
      try {
        const yahooUrl = `https://br.search.yahoo.com/search?p=${encodeURIComponent(searchTerms)}`;
        const yController = new AbortController();
        const yTimeout = setTimeout(() => yController.abort(), 4500);

        const yRes = await fetch(yahooUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
          },
          signal: yController.signal,
        });
        clearTimeout(yTimeout);

        if (yRes.ok) {
          const yHtml = await yRes.text();
          extractValidCnpjsFromText(yHtml);
        }
      } catch (yErr) {
        console.warn('Yahoo search lookup error:', yErr);
      }
    }

    if (seenCnpjs.size === 0) {
      return [];
    }

    // 3. Enrich candidate CNPJs with official cadastral names from BrasilAPI
    const enrichedResults: CompanySearchRecord[] = [];
    for (const rawDigits of Array.from(seenCnpjs).slice(0, 4)) {
      try {
        const bController = new AbortController();
        const bTimeout = setTimeout(() => bController.abort(), 5000);
        const bRes = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${rawDigits}`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: 'application/json',
          },
          signal: bController.signal,
        });
        clearTimeout(bTimeout);

        if (bRes.ok) {
          const bData = await bRes.json();
          enrichedResults.push({
            cnpj: rawDigits,
            razaoSocial: bData.razao_social || `EMPRESA CNPJ ${rawDigits}`,
            nomeFantasia: bData.nome_fantasia || bData.razao_social || query.trim().toUpperCase(),
            empresarios: (bData.qsa || []).map((s: any) => s.nome_socio || s.nome).filter(Boolean).slice(0, 3),
            uf: bData.uf || 'BR',
            municipio: bData.municipio || 'Brasil',
            segmento: bData.cnae_fiscal_descricao || 'Busca Pública Online',
          });
          continue;
        }
      } catch {
        // Fallback if individual enrichment times out
      }

      enrichedResults.push({
        cnpj: rawDigits,
        razaoSocial: `EMPRESA CNPJ ${rawDigits}`,
        nomeFantasia: query.trim().toUpperCase(),
        empresarios: [query.trim()],
        uf: 'BR',
        municipio: 'Brasil',
        segmento: 'Busca Pública Online',
      });
    }

    return enrichedResults;
  } catch (err) {
    console.error('Error during online CNPJ lookup:', err);
    return [];
  }
}

// 1. API Route: Search Company by Name, Trade Name or Entrepreneur
app.get('/api/search-company', async (req, res) => {
  const query = String(req.query.q || req.query.query || '').trim();
  const rawMode = String(req.query.mode || 'all') as 'all' | 'cnpj' | 'razao' | 'empresario';
  const mode = /[a-zA-Z]/.test(query) && rawMode === 'cnpj' ? 'all' : rawMode;

  if (!query) {
    return res.json({ results: [] });
  }

  // 1. Local catalog search (instant scored search)
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
