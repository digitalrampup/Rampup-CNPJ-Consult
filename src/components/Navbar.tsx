import React from 'react';
import { BuildingIcon, CodeIcon, LayersIcon, CopyIcon, CheckIcon, SunIcon, MoonIcon } from './Icons';

interface NavbarProps {
  activeTab: 'summary' | 'dynamic' | 'json';
  onTabChange: (tab: 'summary' | 'dynamic' | 'json') => void;
  hasData: boolean;
  onCopyJson?: () => void;
  isCopied?: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navbar({
  activeTab,
  onTabChange,
  hasData,
  onCopyJson,
  isCopied,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        isDark
          ? 'border-slate-800 bg-slate-950/80 backdrop-blur-md'
          : 'border-slate-200 bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-2.5">
          <img
            src="/logo-rampup.png"
            alt="Rampup"
            className="h-7 sm:h-8 w-auto max-w-[120px] object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://rampupbusiness.com.br/wp-content/uploads/2024/09/logo-rumpup.png';
            }}
          />
          <span
            className={`text-base sm:text-lg font-bold tracking-tight whitespace-nowrap ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Rampup CNPJ Consult
          </span>
        </div>

        {/* Zone 2: Navigation views */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange('summary')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'summary'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Resumo</span>
          </button>

          <button
            onClick={() => onTabChange('dynamic')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'dynamic'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayersIcon className="w-4 h-4 text-emerald-500" />
            <span>Dados Completos</span>
          </button>

          <button
            onClick={() => onTabChange('json')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'json'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CodeIcon className="w-4 h-4 text-cyan-500" />
            <span>JSON Bruto</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Theme Switcher */}
        <div className="flex items-center gap-2">
          {hasData && onCopyJson && (
            <button
              onClick={onCopyJson}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                isCopied
                  ? isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : isDark
                  ? 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {isCopied ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copiar JSON</span>
                  <span className="sm:hidden">Copiar</span>
                </>
              )}
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? 'bg-slate-900 text-amber-400 border-slate-700 hover:bg-slate-800'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
