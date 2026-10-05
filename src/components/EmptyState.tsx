import React from 'react';
import { BuildingIcon, LayersIcon, CodeIcon, DollarIcon } from './Icons';

interface EmptyStateProps {
  onSelectSample: (cnpj: string) => void;
  theme?: 'light' | 'dark';
}

const FEATURE_HIGHLIGHTS = [
  {
    icon: <BuildingIcon className="w-5 h-5 text-emerald-500" />,
    title: 'Resumo Cadastral Completo',
    description: 'Razão social, nome fantasia, endereço, telefones, e-mail e situação cadastral em tempo real.',
  },
  {
    icon: <LayersIcon className="w-5 h-5 text-cyan-500" />,
    title: 'Explorador Dinâmico Recursivo',
    description: 'Renderiza automaticamente 100% dos dados retornados no JSON, inclusive objetos e listas aninhadas.',
  },
  {
    icon: <DollarIcon className="w-5 h-5 text-purple-500" />,
    title: 'Formatação Automática Inteligente',
    description: 'CNPJ, CEP, datas, booleanos, telefones e capital social convertidos em padrão brasileiro.',
  },
  {
    icon: <CodeIcon className="w-5 h-5 text-amber-500" />,
    title: 'Inspeção e Exportação em PDF',
    description: 'Exporte o card da empresa em PDF formatado, copie o JSON ou baixe o arquivo com 1 clique.',
  },
];

export function EmptyState({ onSelectSample, theme = 'dark' }: EmptyStateProps) {
  const isDark = theme === 'dark';

  return (
    <div className="py-10 space-y-12">
      {/* Intro Hero Box */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Consulte qualquer empresa brasileira por CNPJ, Razão Social ou Sócio
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Busque pelo número do CNPJ, nome da empresa ou nome completo do empresário para visualizar a ficha cadastral completa com exportação em PDF e inspeção profunda de dados.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURE_HIGHLIGHTS.map((feat, idx) => (
          <div
            key={idx}
            className={`rounded-xl border p-4 space-y-2 transition-colors ${
              isDark
                ? 'border-slate-800/80 bg-slate-900/30 hover:border-slate-700'
                : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
            }`}
          >
            <div
              className={`p-2 w-fit rounded-lg border ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {feat.icon}
            </div>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              {feat.title}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
