# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Site: Marina Crest Hotel (Hotel Website)
- Last completed phase: Phase 1
- Next phase: Phase 2
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold, deploy and design system
- [ ] Phase 2: Home page
- [ ] Phase 3: Main feature pages
- [ ] Phase 4: Remaining pages
- [ ] Phase 5: Polish and hand-off

## Decisions
(Write each choice you made without asking. One line each, with the phase number.)
- P1: Page split. Phase 3 = Rooms, Room detail (`/rooms/:id`, with room gallery), Facilities. Phase 4 = Dining, Offers, Book (multi-step booking with summary). Home (Phase 2) owns the availability bar.
- P1: Scaffolded with create-vite (React, JS) in a temp folder and copied config in, so instruction files were not touched. Vite 8, React 19, React Router 7 (`react-router-dom`).
- P1: Fonts: Fraunces 300, 300 italic, 400 (headings); Manrope 400, 500, 600 (body).
- P1: Fictional contact: 14 Lagoon Crescent, Marina Waterfront, Lagos; +234 800 000 0000; stay@marinacrest.example. Kept in `src/data/site.js`.
- P1: Look: square-ish buttons (2px radius), uppercase tracked labels, brass only for thin lines, eyebrows and focus ring; deep teal for primary buttons and footer.
- P1: `Img` fallback is a teal gradient with brass glow, fine line texture and the wave mark, plus an optional italic label.

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Shared components in `src/components/`: Header, Footer, Img (`ratio`, `label`, `eager`), Button (`to`/`href`, variants primary/brass/outline/light, size sm), Section (`eyebrow`, `title`, `intro`, `tone` default/surface/teal, `wide`), PageTitle (`title`, `description`). `PageStub` is a temporary placeholder: remove when all pages are built.
- Utility classes in `base.css`: `.container`, `.container--wide`, `.eyebrow`, `.lead`, `.fade-up`, `.visually-hidden`.
