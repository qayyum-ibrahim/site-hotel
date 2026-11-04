import './PageIntro.css'

// Opening block of an inner page: eyebrow, the page h1 and a short lead.
export default function PageIntro({ eyebrow, title, titleItalic, intro, children }) {
  return (
    <header className="page-intro container container--wide">
      <div className="page-intro__head">
        {eyebrow && <p className="eyebrow fade-up">{eyebrow}</p>}
        <h1 className="page-intro__title fade-up">
          {title} {titleItalic && <em>{titleItalic}</em>}
        </h1>
      </div>
      {(intro || children) && (
        <div className="page-intro__side fade-up">
          {intro && <p className="lead">{intro}</p>}
          {children}
        </div>
      )}
    </header>
  )
}
