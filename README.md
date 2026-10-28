# Nichetechcareer

React frontend port of the static **niche-tech** site, with the same CSS, images, and page markup. A Node.js API folder is included for future contact forms, careers, and CMS integration.

## Structure

| Path | Purpose |
|------|---------|
| `frontend/` | Vite + React + React Router SPA |
| `backend/` | Express API placeholder (`/api/health`, stub form routes) |
| `scripts/extract-pages.mjs` | Re-sync page HTML from `~/Desktop/myProjects/work/niche-tech` |

## Development

```bash
# From repo root (installs frontend + backend workspaces)
npm install

# Frontend only (http://localhost:5173)
npm run dev:frontend

# Backend placeholder (http://localhost:4000)
npm run dev:backend
```

## Re-sync design from reference

When the static site in `niche-tech` changes:

```bash
npm run extract-content
cp -r ~/Desktop/myProjects/work/niche-tech/assets frontend/public/
cp -r ~/Desktop/myProjects/work/niche-tech/css frontend/public/
cp ~/Desktop/myProjects/work/niche-tech/js/main.js frontend/public/js/main.js
```

Then re-apply the SPA hook in `main.js` (`window.initNicheGlobalSite`) if the file was overwritten.

## Production build

```bash
npm run build
npm run preview
```
