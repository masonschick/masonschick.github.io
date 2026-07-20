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

The site is published at [masonschick.github.io](https://masonschick.github.io) from the `masonschick/masonschick.github.io` repository.

Pushes to `main` run `.github/workflows/deploy.yml`, which installs dependencies, builds the Vite app, and publishes `dist/` through GitHub Pages.

The previous Jekyll/class site is preserved on the remote `legacy-2024` branch.

## Content Notes

- The linked resume PDF is currently the draft copy from June 1, 2026.
- The Hockey project has a GitHub link; add the public demo URL once the safe version is ready.
- Personal Dashboard and Financial Markets Dashboard are intentionally marked as local/placeholder until public-safe versions exist.
- Screenshot assets live in `public/project-images/`.
