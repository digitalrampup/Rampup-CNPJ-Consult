/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CnpjSearchForm } from './components/CnpjSearchForm';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { DynamicInspector } from './components/DynamicInspector';
import { RawJsonViewer } from './components/RawJsonViewer';
import { StatsCounter } from './components/StatsCounter';
import { ErrorAlert } from './components/ErrorAlert';
import { EmptyState } from './components/EmptyState';
import { SearchHistory, HistoryItem } from './components/SearchHistory';
import { CnpjData } from './types/cnpj';
import { fetchCnpj, ApiError, ApiProvider } from './utils/api';
import { cleanDigits } from './utils/formatters';
import { searchCompanies, queryCompanySearchApi } from './utils/companyDatabase';

export default function App() {
  // Always open in the light version of the application
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [apiProvider, setApiProvider] = useState<ApiProvider>('brasilapi');

  const [activeTab, setActiveTab] = useState<'summary' | 'dynamic' | 'json'>('summary');
  const [currentCnpj, setCurrentCnpj] = useState<string>('');
  const [data, setData] = useState<CnpjData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('cnpj_search_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // In-memory cache for the session
  const cacheRef = useRef<Map<string, CnpjData>>(new Map());

  // Rate limit countdown timer
  const [rateLimitTimer, setRateLimitTimer] = useState<number | null>(null);

  // Sync theme with document element
  useEffect(() => {
    try {
      localStorage.setItem('cnpj_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (rateLimitTimer === null || rateLimitTimer <= 0) return;

    const interval = setInterval(() => {
      setRateLimitTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitTimer]);

  const handleSearch = async (targetQuery: string, providerOverride?: ApiProvider) => {
    const rawClean = cleanDigits(targetQuery);
    let cnpjToFetch = rawClean;
    const activeProvider = providerOverride || apiProvider;

    // If query is not a 14-digit CNPJ, attempt resolution
    if (rawClean.length !== 14) {
      const localMatches = searchCompanies(targetQuery);
      if (localMatches.length > 0) {
        cnpjToFetch = localMatches[0].cnpj;
      } else {
        setIsLoading(true);
        try {
          const online = await queryCompanySearchApi(targetQuery);
          if (online.length > 0) {
            cnpjToFetch = online[0].cnpj;
          } else {
            setIsLoading(false);
            setError({
              message: 'Empresa ou sócio não localizado',
              details: `Não encontramos um CNPJ correspondente à busca por "${targetQuery}". Tente digitar os 14 dígitos do CNPJ diretamente.`,
            });
            return;
          }
        } catch {
          setIsLoading(false);
          setError({
            message: 'Erro na busca por nome',
            details: `Não foi possível concluir a busca por "${targetQuery}".`,
          });
          return;
        }
      }
    }

    if (cnpjToFetch.length !== 14) return;

    setError(null);
    setCurrentCnpj(cnpjToFetch);

    // Check cache first (cached per provider)
    const cacheKey = `${cnpjToFetch}_${activeProvider}`;
    if (cacheRef.current.has(cacheKey)) {
      setData(cacheRef.current.get(cacheKey)!);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const result = await fetchCnpj(cnpjToFetch, activeProvider);
      setData(result);
      cacheRef.current.set(cacheKey, result);

      // Add to history
      const razao = result.razao_social || result.estabelecimento?.nome_fantasia || 'Empresa';
      const situacao = result.estabelecimento?.situacao_cadastral || result.situacao_cadastral;

      setHistory((prev) => {
        const filtered = prev.filter((item) => item.cnpj !== cnpjToFetch);
        const updated = [{ cnpj: cnpjToFetch, razaoSocial: razao, situacao, timestamp: Date.now() }, ...filtered].slice(0, 8);
        try {
          localStorage.setItem('cnpj_search_history', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    } catch (err: any) {
      setData(null);
      setError(err);
      if (err.isRateLimit && err.rateLimitResetSeconds) {
        setRateLimitTimer(err.rateLimitResetSeconds);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('cnpj_search_history');
    } catch {
      // ignore
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors selection:bg-emerald-500/30 ${
        isDark ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Bar Contract with Theme Switcher */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasData={Boolean(data)}
        onCopyJson={handleCopyJson}
        isCopied={isCopied}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search Header Hero */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Consulta de Dados Cadastrais
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Busque por CNPJ, Razão Social ou Nome do Empresário/Sócio na base oficial da Receita Federal.
            </p>
          </div>

          <CnpjSearchForm
            onSearch={handleSearch}
            isLoading={isLoading}
            initialValue={currentCnpj}
            rateLimitTimer={rateLimitTimer}
            theme={theme}
            apiProvider={apiProvider}
            onProviderChange={setApiProvider}
          />

          <SearchHistory
            items={history}
            onSelect={(cnpj) => handleSearch(cnpj, apiProvider)}
            onClear={handleClearHistory}
            currentCnpj={currentCnpj}
            theme={theme}
          />
        </section>

        {/* Error Alert */}
        {error && (
          <ErrorAlert
            error={error}
            onRetry={() => handleSearch(currentCnpj, apiProvider)}
            onDismiss={() => setError(null)}
            rateLimitTimer={rateLimitTimer}
            theme={theme}
            onSwitchProvider={(newProvider) => {
              setApiProvider(newProvider);
              handleSearch(currentCnpj, newProvider);
            }}
          />
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className={`h-32 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-200/60 border-slate-300'}`} />
            <div className={`h-16 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-200/40 border-slate-300'}`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`h-56 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-200/40 border-slate-300'}`} />
              <div className={`h-56 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-200/40 border-slate-300'}`} />
              <div className={`h-56 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-200/40 border-slate-300'}`} />
              <div className={`h-56 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-200/40 border-slate-300'}`} />
            </div>
          </div>
        )}

        {/* Populated State with Tabs */}
        {!isLoading && data && (
          <div className="space-y-6">
            {/* Stats Counter Bar */}
            <StatsCounter data={data} theme={theme} />

            {/* Active View Container */}
            {activeTab === 'summary' && <ExecutiveSummary data={data} theme={theme} />}

            {activeTab === 'dynamic' && <DynamicInspector data={data} theme={theme} />}

            {activeTab === 'json' && <RawJsonViewer data={data} cnpj={currentCnpj} theme={theme} />}
          </div>
        )}

        {/* Empty State when no data has been queried yet */}
        {!isLoading && !data && !error && (
          <EmptyState onSelectSample={handleSearch} theme={theme} />
        )}
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 mt-16 text-center text-xs transition-colors ${
          isDark ? 'border-slate-800/80 bg-slate-950/60 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img
              src="/logo-rampup.png"
              alt="Rampup"
              className="h-5 w-auto object-contain opacity-80"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://rampupbusiness.com.br/wp-content/uploads/2024/09/logo-rumpup.png';
              }}
            />
            <p>
              Rampup CNPJ Consult · Dados oficiais da Receita Federal do Brasil via{' '}
              <span className="font-mono text-emerald-600 dark:text-emerald-500 font-semibold">BrasilAPI</span> e{' '}
              <span className="font-mono text-emerald-600 dark:text-emerald-500 font-semibold">CNPJ.ws</span>
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Busca por CNPJ, Razão e Sócio</span>
            <span>·</span>
            <span>Exportação em PDF</span>
            <span>·</span>
            <span>Modo Claro/Escuro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
