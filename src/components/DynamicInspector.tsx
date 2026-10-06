import React, { useState, useMemo } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  BuildingIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FileTextIcon,
  UsersIcon,
  DollarIcon,
  ExternalLinkIcon,
  LayersIcon,
  CodeIcon,
} from './Icons';
import {
  formatCnpj,
  formatCep,
  formatCurrency,
  formatDate,
  formatPhone,
  formatCnae,
  getFieldLabel,
  cleanDigits,
} from '../utils/formatters';
import { generateCompanyPdf } from '../utils/exportPdf';
import { CnpjData } from '../types/cnpj';

interface DynamicInspectorProps {
  data: CnpjData | any;
  theme?: 'light' | 'dark';
}

type TabCategory = 'all' | 'cadastral' | 'endereco' | 'cnae' | 'socios' | 'tributario' | 'ie';

export function DynamicInspector({ data, theme = 'light' }: DynamicInspectorProps) {
  const [viewMode, setViewMode] = useState<'structured' | 'tree'>('structured');
  const [categoryFilter, setCategoryFilter] = useState<TabCategory>('all');
  const [search, setSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [cnaeSearch, setCnaeSearch] = useState('');

  // Tree view state
  const [expandAll, setExpandAll] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);

  const isDark = theme === 'dark';

  const est = data?.estabelecimento || {};
  const razaoSocial = data?.razao_social || 'Não informada';
  const nomeFantasia = est.nome_fantasia || data?.nome_fantasia || 'Sem nome fantasia registrado';
  const cnpjNumber = est.cnpj || data?.cnpj || '';
  const formattedCnpj = formatCnpj(cnpjNumber);

  const situacao = est.situacao_cadastral || data?.situacao_cadastral || 'Desconhecida';
  const dataSituacao = est.data_situacao_cadastral || data?.data_situacao_cadastral;
  const motivoSituacao = est.motivo_situacao_cadastral?.descricao || est.motivo_situacao_cadastral;
  const dataInicio = est.data_inicio_atividade;
  const tipoEstabelecimento = est.tipo || 'Matriz';
  const porte = data?.porte?.descricao || 'Não informado';
  const naturezaJuridica = data?.natureza_juridica?.descricao || 'Não informada';
  const capitalSocial = formatCurrency(data?.capital_social);

  // Address
  const tipoLogradouro = est.tipo_logradouro ? `${est.tipo_logradouro} ` : '';
  const logradouro = est.logradouro ? `${tipoLogradouro}${est.logradouro}` : (data?.logradouro || '-');
  const numero = est.numero || data?.numero || 'S/N';
  const complemento = est.complemento ? ` (${est.complemento})` : '';
  const bairro = est.bairro || data?.bairro || '-';
  const cep = formatCep(est.cep || data?.cep);
  const cidadeNome = typeof est.cidade === 'object' ? est.cidade?.nome : (est.cidade || data?.cidade || '-');
  const estadoSigla = typeof est.estado === 'object' ? est.estado?.sigla : (est.estado || data?.estado || '-');
  const fullAddress = `${logradouro}, ${numero}${complemento} - ${bairro}, ${cidadeNome} - ${estadoSigla}, CEP ${cep}`;

  // Contacts
  const phone1 = formatPhone(est.ddd1, est.telefone1);
  const phone2 = formatPhone(est.ddd2, est.telefone2);
  const email = est.email || data?.email;

  // Activities (CNAE)
  const cnaePrincipal = est.atividade_principal || data?.atividade_principal;
  const cnaesSecundarios: any[] = est.atividades_secundarias || [];

  // Filtered secondary activities
  const filteredCnaesSecundarios = useMemo(() => {
    if (!cnaeSearch.trim()) return cnaesSecundarios;
    const q = cnaeSearch.toLowerCase();
    return cnaesSecundarios.filter(
      (act) => act.descricao?.toLowerCase().includes(q) || String(act.id).includes(q)
    );
  }, [cnaesSecundarios, cnaeSearch]);

  // Partners (QSA)
  const socios: any[] = data?.socios || [];

  // Taxation
  const simples = data?.simples;
  const isSimplesOptante =
    simples?.simples === true ||
    (typeof simples?.simples === 'string' &&
      (simples.simples.toLowerCase() === 'sim' ||
        (simples.simples.toLowerCase().includes('optante') &&
          !simples.simples.toLowerCase().includes('não optante'))));
  const isMeiOptante =
    simples?.mei === true ||
    (typeof simples?.mei === 'string' &&
      (simples.mei.toLowerCase() === 'sim' ||
        (simples.mei.toLowerCase().includes('sim') && !simples.mei.toLowerCase().includes('não')) ||
        (simples.mei.toLowerCase().includes('enquadrado') && !simples.mei.toLowerCase().includes('não enquadrado'))));

  // Inscrições Estaduais
  const inscricoes: any[] = est.inscricoes_estaduais || data?.inscricoes_estaduais || [];

  const handleCopy = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    try {
      generateCompanyPdf(data);
    } catch (err) {
      console.error('Falha ao exportar PDF:', err);
    } finally {
      setTimeout(() => setIsExportingPdf(false), 600);
    }
  };

  const getStatusColor = (status: string) => {
    const s = String(status).toLowerCase();
    if (s.includes('ativa')) {
      return isDark
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        : 'bg-emerald-50 text-emerald-700 border-emerald-300';
    }
    if (s.includes('baixada') || s.includes('nula')) {
      return isDark
        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        : 'bg-rose-50 text-rose-700 border-rose-300';
    }
    return isDark
      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      : 'bg-amber-50 text-amber-700 border-amber-300';
  };

  return (
    <div
      className={`rounded-2xl border transition-colors ${
        isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white shadow-xs'
      }`}
    >
      {/* Top Action & Navigation Header */}
      <div
        className={`p-4 sm:p-6 border-b space-y-4 ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50/80'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Dados Completos da Empresa
              </span>
              <span className="text-slate-400">·</span>
              <span className={`font-mono text-xs font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {formattedCnpj}
              </span>
              {data?._apiSource && (
                <>
                  <span className="text-slate-400">·</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md border bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                    Fonte: {data._apiSource}
                  </span>
                </>
              )}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Ficha oficial com todos os campos cadastrais, fiscais e societários da Receita Federal
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Export PDF Button */}
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-sm transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer"
              title="Exportar ficha cadastral completa em PDF"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>{isExportingPdf ? 'Gerando PDF...' : 'Exportar em PDF'}</span>
            </button>

            {/* View Mode Toggle */}
            <div
              className={`flex items-center p-1 rounded-lg border ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-2xs'
              }`}
            >
              <button
                type="button"
                onClick={() => setViewMode('structured')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  viewMode === 'structured'
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-950 shadow-2xs font-bold'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-800 hover:text-black font-semibold'
                }`}
              >
                <LayersIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Leitura Estruturada</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('tree')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  viewMode === 'tree'
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-950 shadow-2xs font-bold'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-800 hover:text-black font-semibold'
                }`}
              >
                <CodeIcon className="w-3.5 h-3.5 text-cyan-600" />
                <span>Árvore de Atributos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar (Only for Structured View) */}
        {viewMode === 'structured' && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-800 hover:text-black border border-slate-300 shadow-2xs'
              }`}
            >
              Todos os Dados
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('cadastral')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'cadastral'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-800 hover:text-black border border-slate-300 shadow-2xs'
              }`}
            >
              Identificação & Porte
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('endereco')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'endereco'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-800 hover:text-black border border-slate-300 shadow-2xs'
              }`}
            >
              Endereço & Contatos
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('cnae')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'cnae'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-800 hover:text-black border border-slate-300 shadow-2xs'
              }`}
            >
              Atividades Econômicas ({cnaesSecundarios.length + 1})
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('socios')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'socios'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-800 hover:text-black border border-slate-300 shadow-2xs'
              }`}
            >
              Sócios e Administradores ({socios.length})
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('tributario')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'tributario'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Tributação & Simples
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('ie')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === 'ie'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Inscrições Estaduais ({inscricoes.length})
            </button>
          </div>
        )}

        {/* Tree Toolbar (Only for Tree View) */}
        {viewMode === 'tree' && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Filtrar atributos ou valores..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none ${
                  isDark
                    ? 'bg-slate-900 text-white placeholder-slate-500 border-slate-700'
                    : 'bg-white text-slate-900 placeholder-slate-400 border-slate-300'
                }`}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setExpandAll(true);
                  setCollapseKey((k) => k + 1);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                  isDark
                    ? 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Expandir Tudo
              </button>
              <button
                type="button"
                onClick={() => {
                  setExpandAll(false);
                  setCollapseKey((k) => k + 1);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                  isDark
                    ? 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Recolher Tudo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {viewMode === 'structured' ? (
        <div className="p-4 sm:p-6 space-y-6">
          {/* SECTION 1: Identificação Cadastral */}
          {(categoryFilter === 'all' || categoryFilter === 'cadastral') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2.5">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4 text-emerald-600" />
                  <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    1. Identificação Cadastral e Registro
                  </h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusColor(situacao)}`}>
                  {situacao}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <DataFieldItem
                  label="Razão Social"
                  value={razaoSocial}
                  onCopy={() => handleCopy(razaoSocial, 'razao')}
                  isCopied={copiedKey === 'razao'}
                  isDark={isDark}
                  className="sm:col-span-2"
                />

                <DataFieldItem
                  label="Nome Fantasia"
                  value={nomeFantasia}
                  onCopy={() => handleCopy(nomeFantasia, 'fantasia')}
                  isCopied={copiedKey === 'fantasia'}
                  isDark={isDark}
                />

                <DataFieldItem
                  label="CNPJ Completo"
                  value={formattedCnpj}
                  onCopy={() => handleCopy(formattedCnpj, 'cnpj')}
                  isCopied={copiedKey === 'cnpj'}
                  isDark={isDark}
                  isMono
                />

                <DataFieldItem
                  label="Tipo de Estabelecimento"
                  value={tipoEstabelecimento}
                  isDark={isDark}
                />

                <DataFieldItem
                  label="Porte da Empresa"
                  value={porte}
                  isDark={isDark}
                />

                <DataFieldItem
                  label="Data de Início de Atividade"
                  value={dataInicio ? formatDate(dataInicio) : 'Não informada'}
                  isDark={isDark}
                  isMono
                />

                <DataFieldItem
                  label="Situação Cadastral"
                  value={`${situacao} ${dataSituacao ? `(desde ${formatDate(dataSituacao)})` : ''}`}
                  isDark={isDark}
                />

                {motivoSituacao && (
                  <DataFieldItem
                    label="Motivo da Situação"
                    value={motivoSituacao}
                    isDark={isDark}
                  />
                )}

                <DataFieldItem
                  label="Natureza Jurídica"
                  value={naturezaJuridica}
                  isDark={isDark}
                  className="sm:col-span-2"
                />

                <DataFieldItem
                  label="Capital Social"
                  value={capitalSocial}
                  onCopy={() => handleCopy(capitalSocial, 'capital')}
                  isCopied={copiedKey === 'capital'}
                  isDark={isDark}
                  isMono
                />

                {data?.responsavel_federativo && (
                  <DataFieldItem
                    label="Responsável Federativo"
                    value={data.responsavel_federativo}
                    isDark={isDark}
                  />
                )}

                {data?.atualizado_em && (
                  <DataFieldItem
                    label="Última Atualização no Banco de Dados"
                    value={formatDate(data.atualizado_em, true)}
                    isDark={isDark}
                    isMono
                  />
                )}
              </div>
            </div>
          )}

          {/* SECTION 2: Endereço & Contatos */}
          {(categoryFilter === 'all' || categoryFilter === 'endereco') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2.5">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-emerald-600" />
                  <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    2. Localização e Contatos Oficiais
                  </h3>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-500 font-semibold"
                >
                  <span>Abrir no Maps</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <DataFieldItem
                  label="Logradouro e Número"
                  value={`${logradouro}, ${numero}${complemento}`}
                  onCopy={() => handleCopy(`${logradouro}, ${numero}${complemento}`, 'logradouro')}
                  isCopied={copiedKey === 'logradouro'}
                  isDark={isDark}
                  className="sm:col-span-2"
                />

                <DataFieldItem
                  label="Bairro / Distrito"
                  value={bairro}
                  isDark={isDark}
                />

                <DataFieldItem
                  label="CEP"
                  value={cep}
                  onCopy={() => handleCopy(cep, 'cep')}
                  isCopied={copiedKey === 'cep'}
                  isDark={isDark}
                  isMono
                />

                <DataFieldItem
                  label="Município"
                  value={String(cidadeNome)}
                  isDark={isDark}
                />

                <DataFieldItem
                  label="Estado / UF"
                  value={String(estadoSigla)}
                  isDark={isDark}
                />

                <DataFieldItem
                  label="Telefone Principal"
                  value={phone1}
                  onCopy={phone1 !== '-' ? () => handleCopy(phone1, 'phone1') : undefined}
                  isCopied={copiedKey === 'phone1'}
                  isDark={isDark}
                  isMono
                />

                <DataFieldItem
                  label="Telefone Secundário"
                  value={phone2}
                  onCopy={phone2 !== '-' ? () => handleCopy(phone2, 'phone2') : undefined}
                  isCopied={copiedKey === 'phone2'}
                  isDark={isDark}
                  isMono
                />

                <DataFieldItem
                  label="E-mail Cadastrado"
                  value={email ? email.toLowerCase() : 'Não informado'}
                  onCopy={email ? () => handleCopy(email, 'email') : undefined}
                  isCopied={copiedKey === 'email'}
                  isDark={isDark}
                />
              </div>
            </div>
          )}

          {/* SECTION 3: Atividades Econômicas (CNAE) */}
          {(categoryFilter === 'all' || categoryFilter === 'cnae') && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4 text-emerald-600" />
                  <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    3. Atividades Econômicas (CNAE)
                  </h3>
                </div>

                {cnaesSecundarios.length > 5 && (
                  <div className="relative w-full sm:w-60">
                    <SearchIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Filtrar CNAEs secundários..."
                      value={cnaeSearch}
                      onChange={(e) => setCnaeSearch(e.target.value)}
                      className={`w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border outline-none ${
                        isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* CNAE Principal */}
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-emerald-50/40 border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Atividade Principal
                  </span>
                  {cnaePrincipal?.id && (
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {formatCnae(cnaePrincipal.id)}
                    </span>
                  )}
                </div>
                <p className={`mt-1.5 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {cnaePrincipal?.descricao || 'Não informada'}
                </p>
                {cnaePrincipal?.secao && (
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Seção {cnaePrincipal.secao} · Divisão {cnaePrincipal.divisao || '-'} · Grupo {cnaePrincipal.grupo || '-'}
                  </p>
                )}
              </div>

              {/* CNAEs Secundários */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-400">
                  <span>Atividades Secundárias ({filteredCnaesSecundarios.length} de {cnaesSecundarios.length})</span>
                  {cnaesSecundarios.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          cnaesSecundarios.map((a) => `${formatCnae(a.id)} - ${a.descricao}`).join('\n'),
                          'all-cnaes'
                        )
                      }
                      className="text-emerald-700 dark:text-emerald-500 hover:underline font-bold cursor-pointer"
                    >
                      {copiedKey === 'all-cnaes' ? 'Copiado!' : 'Copiar Lista de CNAEs'}
                    </button>
                  )}
                </div>

                {filteredCnaesSecundarios.length > 0 ? (
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {filteredCnaesSecundarios.map((act, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isDark ? 'bg-slate-950/30 border-slate-800' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            {act.descricao}
                          </span>
                          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                            Seção {act.secao || '-'} · Divisão {act.divisao || '-'}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 self-start sm:self-auto shrink-0">
                          {formatCnae(act.id)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`p-4 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                    Nenhuma atividade secundária encontrada.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 4: Quadro de Sócios e Administradores (QSA) */}
          {(categoryFilter === 'all' || categoryFilter === 'socios') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2.5">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-emerald-600" />
                  <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    4. Quadro de Sócios e Administradores (QSA)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-400">
                  {socios.length} membro(s) registrado(s)
                </span>
              </div>

              {socios.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {socios.map((socio, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border space-y-2 ${
                        isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`font-bold text-sm block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {socio.nome}
                          </span>
                          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                            {socio.qualificacao_socio?.descricao || 'Sócio'}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 font-medium">
                          {socio.tipo || 'Pessoa'}
                        </span>
                      </div>

                      <div className="pt-1 border-t flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-400 font-medium">
                        {socio.data_entrada && (
                          <span>Entrada: <strong className="text-slate-900 dark:text-slate-200 font-bold">{formatDate(socio.data_entrada)}</strong></span>
                        )}
                        {socio.faixa_etaria && socio.faixa_etaria !== 'Não se aplica' && (
                          <span>Idade: <strong className="text-slate-900 dark:text-slate-200 font-bold">{socio.faixa_etaria}</strong></span>
                        )}
                        {socio.nome_representante && (
                          <span className="w-full text-amber-700 dark:text-amber-400 font-semibold">
                            Representante: {socio.nome_representante}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`p-6 text-center text-xs rounded-xl border ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-700 font-medium'}`}>
                  Nenhum sócio ou administrador registrado na base pública da Receita Federal (típico de MEI, EI ou sociedade anônima).
                </div>
              )}
            </div>
          )}

          {/* SECTION 5: Tributação e Simples Nacional */}
          {(categoryFilter === 'all' || categoryFilter === 'tributario') && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b pb-2.5">
                <DollarIcon className="w-4 h-4 text-emerald-600" />
                <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  5. Regime Tributário e Enquadramento
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Simples Nacional */}
                <div
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-400">Opção pelo Simples Nacional</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${
                        isSimplesOptante ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {isSimplesOptante ? 'Optante pelo Simples Nacional' : 'Não Optante pelo Simples Nacional'}
                    </span>
                  </div>
                  {simples?.data_opcao_simples && (
                    <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">
                      Optante desde: <strong className="text-slate-900 dark:text-slate-200">{formatDate(simples.data_opcao_simples)}</strong>
                    </p>
                  )}
                  {simples?.data_exclusao_simples && (
                    <p className="text-xs text-rose-600 font-semibold">
                      Excluído em: <strong>{formatDate(simples.data_exclusao_simples)}</strong>
                    </p>
                  )}
                </div>

                {/* SIMEI / MEI */}
                <div
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-400">Enquadramento SIMEI (MEI)</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${
                        isMeiOptante ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {isMeiOptante ? 'Enquadrado como MEI' : 'Não Enquadrado como MEI'}
                    </span>
                  </div>
                  {simples?.data_opcao_mei && (
                    <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">
                      Optante desde: <strong className="text-slate-900 dark:text-slate-200">{formatDate(simples.data_opcao_mei)}</strong>
                    </p>
                  )}
                  {simples?.data_exclusao_mei && (
                    <p className="text-xs text-rose-600 font-semibold">
                      Excluído em: <strong>{formatDate(simples.data_exclusao_mei)}</strong>
                    </p>
                  )}
                </div>

                {/* Regime Tributário (Lucro Real / Presumido da BrasilAPI) */}
                {Array.isArray(data?.regime_tributario) && data.regime_tributario.length > 0 && (
                  <div
                    className={`col-span-1 sm:col-span-2 p-4 rounded-xl border space-y-2.5 ${
                      isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-400">
                        Histórico de Forma de Tributação (BrasilAPI / ECF Receita Federal)
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                        {data.regime_tributario.length} exercício(s)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {data.regime_tributario.slice(0, 8).map((reg: any, rIdx: number) => (
                        <div
                          key={rIdx}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-200'
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                          }`}
                        >
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">{reg.ano}:</span>
                          <span className="font-medium">{reg.forma_de_tributacao}</span>
                          {reg.quantidade_de_escrituracoes > 1 && (
                            <span className="text-[10px] text-slate-500 font-medium">({reg.quantidade_de_escrituracoes} escrit.)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 6: Inscrições Estaduais */}
          {(categoryFilter === 'all' || categoryFilter === 'ie') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2.5">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4 text-emerald-600" />
                  <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    6. Inscrições Estaduais (Sintegra / SEFAZ)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-400">
                  {inscricoes.length} inscrição(ões)
                </span>
              </div>

              {inscricoes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {inscricoes.map((ie, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-center justify-between ${
                        isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                            {ie.inscricao_estadual}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(ie.inscricao_estadual, `ie-${idx}`)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                            title="Copiar IE"
                          >
                            {copiedKey === `ie-${idx}` ? (
                              <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <CopyIcon className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <span className="text-xs text-slate-700 dark:text-slate-400 font-medium">
                          UF: <strong className="text-slate-900 dark:text-slate-200 font-bold">{ie.estado?.sigla || ie.estado?.nome || '-'}</strong>
                          {ie.atualizado_em && ` · ${formatDate(ie.atualizado_em)}`}
                        </span>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold border ${
                          ie.ativo
                            ? isDark
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isDark
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        {ie.ativo ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`p-6 text-center text-xs rounded-xl border ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-700 font-medium'}`}>
                  Nenhuma inscrição estadual registrada para esta pessoa jurídica.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Tree Inspector View */
        <div className="p-4 sm:p-6 overflow-x-auto" key={collapseKey}>
          {data && typeof data === 'object' ? (
            <div className="space-y-1.5 font-sans text-xs">
              {Object.entries(data).map(([key, val]) => (
                <DynamicNode
                  key={key}
                  nodeKey={key}
                  value={val}
                  depth={0}
                  search={search.toLowerCase().trim()}
                  defaultExpanded={expandAll || ['estabelecimento', 'socios', 'simples'].includes(key)}
                  isDark={isDark}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              Nenhum dado para inspecionar.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Reusable key-value block for clean UI presentation
 */
function DataFieldItem({
  label,
  value,
  onCopy,
  isCopied,
  isDark,
  isMono = false,
  className = '',
}: {
  label: string;
  value: string;
  onCopy?: () => void;
  isCopied?: boolean;
  isDark?: boolean;
  isMono?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`p-3 rounded-xl border flex flex-col justify-between ${
        isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50/70 border-slate-200/80'
      } ${className}`}
    >
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
        {label}
      </span>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-sm font-semibold break-words ${
            isDark ? 'text-white' : 'text-slate-900'
          } ${isMono ? 'font-mono' : 'font-sans'}`}
        >
          {value || '-'}
        </span>
        {onCopy && value && value !== '-' && (
          <button
            type="button"
            onClick={onCopy}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer shrink-0"
            title={`Copiar ${label}`}
          >
            {isCopied ? (
              <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <CopyIcon className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Recursive Tree Node Component
 */
interface DynamicNodeProps {
  nodeKey: string;
  value: any;
  depth: number;
  search: string;
  defaultExpanded?: boolean;
  isDark?: boolean;
}

function DynamicNode({
  nodeKey,
  value,
  depth,
  search,
  defaultExpanded = false,
  isDark = false,
}: DynamicNodeProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const isNull = value === null || value === undefined;
  const isArray = Array.isArray(value);
  const isObject = !isArray && !isNull && typeof value === 'object';
  const isPrimitive = !isArray && !isObject;

  const humanLabel = getFieldLabel(nodeKey);

  const matchesSearch = useMemo(() => {
    if (!search) return true;
    const keyMatch =
      nodeKey.toLowerCase().includes(search) ||
      humanLabel.toLowerCase().includes(search);

    if (keyMatch) return true;

    if (isPrimitive) {
      return String(value).toLowerCase().includes(search);
    }

    try {
      return JSON.stringify(value).toLowerCase().includes(search);
    } catch {
      return false;
    }
  }, [nodeKey, humanLabel, value, search, isPrimitive]);

  if (!matchesSearch && search) {
    return null;
  }

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (isArray) {
    const count = value.length;
    return (
      <div className={`my-1 ${depth > 0 ? `ml-3 pl-3 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}` : ''}`}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group flex items-center justify-between py-1 px-2 rounded-md cursor-pointer transition-colors ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-900'}>
              {isExpanded ? <ChevronDownIcon className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />}
            </span>
            <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{humanLabel}</span>
            <span className="font-mono text-[11px] text-slate-400">{nodeKey}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              [{count}]
            </span>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => handleCopy(e, JSON.stringify(value, null, 2))}
              className={`p-1 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              title="Copiar JSON"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-1 mt-1">
            {count === 0 ? (
              <div className="ml-6 py-1 text-slate-400 text-xs italic">(Lista vazia)</div>
            ) : (
              value.map((item: any, idx: number) => (
                <DynamicNode
                  key={idx}
                  nodeKey={`[${idx}]`}
                  value={item}
                  depth={depth + 1}
                  search={search}
                  defaultExpanded={depth < 2}
                  isDark={isDark}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  if (isObject) {
    const keys = Object.keys(value);
    return (
      <div className={`my-1 ${depth > 0 ? `ml-3 pl-3 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}` : ''}`}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group flex items-center justify-between py-1 px-2 rounded-md cursor-pointer transition-colors ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-900'}>
              {isExpanded ? <ChevronDownIcon className="w-3.5 h-3.5" /> : <ChevronRightIcon className="w-3.5 h-3.5" />}
            </span>
            <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{humanLabel}</span>
            <span className="font-mono text-[11px] text-slate-400">{nodeKey}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              ({keys.length})
            </span>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => handleCopy(e, JSON.stringify(value, null, 2))}
              className={`p-1 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              title="Copiar JSON"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-1 mt-1">
            {keys.length === 0 ? (
              <div className="ml-6 py-1 text-slate-400 text-xs italic">(Objeto vazio)</div>
            ) : (
              keys.map((k) => (
                <DynamicNode
                  key={k}
                  nodeKey={k}
                  value={value[k]}
                  depth={depth + 1}
                  search={search}
                  defaultExpanded={depth < 1}
                  isDark={isDark}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // Primitive
  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between py-1.5 px-2 rounded-md gap-1 transition-colors ${
        depth > 0 ? `ml-3 pl-3 border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}` : ''
      } ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{humanLabel}</span>
        <span className="font-mono text-[11px] text-slate-400">{nodeKey}</span>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <FormattedPrimitiveValue nodeKey={nodeKey} value={value} isDark={isDark} />
        {!isNull && (
          <button
            type="button"
            onClick={(e) => handleCopy(e, String(value))}
            className={`opacity-0 group-hover:opacity-100 p-0.5 transition-all ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Copiar valor"
          >
            {copied ? <CheckIcon className="w-3 h-3 text-emerald-500" /> : <CopyIcon className="w-3 h-3" />}
          </button>
        )}
      </div>
    </div>
  );
}

function FormattedPrimitiveValue({ nodeKey, value, isDark = false }: { nodeKey: string; value: any; isDark?: boolean }) {
  if (value === null || value === undefined || value === '') {
    return (
      <span className="text-slate-400 italic font-mono text-[11px]">
        {value === '' ? '"" (vazio)' : 'null'}
      </span>
    );
  }

  const str = String(value);
  const lowerKey = nodeKey.toLowerCase();

  if (typeof value === 'boolean') {
    return (
      <span
        className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
          value
            ? isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
            : isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}
      >
        {value ? 'Sim / Ativo' : 'Não / Inativo'}
      </span>
    );
  }

  if (lowerKey.includes('capital_social')) {
    return <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{formatCurrency(value)}</span>;
  }

  if (lowerKey.includes('cnpj') && cleanDigits(str).length === 14) {
    return <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">{formatCnpj(str)}</span>;
  }

  if (lowerKey.includes('cep') && cleanDigits(str).length === 8) {
    return <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">{formatCep(str)}</span>;
  }

  if (
    (lowerKey.includes('data') || lowerKey.includes('atualizado_em') || lowerKey.includes('_em')) &&
    (/\d{4}-\d{2}-\d{2}/.test(str) || !isNaN(Date.parse(str)))
  ) {
    return <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">{formatDate(str, true)}</span>;
  }

  if (typeof value === 'number') {
    return <span className="font-mono text-slate-800 dark:text-slate-200 font-medium tabular-nums">{value}</span>;
  }

  if (str.includes('@') && str.includes('.')) {
    return (
      <a href={`mailto:${str}`} className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline break-all">
        {str}
      </a>
    );
  }

  return (
    <span className={`font-mono text-[11px] break-all max-w-sm sm:max-w-md text-right sm:text-left ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      "{str}"
    </span>
  );
}
