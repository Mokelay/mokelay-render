# Mokelay Render

Minimal Nuxt renderer for Mokelay page DSL. Every JSON document can be rendered through both SSR and CSR.

## Page DSL

Put page documents in `page-dsl/<slug>.json`. Slugs support lowercase letters, digits, `_` and `-`, up to 128 characters. A document must contain `uuid`, `name` and `blocks`; it may also contain `dataSources`, `localeConfig`, page references and dependencies.

Examples:

- `page-dsl/home.json` → `/ssr/home` and `/csr/home`
- `page-dsl/interactive.json` → `/ssr/interactive` and `/csr/interactive`
- JSON API → `/api/pages/<slug>`

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

The local server listens on `http://127.0.0.1:3100`. Set `MOKELAY_API_BASE_URL` when API datasources and actions use relative URLs.

## Validation and deployment

```bash
npm run typecheck
npm test
npm run test:e2e
npm run build
npm run preview
```

Deploy the `.output` produced by `nuxt build` to any supported Nitro host.
