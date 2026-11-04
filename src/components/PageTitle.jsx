import { useEffect } from 'react'
import { site } from '../data/site.js'

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el && value) el.setAttribute(attr, value)
}

export default function PageTitle({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} · ${site.fullName}` : `${site.fullName} · Waterfront stays in Lagos`
    document.title = full
    setMeta('meta[property="og:title"]', 'content', full)
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:description"]', 'content', description)
  }, [title, description])
  return null
}
