import { Suspense } from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import catalogData from '@/data/catalog.json'

const PER_PAGE = 24

type Product = {
  id: string
  name: string
  price: string
  img: string
  col: string[]
  sku: string
  ribbon: string
}

const ALL: Product[] = catalogData as Product[]

function imgUrl(id: string) {
  if (!id) return null
  return `https://static.wixstatic.com/media/${id}/v1/fill/w_400,h_400,al_c,q_80,enc_avif,quality_auto/gem.jpg`
}

function filterProducts(q: string, col: string) {
  return ALL.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase())
    const matchCol = !col || p.col.some(c => c.includes(col))
    return matchQ && matchCol
  })
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; col?: string; page?: string }>
}) {
  const { q = '', col = '', page = '1' } = await searchParams
  const filtered = filterProducts(q, col)
  const total = filtered.length
  const totalPages = Math.ceil(total / PER_PAGE)
  const current = Math.max(1, Math.min(Number(page), totalPages))
  const products = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const makeHref = (p: number) => {
    const ps = new URLSearchParams()
    if (q) ps.set('q', q)
    if (col) ps.set('col', col)
    ps.set('page', String(p))
    return `/catalog?${ps}`
  }

  return (
    <>
      <div style={{ background: 'var(--ink)', color: 'var(--white)', padding: '5rem 3.5rem 3rem', marginTop: 72 }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.9rem' }}>
          {total.toLocaleString()} Stones
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.05 }}>
          Full <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Catalog</em>
        </h1>
      </div>

      <div style={{ padding: '3rem 3.5rem', background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <Suspense>
          <SearchBar q={q} col={col} />
        </Suspense>
      </div>

      <section style={{ padding: '3rem 3.5rem', background: 'var(--cream)', minHeight: '60vh' }}>
        {products.length === 0 ? (
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', textAlign: 'center', padding: '4rem 0' }}>No products match your search.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {products.map(p => {
              const src = imgUrl(p.img)
              return (
                <div
                  key={p.id}
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ aspectRatio: '1', background: 'var(--cream2)', overflow: 'hidden', position: 'relative' }}>
                    {p.ribbon && (
                      <span style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: 'var(--ink)', color: 'var(--white)', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', zIndex: 2 }}>
                        {p.ribbon}
                      </span>
                    )}
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2rem', opacity: 0.2 }}>✦</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {p.col[0] && (
                      <p style={{ fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                        {p.col[0].replace('/ Lots', '').trim()}
                      </p>
                    )}
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.3, flex: 1 }}>
                      {p.name}
                    </p>
                    {p.sku && (
                      <p style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: 'var(--muted2)', textTransform: 'uppercase' }}>
                        {p.sku}
                      </p>
                    )}
                    {p.price && (
                      <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--ink)', marginTop: '0.3rem' }}>
                        ${p.price}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {current > 1 && (
              <Link href={makeHref(current - 1)} style={pgStyle(false)}>← Prev</Link>
            )}
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              const p = current <= 4
                ? i + 1
                : current >= totalPages - 3
                  ? totalPages - 6 + i
                  : current - 3 + i
              if (p < 1 || p > totalPages) return null
              return (
                <Link key={p} href={makeHref(p)} style={pgStyle(p === current)}>{p}</Link>
              )
            })}
            {current < totalPages && (
              <Link href={makeHref(current + 1)} style={pgStyle(false)}>Next →</Link>
            )}
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--muted2)', textTransform: 'uppercase' }}>
          Page {current} of {totalPages} · {total.toLocaleString()} products
        </p>
      </section>
    </>
  )
}

const pgStyle = (active: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 36,
  height: 36,
  padding: '0 0.6rem',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  border: '1px solid',
  borderColor: active ? 'var(--ink)' : 'var(--border)',
  background: active ? 'var(--ink)' : 'transparent',
  color: active ? 'var(--white)' : 'var(--ink)',
  textDecoration: 'none',
  fontFamily: 'inherit',
})
