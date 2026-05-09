'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '0 3.5rem', height: '72px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      transition: 'box-shadow 0.3s',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
    }}>
      <Link href="/" style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: '1.55rem', fontWeight: 400,
        letterSpacing: '0.08em', color: 'var(--ink)', textDecoration: 'none',
      }}>
        Gems<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>India</span>
      </Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
        {['Collections', 'Gemstones', 'Jewelry', 'About', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--muted)', textDecoration: 'none', fontWeight: 400,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >{item}</a>
          </li>
        ))}
      </ul>

      <a href="https://www.gemsindia.co.in/wholesale" target="_blank" rel="noreferrer" style={{
        fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase',
        background: 'var(--ink)', color: 'var(--white)', padding: '0.6rem 1.6rem',
        textDecoration: 'none', fontWeight: 500, transition: 'background 0.25s',
      }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
      >Wholesale</a>
    </nav>
  )
}
