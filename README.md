# SuRe — project page

Static, dependency-free project page for **SuRe: Transfer the Style, Not the Semantics**
(arXiv 2511.06365).

```
pages/
├── index.html          # the whole page (single file)
├── .nojekyll           # serve files as-is on GitHub Pages
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/            # figures (teaser, method, comparisons, ablations, logo…)
```

## Publish with GitHub Pages

The page lives in `pages/`, which GitHub Pages does not serve from a branch folder
directly (it only offers `/` and `/docs`). Two ways to publish:

1. **GitHub Actions (recommended, keeps the folder name).** Add
   `.github/workflows/pages.yml`:

   ```yaml
   name: Deploy project page
   on:
     push:
       branches: [master]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: pages
     cancel-in-progress: true
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/configure-pages@v5
         - uses: actions/upload-pages-artifact@v3
           with:
             path: pages
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

   Then set **Settings → Pages → Source: GitHub Actions**. The site appears at
   `https://<user>.github.io/SuRe/`.

2. **Rename** `pages/` to `docs/` and set **Settings → Pages → Source: Deploy from a
   branch → `master` / `/docs`**.

## Preview locally

```bash
cd pages
python3 -m http.server 8000
# open http://localhost:8000/
```

Append `?static` to the URL to disable the scroll-reveal animation (handy for
screenshots and printing to PDF).
