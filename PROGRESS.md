# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Site: Marina Crest Hotel (Hotel Website)
- Last completed phase: Phase 3
- Next phase: Phase 4
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold, deploy and design system
- [x] Phase 2: Home page
- [x] Phase 3: Main feature pages
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
- P2: Room prices in naira (₦185,000 to ₦950,000 per night), sizes, beds, views and amenities chosen for the 6 fixed rooms. All in `src/data/rooms.js` (ids are slugs, e.g. `deluxe-marina-room`). Room 1 has the 3-image gallery.
- P2: Fictional copy: 62 rooms, restaurant "Tide" (7am to 11pm), "The Brass Bar" (4pm to 1am), 3 offers (Lagoon Escape, Spa Retreat, Family Summer) in `src/data/offers.js`, 3 reviews and a 4.9 rating in `src/data/home.js`.
- P2: Availability bar sends to `/book?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&guests=N`. Book page (Phase 4) should read these params. Guests 1 to 4 (`src/data/booking.js`).
- P2: Home shows 3 featured rooms (Deluxe Marina, Junior Suite, Presidential) and links to /rooms.
- P3: Rooms filter (All, Deluxe, Suites, Family) is kept in the URL as `?type=Suite`, so filtered views can be linked.
- P3: Room detail "Book this room" links to `/book?room=<id>`. Book page (Phase 4) should preselect it. Unknown room ids show an in-page "not found" message.
- P3: Only room 1 has a multi-photo gallery (the only gallery images in the brief). Other rooms show one large photo, no controls. `gallery` entries are `{ src, alt, label }`.
- P3: Facilities copy (hours, pool size, spa, 24h gym, Lagoon Terrace for 180, events@marinacrest.example) in `src/data/facilities.js`. Gym and events have no image in the brief, so they use the designed fallback with a label.
- P3: Rooms page note: rates are per night for two guests with breakfast.

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Shared components in `src/components/`: Header, Footer, Img (`ratio`, `label`, `eager`), Button (`to`/`href`, variants primary/brass/outline/light, size sm), Section (`eyebrow`, `title`, `intro`, `tone` default/surface/teal, `wide`), PageTitle (`title`, `description`). `PageStub` is a temporary placeholder: remove when all pages are built.
- P2 added: `Reveal` (scroll fade-up, `as`, `delay`), `Icon` (inline SVG: pool, spa, gym, events, arrow, star, calendar, guests), `AvailabilityBar`, and `src/lib/dates.js` (`today`, `addDays`, `nightsBetween`, `validateStay`). Reuse them in Phase 3 and 4.
- P3 added: `PageIntro` (inner-page h1 block: `eyebrow`, `title`, `titleItalic`, `intro`, children), `RoomCard` (shared with Home, styles in `RoomCard.css`), `RoomGallery`. Use `PageIntro` for Dining, Offers and Book.
- Utility classes in `base.css`: `.container`, `.container--wide`, `.eyebrow`, `.lead`, `.fade-up`, `.visually-hidden`.
