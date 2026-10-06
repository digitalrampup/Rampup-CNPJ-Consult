import { CnpjData } from '../types/cnpj';
import { cleanDigits } from './formatters';

export type ApiProvider = 'auto' | 'brasilapi' | 'cnpjws';

export interface ApiError {
  status?: number;
  message: string;
  details?: string;
  isRateLimit?: boolean;
  rateLimitResetSeconds?: number;
  provider?: string;
}

/**
 * Normalizes BrasilAPI payload into the unified CnpjData structure
 */
export function normalizeBrasilApiResponse(data: any): CnpjData {
  const cnpjClean = cleanDigits(data.cnpj || '');

  const socios = (data.qsa || []).map((s: any) => ({
    nome: s.nome_socio || s.nome || 'Sócio',
    cpf_cnpj_socio: s.cnpj_cpf_do_socio || s.cpf_cnpj_socio || '',
    qualificacao_socio: {
      id: s.codigo_qualificacao_socio || '',
      descricao: s.qualificacao_socio || s.qualificacao_representante_legal || 'Sócio',
    },
    data_entrada: s.data_entrada_sociedade || s.data_entrada || null,
    faixa_etaria: s.faixa_etaria || null,
    tipo:
      s.identificador_de_socio === 1
        ? 'Pessoa Jurídica'
        : s.identificador_de_socio === 2
        ? 'Pessoa Física'
        : s.identificador_de_socio === 3
        ? 'Estrangeiro'
        : 'Pessoa',
    pais: s.pais ? { nome: s.pais } : null,
    nome_representante: s.nome_representante_legal || null,
    cpf_representante_legal: s.cpf_representante_legal || null,
  }));

  const cnaePrincipal = {
    id: String(data.cnae_fiscal || ''),
    descricao: data.cnae_fiscal_descricao || 'Não informada',
  };

  const cnaesSecundarios = (data.cnaes_secundarios || []).map((c: any) => ({
    id: String(c.codigo || c.id || ''),
    descricao: c.descricao || '',
  }));

  const dddTel1 = data.ddd_telefone_1 ? String(data.ddd_telefone_1).replace(/\D/g, '') : '';
  const ddd1 = dddTel1.length >= 2 ? dddTel1.slice(0, 2) : '';
  const tel1 = dddTel1.length >= 2 ? dddTel1.slice(2) : dddTel1;

  const dddTel2 = data.ddd_telefone_2 ? String(data.ddd_telefone_2).replace(/\D/g, '') : '';
  const ddd2 = dddTel2.length >= 2 ? dddTel2.slice(0, 2) : '';
  const tel2 = dddTel2.length >= 2 ? dddTel2.slice(2) : dddTel2;

  const dddFaxVal = data.ddd_fax ? String(data.ddd_fax).replace(/\D/g, '') : '';
  const dddFax = dddFaxVal.length >= 2 ? dddFaxVal.slice(0, 2) : '';
  const telFax = dddFaxVal.length >= 2 ? dddFaxVal.slice(2) : dddFaxVal;

  const simplesOptante =
    data.opcao_pelo_simples === true
      ? 'Sim'
      : data.opcao_pelo_simples === false
      ? 'Não'
      : typeof data.opcao_pelo_simples === 'string'
      ? data.opcao_pelo_simples
      : 'Não informado';

  const meiOptante =
    data.opcao_pelo_mei === true
      ? 'Sim'
      : data.opcao_pelo_mei === false
      ? 'Não'
      : typeof data.opcao_pelo_mei === 'string'
      ? data.opcao_pelo_mei
      : 'Não informado';

  const estabelecimento = {
    cnpj: cnpjClean,
    cnpj_raiz: cnpjClean.slice(0, 8),
    cnpj_ordem: cnpjClean.slice(8, 12),
    cnpj_digito_verificador: cnpjClean.slice(12, 14),
    tipo:
      data.descricao_identificador_matriz_filial ||
      (data.identificador_matriz_filial === 1 ? 'Matriz' : data.identificador_matriz_filial === 2 ? 'Filial' : 'Matriz'),
    nome_fantasia: data.nome_fantasia || null,
    situacao_cadastral: data.descricao_situacao_cadastral || data.situacao_cadastral || 'Ativa',
    data_situacao_cadastral: data.data_situacao_cadastral || null,
    motivo_situacao_cadastral: data.descricao_motivo_situacao_cadastral
      ? { descricao: data.descricao_motivo_situacao_cadastral }
      : data.motivo_situacao_cadastral
      ? { descricao: `Código ${data.motivo_situacao_cadastral}` }
      : null,
    data_inicio_atividade: data.data_inicio_atividade || null,
    tipo_logradouro: data.descricao_tipo_de_logradouro || '',
    logradouro: data.logradouro || '',
    numero: data.numero || 'S/N',
    complemento: data.complemento || '',
    bairro: data.bairro || '',
    cep: data.cep || '',
    ddd1,
    telefone1: tel1,
    ddd2,
    telefone2: tel2,
    ddd_fax: dddFax,
    fax: telFax,
    email: data.email || null,
    situacao_especial: data.situacao_especial || null,
    data_situacao_especial: data.data_situacao_especial || null,
    cidade: {
      nome: data.municipio || '',
      ibge_id: data.codigo_municipio_ibge || data.codigo_municipio,
    },
    estado: {
      sigla: data.uf || '',
      nome: data.uf || '',
    },
    pais: {
      nome: data.pais || 'Brasil',
    },
    atividade_principal: cnaePrincipal,
    atividades_secundarias: cnaesSecundarios,
    inscricoes_estaduais: [],
  };

  return {
    ...data, // Keep original raw keys accessible for JSON inspector
    razao_social: data.razao_social || 'Não informada',
    cnpj_raiz: cnpjClean.slice(0, 8),
    capital_social: data.capital_social || 0,
    responsavel_federativo: data.ente_federativo_responsavel || null,
    atualizado_em: data.data_situacao_cadastral || new Date().toISOString(),
    porte: {
      id: data.codigo_porte || '',
      descricao: data.porte || 'Não informado',
    },
    natureza_juridica: {
      id: data.codigo_natureza_juridica || '',
      descricao: data.natureza_juridica || 'Não informada',
    },
    qualificacao_do_responsavel: data.qualificacao_do_responsavel
      ? {
          id: data.qualificacao_do_responsavel,
          descricao: `Código ${data.qualificacao_do_responsavel}`,
        }
      : null,
    socios,
    simples: {
      simples: simplesOptante,
      mei: meiOptante,
      data_opcao_simples: data.data_opcao_pelo_simples || null,
      data_exclusao_simples: data.data_exclusao_do_simples || null,
      data_opcao_mei: data.data_opcao_pelo_mei || null,
      data_exclusao_mei: data.data_exclusao_do_mei || null,
      regime_tributario: data.regime_tributario || null,
    },
    regime_tributario: data.regime_tributario || null,
    estabelecimento,
    cnpj: cnpjClean,
    nome_fantasia: data.nome_fantasia || null,
    situacao_cadastral: data.descricao_situacao_cadastral || 'Ativa',
    data_situacao_cadastral: data.data_situacao_cadastral || null,
    logradouro: data.logradouro || '',
    numero: data.numero || 'S/N',
    bairro: data.bairro || '',
    cidade: data.municipio || '',
    estado: data.uf || '',
    cep: data.cep || '',
    telefone1: tel1,
    email: data.email || null,
    inscricoes_estaduais: [],
    atividade_principal: cnaePrincipal,
    _apiSource: 'BrasilAPI',
    _apiEndpoint: `https://brasilapi.com.br/api/cnpj/v1/${cnpjClean}`,
  };
}

/**
 * Normalizes CNPJ.ws response format
 */
export function normalizeCnpjWsResponse(data: any): CnpjData {
  return {
    ...data,
    _apiSource: 'CNPJ.ws',
    _apiEndpoint: `https://publica.cnpj.ws/cnpj/${cleanDigits(data.cnpj || data.estabelecimento?.cnpj || '')}`,
  };
}

/**
 * Query BrasilAPI directly or via server-side proxy
 */
export async function fetchFromBrasilApi(rawCnpj: string): Promise<CnpjData> {
  const cnpj = cleanDigits(rawCnpj);
  const isBrowser = typeof window !== 'undefined';
  const proxyUrl = isBrowser ? `/api/brasilapi-proxy/${cnpj}` : `http://127.0.0.1:3000/api/brasilapi-proxy/${cnpj}`;
  const directUrl = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    let response: Response | null = null;

    // 1. Try server-side proxy first (bypasses CORS & 403 User-Agent blocks)
    try {
      const proxyRes = await fetch(proxyUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (proxyRes.ok || proxyRes.status === 404) {
        response = proxyRes;
      }
    } catch {
      // Proxy failed or not running, fall back to direct public URL
    }

    // 2. If proxy had no response, try direct public BrasilAPI
    if (!response) {
      try {
        const directRes = await fetch(directUrl, {
          method: 'GET',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            Accept: 'application/json',
          },
          signal: controller.signal,
        });

        response = directRes;
      } catch (directErr: any) {
        if (!response) throw directErr;
      }
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch {
        // ignore
      }

      if (response.status === 404) {
        throw {
          status: 404,
          provider: 'BrasilAPI',
          message: 'CNPJ não encontrado na BrasilAPI',
          details: errorBody?.message || 'O CNPJ informado não foi localizado na base de dados da Receita Federal.',
        } as ApiError;
      }

      throw {
        status: response.status,
        provider: 'BrasilAPI',
        message: `Erro na BrasilAPI (HTTP ${response.status})`,
        details: errorBody?.message || 'Falha ao obter dados da empresa através da BrasilAPI.',
      } as ApiError;
    }

    const json = await response.json();
    return normalizeBrasilApiResponse(json);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.status) throw err;
    throw {
      provider: 'BrasilAPI',
      message: 'Falha de conexão com a BrasilAPI',
      details: err.message || 'Não foi possível consultar os dados via BrasilAPI.',
    } as ApiError;
  }
}

/**
 * Query CNPJ.ws directly or via server-side proxy
 */
export async function fetchFromCnpjWs(rawCnpj: string): Promise<CnpjData> {
  const cnpj = cleanDigits(rawCnpj);
  const isBrowser = typeof window !== 'undefined';
  const proxyUrl = isBrowser ? `/api/cnpj-proxy/${cnpj}` : `http://127.0.0.1:3000/api/cnpj-proxy/${cnpj}`;
  const directUrl = `https://publica.cnpj.ws/cnpj/${cnpj}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    let response: Response | null = null;

    // 1. Try server-side proxy first (bypasses browser CORS)
    try {
      const proxyRes = await fetch(proxyUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (proxyRes.ok || proxyRes.status === 404 || proxyRes.status === 429) {
        response = proxyRes;
      }
    } catch {
      // Fallback to direct fetch
    }

    // 2. If proxy had no response, try direct public CNPJ.ws
    if (!response) {
      try {
        const directRes = await fetch(directUrl, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        response = directRes;
      } catch (directErr: any) {
        if (!response) throw directErr;
      }
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch {
        // ignore
      }

      if (response.status === 404) {
        throw {
          status: 404,
          provider: 'CNPJ.ws',
          message: 'CNPJ não encontrado no CNPJ.ws',
          details: 'O CNPJ informado não foi localizado na base de dados pública.',
        } as ApiError;
      }

      if (response.status === 429) {
        const resetHeader = response.headers.get('x-ratelimit-reset');
        const resetSeconds = resetHeader ? parseInt(resetHeader, 10) : 60;
        throw {
          status: 429,
          provider: 'CNPJ.ws',
          message: 'Limite de consultas atingido no CNPJ.ws (429)',
          details:
            errorBody?.detalhes ||
            errorBody?.message ||
            'A API gratuita do CNPJ.ws permite até 3 consultas por minuto. Você pode alternar para a BrasilAPI para consultar sem esta restrição.',
          isRateLimit: true,
          rateLimitResetSeconds: resetSeconds > 0 ? resetSeconds : 60,
        } as ApiError;
      }

      throw {
        status: response.status,
        provider: 'CNPJ.ws',
        message: `Erro na consulta CNPJ.ws (HTTP ${response.status})`,
        details: errorBody?.detalhes || errorBody?.message || 'Falha nos servidores do CNPJ.ws.',
      } as ApiError;
    }

    const json = await response.json();
    return normalizeCnpjWsResponse(json);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.status) throw err;
    throw {
      provider: 'CNPJ.ws',
      message: 'Falha de conexão com CNPJ.ws',
      details: err.message || 'Não foi possível conectar ao servidor do CNPJ.ws.',
    } as ApiError;
  }
}

/**
 * Universal multi-source CNPJ fetcher:
 * - 'brasilapi': Queries BrasilAPI (fast, generous limits, complete cadastral data, QSA, Simples/MEI).
 * - 'cnpjws': Queries CNPJ.ws (detailed including Inscrições Estaduais).
 * - 'auto': Tries BrasilAPI first for instant response without strict rate limits;
 *           if BrasilAPI fails, seamlessly falls back to CNPJ.ws.
 */
export async function fetchCnpj(
  rawCnpj: string,
  preferredProvider: ApiProvider = 'auto'
): Promise<CnpjData> {
  const cnpj = cleanDigits(rawCnpj);

  if (cnpj.length !== 14) {
    const error: ApiError = {
      status: 400,
      message: 'CNPJ incompleto',
      details: `O CNPJ precisa conter exatamente 14 dígitos. Foram informados ${cnpj.length}.`,
    };
    throw error;
  }

  // Explicit provider choice
  if (preferredProvider === 'brasilapi') {
    return await fetchFromBrasilApi(cnpj);
  }

  if (preferredProvider === 'cnpjws') {
    return await fetchFromCnpjWs(cnpj);
  }

  // Automatic multi-source fallback: Try BrasilAPI first
  try {
    const brasilApiData = await fetchFromBrasilApi(cnpj);
    return brasilApiData;
  } catch (brasilError: any) {
    // Try seamless fallback to CNPJ.ws for ANY error on BrasilAPI (including 404, 500, 429, timeout)
    try {
      const cnpjWsData = await fetchFromCnpjWs(cnpj);
      return cnpjWsData;
    } catch (wsError: any) {
      // Re-throw WS error or BrasilAPI error
      throw wsError.status ? wsError : brasilError;
    }
  }
}
