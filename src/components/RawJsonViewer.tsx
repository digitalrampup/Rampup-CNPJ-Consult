import React, { useState } from 'react';
import { CopyIcon, CheckIcon, DownloadIcon, CodeIcon } from './Icons';

interface RawJsonViewerProps {
  data: any;
  cnpj?: string;
  theme?: 'light' | 'dark';
}

export function RawJsonViewer({ data, cnpj, theme = 'dark' }: RawJsonViewerProps) {
  const [copied, setCopied] = useState(false);

  const isDark = theme === 'dark';
  const jsonString = JSON.stringify(data, null, 2);
  const byteSize = new Blob([jsonString]).size;
  const kbSize = (byteSize / 1024).toFixed(1);
  const lineCount = jsonString.split('\n').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = cnpj ? `cnpj_${cnpj}.json` : 'cnpj_dados.json';
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden backdrop-blur-sm transition-colors ${
        isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
      }`}
    >
      {/* Top Header */}
      <div
        className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 border-b ${
          isDark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-100 bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-100 text-cyan-700'}`}>
            <CodeIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>JSON Bruto da API</h3>
            <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
              <span>{lineCount} linhas</span>
              <span>·</span>
              <span>{kbSize} KB</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              copied
                ? isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-white text-slate-800 font-semibold border-slate-300 hover:bg-slate-100 shadow-xs'
            }`}
          >
            {copied ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-3.5 h-3.5" />
                <span>Copiar JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isDark
                ? 'text-slate-200 bg-slate-800 hover:bg-slate-700 border-slate-700'
                : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300'
            }`}
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            <span>Baixar .json</span>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div
        className={`relative p-4 sm:p-5 max-h-[650px] overflow-y-auto ${
          isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-900 text-slate-100'
        }`}
      >
        <pre className="font-mono text-xs whitespace-pre leading-relaxed select-text">
          {jsonString}
        </pre>
      </div>
    </div>
  );
}
