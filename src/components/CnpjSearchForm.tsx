import React, { useState, useEffect, useRef } from 'react';
import {
  SearchIcon,
  XIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  RefreshIcon,
  BuildingIcon,
  UserIcon,
} from './Icons';
import { maskCnpj, cleanDigits, validateCnpj, formatCnpj } from '../utils/formatters';
import {
  searchCompanies,
  queryCompanySearchApi,
  CompanySearchRecord,
} from '../utils/companyDatabase';

interface CnpjSearchFormProps {
  onSearch: (cnpj: string) => void;
  isLoading: boolean;
  initialValue?: string;
  rateLimitTimer?: number | null;
  theme?: 'light' | 'dark';
}

const SAMPLE_CNPJS = [
  { name: 'Magazine Luiza (Luiza Trajano)', cnpj: '47.960.950/0001-21' },
  { name: 'Lojas Renner', cnpj: '92.754.738/0001-62' },
  { name: 'SBT (Silvio Santos)', cnpj: '43.350.131/0001-01' },
  { name: 'Nubank (David Vélez)', cnpj: '30.680.829/0001-43' },
  { name: 'Cimed (João Adibe)', cnpj: '16.619.378/0001-08' },
  { name: 'Petrobras', cnpj: '33.000.167/0001-01' },
  { name: 'Ambev (Lemann)', cnpj: '56.994.502/0001-30' },
];

export function CnpjSearchForm({
  onSearch,
  isLoading,
  initialValue = '',
  rateLimitTimer,
  theme = 'light',
}: CnpjSearchFormProps) {
  const [searchMode, setSearchMode] = useState<'cnpj' | 'razao' | 'empresario'>('cnpj');
  const [value, setValue] = useState(initialValue ? maskCnpj(initialValue) : '');
  const [searchResults, setSearchResults] = useState<CompanySearchRecord[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResolvingName, setIsResolvingName] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    if (initialValue) {
      setValue(maskCnpj(initialValue));
    }
  }, [initialValue]);

  // Click outside listener for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rawDigits = cleanDigits(value);
  const isInputNumeric = /^\d+$/.test(value.replace(/[\.\-\/]/g, '')) && value.length > 0;

  const validation = isInputNumeric && rawDigits.length === 14 ? validateCnpj(value) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setSearchFeedback(null);

    // If typing numbers in CNPJ mode
    const looksNumeric = /^[\d\.\-\/]*$/.test(rawVal) && rawVal.length > 0;

    if (searchMode === 'cnpj' && looksNumeric) {
      const masked = maskCnpj(rawVal);
      setValue(masked);
      setIsDropdownOpen(false);
      setSearchResults([]);
    } else {
      setValue(rawVal);
      if (rawVal.trim().length >= 2) {
        const results = searchCompanies(rawVal, searchMode);
        setSearchResults(results);
        setIsDropdownOpen(results.length > 0);
      } else {
        setSearchResults([]);
        setIsDropdownOpen(false);
      }
    }
  };

  const handleModeSwitch = (mode: 'cnpj' | 'razao' | 'empresario') => {
    setSearchMode(mode);
    setValue('');
    setSearchResults([]);
    setIsDropdownOpen(false);
    setSearchFeedback(null);
    inputRef.current?.focus();
  };

  const handleSelectCompany = (comp: CompanySearchRecord) => {
    setValue(formatCnpj(comp.cnpj));
    setIsDropdownOpen(false);
    setSearchFeedback(null);
    onSearch(comp.cnpj);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isResolvingName) return;
    setSearchFeedback(null);

    // 1. Direct CNPJ Submission (14 digits)
    if (rawDigits.length === 14) {
      setIsDropdownOpen(false);
      onSearch(rawDigits);
      return;
    }

    // 2. Name or Entrepreneur Search
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setSearchFeedback('Digite pelo menos 2 caracteres para pesquisar.');
      return;
    }

    // First check in-memory local matches
    const localMatches = searchCompanies(trimmed, searchMode);
    if (localMatches.length === 1) {
      handleSelectCompany(localMatches[0]);
      return;
    }

    if (localMatches.length > 1) {
      setSearchResults(localMatches);
      setIsDropdownOpen(true);
      setSearchFeedback(`${localMatches.length} empresas encontradas. Clique na opção desejada para consultar:`);
      return;
    }

    // If no local matches, query online backend resolver
    setIsResolvingName(true);
    setIsDropdownOpen(false);

    try {
      const onlineMatches = await queryCompanySearchApi(trimmed, searchMode);
      if (onlineMatches.length === 1) {
        handleSelectCompany(onlineMatches[0]);
      } else if (onlineMatches.length > 1) {
        setSearchResults(onlineMatches);
        setIsDropdownOpen(true);
        setSearchFeedback(`${onlineMatches.length} resultados encontrados. Selecione a empresa abaixo:`);
      } else {
        setSearchFeedback(
          `Nenhuma empresa ou sócio localizado para "${trimmed}". Tente informar o CNPJ diretamente com 14 dígitos ou verifique a grafia.`
        );
      }
    } catch {
      setSearchFeedback('Não foi possível concluir a busca por nome. Tente buscar informando o número do CNPJ.');
    } finally {
      setIsResolvingName(false);
    }
  };

  const handleClear = () => {
    setValue('');
    setSearchResults([]);
    setIsDropdownOpen(false);
    setSearchFeedback(null);
    inputRef.current?.focus();
  };

  const getPlaceholder = () => {
    if (searchMode === 'cnpj') return 'Digite o CNPJ (ex: 00.000.000/0001-91)';
    if (searchMode === 'razao') return 'Digite a Razão Social ou Nome Fantasia (ex: Magazine Luiza, Renner, SBT)';
    return 'Digite o Nome do Empresário ou Sócio (ex: Silvio Santos, Luiza Trajano, Lemann)';
  };

  return (
    <div className="w-full space-y-3">
      {/* Mode Selector Tabs */}
      <div
        className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl w-fit border ${
          isDark
            ? 'bg-slate-900/60 border-slate-800'
            : 'bg-slate-100 border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => handleModeSwitch('cnpj')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            searchMode === 'cnpj'
              ? 'bg-emerald-600 text-white shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BuildingIcon className="w-3.5 h-3.5" />
          <span>Por CNPJ</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeSwitch('razao')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            searchMode === 'razao'
              ? 'bg-emerald-600 text-white shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BuildingIcon className="w-3.5 h-3.5" />
          <span>Por Razão Social / Fantasia</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeSwitch('empresario')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            searchMode === 'empresario'
              ? 'bg-emerald-600 text-white shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserIcon className="w-3.5 h-3.5" />
          <span>Por Empresário / Sócio</span>
        </button>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {searchMode === 'empresario' ? (
                <UserIcon className="w-5 h-5 text-emerald-600" />
              ) : (
                <SearchIcon className="w-5 h-5 text-emerald-600" />
              )}
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder={getPlaceholder()}
              value={value}
              onChange={handleChange}
              onFocus={() => {
                if (searchResults.length > 0 && value.trim().length >= 2) {
                  setIsDropdownOpen(true);
                }
              }}
              disabled={isLoading || isResolvingName}
              className={`w-full pl-11 pr-10 py-3.5 rounded-xl border text-sm sm:text-base transition-all disabled:opacity-60 shadow-xs outline-none ${
                isInputNumeric ? 'font-mono tracking-wider' : 'font-sans'
              } ${
                isDark
                  ? 'bg-slate-900 text-white placeholder-slate-500 border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                  : 'bg-white text-slate-900 placeholder-slate-400 border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
              }`}
            />

            {value && !isLoading && !isResolvingName && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Limpar campo"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isResolvingName || (rateLimitTimer != null && rateLimitTimer > 0)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[150px]"
          >
            {isLoading || isResolvingName ? (
              <>
                <RefreshIcon className="w-5 h-5 animate-spin" />
                <span>{isResolvingName ? 'Buscando...' : 'Consultando...'}</span>
              </>
            ) : rateLimitTimer != null && rateLimitTimer > 0 ? (
              <>
                <span>Aguarde {rateLimitTimer}s</span>
              </>
            ) : (
              <>
                <SearchIcon className="w-4 h-4" />
                <span>Consultar</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Autocomplete / Matching Results Dropdown */}
        {isDropdownOpen && searchResults.length > 0 && (
          <div
            ref={dropdownRef}
            className={`absolute left-0 right-0 z-50 mt-1.5 max-h-88 overflow-y-auto rounded-xl border shadow-xl backdrop-blur-md ${
              isDark
                ? 'bg-slate-900/98 border-slate-700 text-white'
                : 'bg-white/98 border-slate-200 text-slate-900'
            }`}
          >
            <div
              className={`p-2.5 border-b text-[11px] font-semibold uppercase tracking-wider flex items-center justify-between ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-950/60' : 'border-slate-100 text-slate-500 bg-slate-50'
              }`}
            >
              <span>Empresas Encontradas ({searchResults.length})</span>
              <span>Clique para consultar a ficha oficial</span>
            </div>
            <div className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {searchResults.map((comp) => (
                <div
                  key={comp.cnpj}
                  onClick={() => handleSelectCompany(comp)}
                  className={`p-3.5 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDark ? 'hover:bg-slate-800/80' : 'hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {comp.razaoSocial}
                      </span>
                      {comp.nomeFantasia && comp.nomeFantasia !== comp.razaoSocial && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          ({comp.nomeFantasia})
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>
                        CNPJ: <strong className="font-mono text-slate-800 dark:text-slate-200">{formatCnpj(comp.cnpj)}</strong>
                      </span>
                      <span>·</span>
                      <span>
                        {comp.municipio} - {comp.uf}
                      </span>
                      <span>·</span>
                      <span>{comp.segmento}</span>
                    </div>
                    {comp.empresarios.length > 0 && (
                      <div className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <UserIcon className="w-3 h-3 shrink-0" />
                        <span>
                          Sócio / Fundador: <strong>{comp.empresarios.join(', ')}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white whitespace-nowrap self-start sm:self-auto shrink-0 shadow-xs">
                    Ver Dados Fiscais
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Feedback Message */}
        {searchFeedback && (
          <div
            className={`mt-2 p-3 rounded-lg text-xs flex items-center gap-2 border ${
              searchFeedback.includes('encontrad')
                ? isDark
                  ? 'bg-emerald-950/30 text-emerald-300 border-emerald-800'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : isDark
                ? 'bg-amber-950/30 text-amber-300 border-amber-800'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {searchFeedback.includes('encontrad') ? (
              <CheckCircleIcon className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangleIcon className="w-4 h-4 shrink-0" />
            )}
            <span>{searchFeedback}</span>
          </div>
        )}

        {/* Validation and Helper Line */}
        <div className="mt-2.5 flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-1.5">
            {isInputNumeric ? (
              rawDigits.length === 14 ? (
                validation?.isValid ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircleIcon className="w-3.5 h-3.5" />
                    Formato de CNPJ válido
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                    <AlertTriangleIcon className="w-3.5 h-3.5" />
                    {validation?.message || 'Dígitos verificadores inconsistentes'}
                  </span>
                )
              ) : rawDigits.length > 0 ? (
                <span className="text-slate-500 dark:text-slate-400">
                  {rawDigits.length} de 14 dígitos digitados
                </span>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">
                  Digite os 14 dígitos ou pesquise pelo nome da empresa / empresário
                </span>
              )
            ) : value.length > 0 ? (
              <span className="text-slate-500 dark:text-slate-400">
                Pressione Enter ou clique em Consultar para buscar
              </span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                Busca oficial: CNPJ, Razão Social, Nome Fantasia ou Empresário
              </span>
            )}
          </div>

          <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] hidden sm:inline">
            Receita Federal do Brasil
          </span>
        </div>
      </form>

      {/* Quick Example Suggestions */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Exemplos rápidos:</span>
        {SAMPLE_CNPJS.map((sample) => (
          <button
            key={sample.cnpj}
            type="button"
            onClick={() => {
              setValue(sample.cnpj);
              onSearch(cleanDigits(sample.cnpj));
            }}
            disabled={isLoading || isResolvingName}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors disabled:opacity-50 ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <span>{sample.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
