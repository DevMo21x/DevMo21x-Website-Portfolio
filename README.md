# 🌌 DevMo21x-Website-Portfolio

A fast, modular, and beautifully crafted developer portfolio built with modern vanilla web technologies, CSS design tokens, and structured JSON data models.

![Portfolio Preview Banner](assets/images/og/preview.png)

---

## 🌟 Highlights

- **Ultra-Fast & Zero Build-Lockin**: Powered by pure HTML5, Vanilla CSS3, and ES6+ JavaScript modules. No required heavy build step.
- **Architectural Separation of Concerns**: Content is decoupled into structured JSON files (`src/data/`), making updates effortless without modifying HTML markup.
- **Design System & Tokens**: Centralized CSS variables for seamless theme switching (Dark/Light/System), sleek glassmorphism, fluid typography, and micro-animations.
- **Dynamic Projects Showcase**: Real-time project search, category filtering, and modal detail views.
- **Accessible & SEO Optimized**: Semantic HTML, ARIA standards, OpenGraph/Twitter card metadata, and responsive layouts across all device viewports.

---

## 📁 Repository Structure

```text
DevMo21x-Website-Portfolio/
├── .github/workflows/deploy.yml    # CI/CD deployment workflow
├── assets/                         # Static media, icons, and document assets
│   ├── docs/                       # Resume / CV PDF downloads
│   ├── fonts/                      # Custom web fonts
│   ├── icons/                      # Tech & UI SVG icons
│   └── images/                     # Projects, avatars, and OG preview graphics
├── docs/                           # Architecture and design system documentation
│   ├── CONTRIBUTING.md             # Guide to adding projects and content
│   └── DESIGN_SYSTEM.md            # Color tokens, typography, and component patterns
├── src/
│   ├── data/                       # Content data models (JSON)
│   │   ├── profile.json            # Bio, social links, titles
│   │   ├── projects.json           # Showcase projects catalog
│   │   ├── skills.json             # Technical skills and proficiencies
│   │   └── experience.json         # Career and education timeline
│   ├── scripts/                    # Application logic modules
│   │   ├── modules/
│   │   │   ├── animations.js       # Scroll reveal observers & micro-interactions
│   │   │   ├── contact.js          # Form validation & submission
│   │   │   ├── navigation.js       # Mobile drawer, scroll-spy
│   │   │   ├── projects.js         # Filtering, dynamic rendering, modal
│   │   │   └── theme.js            # Dark/light theme engine
│   │   └── app.js                  # Main JS bootstrap
│   └── styles/                     # CSS stylesheets & tokens
│       ├── animations.css          # Keyframes and transitions
│       ├── components.css          # Reusable component styles
│       ├── main.css                # Global stylesheet entry point
│       ├── typography.css          # Type scale and fonts
│       └── variables.css           # Design tokens (colors, glassmorphism, spacing)
├── ARCHITECTURE.md                 # Living architecture specifications
├── index.html                      # Semantic HTML5 entry point
└── README.md                       # Project overview
```

---

## 🚀 Quick Start

### 1. Run Locally
No build process or installation is strictly required! You can open `index.html` in your browser or run any local HTTP server:

```bash
# Using Node.js npx serve
npx -y serve .

# Or using Python 3
python3 -m http.server 3000
```

Open `http://localhost:3000` in your web browser.

---

## 🛠️ Customization

1. **Update Bio & Links**: Edit `src/data/profile.json`
2. **Add / Edit Projects**: Add entries in `src/data/projects.json`
3. **Update Skills**: Modify `src/data/skills.json`
4. **Update Career Experience**: Modify `src/data/experience.json`
5. **Adjust Theme Colors**: Customize the palette in `src/styles/variables.css`

For detailed guidelines, see [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) and [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).

---

## 📖 Architecture & Standards

Read the full architecture overview in [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 📄 License

MIT © [Mohaimen](https://github.com/)
