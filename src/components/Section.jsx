import './Section.css'

export default function Section({ eyebrow, title, intro, tone = 'default', wide = false, id, className = '', children }) {
  const titleId = id ? `${id}-title` : undefined
  return (
    <section id={id} className={`section section--${tone} ${className}`.trim()} aria-labelledby={title ? titleId : undefined}>
      <div className={wide ? 'container container--wide' : 'container'}>
        {(eyebrow || title || intro) && (
          <header className="section__head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 id={titleId}>{title}</h2>}
            {intro && <p className="lead">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
