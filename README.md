# AksanLab — Hybrid R&D & Venture Studio

A modern company profile and interactive studio hub for **AksanLab**, a hybrid software engineering partner and independent R&D laboratory built around operational peace, structural clarity, and freedom to grow.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **GSAP + ScrollTrigger**, **Lenis**, **Three.js**, and **Sakuga-VFX** web components.

---

## Visual Direction & Color System

- **Warm Mineral Cream (`#F4F1EA`)** — Daylight editorial canvas for the opening hero stage.
- **Blush Cream (`#F7ECE6`)** — Soft transition surface across the Studio Wall, Client Engineering flow, and FAQ.
- **Obsidian Lab (`#111218`)** — High-contrast nocturnal laboratory section for experimental R&D tracks.
- **Terracotta Flame (`#E85427`)** — Signature kinetic accent used across the curved arch marquee, SVG path spline, conviction deck, and full-viewport footer.
- **Deep Ink (`#161920`)** — Crisp high-legibility borders, primary controls, and typography.

Typography pairs **Space Grotesk** (display), **Albert Sans** (UI & body), **Instrument Serif** (editorial italic emphasis), and **DM Mono** (technical indices & metadata).

---

## Core Architecture & Features

1. **Adaptive Transparent Navbar (`src/components/HeaderPortal.tsx`)**
   - Background-free floating header (`fixed inset-x-0 top-0`) using a 3-column desktop grid to prevent logo/nav collisions at any viewport width.
   - Automatic contrast adaptation (`light`, `dark`, `terracotta`) synchronized with the active section behind the header.
   - Compact floating menu drawer below `1024px` (`lg`) with `44px` touch targets for phones and tablets.

2. **Hero Stage & WebGL Ink Field (`src/components/HeroStage.tsx`, `src/art/CalmInkField.ts`)**
   - Real-time Three.js fluid ink canvas reacting smoothly to cursor movement and scroll progress.
   - Ambient looping motion study video (`public/videos/clip-47051.mp4`) with `poster` fallback and `prefers-reduced-motion` handling.

3. **Curved Arch Marquee & Flowing Studio Wall (`src/components/CurvedArchMarquee.tsx`, `src/components/ShowcaseStrip.tsx`)**
   - Full-width parabolic SVG terracotta band with concentric `<textPath>` scrolling typography.
   - Seamless continuous horizontal showcase reel mixing ambient motion studies and curated architectural photography.

4. **Asymmetrical Winding Client Path (`src/components/ClientEngineeringSection.tsx`)**
   - Four alternating staggered capability chapters (`Custom Systems`, `Spatial Experiences`, `Applied AI Automation`, `Product Systems`) connected by a real-time GSAP `ScrollTrigger` SVG path.
   - Three-phase delivery cadence (`Discovery & Scope`, `Iterative Execution`, `Independent Handover`).

5. **Obsidian R&D Laboratory & Sakuga-VFX Sandbox (`src/components/VenturesSection.tsx`, `src/components/SakugaControl.tsx`)**
   - Interactive track switcher (`LAB 01` – `LAB 03`) with ambient atmospheric glow scaled live by custom `<sakuga-tabs>`, `<sakuga-toggle>`, `<sakuga-slider>`, `<sakuga-button>`, and `<sakuga-toast>` web components.

6. **Conviction Deck, FAQ & Full-Viewport Footer (`src/components/PhilosophyBand.tsx`)**
   - Auto-sizing CSS Grid stacked card deck (`01` – `04`) on solid terracotta.
   - Expandable FAQ accordion (`#faq`) and `100dvh` full-bleed closing footer with a scroll-scrubbed `AKSAN LAB` SVG wordmark unfold.

7. **Two-Track Dialogue Modal (`src/components/DialogueModal.tsx`)**
   - Guided brief builder supporting direct **Email (`mailto:`)**, **WhatsApp**, and **Clipboard** copy actions.

---

## Project Structure

```text
profile-company-aksan/
├── public/
│   ├── images/             # Curated architectural photography (Unsplash Open License)
│   ├── sakuga-vfx/         # Custom interactive anime-physics web components
│   └── videos/             # Ambient looping MP4 studies (Mixkit Free License)
├── src/
│   ├── art/
│   │   └── CalmInkField.ts # Three.js interactive fluid surface
│   ├── components/         # Modular UI sections & Sakuga React wrappers
│   ├── data/
│   │   └── aksanContent.ts # Structured copy, capabilities, R&D tracks & FAQ data
│   ├── lib/
│   │   ├── gsap.ts         # GSAP + ScrollTrigger registration & reduced-motion helper
│   │   └── sakugaTheme.ts  # Particle & palette overrides for Sakuga-VFX
│   ├── types/
│   │   └── sakuga.d.ts     # Custom element JSX & DOM typings
│   ├── App.tsx             # Lenis smooth scroll, scroll spy & modal state
│   ├── index.css           # Tailwind v4 theme, fluid .aksan-container & Sakuga parts
│   └── main.tsx            # React 19 entry point
├── index.html              # Font loading, metadata & Sakuga script order
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Type-check with TypeScript
npm run lint

# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## Media & Library Attribution

- **Photography**: Curated under the Unsplash Open License (`public/images/`).
- **Motion Clips**: Curated under the Mixkit Free License (`public/videos/`).
- **Kinetic UI Controls**: Powered by `sakuga-vfx` (`public/sakuga-vfx/`).
