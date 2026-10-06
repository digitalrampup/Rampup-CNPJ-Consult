import React from 'react';
import { AlertTriangleIcon, RefreshIcon, XIcon, CheckCircleIcon } from './Icons';
import { ApiError } from '../utils/api';

interface ErrorAlertProps {
  error: ApiError;
  onRetry?: () => void;
  onDismiss?: () => void;
  rateLimitTimer?: number | null;
  theme?: 'light' | 'dark';
  onSwitchProvider?: (provider: 'brasilapi' | 'cnpjws') => void;
}

export function ErrorAlert({
  error,
  onRetry,
  onDismiss,
  rateLimitTimer,
  theme = 'light',
  onSwitchProvider,
}: ErrorAlertProps) {
  const is429 = error.status === 429 || error.isRateLimit;
  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 backdrop-blur-sm transition-colors ${
        isDark ? 'border-rose-500/30 bg-rose-950/20' : 'border-rose-200 bg-rose-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-lg shrink-0 mt-0.5 ${
            isDark ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-100 text-rose-600'
          }`}
        >
          <AlertTriangleIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className={`text-sm font-bold ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                {error.message}
              </h4>
              {error.provider && (
                <span className="text-[11px] font-mono px-2 py-0.2 rounded bg-rose-200/50 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200">
                  {error.provider}
                </span>
              )}
            </div>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className={`p-1 transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Fechar alerta"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-200/80' : 'text-rose-800'}`}>
            {error.details || 'Ocorreu uma falha ao consultar a API da Receita Federal.'}
          </p>

          {is429 && rateLimitTimer !== null && rateLimitTimer !== undefined && rateLimitTimer > 0 && (
            <div
              className={`pt-1 flex items-center gap-2 text-xs font-mono ${
                isDark ? 'text-amber-300' : 'text-amber-800 font-semibold'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>
                Tempo de espera para nova consulta no CNPJ.ws: <strong>{rateLimitTimer}s</strong>
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                disabled={rateLimitTimer != null && rateLimitTimer > 0}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                  isDark
                    ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30 hover:bg-rose-500/30'
                    : 'bg-rose-600 text-white hover:bg-rose-700 shadow-xs'
                }`}
              >
                <RefreshIcon className="w-3.5 h-3.5" />
                <span>{rateLimitTimer ? `Aguarde (${rateLimitTimer}s)` : 'Tentar novamente'}</span>
              </button>
            )}

            {is429 && onSwitchProvider && (
              <button
                type="button"
                onClick={() => onSwitchProvider('brasilapi')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer transition-colors"
              >
                <CheckCircleIcon className="w-3.5 h-3.5" />
                <span>Consultar via BrasilAPI agora (Sem fila de espera)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
