const paths = {
  pool: (
    <>
      <path d="M8 22V8a3 3 0 0 1 6 0M18 22V8a3 3 0 0 1 6 0" />
      <path d="M8 13h10M8 18h10" />
      <path d="M3 26c2.3-1.6 4.7-1.6 7 0s4.7 1.6 7 0 4.7-1.6 7 0 4.7 1.6 6 .6" />
    </>
  ),
  spa: (
    <>
      <path d="M16 25c-5-2.5-8-6.5-8-11 3.5.4 6.2 2 8 4.6 1.8-2.6 4.5-4.2 8-4.6 0 4.5-3 8.5-8 11Z" />
      <path d="M16 18.6C14.6 15 14.8 11 16 7c1.2 4 1.4 8 0 11.6" />
    </>
  ),
  gym: (
    <>
      <path d="M5 12v8M9 9v14M23 9v14M27 12v8" />
      <path d="M9 16h14" />
    </>
  ),
  events: (
    <>
      <path d="M7 5h8v5a4 4 0 0 1-8 0V5ZM11 14v10M7 24h8" />
      <path d="M17 5h8v5a4 4 0 0 1-8 0V5ZM21 14v10M17 24h8" />
    </>
  ),
  arrow: <path d="M5 16h22M20 9l7 7-7 7" />,
  star: <path d="M16 4l3.5 7.6 8.3.9-6.2 5.6 1.8 8.2L16 22.1l-7.4 4.2 1.8-8.2-6.2-5.6 8.3-.9L16 4Z" />,
  calendar: (
    <>
      <rect x="5" y="7" width="22" height="20" rx="1.5" />
      <path d="M5 13h22M11 4v6M21 4v6" />
    </>
  ),
  guests: (
    <>
      <circle cx="13" cy="11" r="4.5" />
      <path d="M5 26c0-4.4 3.6-8 8-8s8 3.6 8 8M21 6.8a4.5 4.5 0 0 1 0 8.4M23 18.5c2.4 1.2 4 3.7 4 6.5" />
    </>
  ),
}

export default function Icon({ name, size = 28, className = '' }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
