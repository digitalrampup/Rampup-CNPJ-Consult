import { FieldCountStats } from '../types/cnpj';

/**
 * Removes non-numeric characters from a string
 */
export function cleanDigits(value: string = ''): string {
  return value.replace(/\D/g, '');
}

/**
 * Applies mask to a CNPJ string: 00.000.000/0001-00
 */
export function maskCnpj(value: string): string {
  const digits = cleanDigits(value).slice(0, 14);

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

/**
 * Formats a 14-digit CNPJ string. If invalid length, returns as is.
 */
export function formatCnpj(cnpj?: string | null): string {
  if (!cnpj) return '-';
  const digits = cleanDigits(cnpj);
  if (digits.length !== 14) return cnpj;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

/**
 * Validates a CNPJ with Brazilian Federal Revenue checksum algorithm
 */
export function validateCnpj(cnpj: string): { isValid: boolean; message: string } {
  const digits = cleanDigits(cnpj);

  if (!digits) {
    return { isValid: false, message: 'Digite um CNPJ para consultar' };
  }

  if (digits.length < 14) {
    return { isValid: false, message: `Faltam ${14 - digits.length} dígitos` };
  }

  if (digits.length > 14) {
    return { isValid: false, message: 'CNPJ deve conter exatamente 14 dígitos' };
  }

  // Reject known invalid repeating sequences
  if (/^(\d)\1{13}$/.test(digits)) {
    return { isValid: false, message: 'CNPJ inválido (dígitos repetidos)' };
  }

  // 1st digit check
  let size = digits.length - 2;
  let numbers = digits.substring(0, size);
  const digitsPart = digits.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digitsPart.charAt(0))) {
    return { isValid: false, message: 'Dígito verificador inválido' };
  }

  // 2nd digit check
  size = size + 1;
  numbers = digits.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digitsPart.charAt(1))) {
    return { isValid: false, message: 'Dígito verificador inválido' };
  }

  return { isValid: true, message: 'CNPJ válido' };
}

/**
 * Formats a Brazilian Postal Code (CEP): 00000-000
 */
export function formatCep(cep?: string | null): string {
  if (!cep) return '-';
  const digits = cleanDigits(cep);
  if (digits.length === 8) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return cep;
}

/**
 * Formats Currency to Brazilian Real (BRL)
 */
export function formatCurrency(value?: number | string | null): string {
  if (value === undefined || value === null || value === '') return 'R$ 0,00';
  const num = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
  if (isNaN(num)) return String(value);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Formats date from ISO or YYYY-MM-DD to DD/MM/AAAA or DD/MM/AAAA às HH:mm
 */
export function formatDate(dateStr?: string | null, includeTime: boolean = false): string {
  if (!dateStr) return '-';

  try {
    // If it's pure YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (includeTime && dateStr.includes('T')) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} às ${hours}:${minutes}`;
    }

    return `${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
}

/**
 * Formats phone number with DDD: (61) 3493-1000 or (11) 98765-4321
 */
export function formatPhone(ddd?: string | null, phone?: string | null): string {
  if (!phone) return '-';
  const cleanPhone = cleanDigits(phone);
  const cleanDdd = ddd ? cleanDigits(ddd) : '';

  if (cleanDdd && cleanPhone) {
    if (cleanPhone.length === 9) {
      return `(${cleanDdd}) ${cleanPhone.slice(0, 5)}-${cleanPhone.slice(5)}`;
    }
    if (cleanPhone.length === 8) {
      return `(${cleanDdd}) ${cleanPhone.slice(0, 4)}-${cleanPhone.slice(4)}`;
    }
    return `(${cleanDdd}) ${cleanPhone}`;
  }

  if (cleanPhone.length === 11) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
  }
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
  }

  return phone;
}

/**
 * Formats CNAE code: 6422-1/00
 */
export function formatCnae(cnae?: string | null): string {
  if (!cnae) return '-';
  const digits = cleanDigits(cnae);
  if (digits.length === 7) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 5)}/${digits.slice(5, 7)}`;
  }
  return cnae;
}

/**
 * Counts filled vs empty fields recursively in an object
 */
export function countFilledFields(data: any): FieldCountStats {
  let total = 0;
  let filled = 0;
  let primitives = 0;
  let objects = 0;
  let arrays = 0;

  function traverse(val: any) {
    if (val === null || val === undefined) {
      total++;
      return;
    }

    if (Array.isArray(val)) {
      arrays++;
      if (val.length === 0) {
        total++;
        return;
      }
      for (const item of val) {
        traverse(item);
      }
      return;
    }

    if (typeof val === 'object') {
      objects++;
      const keys = Object.keys(val);
      if (keys.length === 0) {
        total++;
        return;
      }
      for (const key of keys) {
        traverse(val[key]);
      }
      return;
    }

    // Primitive value
    total++;
    primitives++;
    if (val !== '' && val !== null && val !== undefined) {
      filled++;
    }
  }

  traverse(data);

  const empty = total - filled;
  const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;

  return {
    totalFields: total,
    filledFields: filled,
    emptyFields: empty,
    percentage,
    breakdown: {
      primitives,
      objects,
      arrays,
    },
  };
}

/**
 * Human-friendly Portuguese translations for standard Receita Federal / CNPJ.ws keys
 */
export const FIELD_LABELS: Record<string, string> = {
  razao_social: 'Razão Social',
  cnpj_raiz: 'CNPJ Raiz',
  cnpj: 'CNPJ',
  cnpj_ordem: 'Ordem do CNPJ',
  cnpj_digito_verificador: 'Dígito Verificador',
  capital_social: 'Capital Social',
  responsavel_federativo: 'Responsável Federativo',
  atualizado_em: 'Atualizado em',
  porte: 'Porte da Empresa',
  natureza_juridica: 'Natureza Jurídica',
  qualificacao_do_responsavel: 'Qualificação do Responsável',
  socios: 'Quadro de Sócios e Administradores (QSA)',
  simples: 'Simples Nacional',
  simei: 'SIMEI / MEI',
  estabelecimento: 'Dados do Estabelecimento',
  tipo: 'Tipo de Estabelecimento',
  nome_fantasia: 'Nome Fantasia',
  situacao_cadastral: 'Situação Cadastral',
  data_situacao_cadastral: 'Data da Situação Cadastral',
  motivo_situacao_cadastral: 'Motivo da Situação Cadastral',
  data_inicio_atividade: 'Data de Início da Atividade',
  tipo_logradouro: 'Tipo de Logradouro',
  logradouro: 'Logradouro',
  numero: 'Número',
  complemento: 'Complemento',
  bairro: 'Bairro',
  cep: 'CEP',
  ddd1: 'DDD Principal',
  telefone1: 'Telefone Principal',
  ddd2: 'DDD Secundário',
  telefone2: 'Telefone Secundário',
  ddd_fax: 'DDD Fax',
  fax: 'Fax',
  email: 'E-mail',
  situacao_especial: 'Situação Especial',
  data_situacao_especial: 'Data da Situação Especial',
  atividade_principal: 'Atividade Econômica Principal (CNAE)',
  atividades_secundarias: 'Atividades Econômicas Secundárias',
  pais: 'País',
  estado: 'Estado (UF)',
  cidade: 'Município',
  inscricoes_estaduais: 'Inscrições Estaduais',
  inscricao_estadual: 'Inscrição Estadual',
  ativo: 'Status Ativo',
  cpf_cnpj_socio: 'CPF/CNPJ do Sócio',
  nome: 'Nome Completo',
  data_entrada: 'Data de Entrada',
  cpf_representante_legal: 'CPF do Representante Legal',
  nome_representante: 'Nome do Representante',
  faixa_etaria: 'Faixa Etária',
  qualificacao_socio: 'Qualificação do Sócio',
  qualificacao_representante: 'Qualificação do Representante',
  mei: 'Optante pelo MEI',
  data_opcao_mei: 'Data de Opção pelo MEI',
  data_exclusao_mei: 'Data de Exclusão do MEI',
  data_opcao_simples: 'Data de Opção pelo Simples',
  data_exclusao_simples: 'Data de Exclusão do Simples',
  descricao: 'Descrição',
  secao: 'Seção CNAE',
  divisao: 'Divisão CNAE',
  grupo: 'Grupo CNAE',
  classe: 'Classe CNAE',
  subclasse: 'Subclasse CNAE',
  sigla: 'Sigla',
  ibge_id: 'Código IBGE',
  siafi_id: 'Código SIAFI',
  comex_id: 'Código Comex',
  iso2: 'Código ISO2',
  iso3: 'Código ISO3',
  observacao: 'Observações',
};

/**
 * Returns a human readable label for a given JSON key
 */
export function getFieldLabel(key: string): string {
  if (FIELD_LABELS[key]) {
    return FIELD_LABELS[key];
  }
  // Convert snake_case to Title Case
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
