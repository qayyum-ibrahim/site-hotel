import PageTitle from './PageTitle.jsx'

export default function PageStub({ title, heading, description }) {
  return (
    <div className="container" style={{ paddingBlock: 'var(--section-y)', minHeight: '60vh' }}>
      <PageTitle title={title} description={description} />
      <p className="eyebrow">Marina Crest Hotel</p>
      <h1 className="fade-up" style={{ marginTop: 'var(--space-4)' }}>
        {heading}
      </h1>
    </div>
  )
}
