'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'

const COLLECTIONS = [
  { label: 'All', value: '' },
  { label: 'Loose Gemstones', value: 'Loose Gemstones' },
  { label: 'Large Gemstones', value: 'Large Gemstones' },
  { label: 'Gemstones', value: 'Gemstones' },
  { label: 'Elite Translucent', value: 'Elite Translucent Gems' },
  { label: 'Loose Beads', value: 'Loose Beads' },
  { label: 'Spheres', value: 'Spheres' },
  { label: 'Museum Grade', value: 'Huge Museum Size' },
  { label: 'Carved', value: 'Carved Masterpieces' },
  { label: 'Sculptures', value: 'Sculptures' },
]

export default function SearchBar({ q, col }: { q: string; col: string }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [search, setSearch] = useState(q)

  useEffect(() => { setSearch(q) }, [q])

  const navigate = (newQ: string, newCol: string) => {
    const params = new URLSearchParams()
    if (newQ) params.set('q', newQ)
    if (newCol) params.set('col', newCol)
    startTransition(() => router.push(`/catalog?${params}`))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Search */}
      <input
        type="text"
        value={search}
        placeholder="Search gemstones…"
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && navigate(search, col)}
        style={{
          width: '100%',
          maxWidth: 480,
          padding: '0.75rem 1.2rem',
          border: '1.5px solid var(--border-dark)',
          background: 'var(--white)',
          fontSize: '0.82rem',
          letterSpacing: '0.04em',
          color: 'var(--ink)',
          outline: 'none',
          fontFamily: 'inherit',
        }}
      />
      {/* Collection tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {COLLECTIONS.map(c => (
          <button
            key={c.value}
            onClick={() => navigate(search, c.value)}
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.45rem 1rem',
              border: '1px solid',
              borderColor: col === c.value ? 'var(--ink)' : 'var(--border)',
              background: col === c.value ? 'var(--ink)' : 'transparent',
              color: col === c.value ? 'var(--white)' : 'var(--muted2)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
