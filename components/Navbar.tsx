'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

// ─── Mega-menu data ───────────────────────────────────────────────────────────
const MEGA: Record<string, {
  eyebrow: string
  links: { label: string; href?: string; sub?: boolean }[]
  promo: { label: string; title: string; gemClass: string; href?: string }
}> = {
  shop: {
    eyebrow: 'Volume 07 · Spring Edit',
    links: [
      { label: 'New Arrivals', href: 'https://www.gemsindia.co.in' },
      { label: 'Gem Stones', href: 'https://www.gemsindia.co.in/gemstones', sub: true },
      { label: 'Large Specimens', href: 'https://www.gemsindia.co.in/largegemstones', sub: true },
      { label: 'Sculptures', href: 'https://www.gemsindia.co.in/sculptures', sub: true },
      { label: 'Jewellery', href: 'https://www.gemsindia.co.in/jewelry', sub: true },
      { label: 'Metaphysical', href: 'https://www.gemsindia.co.in/metaphysical', sub: true },
      { label: 'Tools & Accessories', href: 'https://www.gemsindia.co.in', sub: true },
      { label: 'Bespoke Commissions', sub: true },
    ],
    promo: { label: 'Featured', title: "Pigeon's Blood Ruby · 21.5ct", gemClass: 'gem-ruby', href: 'https://www.gemsindia.co.in/gemstones' },
  },
  rough: {
    eyebrow: 'As mined · Uncut',
    links: [
      { label: 'All Rough Stones', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Ruby Rough', sub: true },
      { label: 'Emerald Rough', sub: true },
      { label: 'Sapphire Rough', sub: true },
      { label: 'Tourmaline Rough', sub: true },
      { label: 'Quartz & Crystals', sub: true },
      { label: 'Mineral Specimens', sub: true },
    ],
    promo: { label: 'Specimen', title: 'Amethyst Geode · 2.5 Kg', gemClass: 'gem-amethyst', href: 'https://www.gemsindia.co.in' },
  },
  wholesale: {
    eyebrow: 'Trade & Bulk Orders',
    links: [
      { label: 'Wholesale Enquiry', href: 'https://www.gemsindia.co.in/wholesale' },
      { label: 'Trade Pricing', sub: true },
      { label: 'Bulk Orders', sub: true },
      { label: 'Designer Programme', sub: true },
      { label: 'Email: gemsindia@ymail.com', href: 'mailto:gemsindia@ymail.com', sub: true },
      { label: 'Phone: +91 98100 11169', href: 'tel:+919810011169', sub: true },
    ],
    promo: { label: 'Trade', title: 'Wholesale Pricing for Designers & Dealers', gemClass: 'gem-citrine', href: 'https://www.gemsindia.co.in/wholesale' },
  },
  gemlab: {
    eyebrow: 'Kikan Gem Certification Lab',
    links: [
      { label: 'About KGCL', href: 'https://www.gemsindia.co.in' },
      { label: 'Gem Certification', sub: true },
      { label: 'Origin Reports', sub: true },
      { label: 'Treatment Reports', sub: true },
      { label: 'Submit a Stone', sub: true },
      { label: 'Pricing from ₹1,500', sub: true },
    ],
    promo: { label: 'Lab', title: 'In-house KGCL · Complimentary on every purchase', gemClass: 'gem-sapphire', href: 'https://www.gemsindia.co.in' },
  },
}

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mega on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openMega = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(key)
  }
  const startClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 160)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const data = megaOpen ? MEGA[megaOpen] : null

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────────────────────── */}
      <div style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center', gap: '24px',
          padding: '10px clamp(20px,4vw,64px)',
          maxWidth: 'var(--maxw)', margin: '0 auto',
          fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase',
        }}>
          <span style={{ opacity: 0.85 }}>Worldwide Shipping</span>
          <span style={{ textAlign: 'center' }}>New Delhi, India</span>
          <span style={{ textAlign: 'right', opacity: 0.85 }}>
            <a href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}>Shop Now →</a>
          </span>
        </div>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav ref={navRef} style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--paper)',
        borderBottom: '1px solid var(--hair)',
        transition: 'box-shadow 0.3s',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center', padding: '18px clamp(20px,4vw,64px)', gap: '24px',
          maxWidth: 'var(--maxw)', margin: '0 auto',
        }}>
          {/* Left links */}
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="nav-left-links">
            {(['shop', 'rough', 'wholesale', 'gemlab'] as const).map((key) => (
              <button key={key}
                onMouseEnter={() => openMega(key)}
                onMouseLeave={startClose}
                onFocus={() => openMega(key)}
                onClick={() => setMegaOpen(v => v === key ? null : key)}
                style={{
                  fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontWeight: 500, color: megaOpen === key ? 'var(--rust)' : 'var(--ink)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontFamily: 'var(--sans)', transition: 'color 0.2s',
                }}
                onMouseOver={e => { if (megaOpen !== key) (e.currentTarget as HTMLButtonElement).style.color = 'var(--rust)' }}
                onMouseOut={e => { if (megaOpen !== key) (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)' }}
              >
                {{ shop: 'Shop', rough: 'Rough Stones', wholesale: 'Wholesale', gemlab: 'Gem Lab' }[key]}
              </button>
            ))}
          </div>

          {/* Center logo */}
          <Link href="/" style={{
            fontFamily: 'var(--display)', fontSize: '28px',
            letterSpacing: '0.32em', color: 'var(--ink)',
            textDecoration: 'none', paddingLeft: '0.32em',
            whiteSpace: 'nowrap',
          }}>
            GEMS INDIA
          </Link>

          {/* Right actions */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'flex-end' }} className="nav-right-links">
            <a href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--rust)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--ink)')}
            >Search</a>
            <a href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--rust)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--ink)')}
            >Account</a>
            <a href="https://www.gemsindia.co.in/wholesale" target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--rust)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--ink)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-7-4.5-7-10.5C5 7 7.5 5 10 5c1.5 0 2.5.7 2 1.6C12.5 5.7 13.5 5 15 5c2.5 0 5 2 5 5.5C20 16.5 12 21 12 21z" />
              </svg>
              Wishlist
            </a>
            <a href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--paper)', background: 'var(--rust)', padding: '8px 18px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              Bag
              <span style={{ background: 'rgba(244,239,230,0.25)', borderRadius: '999px', fontSize: '10px', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', letterSpacing: 0 }}>0</span>
            </a>

            {/* Hamburger */}
            <button className="hamburger-btn" onClick={() => setMobileOpen(v => !v)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', padding: '2px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mega-menu panel ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {megaOpen && data && (
            <motion.div
              key={megaOpen}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={startClose}
              style={{
                position: 'absolute', top: '100%', left: 0,
                width: 'min(82vw, 860px)',
                background: 'var(--paper)',
                borderRight: '1px solid var(--hair)',
                borderBottom: '1px solid var(--hair)',
                display: 'grid', gridTemplateColumns: '200px 1fr 260px',
                boxShadow: '8px 8px 40px rgba(26,22,17,0.12)',
                zIndex: 300,
              }}
            >
              {/* Category label */}
              <div style={{ padding: '36px 28px', borderRight: '1px solid var(--hair)', background: 'var(--paper-2)' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: 20, fontFamily: 'var(--sans)', fontWeight: 500 }}>{data.eyebrow}</p>
                {(['shop', 'rough', 'wholesale', 'gemlab'] as const).map((key) => (
                  <button key={key} onClick={() => setMegaOpen(key)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                      fontWeight: 500, color: megaOpen === key ? 'var(--rust)' : 'var(--ink-soft)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '7px 0', fontFamily: 'var(--sans)',
                      borderLeft: megaOpen === key ? '2px solid var(--rust)' : '2px solid transparent',
                      paddingLeft: 12, transition: 'color 0.15s, border-color 0.15s',
                    }}
                    onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)' }}
                    onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.color = megaOpen === key ? 'var(--rust)' : 'var(--ink-soft)' }}
                  >
                    {{ shop: 'Shop', rough: 'Rough Stones', wholesale: 'Wholesale', gemlab: 'Gem Lab' }[key]}
                  </button>
                ))}
              </div>

              {/* Links */}
              <div style={{ padding: '36px 40px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: 24, fontFamily: 'var(--sans)', fontWeight: 500 }}>Browse</p>
                {data.links.map((link, i) => (
                  <a key={i} href={link.href ?? '#'}
                    target={link.href?.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    onClick={() => setMegaOpen(null)}
                    style={{
                      display: 'block',
                      fontSize: link.sub ? '11px' : '12px',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      fontWeight: link.sub ? 400 : 500,
                      color: link.sub ? 'var(--ink-soft)' : 'var(--ink)',
                      padding: '6px 0',
                      textDecoration: 'none',
                      borderBottom: i < data.links.length - 1 ? '1px solid rgba(217,207,190,0.4)' : 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--rust)')}
                    onMouseOut={e => (e.currentTarget.style.color = link.sub ? 'var(--ink-soft)' : 'var(--ink)')}
                  >{link.label}</a>
                ))}
              </div>

              {/* Promo image */}
              <a href={data.promo.href ?? '#'} target="_blank" rel="noreferrer"
                onClick={() => setMegaOpen(null)}
                style={{ position: 'relative', display: 'block', overflow: 'hidden', textDecoration: 'none' }}
              >
                <div className={data.promo.gemClass} style={{ position: 'absolute', inset: 0 }}>
                  <div className="gem-overlay" />
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(26,22,17,0.7) 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 28, left: 24, color: 'var(--paper)', zIndex: 2 }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 6, fontFamily: 'var(--sans)' }}>{data.promo.label}</p>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 300, lineHeight: 1.3 }}>{data.promo.title}</p>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrim */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMegaOpen(null)}
              style={{ position: 'fixed', inset: 0, top: '100%', background: 'rgba(26,22,17,0.3)', zIndex: 199 }}
            />
          )}
        </AnimatePresence>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(26,22,17,0.4)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed', top: '112px', left: 0, right: 0, zIndex: 195,
                background: 'var(--paper)', borderBottom: '1px solid var(--hair)',
                padding: '2rem clamp(20px,4vw,64px) 2.5rem',
              }}
            >
              {['Shop', 'Rough Stones', 'Wholesale', 'Gem Lab'].map(label => (
                <a key={label} href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', padding: '1rem 0', borderBottom: '1px solid var(--hair)',
                    fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'var(--ink)', textDecoration: 'none', fontWeight: 500,
                  }}
                >{label}</a>
              ))}
              <a href="https://www.gemsindia.co.in/wholesale" target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-block', marginTop: '1.5rem',
                  fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  background: 'var(--ink)', color: 'var(--paper)', padding: '0.9rem 2rem', textDecoration: 'none', fontWeight: 500,
                }}
              >Wholesale</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-left-links { display: none !important; }
          .nav-right-links > a { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
