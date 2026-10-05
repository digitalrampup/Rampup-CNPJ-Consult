import { CnpjData } from '../types/cnpj';
import { cleanDigits } from './formatters';

export interface ApiError {
  status?: number;
  message: string;
  details?: string;
  isRateLimit?: boolean;
  rateLimitResetSeconds?: number;
}

export async function fetchCnpj(rawCnpj: string): Promise<CnpjData> {
  const cnpj = cleanDigits(rawCnpj);

  if (cnpj.length !== 14) {
    const error: ApiError = {
      status: 400,
      message: 'CNPJ incompleto',
      details: `O CNPJ precisa conter exatamente 14 dígitos. Foram informados ${cnpj.length}.`,
    };
    throw error;
  }

  const primaryUrl = `https://publica.cnpj.ws/cnpj/${cnpj}`;
  const fallbackUrl = `/api/cnpj-proxy/${cnpj}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    let response: Response;
    try {
      response = await fetch(primaryUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });
    } catch (networkError: any) {
      // In case direct browser fetch was blocked by CORS or network, try the proxy
      try {
        response = await fetch(fallbackUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          signal: controller.signal,
        });
      } catch {
        throw networkError;
      }
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch {
        // Response might be plain text
      }

      if (response.status === 404) {
        const error: ApiError = {
          status: 404,
          message: 'CNPJ não encontrado',
          details: 'O CNPJ informado não foi localizado na base de dados pública da Receita Federal.',
        };
        throw error;
      }

      if (response.status === 429) {
        const resetHeader = response.headers.get('x-ratelimit-reset');
        const resetSeconds = resetHeader ? parseInt(resetHeader, 10) : 60;
        const error: ApiError = {
          status: 429,
          message: 'Limite de consultas atingido (429)',
          details:
            errorBody?.detalhes ||
            errorBody?.message ||
            'A API pública gratuita permite até 3 consultas por minuto. Por favor, aguarde alguns instantes antes de tentar novamente.',
          isRateLimit: true,
          rateLimitResetSeconds: resetSeconds > 0 ? resetSeconds : 60,
        };
        throw error;
      }

      if (response.status === 400) {
        const error: ApiError = {
          status: 400,
          message: 'Requisição inválida (400)',
          details:
            errorBody?.detalhes ||
            errorBody?.message ||
            'O formato do CNPJ não foi aceito pelos servidores da Receita Federal.',
        };
        throw error;
      }

      const error: ApiError = {
        status: response.status,
        message: `Erro na consulta (HTTP ${response.status})`,
        details:
          errorBody?.detalhes ||
          errorBody?.message ||
          'Não foi possível concluir a consulta aos servidores da Receita Federal.',
      };
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      const error: ApiError = {
        message: 'Tempo limite esgotado',
        details: 'A consulta demorou mais de 15 segundos para responder. Verifique sua conexão e tente novamente.',
      };
      throw error;
    }

    if (err.message && err.status) {
      throw err;
    }

    const error: ApiError = {
      message: 'Falha de conexão',
      details:
        err.message ||
        'Não foi possível conectar ao servidor da API pública de CNPJ. Verifique sua conexão com a internet.',
    };
    throw error;
  }
}
