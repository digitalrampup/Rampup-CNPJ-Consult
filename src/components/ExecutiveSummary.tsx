import React, { useState } from 'react';
import { CnpjData } from '../types/cnpj';
import {
  BuildingIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FileTextIcon,
  UsersIcon,
  DollarIcon,
  ExternalLinkIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  PrinterIcon,
} from './Icons';
import {
  formatCnpj,
  formatCep,
  formatCurrency,
  formatDate,
  formatPhone,
  formatCnae,
  cleanDigits,
} from '../utils/formatters';
import { generateCompanyPdf } from '../utils/exportPdf';

interface ExecutiveSummaryProps {
  data: CnpjData;
  theme?: 'light' | 'dark';
}

export function ExecutiveSummary({ data, theme = 'dark' }: ExecutiveSummaryProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const isDark = theme === 'dark';
  const est = data.estabelecimento || {};

  const razaoSocial = data.razao_social || 'Não informada';
  const nomeFantasia = est.nome_fantasia || data.nome_fantasia || 'Sem nome fantasia registrado';
  const cnpjNumber = est.cnpj || data.cnpj || '';
  const formattedCnpj = formatCnpj(cnpjNumber);

  const situacao = est.situacao_cadastral || data.situacao_cadastral || 'Desconhecida';
  const dataSituacao = est.data_situacao_cadastral || data.data_situacao_cadastral;
  const motivoSituacao = est.motivo_situacao_cadastral?.descricao || est.motivo_situacao_cadastral;
  const dataInicio = est.data_inicio_atividade;
  const tipoEstabelecimento = est.tipo || 'Matriz';
  const porte = data.porte?.descricao || 'Não informado';
  const naturezaJuridica = data.natureza_juridica?.descricao || 'Não informada';

  // Address
  const tipoLogradouro = est.tipo_logradouro ? `${est.tipo_logradouro} ` : '';
  const logradouro = est.logradouro ? `${tipoLogradouro}${est.logradouro}` : (data.logradouro || '-');
  const numero = est.numero || data.numero || 'S/N';
  const complemento = est.complemento ? ` (${est.complemento})` : '';
  const bairro = est.bairro || data.bairro || '-';
  const cep = formatCep(est.cep || data.cep);

  const getCidadeName = (cid: any): string => {
    if (!cid) return '-';
    if (typeof cid === 'object') return cid.nome || '-';
    return String(cid);
  };
  const cidadeNome = getCidadeName(est.cidade || data.cidade);

  const getEstadoSigla = (estVal: any): string => {
    if (!estVal) return '-';
    if (typeof estVal === 'object') return estVal.sigla || estVal.nome || '-';
    return String(estVal);
  };
  const estadoSigla = getEstadoSigla(est.estado || data.estado);
  const fullAddress = `${logradouro}, ${numero}${complemento} - ${bairro}, ${cidadeNome} - ${estadoSigla}, CEP ${cep}`;

  // Contacts
  const phone1 = formatPhone(est.ddd1, est.telefone1);
  const phone2 = formatPhone(est.ddd2, est.telefone2);
  const email = est.email || data.email;

  // Activities (CNAE)
  const cnaePrincipal = est.atividade_principal || data.atividade_principal;
  const cnaesSecundarios = est.atividades_secundarias || [];

  // State Inscriptions
  const inscricoesEstaduais = est.inscricoes_estaduais || data.inscricoes_estaduais || [];

  // Simples Nacional
  const simples = data.simples;
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

  // Capital & Socios
  const capitalSocial = formatCurrency(data.capital_social);
  const socios = data.socios || [];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      generateCompanyPdf(data);
    } finally {
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('ativa')) {
      return {
        bg: isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-300',
        dot: 'bg-emerald-500',
      };
    }
    if (s.includes('baixada') || s.includes('nula')) {
      return {
        bg: isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-300',
        dot: 'bg-rose-500',
      };
    }
    return {
      bg: isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-300',
      dot: 'bg-amber-500',
    };
  };

  const statusStyle = getStatusColor(situacao);

  return (
    <div className="space-y-6">
      {/* Primary Hero Card */}
      <div
        className={`rounded-2xl border p-6 backdrop-blur-sm transition-colors ${
          isDark
            ? 'border-slate-800 bg-slate-900/60 shadow-lg shadow-black/20'
            : 'border-slate-200 bg-white shadow-md shadow-slate-200/50'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-mono text-sm font-semibold tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-800 font-bold'}`}>
                {formattedCnpj}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(formattedCnpj, 'cnpj')}
                className={`transition-colors p-0.5 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}
                title="Copiar CNPJ"
              >
                {copiedField === 'cnpj' ? (
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <CopyIcon className="w-3.5 h-3.5" />
                )}
              </button>

              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>·</span>
              <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                {tipoEstabelecimento}
              </span>

              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>·</span>
              <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-900 font-semibold'}`}>
                Porte: <strong className={isDark ? 'text-slate-200 font-semibold' : 'text-slate-950 font-extrabold'}>{porte}</strong>
              </span>

              {data._apiSource && (
                <>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>·</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md border bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border-emerald-500/30">
                    Fonte: {data._apiSource}
                  </span>
                </>
              )}
            </div>

            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight break-words ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {razaoSocial}
            </h1>

            {nomeFantasia && (
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>
                Nome Fantasia:{' '}
                <span className={isDark ? 'text-slate-200 font-semibold' : 'text-slate-950 font-extrabold'}>
                  {nomeFantasia}
                </span>
              </p>
            )}

            <div className={`pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-900 font-medium'}`}>
              <span>Natureza: <strong className={isDark ? 'text-slate-300 font-medium' : 'text-slate-950 font-bold'}>{naturezaJuridica}</strong></span>
              {dataInicio && (
                <>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>·</span>
                  <span>Abertura: <strong className={isDark ? 'text-slate-300 font-medium' : 'text-slate-950 font-bold'}>{formatDate(dataInicio)}</strong></span>
                </>
              )}
            </div>
          </div>

          {/* Status Badge & PDF Export Actions */}
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold ${statusStyle.bg}`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${statusStyle.dot}`} />
              <span>Situação: {situacao}</span>
            </div>

            {dataSituacao && (
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-900 font-semibold'}`}>
                Desde {formatDate(dataSituacao)}
              </span>
            )}

            {/* Export and Print Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleExportPdf}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all whitespace-nowrap disabled:opacity-50"
                title="Exportar dados completos em PDF"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Gerando PDF...' : 'Exportar Card em PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
                title="Imprimir visualização desta ficha"
              >
                <PrinterIcon className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Endereço e Localização */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/40 text-slate-200'
              : 'border-slate-200 bg-white text-slate-800 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <MapPinIcon className="w-4 h-4 text-emerald-500" />
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Endereço e Localização</span>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:text-emerald-900 dark:hover:text-emerald-300 transition-colors"
            >
              <span>Ver no Maps</span>
              <ExternalLinkIcon className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Logradouro e Número</span>
              <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-950 font-bold'}`}>
                {logradouro}, {numero} {complemento}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Bairro</span>
                <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-950 font-semibold'}`}>{bairro}</span>
              </div>
              <div>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>CEP</span>
                <span className={`font-mono font-medium ${isDark ? 'text-slate-200' : 'text-slate-950 font-bold'}`}>{cep}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Cidade / Município</span>
                <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-950 font-semibold'}`}>{cidadeNome}</span>
              </div>
              <div>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Estado / UF</span>
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-950 font-extrabold'}`}>{estadoSigla}</span>
              </div>
            </div>

            <div className={`pt-2 flex items-center justify-between text-xs border-t ${isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-800 font-medium'}`}>
              <span className="truncate max-w-[280px]">{fullAddress}</span>
              <button
                type="button"
                onClick={() => handleCopy(fullAddress, 'address')}
                className={`p-1 transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}
                title="Copiar endereço completo"
              >
                {copiedField === 'address' ? (
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <CopyIcon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Contatos & Comunicação */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/40 text-slate-200'
              : 'border-slate-200 bg-white text-slate-900 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              <PhoneIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className={isDark ? 'text-white' : 'text-slate-950'}>Contatos & Comunicação</span>
            </div>
          </div>

          <div className="space-y-3.5 text-sm">
            <div>
              <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>E-mail Cadastrado</span>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="text-cyan-700 dark:text-cyan-400 hover:underline font-mono text-sm inline-flex items-center gap-1.5 break-all font-bold"
                >
                  <MailIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{email.toLowerCase()}</span>
                </a>
              ) : (
                <span className={isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}>Não informado na Receita</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Telefone Principal</span>
                {phone1 !== '-' ? (
                  <a
                    href={`tel:${cleanDigits(phone1)}`}
                    className={`font-mono text-sm block hover:text-emerald-600 font-bold ${isDark ? 'text-slate-100' : 'text-slate-950'}`}
                  >
                    {phone1}
                  </a>
                ) : (
                  <span className={isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}>-</span>
                )}
              </div>

              <div>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Telefone Secundário</span>
                {phone2 !== '-' ? (
                  <a
                    href={`tel:${cleanDigits(phone2)}`}
                    className={`font-mono text-sm block hover:text-emerald-600 font-bold ${isDark ? 'text-slate-100' : 'text-slate-950'}`}
                  >
                    {phone2}
                  </a>
                ) : (
                  <span className={isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}>-</span>
                )}
              </div>
            </div>

            {est.fax && (
              <div>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Fax</span>
                <span className="font-mono text-sm font-bold text-slate-950 dark:text-white">
                  {formatPhone(est.ddd_fax || est.ddd1, est.fax)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Atividade Econômica (CNAE) */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/40 text-slate-200'
              : 'border-slate-200 bg-white text-slate-800 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <FileTextIcon className="w-4 h-4 text-amber-500" />
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Atividades Econômicas (CNAE)</span>
            </div>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
              {cnaesSecundarios.length} secundária(s)
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-600 dark:text-amber-500 font-bold tracking-wide uppercase">
                  Atividade Principal
                </span>
                {cnaePrincipal?.id && (
                  <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${isDark ? 'text-slate-300 bg-slate-800' : 'text-slate-800 bg-slate-100 font-bold'}`}>
                    {formatCnae(cnaePrincipal.id)}
                  </span>
                )}
              </div>
              <p className={`mt-1 text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {cnaePrincipal?.descricao || 'Não informada'}
              </p>
              {cnaePrincipal?.secao && (
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                  Seção {cnaePrincipal.secao} · Divisão {cnaePrincipal.divisao || '-'}
                </p>
              )}
            </div>

            {cnaesSecundarios.length > 0 && (
              <div className={`border-t pt-3 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                <span className={`text-xs block mb-2 font-medium ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                  Atividades Secundárias ({cnaesSecundarios.length})
                </span>
                <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                  {cnaesSecundarios.slice(0, 5).map((act, index) => (
                    <div
                      key={index}
                      className={`text-xs p-2 rounded border ${
                        isDark ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className={`flex items-center justify-between font-mono text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-700 font-bold'}`}>
                        <span>{formatCnae(act.id)}</span>
                      </div>
                      <p className={`mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900 font-medium'}`}>{act.descricao}</p>
                    </div>
                  ))}
                  {cnaesSecundarios.length > 5 && (
                    <p className={`text-xs text-center py-1 ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                      + {cnaesSecundarios.length - 5} outras atividades secundárias (veja na aba Dados Completos)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Inscrições Estaduais */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/40 text-slate-200'
              : 'border-slate-200 bg-white text-slate-800 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <BuildingIcon className="w-4 h-4 text-emerald-500" />
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Inscrições Estaduais</span>
            </div>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
              {inscricoesEstaduais.length} registrada(s)
            </span>
          </div>

          {inscricoesEstaduais.length > 0 ? (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {inscricoesEstaduais.map((ie, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {ie.inscricao_estadual}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(ie.inscricao_estadual, `ie-${idx}`)}
                        className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                        title="Copiar Inscrição Estadual"
                      >
                        {copiedField === `ie-${idx}` ? (
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <CopyIcon className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                      UF: <strong className={isDark ? 'text-slate-300' : 'text-slate-900 font-semibold'}>{ie.estado?.sigla || ie.estado?.nome || '-'}</strong>
                      {ie.atualizado_em && ` · Atualizado em ${formatDate(ie.atualizado_em)}`}
                    </span>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                      ie.ativo
                        ? isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-100 text-rose-800 border-rose-200'
                    }`}
                  >
                    {ie.ativo ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`py-6 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
              Nenhuma inscrição estadual retornada ou empresa isenta de IE.
            </div>
          )}
        </div>

        {/* Card 5: Capital Social & Regime Tributário */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/40 text-slate-200'
              : 'border-slate-200 bg-white text-slate-800 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm">
              <DollarIcon className="w-4 h-4 text-emerald-500" />
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Capital Social & Tributação</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Capital Social Integralizado</span>
              <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                {capitalSocial}
              </span>
            </div>

            <div className={`grid grid-cols-2 gap-3 pt-2 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>Simples Nacional</span>
                <span className={`text-sm font-semibold mt-1 inline-block ${isSimplesOptante ? 'text-emerald-700 dark:text-emerald-400 font-extrabold' : isDark ? 'text-slate-300' : 'text-slate-950 font-bold'}`}>
                  {isSimplesOptante ? 'Optante' : 'Não Optante'}
                </span>
                {simples?.data_opcao_simples && (
                  <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-800 font-semibold'}`}>
                    Desde {formatDate(simples.data_opcao_simples)}
                  </span>
                )}
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-xs block ${isDark ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>SIMEI (MEI)</span>
                <span className={`text-sm font-semibold mt-1 inline-block ${isMeiOptante ? 'text-emerald-700 dark:text-emerald-400 font-extrabold' : isDark ? 'text-slate-300' : 'text-slate-950 font-bold'}`}>
                  {isMeiOptante ? 'Optante' : 'Não Optante'}
                </span>
                {simples?.data_opcao_mei && (
                  <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-800 font-semibold'}`}>
                    Desde {formatDate(simples.data_opcao_mei)}
                  </span>
                )}
              </div>
            </div>

            {/* Regime Tributário Lucro Real / Presumido (BrasilAPI) */}
            {Array.isArray(data.regime_tributario) && data.regime_tributario.length > 0 && (
              <div className={`p-3 rounded-lg border space-y-1.5 ${isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-xs font-bold block ${isDark ? 'text-slate-400' : 'text-slate-950'}`}>
                  Histórico de Tributação ECF (BrasilAPI)
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {data.regime_tributario.slice(0, 4).map((reg: any, idx: number) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-950 font-semibold'
                      }`}
                    >
                      <strong className="text-emerald-800 dark:text-emerald-400">{reg.ano}:</strong> {reg.forma_de_tributacao}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 6: Quadro Societário (QSA) */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/40 text-slate-200'
              : 'border-slate-200 bg-white text-slate-900 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              <UsersIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className={isDark ? 'text-white' : 'text-slate-950'}>Sócios e Administradores (QSA)</span>
            </div>
            <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-900'}`}>
              {socios.length} membro(s)
            </span>
          </div>

          {socios.length > 0 ? (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {socios.map((socio, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border space-y-1 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-950'}`}>
                      {socio.nome}
                    </span>
                    <span className={`text-xs font-mono shrink-0 font-bold ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
                      {socio.tipo || 'Pessoa'}
                    </span>
                  </div>

                  <div className={`flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-800 font-semibold'}`}>
                    {socio.qualificacao_socio?.descricao && (
                      <span className="text-purple-700 dark:text-purple-400 font-bold">
                        {socio.qualificacao_socio.descricao}
                      </span>
                    )}
                    {socio.data_entrada && (
                      <>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>·</span>
                        <span>Entrada: <strong className="text-slate-950 dark:text-slate-200 font-bold">{formatDate(socio.data_entrada)}</strong></span>
                      </>
                    )}
                    {socio.faixa_etaria && socio.faixa_etaria !== 'Não se aplica' && (
                      <>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>·</span>
                        <span>{socio.faixa_etaria}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`py-6 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>
              Nenhum sócio ou administrador registrado para este tipo societário (ou empresa individual).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
