---
name: High-Performance Portfolio
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001a42'
  on-tertiary-container: '#3980f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  metric-display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The brand personality is authoritative yet accessible, embodying the qualities of a high-tier technical professional. This design system focuses on "Performance-Driven Minimalism," prioritizing speed of information absorption and clarity of achievement. 

The aesthetic is **Corporate / Modern**, characterized by precision, intentional whitespace, and a high-tech finish. It avoids unnecessary decoration, opting instead for structural integrity and a "dashboard-like" efficiency that signals reliability and technical expertise to recruiters and stakeholders.

## Colors
This design system utilizes a high-contrast palette to drive focus toward critical content.

- **Primary (Deep Charcoal):** Used for headings, primary text, and structural elements to provide a grounded, professional foundation.
- **Secondary (Emerald Accent):** Reserved for key metrics, success indicators, and growth-related data points. It signifies "active" or "positive" performance.
- **Tertiary (Electric Blue):** Used for primary Calls to Action (CTAs) and interactive highlights to distinguish between static data and interactive tasks.
- **Background:** A clean white (#FFFFFF) is used for the main canvas, with a subtle light gray (#F8FAFC) used for section staggering and card backgrounds to maintain visual separation.

## Typography
The typography system relies exclusively on **Inter** to ensure maximum legibility and a systematic, tech-oriented feel. 

- **Headlines:** Use Bold and Extra Bold weights with slight negative letter-spacing to create a sense of impact and structural density.
- **Body Text:** Standardized on 16px for optimal readability across all devices.
- **Metrics:** A specialized "Metric Display" style is used for numbers and key performance indicators, utilizing the Emerald accent color to draw the eye immediately.
- **Labels:** Uppercase labels with increased letter-spacing are used for categorization and small metadata tags.

## Layout & Spacing
The design system uses a **Fixed Grid** model for desktop to ensure a curated reading experience, centering content within a 1200px container.

- **Grid:** A 12-column grid is used for desktop, collapsing to 4 columns for mobile.
- **Rhythm:** An 8px base unit governs all padding and margins. Vertical stacking follows a `stack-lg` (48px) rhythm between major sections and `stack-md` (24px) between elements within a card.
- **Margins:** Generous horizontal margins ensure the content "breathes," reinforcing the minimalist aesthetic and preventing cognitive overload.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Ambient Shadows** rather than heavy borders.

- **Surface Levels:** The primary background is Level 0. Cards sit on Level 1, using a white background and a very soft, diffused shadow (`0 4px 20px rgba(15, 23, 42, 0.05)`).
- **Interactive States:** Upon hover, cards should subtly lift using a secondary shadow layer (`0 10px 30px rgba(15, 23, 42, 0.08)`) and a subtle 2px upward translation.
- **Separators:** Use thin, 1px borders in a light gray (#E2E8F0) for internal card divisions only when strictly necessary; otherwise, use whitespace to define boundaries.

## Shapes
The shape language is "Subtle Geometric." 

- **Standard Radius:** 0.5rem (8px) is the default for all cards, input fields, and buttons. This provides a modern, friendly touch without sacrificing the professional "square" feel.
- **Large Radius:** For larger container elements or image carousels, use 1rem (16px) to soften the overall visual weight.
- **Interactive Elements:** Buttons maintain the standard radius, but small "status pills" or tags may use a full pill-shape (999px) for distinct visual categorization.

## Components
- **Buttons:** Primary buttons use the Tertiary Electric Blue with white text. Secondary buttons are "Ghost" style with a primary-colored border and text. All buttons feature a 300ms transition on hover.
- **Cards:** Cards are the primary container. They feature a white background, 8px corner radius, and the subtle ambient shadow described in the Elevation section.
- **Tech Stack Chips:** Small, low-contrast gray backgrounds with primary-colored text. They use a smaller font size (label-md) to allow for density without clutter.
- **Metric Highlights:** Large emerald-colored numbers paired with a small, uppercase gray label below them.
- **Inputs:** Fields are defined by a light gray border that transitions to Electric Blue on focus.
- **Timeline/Experience:** A vertical 2px line in light gray connects professional milestones, with Primary-colored nodes indicating active or current roles.