# Lohith Mothukuri - Portfolio

Dark cinematic portfolio for an AI/ML Engineer. React 19 + TypeScript + Vite, GSAP (ScrollTrigger + SplitText), Lenis smooth scroll, and a custom Three.js neural particle field.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import it in Vercel - framework preset "Vite", no extra config needed (`vercel.json` already handles SPA rewrites).

## Enabling the live project windows

The DeshMate and Porzolio pages embed the real sites in an interactive window. Both sites currently send `Content-Security-Policy: frame-ancestors 'none'`, so browsers refuse to embed them and the window shows a fallback with a visit button.

To make the live windows actually live, allow your portfolio domain in each site's headers:

**DeshMate / Porzolio on Vercel** - add to that project's `vercel.json` (or `next.config` headers for Porzolio):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://YOUR-PORTFOLIO-DOMAIN.vercel.app http://localhost:5173"
        }
      ]
    }
  ]
}
```

Also remove any `X-Frame-Options: DENY` header if present (CSP frame-ancestors is the modern replacement). Redeploy both sites and the windows go live automatically - no portfolio change needed.

## Structure

- `src/pages/Home.tsx` - main one-pager (hero, stats, work, experience, impact chart, about, skills, writing, contact)
- `src/pages/ProjectPage.tsx` - data-driven case-study pages with live iframe windows (`/projects/deshmate`, `/projects/porzolio`)
- `src/data/content.ts` - all resume/site content in one place; edit here to update copy
- `src/components/NeuralField.tsx` - Three.js hero background (cursor-reactive, DPR-capped, reduced-motion aware)
- `src/lib/motion.ts` - GSAP setup + `reveal()` entrance helper
- `public/Lohith_Mothukuri_Resume.pdf` - served by the Resume buttons

## Notes

- Preloader plays once per browser session (`sessionStorage`).
- All animation respects `prefers-reduced-motion`.
- Three.js is code-split; initial JS is ~143 kB gzip.
