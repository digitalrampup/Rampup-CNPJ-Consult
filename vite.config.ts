import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api/cnpj-proxy': {
          target: 'https://publica.cnpj.ws/cnpj',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/cnpj-proxy/, ''),
          secure: false,
        },
        '/api/brasilapi-proxy': {
          target: 'https://brasilapi.com.br/api/cnpj/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/brasilapi-proxy/, ''),
          secure: false,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            Accept: 'application/json',
          },
        },
      },
    },
  };
});
