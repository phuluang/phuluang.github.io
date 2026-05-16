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

---

## Workflow (UX + AI Pipeline)

This project follows a 4-phase UX + AI workflow designed with Claude chat.

### Phase 1 — Research ✅
- Brief document created (bo_portfolio_brief.html)
- Audience: anyone who wants to know who Bo is
- Aesthetic: dark, sleek, motion-forward (reference: design tool UIs)
- Token spec drafted in brief doc

### Phase 2 — Design System ✅
Order of operations (always follow this):
1. CLAUDE.md first — before any scaffold
2. Token spec → styles/tokens.css
3. Scaffold project structure
4. Figma Variables sync (in progress)

### Phase 3 — Prototype ✅
- Hero, Work, About, Contact sections built
- Live at: https://phuluang.github.io
- counter.js working for impact metrics
- Iterate loop: make changes → push → live

### Phase 4 — Handoff (current)
- [ ] Replace placeholder content (email, links, resume, thumbnails)
- [ ] Build case-study.html with real content
- [ ] Figma Variables sync with tokens.css
- [ ] Custom domain (optional)

## Figma ↔ Code Sync Workflow

Code (styles/tokens.css + HTML/CSS) is the single source of truth.
Figma is the design scratchpad. Two directions only:

### push to Figma
Code is updated → sync out to Figma:
1. Read styles/tokens.css for current token values
2. Use Figma MCP to update Variables in "Design Tokens" collection
3. Optionally update Figma frames to reflect latest layout
4. Figma now mirrors the codebase

### pull from Figma
Bo explores a new design idea in Figma → bring it into code:
1. Bo designs in Figma (frames, layout, components)
2. Use Figma MCP to read design context of updated frames
3. Translate design → HTML/CSS using existing tokens
4. Review in browser → iterate if needed
5. git commit → push → live on GitHub Pages

### Trigger phrases
- `"push to Figma"` → sync tokens + layout from code → Figma
- `"pull from Figma"` → translate Figma design → HTML/CSS

Figma file: https://www.figma.com/design/qSNkYJclBkQSaPGAjDx899/Bo-Portfolio

Figma file: https://www.figma.com/design/qSNkYJclBkQSaPGAjDx899/Bo-Portfolio

## Content still needed
- Real email (replace bo@example.com)
- Real LinkedIn URL
- Real GitHub URL
- Resume PDF → assets/bo-hanpipat-resume.pdf
- Case study thumbnails → assets/images/
- Real case study content in case-study.html
