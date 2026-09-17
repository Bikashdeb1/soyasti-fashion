# SOYASTI CLOTHING — Modern Editorial Fashion Atelier

Premium responsive fashion e-commerce frontend built with React, TypeScript, Vite and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (normally `http://localhost:3000`).

## Build for production

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
Push the project to the `main` branch and set **Settings → Pages → Source → GitHub Actions** in the repository. GitHub will build the Vite app and publish the `dist` folder automatically.

The Vite configuration uses a relative base path so the site works when published at a repository URL such as `https://USERNAME.github.io/REPOSITORY/`.
