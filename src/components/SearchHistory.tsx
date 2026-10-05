import React from 'react';
import { formatCnpj } from '../utils/formatters';
import { BuildingIcon } from './Icons';

export interface HistoryItem {
  cnpj: string;
  razaoSocial: string;
  situacao?: string;
  timestamp: number;
}

interface SearchHistoryProps {
  items: HistoryItem[];
  onSelect: (cnpj: string) => void;
  onClear: () => void;
  currentCnpj?: string;
  theme?: 'light' | 'dark';
}

export function SearchHistory({ items, onSelect, onClear, currentCnpj, theme = 'dark' }: SearchHistoryProps) {
  if (items.length === 0) return null;
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
      <span className={`font-medium shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Recentes:</span>
      <div className="flex items-center gap-1.5 shrink-0">
        {items.map((item) => {
          const isCurrent = currentCnpj === item.cnpj;
          return (
            <button
              key={item.cnpj}
              type="button"
              onClick={() => onSelect(item.cnpj)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors whitespace-nowrap ${
                isCurrent
                  ? isDark
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-semibold'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                  : isDark
                  ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BuildingIcon className="w-3 h-3 text-slate-400" />
              <span className="max-w-[140px] truncate">{item.razaoSocial || formatCnpj(item.cnpj)}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={onClear}
          className={`px-1.5 py-1 text-[11px] transition-colors ${
            isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
          }`}
          title="Limpar histórico"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
