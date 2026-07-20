# Ahmed Soliman — Portfolio

A modern, mobile-first portfolio and résumé for Ahmed Soliman, Senior Software Developer and AI Platform Engineer.

## Stack

- Next.js App Router
- React and TypeScript
- CSS animations and responsive layouts
- Next.js metadata, sitemap, robots, and structured data

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create an optimized production build:

```bash
npm run build
```

## Routes

- `/` — interactive portfolio
- `/resume` — printable résumé
- `/sitemap.xml` — generated search-engine sitemap
- `/robots.txt` — generated crawler rules

## Content and assets

Résumé content is maintained in `content/profile.ts`. Public images and certification badges are stored in `public/`.

Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, Open Graph metadata, sitemap entries, and robots configuration use the deployed address.
