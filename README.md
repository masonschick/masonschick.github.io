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

- The current resume PDF is served from a stable public URL so future replacements do not break external links.
- Markets Research Platform and Cup Chase link directly to their public deployments.
- Personal Dashboard is intentionally non-clickable until a public-safe version exists.
- Project visuals live in `public/project-images/` and share one light-mode miniature-interface language.
- The site theme follows Chicago sunrise and sunset automatically; there is no manual theme control.
