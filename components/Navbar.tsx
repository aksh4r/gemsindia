'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

// ─── Mega-menu data ───────────────────────────────────────────────────────────
const MEGA: Record<string, {
  categories: string[]
  links: { label: string; href?: string }[]
  promo: { label: string; title: string; gemClass: string; href?: string }
}> = {
  shop: {
    categories: ['Gemstones', 'Jewellery', 'Sculptures', 'Metaphysical'],
    links: [
      { label: 'All Gemstones', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Ruby & Spinel', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Emerald & Tsavorite', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Blue Sapphire', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Tourmaline', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Aquamarine & Beryl', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Opal & Moonstone', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Bespoke Commissions', href: 'https://www.gemsindia.co.in' },
    ],
    promo: { label: 'Featured', title: "Pigeon's Blood Ruby · 21.5 ct", gemClass: 'gem-ruby', href: 'https://www.gemsindia.co.in/gemstones' },
  },
  rough: {
    categories: ['Ruby', 'Emerald', 'Sapphire', 'Tourmaline', 'Quartz'],
    links: [
      { label: 'All Rough Stones', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Ruby Rough', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Emerald Rough', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Sapphire Rough', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Tourmaline Rough', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Quartz & Crystals', href: 'https://www.gemsindia.co.in/gemstones' },
      { label: 'Mineral Specimens', href: 'https://www.gemsindia.co.in/gemstones' },
    ],
    promo: { label: 'Specimen', title: 'Amethyst Geode · 2.5 Kg', gemClass: 'gem-amethyst', href: 'https://www.gemsindia.co.in' },
  },
  wholesale: {
    categories: ['Trade Enquiry', 'Bulk Orders', 'Designer Programme'],
    links: [
      { label: 'Wholesale Overview', href: 'https://www.gemsindia.co.in/wholesale' },
      { label: 'Trade Pricing', href: 'https://www.gemsindia.co.in/wholesale' },
      { label: 'Minimum Order Quantities', href: 'https://www.gemsindia.co.in/wholesale' },
      { label: 'Designer Membership', href: 'https://www.gemsindia.co.in/wholesale' },
      { label: 'gemsindia@ymail.com', href: 'mailto:gemsindia@ymail.com' },
      { label: '+91 98100 11169', href: 'tel:+919810011169' },
    ],
    promo: { label: 'Trade', title: 'Wholesale Pricing for Designers & Dealers', gemClass: 'gem-citrine', href: 'https://www.gemsindia.co.in/wholesale' },
  },
  gemlab: {
    categories: ['Certification', 'Origin Reports', 'Treatment Analysis', 'Submit a Stone'],
    links: [
      { label: 'About KGCL', href: 'https://www.gemsindia.co.in' },
      { label: 'Gem Certification', href: 'https://www.gemsindia.co.in' },
      { label: 'Country of Origin', href: 'https://www.gemsindia.co.in' },
      { label: 'Heat Treatment Reports', href: 'https://www.gemsindia.co.in' },
      { label: 'Submit a Stone', href: 'https://www.gemsindia.co.in' },
      { label: 'Pricing from ₹1,500', href: 'https://www.gemsindia.co.in' },
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

  const data = megaOpen && MEGA[megaOpen] ? MEGA[megaOpen] : null

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
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: 'tween', duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={startClose}
              style={{
                position: 'absolute', top: '100%', left: 0, right: 0,
                background: 'var(--paper)',
                borderBottom: '1px solid var(--hair)',
                display: 'grid', gridTemplateColumns: '260px 1fr 300px',
                boxShadow: '0 12px 48px rgba(26,22,17,0.10)',
                zIndex: 300,
              }}
            >
              {/* Left — large display category names */}
              <div style={{ padding: '44px 40px 44px 48px' }}>
                {data.categories.map((cat, i) => (
                  <p key={i} style={{
                    fontFamily: 'var(--display)',
                    fontSize: '26px',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: 1.15,
                    color: i === 0 ? 'var(--ink)' : 'var(--taupe)',
                    marginBottom: 14,
                    cursor: 'default',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseOut={e => (e.currentTarget.style.color = i === 0 ? 'var(--ink)' : 'var(--taupe)')}
                  >{cat}</p>
                ))}
              </div>

              {/* Middle — sub-links */}
              <div style={{ padding: '44px 40px', borderLeft: '1px solid var(--hair)' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: 28, fontFamily: 'var(--sans)', fontWeight: 500 }}>Browse</p>
                {data.links.map((link, i) => (
                  <a key={i} href={link.href ?? '#'}
                    target={link.href?.startsWith('http') || link.href?.startsWith('mailto') || link.href?.startsWith('tel') ? '_blank' : undefined}
                    rel="noreferrer"
                    onClick={() => setMegaOpen(null)}
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontWeight: 400,
                      color: 'var(--ink-soft)',
                      padding: '7px 0',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--ink)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
                  >{link.label}</a>
                ))}
              </div>

              {/* Right — gem promo */}
              <a href={data.promo.href ?? '#'} target="_blank" rel="noreferrer"
                onClick={() => setMegaOpen(null)}
                style={{ position: 'relative', display: 'block', overflow: 'hidden', textDecoration: 'none', minHeight: 280 }}
              >
                <div className={data.promo.gemClass} style={{ position: 'absolute', inset: 0 }}>
                  <div className="gem-overlay" />
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(26,22,17,0.72) 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 28, left: 28, color: 'var(--paper)', zIndex: 2 }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.65, marginBottom: 8, fontFamily: 'var(--sans)' }}>{data.promo.label}</p>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 300, lineHeight: 1.3, maxWidth: 200 }}>{data.promo.title}</p>
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
