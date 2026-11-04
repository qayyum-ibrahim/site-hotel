export const facilitiesPage = {
  eyebrow: 'Facilities',
  title: 'Slow days,',
  titleItalic: 'well spent.',
  intro: 'A pool over the lagoon, a quiet spa, a studio that never closes and a terrace for the days worth remembering. All for hotel guests.',
}

export const facilities = [
  {
    id: 'pool',
    icon: 'pool',
    eyebrow: 'The pool',
    title: 'An infinity edge over the lagoon.',
    text: 'Our heated pool runs the full length of the terrace, so the water seems to meet the lagoon. Come early for a quiet swim at sunrise, or stay for the light in the late afternoon.',
    image: '/images/pool.jpg',
    imageAlt: 'Infinity pool at sunrise with white loungers and folded towels, overlooking the lagoon',
    label: 'The pool',
    details: [
      { label: 'Hours', value: '6am to 9pm' },
      { label: 'Length', value: '32 metres, heated' },
      { label: 'Service', value: 'Towels, loungers and poolside menu' },
    ],
  },
  {
    id: 'spa',
    icon: 'spa',
    eyebrow: 'The Spa',
    title: 'Unhurried rituals, in teal and ivory.',
    text: 'Four treatment rooms, a steam room and a relaxation lounge with views of the garden. Treatments use oils made with shea and moringa, and every one starts with a warm foot bath.',
    image: '/images/spa.jpg',
    imageAlt: 'Quiet spa treatment room with a massage bed, stacked towels, candles and orchids',
    label: 'The Spa',
    details: [
      { label: 'Hours', value: '9am to 9pm' },
      { label: 'Rooms', value: 'Four treatment rooms and a steam room' },
      { label: 'Bookings', value: 'At reception or by phone' },
    ],
  },
  {
    id: 'gym',
    icon: 'gym',
    eyebrow: 'Fitness studio',
    title: 'Open day and night.',
    text: 'A bright studio with modern cardio machines, free weights and a stretching corner. On weekday mornings a teacher leads yoga on the pool deck as the sun comes up.',
    image: null,
    imageAlt: 'Fitness studio with cardio machines and free weights',
    label: 'Fitness studio',
    details: [
      { label: 'Hours', value: 'Open 24 hours' },
      { label: 'Yoga', value: 'Weekdays at 6:30am, on the pool deck' },
      { label: 'Extras', value: 'Personal training on request' },
    ],
  },
  {
    id: 'events',
    icon: 'events',
    eyebrow: 'Events',
    title: 'Dinners, weddings and quiet meetings.',
    text: 'The Lagoon Terrace seats up to 180 under the open sky. Two private rooms suit board meetings and family dinners. Our events team plans every detail, from flowers to the last car home.',
    image: null,
    imageAlt: 'The Lagoon Terrace set for an evening event by the water',
    label: 'The Lagoon Terrace',
    details: [
      { label: 'Terrace', value: 'Up to 180 guests' },
      { label: 'Private rooms', value: 'Two rooms, 12 to 40 guests' },
      { label: 'Contact', value: 'events@marinacrest.example' },
    ],
  },
]

export const facilitiesCta = {
  title: 'Every facility is included in your stay.',
  text: 'Spa treatments and private events are booked separately. Ask us anything before you arrive.',
}
