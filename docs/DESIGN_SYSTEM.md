# Portfolio Design System & UI Guidelines

This document specifies the visual language, design tokens, color harmonies, typography scales, and component patterns used across the DevMo21x-Website-Portfolio.

---

## Color Palette & Themes

The portfolio employs an intentional, dark-mode-first aesthetic with rich slate depths, luminous cyan/indigo accents, and frosted glass overlays.

### Dark Theme (Default)
| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `--bg-primary` | `#0b0f19` | Deep cosmic canvas background |
| `--bg-secondary` | `#111827` | Section & elevated card background |
| `--bg-tertiary` | `#1f293d` | Borders, subtle card accents, hover states |
| `--accent-primary` | `#6366f1` | Electric Indigo (Primary CTA, highlights) |
| `--accent-secondary` | `#06b6d4` | Luminous Cyan (Secondary highlights, gradients) |
| `--accent-glow` | `rgba(99, 102, 241, 0.25)` | Backlight & ambient neon glow |
| `--text-primary` | `#f8fafc` | High-contrast body & heading text |
| `--text-secondary` | `#94a3b8` | Subtitles, meta-tags, descriptions |
| `--text-muted` | `#64748b` | Timestamps, placeholders, inactive states |

### Light Theme
| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `--bg-primary` | `#f8fafc` | Clean crisp page background |
| `--bg-secondary` | `#ffffff` | Elevated component cards |
| `--bg-tertiary` | `#e2e8f0` | Dividers, subtle borders |
| `--accent-primary` | `#4f46e5` | Royal Indigo CTA |
| `--accent-secondary` | `#0891b2` | Teal/Cyan secondary accent |
| `--text-primary` | `#0f172a` | High-contrast dark text |
| `--text-secondary` | `#475569` | Mid-slate body text |

---

## Glassmorphism & Surface Tokens

- **Glass Surface**: `background: rgba(17, 24, 39, 0.75); backdrop-filter: blur(16px);`
- **Glass Border**: `border: 1px solid rgba(255, 255, 255, 0.08);`
- **Card Shadow**: `box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);`
- **Hover Elevation**: `transform: translateY(-4px); border-color: rgba(99, 102, 241, 0.4);`

---

## Typography Scale

- **Display & Headings**: `font-family: 'Outfit', sans-serif;`
- **Body & Controls**: `font-family: 'Inter', -apple-system, sans-serif;`
- **Code & Tech Tags**: `font-family: 'JetBrains Mono', monospace;`

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `3.75rem (60px)` | `2.5rem (40px)` | `800` | `1.1` |
| **H2 Section Title** | `2.25rem (36px)` | `1.75rem (28px)` | `700` | `1.2` |
| **H3 Card Title** | `1.25rem (20px)` | `1.125rem (18px)` | `600` | `1.3` |
| **Body (Normal)** | `1rem (16px)` | `0.9375rem (15px)`| `400` | `1.6` |
| **Small / Badges** | `0.8125rem (13px)`| `0.75rem (12px)`  | `500` | `1.4` |

---

## Motion & Interaction Principles

1. **Restraint Over Noise**: Subtle 200–300ms cubic-bezier transitions on hover states.
2. **Scroll Reveals**: Gentle fade-up transitions triggered when elements enter viewport via `IntersectionObserver`.
3. **Respect Reduced Motion**: Always disable transform/fly-in transitions when `prefers-reduced-motion: reduce` is detected.
