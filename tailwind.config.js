/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			"colors": {
				// Premium Dark Theme Palette
				"surface-container-low": "#050505", // Deepest background
				"surface": "#111111", // Card background
				"surface-container-highest": "#1a1a1a", // Elevated surfaces
				"on-background": "#a1a1aa", // Muted text for general reading
				"primary": "#ffffff", // Bright text / Highlights
				"on-primary": "#000000", // Text on primary background (like buttons)
				"secondary": "#888888", // Secondary text / Labels
				"outline": "#333333", // Strong borders
				"outline-variant": "#222222", // Subtle borders
				"surface-tint": "#ffffff", // Tint for hover states
				
				// Optional: keep some of the others for compatibility but mapped to dark shades
				"on-surface": "#ffffff",
				"surface-variant": "#171717",
				"error": "#ef4444",
				"on-error": "#ffffff",
				"inverse-surface": "#ffffff",
				"inverse-primary": "#000000",
			},
			"borderRadius": {
				"DEFAULT": "0.125rem",
				"lg": "0.25rem",
				"xl": "0.5rem",
				"full": "0.75rem"
			},
			"spacing": {
				"unit": "8px",
				"gutter": "24px",
				"margin-desktop": "64px",
				"container-max": "1280px",
				"margin-mobile": "20px",
				"section-gap": "120px"
			},
			"fontFamily": {
				// Premium Typography Stack
				"body-md": ["Outfit", "sans-serif"],
				"label-sm": ["Outfit", "sans-serif"],
				"body-lg": ["Outfit", "sans-serif"],
				"label-lg": ["Outfit", "sans-serif"],
				
				// Striking Display Stack
				"headline-md": ["Syne", "sans-serif"],
				"display-lg": ["Syne", "sans-serif"],
				"display-lg-mobile": ["Syne", "sans-serif"],
				"headline-lg": ["Syne", "sans-serif"],
				"logo": ["Syne", "sans-serif"]
			},
			"fontSize": {
				"body-md": ["16px", { "lineHeight": "26px", "fontWeight": "300" }],
				"label-sm": ["13px", { "lineHeight": "16px", "fontWeight": "400", "letterSpacing": "0.05em" }],
				"headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600", "letterSpacing": "-0.01em" }],
				"body-lg": ["20px", { "lineHeight": "32px", "fontWeight": "300" }],
				"display-lg": ["88px", { "lineHeight": "1", "letterSpacing": "-0.04em", "fontWeight": "700" }],
				"label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500" }],
				"display-lg-mobile": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.03em", "fontWeight": "700" }],
				"headline-lg": ["48px", { "lineHeight": "56px", "fontWeight": "600", "letterSpacing": "-0.02em" }]
			}
		},
	},
}
