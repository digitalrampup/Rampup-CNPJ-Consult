export interface CnpjPorte {
  id: string | number;
  descricao: string;
}

export interface CnpjNaturezaJuridica {
  id: string | number;
  descricao: string;
}

export interface CnpjAtividade {
  id: string;
  secao?: string;
  divisao?: string;
  grupo?: string;
  classe?: string;
  subclasse?: string;
  descricao: string;
  [key: string]: any;
}

export interface CnpjEstado {
  id?: number | string;
  nome: string;
  sigla: string;
  ibge_id?: number;
  [key: string]: any;
}

export interface CnpjCidade {
  id?: number | string;
  nome: string;
  ibge_id?: number;
  siafi_id?: string;
  [key: string]: any;
}

export interface CnpjPais {
  id?: string | number;
  iso2?: string;
  iso3?: string;
  nome: string;
  comex_id?: string;
  [key: string]: any;
}

export interface CnpjInscricaoEstadual {
  inscricao_estadual: string;
  ativo: boolean;
  atualizado_em?: string | null;
  estado?: CnpjEstado;
  [key: string]: any;
}

export interface CnpjSocio {
  cpf_cnpj_socio?: string;
  nome: string;
  tipo?: string;
  data_entrada?: string;
  cpf_representante_legal?: string | null;
  nome_representante?: string | null;
  faixa_etaria?: string | null;
  atualizado_em?: string | null;
  qualificacao_socio?: {
    id: number | string;
    descricao: string;
  };
  pais?: CnpjPais;
  [key: string]: any;
}

export interface CnpjSimples {
  mei?: string;
  simples?: string;
  data_opcao_mei?: string | null;
  data_exclusao_mei?: string | null;
  data_opcao_simples?: string | null;
  data_exclusao_simples?: string | null;
  atualizado_em?: string | null;
  [key: string]: any;
}

export interface CnpjEstabelecimento {
  cnpj?: string;
  cnpj_raiz?: string;
  cnpj_ordem?: string;
  cnpj_digito_verificador?: string;
  tipo?: string; // Matriz ou Filial
  nome_fantasia?: string | null;
  situacao_cadastral?: string;
  data_situacao_cadastral?: string | null;
  motivo_situacao_cadastral?: any;
  data_inicio_atividade?: string | null;
  tipo_logradouro?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cep?: string | null;
  ddd1?: string | null;
  telefone1?: string | null;
  ddd2?: string | null;
  telefone2?: string | null;
  ddd_fax?: string | null;
  fax?: string | null;
  email?: string | null;
  situacao_especial?: string | null;
  data_situacao_especial?: string | null;
  atualizado_em?: string | null;
  atividade_principal?: CnpjAtividade;
  atividades_secundarias?: CnpjAtividade[];
  pais?: CnpjPais;
  estado?: CnpjEstado;
  cidade?: CnpjCidade;
  inscricoes_estaduais?: CnpjInscricaoEstadual[];
  [key: string]: any;
}

export interface CnpjData {
  razao_social?: string;
  cnpj_raiz?: string;
  capital_social?: string | number;
  responsavel_federativo?: string | null;
  atualizado_em?: string;
  porte?: CnpjPorte;
  natureza_juridica?: CnpjNaturezaJuridica;
  qualificacao_do_responsavel?: {
    id: string | number;
    descricao: string;
  } | null;
  socios?: CnpjSocio[];
  simples?: CnpjSimples;
  estabelecimento?: CnpjEstabelecimento;
  // Fallbacks in case API returns some fields flat at root
  cnpj?: string;
  nome_fantasia?: string | null;
  situacao_cadastral?: string;
  data_situacao_cadastral?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  bairro?: string | null;
  cidade?: string | CnpjCidade;
  estado?: string | CnpjEstado;
  cep?: string | null;
  telefone1?: string | null;
  email?: string | null;
  inscricoes_estaduais?: CnpjInscricaoEstadual[];
  atividade_principal?: CnpjAtividade;
  [key: string]: any;
}

export interface FieldCountStats {
  totalFields: number;
  filledFields: number;
  emptyFields: number;
  percentage: number;
  breakdown: {
    primitives: number;
    objects: number;
    arrays: number;
  };
}
