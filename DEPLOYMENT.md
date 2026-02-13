# Deployment Guide

This portfolio site is built with Vite and deployed to GitHub Pages.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## GitHub Pages Deployment

The site is automatically deployed via GitHub Actions when changes are pushed to the `main` branch.

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
npm run deploy
```

This will:
1. Build the site to the `dist/` directory
2. Deploy the `dist/` directory to the `gh-pages` branch

### Base Path Configuration

The site is configured with base path `/paramtully.github.io/` in `vite.config.ts`. This ensures all assets load correctly on GitHub Pages.

## Adding Project Screenshots

1. Place screenshot images in `public/images/projects/`
2. Update the project data in `src/data/projects.ts`:
   ```typescript
   screenshots: [
     '/images/projects/project-name-1.png',
     '/images/projects/project-name-2.png',
   ]
   ```

## Adding Resume PDF

1. Place your resume PDF at `public/resume.pdf`
2. The link is automatically configured in `src/data/links.ts`

## Project Structure

- `src/data/` - Static data (projects, experience, links)
- `src/components/` - React components
- `public/images/` - Static images (screenshots, diagrams)
- `public/resume.pdf` - Resume PDF file
- `dist/` - Build output (gitignored)
