export default function Logo() {
  return (
    <span className="logo">
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M12 19l8-9 8 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 27c4.3-3.4 8.7-3.4 13 0s8.7 3.4 13 0" fill="none" stroke="var(--color-brass)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">Marina Crest</span>
        <span className="logo__sub">Hotel · Lagos</span>
      </span>
    </span>
  )
}
