# Mason Schick Personal Site

A Vite + React single-page resume and portfolio site using Mason's HTML Hub design system.

## Local Development

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5176
```

## Build

```bash
npm run build
```

The production output is written to `dist/`.

## Deployment

The canonical site is [masonschick.vercel.app](https://masonschick.vercel.app).

Vercel is connected to the `masonschick/masonschick.github.io` repository. Pushes to `main` build and publish the production site automatically.

The former GitHub Pages deployment is retired. Its Jekyll/class source is preserved on the remote `legacy-2024` branch.

## Content Notes

- The linked resume PDF is currently the draft copy from June 1, 2026.
- The Hockey project has a GitHub link; add the public demo URL once the safe version is ready.
- Personal Dashboard and Financial Markets Dashboard are intentionally marked as local/placeholder until public-safe versions exist.
- Screenshot assets live in `public/project-images/`.
