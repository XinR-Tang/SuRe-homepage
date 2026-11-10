# SuRe — Project Page

Source of the project page for **SuRe: Transfer the Style, Not the Semantics —
Mitigating Semantic Leakage in Image-Guided Stylization** ([arXiv 2511.06365](https://arxiv.org/abs/2511.06365)).

- **Live site:** https://xinr-tang.github.io/SuRe-homepage/
- **Code:** https://github.com/XinR-Tang/SuRe

## Structure

```
.
├── index.html          # the whole page (single file)
├── .nojekyll           # serve files as-is on GitHub Pages
└── assets/
    ├── css/style.css
    ├── js/main.js      # nav highlight, scroll progress, reveal, copy bibtex
    ├── img/            # figures (teaser, method, comparisons, ablations, emblems)
    └── vendor/katex/   # vendored KaTeX for LaTeX formulas (works offline)
```

No build step, no external CDN: open `index.html` directly or serve the folder.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```

Append `?static` to the URL to disable scroll-reveal animations (useful for screenshots).

## Editing

- Text and figures live in `index.html`; formulas use KaTeX (`\( … \)` inline, `$$ … $$` display).
- Images: drop files into `assets/img/` and reference them relatively.
