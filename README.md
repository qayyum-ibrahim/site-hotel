# Marina Crest Hotel

A front-end demo website for a fictional waterfront hotel in Lagos. Vite + React + React Router, plain CSS.
Demo project. This is not a real business: there is no backend, no payments and no data is sent anywhere.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Every push to `main` deploys to Vercel. `vercel.json` rewrites all paths to `index.html`.

## Add real photos

Put the files in `public/images/` with these exact names:

| File | Used on |
| --- | --- |
| `hero.jpg` | Home hero |
| `pool.jpg` | Home amenities, Facilities, Offers |
| `spa.jpg` | Home amenities, Facilities, Offers |
| `restaurant.jpg` | Home dining teaser, Dining |
| `room-1.jpg` to `room-6.jpg` | Room cards, room pages, booking flow |
| `room-1-b.jpg`, `room-1-c.jpg` | Extra gallery photos for room 1 (Deluxe Marina Room); `room-1-c` also on Offers |

Any missing image shows a designed teal and brass placeholder, so the site works with no photos. See `IMAGE-PROMPTS.md` for the prompt of each image.

## Edit the content

All copy and data live in `src/data/`:

- `site.js`: name, address, phone, email, navigation, footer note
- `home.js`: home page copy, stats, amenities and reviews
- `rooms.js`: the 6 rooms (name, type, price, size, beds, view, amenities, gallery)
- `facilities.js`: pool, spa, gym and events
- `dining.js`: Tide and The Brass Bar, with hours
- `offers.js`: the 3 packages
- `booking.js`: booking steps, guest counts and notes

Colors, fonts and spacing are CSS variables in `src/styles/tokens.css`.
