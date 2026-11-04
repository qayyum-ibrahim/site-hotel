// Dates are handled as local "YYYY-MM-DD" strings, the format of <input type="date">.
export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(iso, days) {
  const [y, m, d] = iso.split('-').map(Number)
  return toISODate(new Date(y, m - 1, d + days))
}

export function today() {
  return toISODate(new Date())
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const a = new Date(`${checkIn}T00:00:00`)
  const b = new Date(`${checkOut}T00:00:00`)
  return Math.round((b - a) / 86400000)
}

export function validateStay({ checkIn, checkOut }) {
  const errors = {}
  if (!checkIn) errors.checkIn = 'Choose a check-in date.'
  else if (checkIn < today()) errors.checkIn = 'Check-in cannot be in the past.'
  if (!checkOut) errors.checkOut = 'Choose a check-out date.'
  else if (checkIn && checkOut <= checkIn) errors.checkOut = 'Check-out must be after check-in.'
  return errors
}
