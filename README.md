# DevMo21x-Website-Portfolio

A high-performance, modern developer portfolio built with **Astro**, **Tailwind CSS**, and **TypeScript**. Designed with an editorial literary-tech aesthetic, subtle micro-interactions, responsive layouts, and accessibility best practices.

---

## Highlights

- **Blazing-Fast Static Architecture**: Built with [Astro](https://astro.build/) for near-instant page loads and zero unnecessary clientside JS overhead.
- **Refined Design System**: Tailored typography hierarchy pairing **Source Serif 4** (expressive headlines), **Inter** (clean body copy), and **Space Grotesk** (branding/logo), backed by custom Tailwind design tokens.
- **Fluid Micro-Interactions**:
  - Glitch-and-float animated navbar brand mark.
  - Shimmer-reveal headline animation.
  - Interactive infinite scrolling marquee for technical stack with pause-on-hover.
  - Viewport scroll reveals powered by `IntersectionObserver`.
- **Comprehensive Sections**:
  - **Hero**: Impactful tagline, bio statement, and quick-action CV buttons.
  - **Selected Projects**: Featured showcase cards and multi-column project grid with live tech tags.
  - **Professional Experience**: Interactive timeline with hover state accents and milestone indicators.
  - **Technical Stack**: Categorized tools and animated devicon carousel.
  - **Certifications & Accolades**: Structured list highlighting cloud & DevOps credentials.
  - **Enhanced Footer**: Multi-column footer with social links (GitHub, LinkedIn), legal links, and smooth "Back to Top" scrolling.
- **Fully Responsive & Accessible**: Optimized for mobile, tablet, and desktop viewports with semantic HTML5 and clear focus states.
- **GitHub Pages Ready**: Pre-configured CI/CD workflow for automated deployments.

---

## Repository Structure

```text
DevMo21x-Website-Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── assets/                         # Static media, icons, and document assets
│   ├── docs/                       # Resume / CV PDF downloads
│   ├── fonts/                      # Custom web fonts
│   ├── icons/                      # Tech & UI SVG icons
│   └── images/                     # Projects, avatars, and OG preview graphics
├── docs/                           # Architecture and design system documentation
│   └── DESIGN_SYSTEM.md            # Color tokens, typography, and component patterns
├── src/
│   ├── components/                 # Reusable UI components
│   ├── data/                       # Structured JSON data models
│   │   ├── profile.json            # Profile information & social links
│   │   ├── projects.json           # Showcase projects catalog
│   │   ├── skills.json             # Technical skills and proficiencies
│   │   └── experience.json         # Career timeline
│   ├── layouts/
│   │   └── Layout.astro            # Base Astro layout (SEO, fonts, global styles)
│   ├── pages/
│   │   └── index.astro             # Main portfolio entry page
│   ├── scripts/                    # Client-side TypeScript modules
│   └── styles/                     # Global styles & CSS design tokens
├── astro.config.mjs                # Astro configuration (Tailwind & React integrations)
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Theme tokens (colors, typography, spacing, radiuses)
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project overview & documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ or v20+ recommended)
- [npm](https://www.npmjs.com/)

### 1. Install Dependencies

```bash
npm install
```

> **Note**: A `.npmrc` file is included with `legacy-peer-deps=true` to ensure smooth resolution across peer dependencies.

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to view the site live with Hot Module Replacement (HMR).

### 3. Build for Production

```bash
npm run build
```

The static output will be generated inside the `dist/` directory ready for deployment to GitHub Pages, Cloudflare Pages, Vercel, or Netlify.

### 4. Preview Production Build

```bash
npm run preview
```

---

## Customization

1. **Update Content & Projects**: Edit the components and markup in `src/pages/index.astro` or data in `src/data/`.
2. **Update Design Tokens & Colors**: Modify the color palette and typography in `tailwind.config.js`.
3. **Change Fonts & Meta Tags**: Update the `<head>` in `src/layouts/Layout.astro`.
4. **Update Resume & Social Links**: Place your latest resume in `assets/docs/` and update your links in the footer and nav.

For design token details, see [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).

---

## Deployment (GitHub Pages)

A GitHub Actions workflow is provided in `.github/workflows/deploy.yml`. When you push to the `main` branch, the site is automatically built with `npm run build` and published to GitHub Pages.

To enable GitHub Pages in your repository:
1. Go to repository **Settings** > **Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` to trigger the build.

---

## License

MIT © [Mohaimen](https://github.com/)
