import { useState } from 'react'
import './Img.css'

export default function Img({ src, alt, ratio = '3 / 2', label, className = '', eager = false }) {
  const [failed, setFailed] = useState(!src)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`img ${loaded ? 'is-loaded' : ''} ${className}`.trim()} style={{ aspectRatio: ratio }}>
      <div className="img__fallback" role={failed ? 'img' : undefined} aria-label={failed ? alt : undefined} aria-hidden={failed ? undefined : true}>
        <svg className="img__mark" viewBox="0 0 120 60" aria-hidden="true">
          <path d="M44 30l16-17 16 17" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 44c13.3-9 26.7-9 40 0s26.7 9 40 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {label && <span className="img__label">{label}</span>}
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
