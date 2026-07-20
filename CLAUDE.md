# Personal Site

Standalone public resume and portfolio site for Mason Schick. This is the PUBLISH layer adjacent to `info-os`, not a module inside it.

## Stack

- React 19 + TypeScript
- Vite 6
- Plain CSS using the shared Hub visual language
- Automatic Chicago sunrise/sunset theme with no manual override

## Commands

- `npm run dev` — local development
- `npm run build` — type-check and production build
- `npm run preview` — preview the production build

## Deployment

- Canonical public URL: `https://masonschick.vercel.app`
- Hosting: Vercel project `masonschick`
- Repository: `masonschick/masonschick.github.io`
- Pushes to `main` deploy automatically through Vercel.
- GitHub Pages is retired; do not add a second production deployment there.
- The former Jekyll/class site is preserved on the remote `legacy-2024` branch.

## Working rules

- Keep the site standalone; link to it from the resume and `info-os`.
- Do not publish private application data or links that require access to private GitHub repositories.
- Prefer finished case studies over placeholder projects.
- Keep the resume URL stable when the source PDF is updated.
- Keep the four project visuals stylistically consistent; the Info OS light-mode preview is the reference image.
