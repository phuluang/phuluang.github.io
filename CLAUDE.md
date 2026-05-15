# Bo Hanpipat Portfolio — Project Context

## What this is
Personal UX/UI portfolio website for Bo Hanpipat, Senior UX Designer at Thinka App (10+ years experience). Built with pure HTML/CSS/JS, no frameworks, no build tools.

## Design system
- **Display font**: Bebas Neue — hero titles, impact numbers only
- **Body font**: Cabinet Grotesk — headings, body text, UI
- **Mono font**: DM Mono — labels, metadata, badges, code
- All tokens defined in `styles/tokens.css` — always use CSS variables, never hardcode values

## Color palette
- Background base: #0a0a0b
- Surface: #111114
- Elevated: #18181d
- Accent primary: #7b6ef6 (violet)
- Accent secondary: #4fd1c5 (teal)
- Text primary: #e8e6e0
- Text muted: #6b6970

## Coding conventions
- Mobile-first CSS (min-width breakpoints)
- BEM-lite naming: .section-name, .card, .card__title, .card--active
- All motion inside @media (prefers-reduced-motion: no-preference)
- Scroll reveal: add class .reveal to elements, .visible triggers animation via IntersectionObserver in main.js
- Impact numbers use counter.js count-up animation
- No inline styles except dynamic JS values (cursor position etc.)
- Semantic HTML: nav, main, section, article, footer

## File structure
- styles/tokens.css — design tokens (source of truth)
- styles/main.css — layout, sections, global styles
- styles/components.css — reusable components
- scripts/main.js — scroll reveal, cursor glow, nav scroll behavior
- scripts/counter.js — count-up animation for metrics
- assets/images/ — project screenshots (lazy loaded)
- case-studies/ — individual case study pages

## Adding a new case study
1. Duplicate case-study.html → rename to [project-slug].html
2. Add card in index.html Selected Work section
3. Fill in: title, type badge, challenge, impact metric, thumbnail

## Do not
- Use any CSS frameworks (Tailwind, Bootstrap etc.)
- Use any JS frameworks (React, Vue etc.)
- Hardcode colors or spacing — always use tokens
- Add animations without prefers-reduced-motion guard
