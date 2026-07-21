import { resolve } from 'node:path';

const dayjsEsm = resolve(import.meta.dirname, 'node_modules/dayjs/esm');

export default defineNuxtConfig({
  compatibilityDate: '2026-07-21',
  devtools: { enabled: false },
  css: ['mokelay-components/style.css', '~/assets/main.css'],
  routeRules: {
    '/csr/**': { ssr: false }
  },
  build: {
    transpile: ['mokelay-components', 'element-ui']
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.MOKELAY_API_BASE_URL ?? ''
    }
  },
  nitro: {
    externals: {
      inline: ['vue', '@vue/server-renderer']
    }
  },
  vite: {
    server: {
      fs: {
        allow: [import.meta.dirname, resolve(import.meta.dirname, '../mokelay-components')]
      }
    },
    resolve: {
      alias: [
        { find: /^dayjs$/, replacement: resolve(dayjsEsm, 'index.js') },
        { find: /^dayjs\/plugin\/([^/]+)\.js$/, replacement: `${dayjsEsm}/plugin/$1/index.js` },
        { find: /^dayjs\/locale\/([^/]+)\.js$/, replacement: `${dayjsEsm}/locale/$1.js` }
      ]
    },
    optimizeDeps: {
      exclude: ['mokelay-components'],
      include: ['ajv']
    },
    ssr: {
      noExternal: ['mokelay-components', 'element-ui']
    }
  },
  typescript: {
    strict: true
  }
});
