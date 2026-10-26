# Ashraful Hasan — Developer Portfolio

A responsive single-page portfolio for Ashraful Hasan, presenting his work in AI/ML, backend engineering, research, and problem solving.

## Features
- Dark/light theme with saved preference
- Smooth-scroll navigation, section highlighting, scroll progress, and back-to-top control
- Responsive hero with typewriter effect, animated reveals, project and achievement cards
- Centralized personal content in `src/data/portfolio.js`
- GitHub activity calendar (shown once a username is configured)
- Achievement certificate modal and Formspree-ready contact form
- SEO, Open Graph, Twitter metadata, and Vercel-compatible static build

## Tech stack
React, Vite, Framer Motion, React Icons, typewriter-effect, react-github-calendar, React Bootstrap, tsParticles, react-pdf.

## Getting started
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Customization
Update all profile copy, achievements, project information, URLs, skill labels, research information, and form configuration in `src/data/portfolio.js`.

Replace the placeholders:
- `[MY_GITHUB_USERNAME]`, `[MY_GITHUB_URL]`, `[MY_LINKEDIN_URL]`, `[MY_FACEBOOK_URL]`
- `[MY_FORMSPREE_ID]`
- Project and research placeholder names/descriptions
- `https://[YOUR_DOMAIN]/` in `index.html` after deployment

## Required assets
Place the following files in `public/assets/`:
```text
profile.jpg
favicon.png
og-image.jpg
Ashraful_Hasan_CV.pdf
achievements/ai-project-2026.jpg
achievements/ai-fest-2025.jpg
projects/project-01.webp
projects/project-02.webp
projects/project-03.webp
projects/project-04.webp
```
The interface remains usable if project/certificate images are temporarily absent.

## Contact form
Create a Formspree form, then replace `[MY_FORMSPREE_ID]` with the form ID (not a secret). Until it is configured, the form explains what needs to be set instead of attempting a submission.

## Deployment to Vercel
1. Push this repository to GitHub.
2. Import the repository from the Vercel dashboard.
3. Keep the default Vite preset and build command: `npm run build`.
4. Keep the output directory as `dist`.
5. Deploy and replace the canonical and Open Graph domain placeholders in `index.html`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
