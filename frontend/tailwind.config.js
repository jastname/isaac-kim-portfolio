/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "surface-tint": "#565e74",
        "on-primary": "#ffffff",
        "surface-variant": "#e0e3e5",
        "secondary-container": "#6cf8bb",
        "outline-variant": "#c6c6cd",
        "on-surface-variant": "#45464d",
        "on-background": "#191c1e",
        "error-container": "#ffdad6",
        "outline": "#76777d",
        "on-secondary-container": "#00714d",
        "primary-container": "#131b2e",
        "tertiary": "#000000",
        "secondary": "#006c49",
        "on-tertiary-container": "#3980f4",
        "surface-bright": "#f7f9fb",
        "surface": "#f7f9fb",
        "surface-container-low": "#f2f4f6",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e0e3e5",
        "surface-container-high": "#e6e8ea",
        "surface-dim": "#d8dadc",
        "on-secondary": "#ffffff",
        "on-surface": "#191c1e",
        "on-tertiary": "#ffffff",
        "error": "#ba1a1a",
        "surface-container": "#eceef0",
        "background": "#f7f9fb",
        "tertiary-container": "#001a42",
        "on-primary-container": "#7c839b",
        "primary": "#000000",
        "on-error": "#ffffff",
        "on-primary-fixed-variant": "#3f465c",
        "on-tertiary-fixed-variant": "#004395",
        "tertiary-fixed": "#d8e2ff"
      },
      fontSize: {
        "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
        "metric-display": ["36px", { lineHeight: "44px", fontWeight: "700" }]
      },
      spacing: {
        "margin-desktop": "48px",
        "stack-lg": "48px",
        "gutter": "24px",
        "stack-md": "24px",
        "base": "8px",
        "stack-sm": "12px",
        "container-max": "1200px",
        "margin-mobile": "16px"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
