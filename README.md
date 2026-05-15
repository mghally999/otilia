# OTILÌA — Bespoke Interior & Exterior Design

A bilingual editorial website for OTILÌA Interior Design (Dubai). Built on
Next.js 14 App Router with vanilla CSS Modules and zero animation libraries.

## Run it

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # production build (27 static routes)
npm start        # serve production build
```

Node 18.17+ required.

---

## Architecture

```
src/
├── app/
│   ├── layout.js                root <html> shell, fonts, JSON-LD
│   ├── page.js                  English home (/)
│   ├── HomeClient.js
│   ├── globals.css
│   ├── about/                   /about
│   ├── services/                /services
│   ├── projects/                /projects + /projects/[slug]
│   ├── contact/                 /contact + ContactForm
│   ├── ar/                      ────── ARABIC SITE ──────
│   │   ├── layout.js            sets dir="rtl", lang="ar"
│   │   ├── page.js + HomeClientAr.js   /ar
│   │   ├── about/               /ar/about
│   │   ├── services/            /ar/services
│   │   ├── projects/            /ar/projects + /ar/projects/[slug]
│   │   └── contact/             /ar/contact + ContactFormAr
│   ├── sitemap.js               EN + AR routes (24 URLs total)
│   ├── robots.js
│   └── not-found.js
├── components/
│   ├── Cursor.js                custom cursor — canvas trail + ring + dot
│   ├── Nav.js                   locale-aware, language switcher
│   ├── Footer.js                locale-aware
│   ├── Logo.js                  inline SVG logotype
│   ├── Reveal.js / RevealObserver.js   IntersectionObserver-driven
│   ├── ScrollProgress.js        thin gold progress bar
│   └── Marquee.js
└── data/
    ├── brand.js          ─┐    English content
    ├── projects.js        │
    ├── brand.ar.js       ─┴──── Arabic content (slugs match EN)
    └── projects.ar.js
```

### Why duplicate `/ar/` files instead of `[locale]/`?

Mirroring the route tree keeps both versions explicit and statically pre-rendered
at build time (one HTML file per page per locale). No runtime locale resolution,
no middleware, no cookie sniffing — every URL is final and indexable. CSS
modules are reused across both trees.

---

## The Custom Cursor

`Cursor.js` runs a single `requestAnimationFrame` loop with three layered
elements:

| layer  | element  | role                                                     |
|--------|----------|----------------------------------------------------------|
| trail  | `<canvas>` | 50 lerped points, bezier-smoothed, gold glow + sharp pass |
| ring   | `<div>`  | 36px outline, lags ~16% per frame                        |
| dot    | `<div>`  | 6px solid gold, almost-instant follow                    |
| label  | `<div>`  | optional pill text on link hover                         |

**Trigger any link or button to add `data-cursor` attributes:**

```jsx
<a data-cursor="hover">Just hovers</a>
<a data-cursor="view" data-cursor-label="Open">Shows a pill saying "Open"</a>
```

The cursor reads `--brand-gold` from CSS so theme-switching re-colours it for
free. Disabled on touch / coarse-pointer devices and when
`prefers-reduced-motion: reduce` is set — natives cursor returns automatically.

The `cursor: none` CSS rule is gated behind `html.has-cursor`, which is added
by `Cursor.js` only after hydration. This guarantees the native cursor stays
visible if JavaScript fails to load.

---

## Project case-study interactions

Each `/projects/[slug]` page now ships:

- **Parallax hero** — image scales + drifts on scroll, content fades
- **Click-to-copy palette** — every hex swatch copies to clipboard, badge confirms
- **Image lightbox** — click any chapter or gallery image to open full-screen,
  with keyboard navigation (← →) and Escape to close
- **Hover-zoom** — chapter and gallery images scale 1.05–1.08 over 1200ms
- **Animated next-project teaser** — image scales on hover, arrow slides

Same features mirrored in `/ar/projects/[slug]`, with Arabic labels.

---

## Theming

Two themes share one component tree, controlled by `data-theme` on `<html>`:

| key           | dark (default) | light       |
|---------------|----------------|-------------|
| `--bg`        | #5B4636        | #E8DEC9     |
| `--fg`        | #E8DEC9        | #2A2118     |
| `--brand-gold`| #9C7C38        | #9C7C38     |

The chosen theme is persisted in `localStorage` (`otilia-theme`) and re-applied
before paint via an inline script in `layout.js` to prevent FOUC.

---

## Fonts

Loaded via `<link>` tags in `layout.js` from Google Fonts CDN with
`display=swap`. Cormorant Garamond for display, Montserrat for body, Amiri for
Arabic. `next/font` was avoided because it requires build-time fetches that
fail in offline build environments.

For the absolute-best LCP score on production, switch back to `next/font/google`
on a normal-network machine — the CSS variables (`--f-display`, `--f-body`,
`--f-arabic`) are already wired so it's a small swap.

---

## Imagery

All photography is local to `/public/projects/<slug>/`, plus `/public/about/`,
`/public/services/`, and `/public/team/`. Project images are referenced from
`src/data/projects.js`; About hero, founder portrait, and Services sector
images are referenced directly from their respective page components. Replace
any image by dropping a new file at the same path — the rest of the site picks
it up automatically across both locales.

The OTILÌA company profile PDF is served at `/otilia-company-profile.pdf` and
linked from the About page and the Footer.

---

## SEO

- Per-page `<title>`, `<meta description>`, OG, Twitter card
- JSON-LD: `Organization` + `WebSite` (root layout) and `CreativeWork` per project
- `hreflang` alternates between en-AE and ar-AE on every page
- `sitemap.xml` listing all 24 URLs (12 EN + 12 AR)
- `robots.txt` with sitemap pointer
- `apple-touch-icon`, `og.jpg`, `favicon.svg`, theme-color meta

---

## Lighthouse targets

Build output: 87.3 kB shared First Load JS, page bundles 400 B – 8 kB.
All 27 routes pre-rendered (`○ Static` / `● SSG`) — no server runtime.

---

## Customising

| change                  | edit                                            |
|-------------------------|-------------------------------------------------|
| Brand copy (EN)         | `src/data/brand.js`                            |
| Brand copy (AR)         | `src/data/brand.ar.js`                         |
| Project case studies    | `src/data/projects.js` + `src/data/projects.ar.js` |
| Colours / type ramp     | `src/app/globals.css` (top of file, `:root` and `[data-theme]`) |
| Nav structure / labels  | `src/components/Nav.js`                        |
| Footer copy             | `src/components/Footer.js`                     |
| Cursor behaviour        | `src/components/Cursor.js`                     |
| SEO defaults            | `src/app/layout.js` (root metadata)            |
| Sitemap routes          | `src/app/sitemap.js`                           |

The site has **no runtime dependencies** beyond React and Next. No CSS-in-JS,
no animation library, no UI kit. Everything is hand-built.
