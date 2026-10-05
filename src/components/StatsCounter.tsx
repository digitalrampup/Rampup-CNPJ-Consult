import React from 'react';
import { CnpjData } from '../types/cnpj';
import { countFilledFields } from '../utils/formatters';
import { FileTextIcon, UsersIcon, LayersIcon } from './Icons';

interface StatsCounterProps {
  data: CnpjData;
  theme?: 'light' | 'dark';
}

export function StatsCounter({ data, theme = 'dark' }: StatsCounterProps) {
  const stats = countFilledFields(data);
  const isDark = theme === 'dark';

  const sociosCount = data.socios?.length || 0;
  const ieCount = data.estabelecimento?.inscricoes_estaduais?.length || data.inscricoes_estaduais?.length || 0;
  const cnaeSecundariosCount = data.estabelecimento?.atividades_secundarias?.length || 0;

  return (
    <div
      className={`rounded-xl border p-4 backdrop-blur-sm transition-colors ${
        isDark ? 'border-slate-800 bg-slate-900/40 text-slate-200' : 'border-slate-200 bg-white text-slate-800 shadow-xs'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Fill Rate Metric */}
        <div className="flex items-center gap-4">
          <div
            className={`relative flex items-center justify-center w-14 h-14 rounded-full border shrink-0 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="font-mono text-sm font-bold text-emerald-500">
              {stats.percentage}%
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Preenchimento Cadastral
              </span>
              <span className="text-slate-400">·</span>
              <span className={`text-xs font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {stats.filledFields} de {stats.totalFields} atributos
              </span>
            </div>

            {/* Progress bar */}
            <div className={`w-48 sm:w-64 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>

            <div className={`flex items-center gap-3 text-[11px] pt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>{stats.filledFields} preenchidos</span>
              <span>·</span>
              <span>{stats.emptyFields} nulos/vazios</span>
            </div>
          </div>
        </div>

        {/* Dynamic Items Counters */}
        <div className={`flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
            <UsersIcon className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs">
              <strong className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{sociosCount}</strong> sócio(s)
            </span>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
            <LayersIcon className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs">
              <strong className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{ieCount}</strong> Inscrição Estadual
            </span>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
            <FileTextIcon className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs">
              <strong className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cnaeSecundariosCount}</strong> CNAEs secundários
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
