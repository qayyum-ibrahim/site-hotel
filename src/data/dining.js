export const diningPage = {
  eyebrow: 'Dining',
  title: 'Two tables',
  titleItalic: 'by the water.',
  intro: 'Breakfast in the morning light, long lunches over the lagoon and slow cocktails as the boats come in. Both venues are open to hotel guests and visitors.',
}

export const venues = [
  {
    id: 'tide',
    eyebrow: 'Restaurant',
    name: 'Tide',
    open: '7am to 11pm',
    title: 'Coastal cooking, fresh from the lagoon.',
    text: [
      'Tide serves coastal West African cooking with the day’s catch: grilled prawns with yaji butter, pepper soup with fresh fish and jollof cooked slowly over wood.',
      'Large windows open onto the water, and on clear evenings the tables move out to the terrace.',
    ],
    image: '/images/restaurant.jpg',
    imageAlt: 'Hotel restaurant with large windows over the water, white tablecloths and brass lights',
    label: 'Tide',
    hours: [
      { label: 'Breakfast', value: '7am to 10:30am' },
      { label: 'Lunch', value: '12pm to 3pm' },
      { label: 'Dinner', value: '6:30pm to 11pm' },
    ],
    note: 'Smart casual. Tables for dinner can be reserved at reception.',
  },
  {
    id: 'brass-bar',
    eyebrow: 'Terrace bar',
    name: 'The Brass Bar',
    open: '4pm to 1am',
    title: 'Slow cocktails as the lights come on.',
    text: [
      'A long brass counter and low chairs on the terrace. The menu leans on local fruit and spice: zobo spritz, palm wine sours and a hibiscus negroni.',
      'Small plates come from the Tide kitchen, and on Fridays a trio plays soft highlife from nine.',
    ],
    image: null,
    imageAlt: 'The Brass Bar terrace at dusk with low chairs and a brass counter',
    label: 'The Brass Bar',
    hours: [
      { label: 'Daily', value: '4pm to 1am' },
      { label: 'Small plates', value: '5pm to 11pm' },
      { label: 'Live music', value: 'Fridays from 9pm' },
    ],
    note: 'No reservations. Guests over 18 after 9pm.',
  },
]

export const diningCta = {
  title: 'Breakfast at Tide is included with every stay.',
  text: 'Room service runs day and night, with a short menu from both kitchens.',
}
