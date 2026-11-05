# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Site: Marina Crest Hotel (Hotel Website)
- Last completed phase: Phase 5
- Next phase: none. Site complete.
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold, deploy and design system
- [x] Phase 2: Home page
- [x] Phase 3: Main feature pages
- [x] Phase 4: Remaining pages
- [x] Phase 5: Polish and hand-off

**Site complete.**

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
- P4: Dining copy (Tide menu and hours split into breakfast/lunch/dinner, Brass Bar drinks, live music Fridays, dress and age notes) in `src/data/dining.js`. The Brass Bar has no image in the brief, so it uses the fallback with a label.
- P4: Offers page reuses brief images (room-1-c, spa, pool). Added `details`, `unit`, `terms` and image fields to `src/data/offers.js`. "Book this offer" links to `/book` (no offer pricing in the booking flow).
- P4: Book flow: 4 steps (Dates, Room, Guest details, Summary) then a confirmation screen with a random `MC-XXXXXX` reference. Reads `checkIn`, `checkOut`, `guests`, `room` from the URL; valid dates skip to the Room step. Rooms too small for the guest count are disabled. Total = nightly rate × nights, taxes included. No payment, no network calls.
- P4: Guest form validates names, email, phone (7+ digits) and terms checkbox. Arrival time and requests are optional.
- P4: Not-found page ("Lost at sea, briefly.") on the `*` route. `PageStub` removed.
- P5: `--color-muted` darkened from #6b7478 to #616a6e and `--color-brass-dark` to #81622f so small text passes WCAG AA (4.5:1) on the cream background. Brief colors are otherwise unchanged.
- P5: Focus ring uses brass-dark on light grounds (brass was under 3:1 on cream) and brass on teal grounds (hero, teal sections, footer).
- P5: Fixed booking page overflow at 360px (date inputs stretched the grid). Grids now use `minmax(0, 1fr)`; room thumbnail in the booking list is 4.5rem on mobile.

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Owner: run `/site-done hotel <live url>` in the projects folder.
- P5 checked: every route at 360, 768 and 1280 (headless Chrome), no console errors, no broken internal links, titles and meta per route, no layout shift with missing images. README.md explains run, photos and content files.
- Shared components in `src/components/`: Header, Footer, Img (`ratio`, `label`, `eager`), Button (`to`/`href`, variants primary/brass/outline/light, size sm), Section (`eyebrow`, `title`, `intro`, `tone` default/surface/teal, `wide`), PageTitle (`title`, `description`). 
- P2 added: `Reveal` (scroll fade-up, `as`, `delay`), `Icon` (inline SVG: pool, spa, gym, events, arrow, star, calendar, guests), `AvailabilityBar`, and `src/lib/dates.js` (`today`, `addDays`, `nightsBetween`, `validateStay`). Reuse them in Phase 3 and 4.
- P3 added: `PageIntro` (inner-page h1 block: `eyebrow`, `title`, `titleItalic`, `intro`, children), `RoomCard` (shared with Home, styles in `RoomCard.css`), `RoomGallery`. Use `PageIntro` for Dining, Offers and Book.
- P4 added: `Field` (inside `Book.jsx`) and `.field` styles in `Book.css`. Phase 5 should test the booking flow by keyboard and at 360px.
- Utility classes in `base.css`: `.container`, `.container--wide`, `.eyebrow`, `.lead`, `.fade-up`, `.visually-hidden`.
