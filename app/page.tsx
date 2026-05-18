'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import MarqueeBar from '@/components/MarqueeBar'
import ChatButton from '@/components/ChatButton'

const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })

// ─── Reveal hook (section fade-up on scroll) ─────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Stagger children that have data-child attribute
    el.querySelectorAll<HTMLElement>('[data-child]').forEach((node, i) => {
      node.style.transitionDelay = `${i * 0.08}s`
    })
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          obs.disconnect()
        }
      },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ─── Section wrapper with reveal ──────────────────────────────────────────────
function Reveal({ children, style, className, id }: {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  id?: string
}) {
  const ref = useReveal() as React.RefObject<HTMLElement>
  return (
    <section ref={ref} id={id} className={`reveal ${className ?? ''}`} style={style}>
      {children}
    </section>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const LIBRARY_GEMS = [
  { name: 'Ruby',         origin: 'Burma · Certified',    cls: 'gem-ruby'      },
  { name: 'Emerald',      origin: 'Colombia · Certified', cls: 'gem-emerald'   },
  { name: 'Blue Sapphire',origin: 'Ceylon · Certified',   cls: 'gem-sapphire'  },
  { name: 'Amethyst',     origin: 'Brazil · Certified',   cls: 'gem-amethyst'  },
  { name: 'Aquamarine',   origin: 'Brazil · Certified',   cls: 'gem-aqua'      },
  { name: 'Blue Topaz',   origin: 'Brazil · Natural',     cls: 'gem-bluetopaz' },
  { name: 'Moonstone',    origin: 'India · Natural',      cls: 'gem-moonstone' },
  { name: 'Opal',         origin: 'Australia · Natural',  cls: 'gem-opal'      },
  { name: 'Pearl',        origin: 'Cultured',             cls: 'gem-pearl'     },
]

const COLLECTIONS = [
  { name: 'Gem Stones',        count: 'Loose, certified · 12+ species', cls: 'gem-emerald',  href: 'https://www.gemsindia.co.in/gemstones',      facetType: 'rect' },
  { name: 'Large Specimens',   count: 'Spheres & palm-sized stones',     cls: 'gem-sapphire', href: 'https://www.gemsindia.co.in/largegemstones', facetType: 'none' },
  { name: 'Sculptures',        count: 'Religious & decorative · hand-carved', cls: 'gem-amethyst', href: 'https://www.gemsindia.co.in/sculptures', facetType: 'none' },
  { name: 'Jewellery',         count: 'Built around the stone',          cls: 'gem-pearl',    href: 'https://www.gemsindia.co.in/jewelry',        facetType: 'none' },
  { name: 'Rough Stones',      count: 'Uncut, as mined',                 cls: 'gem-onyx',     href: 'https://www.gemsindia.co.in/gemstones',      facetType: 'none' },
  { name: 'Tools & Accessories', count: 'Stands, cases & display',       cls: 'gem-citrine',  href: 'https://www.gemsindia.co.in',                facetType: 'none' },
]

const SERVICES = [
  {
    cls: 'gem-ruby', label: 'Personalisation', detail: '4–6 weeks',
    title: 'A piece designed around your stone.',
    body: 'Our graduate team of jewellers and lapidaries, trained in traditional beading, draft a 3D vision and hand-set bespoke pieces — every design built around the stone, never the reverse.',
    href: 'https://www.gemsindia.co.in',
  },
  {
    cls: 'gem-amethyst', label: 'Consultation', detail: 'Complimentary',
    title: 'Find the stone meant for you.',
    body: 'Every stone has an energy, a presence. We sit with you — your numerology, your spiritual outlook, your healing goal — and match you to a companion from the archive.',
    href: 'https://www.gemsindia.co.in',
  },
  {
    cls: 'gem-emerald', label: 'Crown Octopus', detail: 'Mon–Fri · 9–5',
    title: 'Our gallery. Walk-ins by appointment.',
    body: 'Paintings by local Indian artists alongside life-size hand-carved Nataraja, Ganesha and Buddha. From human portraits to figurines of your pet — our artisans carve almost anything in stone.',
    href: 'https://www.gemsindia.co.in',
  },
  {
    cls: 'gem-sapphire', label: 'KGCL Gem Lab', detail: 'From ₹1,500 / stone',
    title: 'Test any stone at our in-house lab.',
    body: 'Our Kikan Gem Certification Lab issues signed reports on species, treatment and origin — for stones bought from us, or from anywhere else. Complimentary on every GemsIndia purchase.',
    href: 'https://www.gemsindia.co.in',
  },
]

const TRUST_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="32" height="32">
        <path d="M12 2 L20 7 L12 22 L4 7 Z M4 7 L20 7 M9 7 L12 22 L15 7 M9 7 L12 2 L15 7"/>
      </svg>
    ),
    title: 'Certified provenance',
    body: 'Every stone in our collection is authenticated by KGCL — our in-house Kikan Gem Certification Lab — with a signed origin and treatment report.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="32" height="32">
        <path d="M12 21s-7-4.5-7-11a7 7 0 0 1 14 0c0 6.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>
      </svg>
    ),
    title: 'Sourced direct',
    body: 'Direct relationships with miners and cutters across Jaipur, Gujarat and the wider Indian subcontinent.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="32" height="32">
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0Z M12 7v5l3 3"/>
      </svg>
    ),
    title: 'Lifetime care',
    body: 'Complimentary cleaning, repolishing and reclawing on every piece, for as long as you own it.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="32" height="32">
        <path d="M4 8h16v12H4z M4 8 L8 4 L16 4 L20 8 M9 12h6"/>
      </svg>
    ),
    title: 'Insured, discreet delivery',
    body: 'Every purchase ships fully insured to its total value, with a complimentary gift. Free shipping on orders above $50.',
  },
]

const TESTIMONIALS = [
  { quote: 'The item is just as described and pictured. It arrived quickly with excellent packaging. Thrilled with my purchase and will definitely return.', name: 'Brett Oliveira', loc: 'United States' },
  { quote: 'Exceptional quality stones. The certification gave me total confidence. My custom ring turned out absolutely stunning — truly collector grade.', name: 'Sarah Müller', loc: 'Germany' },
  { quote: "I've ordered from GemsIndia three times now. The large sapphire was even more beautiful in person. Outstanding service every time.", name: 'Ravi Krishnaswamy', loc: 'Singapore' },
]

const FOOTER_LINKS = {
  Shop: [
    ['Gem stones', 'https://www.gemsindia.co.in/gemstones'],
    ['Large specimens', 'https://www.gemsindia.co.in/largegemstones'],
    ['Sculptures', 'https://www.gemsindia.co.in/sculptures'],
    ['Jewellery', 'https://www.gemsindia.co.in/jewelry'],
    ['Rough stones', 'https://www.gemsindia.co.in/gemstones'],
  ],
  House: [
    ['Our story', 'https://www.gemsindia.co.in/about'],
    ["Founder's Korner", 'https://www.gemsindia.co.in'],
    ['Crown Octopus Gallery', 'https://www.gemsindia.co.in'],
    ['Wholesale & trade', 'https://www.gemsindia.co.in/wholesale'],
    ['YouTube', 'http://www.youtube.com/gemsindia'],
  ],
  Service: [
    ['Gem certification lab', 'https://www.gemsindia.co.in'],
    ['Consultations', 'https://www.gemsindia.co.in'],
    ['Personalisation & bespoke', 'https://www.gemsindia.co.in'],
    ['Shipping & insurance', 'https://www.gemsindia.co.in'],
    ['Contact', 'https://www.gemsindia.co.in/contact-us'],
  ],
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)

  // Hero entrance stagger
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.querySelectorAll<HTMLElement>('[data-anim]').forEach((node, i) => {
      node.style.animationDelay = `${0.1 + i * 0.13}s`
    })
  }, [])

  // Hero image parallax on scroll
  useEffect(() => {
    const img = heroImgRef.current
    if (!img) return
    const mq = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mq.matches) return
    const onScroll = () => {
      const y = window.scrollY
      img.style.transform = `translateY(${y * 0.22}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-triggered reveal for all .reveal sections (IntersectionObserver)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.06 }
    )
    if (mq.matches) els.forEach(el => obs.observe(el))
    else els.forEach(el => el.classList.add('in'))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <ChatButton />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,64px)',
        overflow: 'hidden',
      }} ref={heroRef as React.RefObject<HTMLDivElement>}>
        <div style={{
          maxWidth: 'var(--maxw)', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1.05fr 1fr',
          gap: 'clamp(40px,6vw,96px)', alignItems: 'flex-end',
        }} className="hero-grid">
          {/* Text column */}
          <div style={{ paddingBottom: '24px' }}>
            <div data-anim className="anim-0" style={{
              display: 'flex', gap: '14px', alignItems: 'center',
              marginBottom: '36px', color: 'var(--ink-soft)',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '999px', background: 'var(--rust)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500 }}>
                Volume 07 — Spring Edit
              </span>
            </div>

            <h1 data-anim className="anim-1 g-display" style={{
              fontSize: 'clamp(58px,8.4vw,132px)', lineHeight: 0.92,
              letterSpacing: '-0.005em', margin: 0, color: 'var(--ink)',
            }}>
              Earth&apos;s<br />rarest<br />
              <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, color: 'var(--rust)' }}>treasures.</em>
            </h1>

            <p data-anim className="anim-2 g-serif" style={{
              marginTop: '36px', maxWidth: '460px',
              fontSize: '19px', lineHeight: 1.45, color: 'var(--ink-soft)',
            }}>
              Founded in New Delhi in 2011 from one man&apos;s fascination with natural stones. For fifteen years we have sourced locally from Jaipur, Gujarat and across India — and shipped, with full provenance, from a mine in Rajasthan to a collector in upstate New York.
            </p>

            <div data-anim className="anim-3" style={{ marginTop: '48px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[['Established', '2011'], ['Serving the U.S.', '15+ Years'], ['In-House Lab', 'KGCL Certified']].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink-soft)' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, marginTop: '4px', lineHeight: 1 }}>{val}</div>
                </div>
              ))}
            </div>

            <a data-anim href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer"
              className="anim-4 hero-cta-link"
              style={{
                marginTop: '48px', display: 'inline-flex', alignItems: 'center', gap: '14px',
                borderBottom: '1px solid var(--ink)', paddingBottom: '8px',
                fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
                fontWeight: 500, textDecoration: 'none', color: 'var(--ink)',
                transition: 'gap 0.3s, color 0.3s, border-color 0.3s',
              }}
              onMouseOver={e => { e.currentTarget.style.gap = '20px'; e.currentTarget.style.color = 'var(--rust)'; e.currentTarget.style.borderColor = 'var(--rust)' }}
              onMouseOut={e => { e.currentTarget.style.gap = '14px'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)' }}
            >
              Enter the archive
              <span style={{ fontFamily: 'var(--serif)', fontSize: '18px', lineHeight: 1 }}>→</span>
            </a>
          </div>

          {/* Hero image — gem-ruby gradient with facets */}
          <div data-anim className="anim-1" style={{
            position: 'relative', aspectRatio: '4/5', width: '100%',
            overflow: 'hidden',
          }} ref={heroImgRef as React.RefObject<HTMLDivElement>}>
            <div className="gem-ruby" style={{ position: 'absolute', inset: 0 }} />
            <div className="gem-overlay" />
            <div className="hero-shimmer" aria-hidden="true" />
            <svg className="gem-facets" viewBox="0 0 400 500" preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, mixBlendMode: 'screen', pointerEvents: 'none' }}>
              <polygon points="200,40 360,200 200,460 40,200" fill="none" stroke="white" strokeWidth="0.6"/>
              <polygon points="200,40 280,140 200,200 120,140" fill="none" stroke="white" strokeWidth="0.4"/>
              <polygon points="200,200 360,200 280,360 200,460 120,360 40,200" fill="none" stroke="white" strokeWidth="0.4"/>
              <line x1="200" y1="40" x2="200" y2="460" stroke="white" strokeWidth="0.3"/>
              <line x1="40" y1="200" x2="360" y2="200" stroke="white" strokeWidth="0.3"/>
            </svg>
            <div style={{ position: 'absolute', left: 24, bottom: 24, color: 'var(--paper)', mixBlendMode: 'difference', zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(244,239,230,0.7)' }}>Featured</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginTop: '4px', fontWeight: 300 }}>Pigeon&apos;s Blood Ruby · 21.5ct</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
      <MarqueeBar />

      {/* ── STONE LIBRARY ────────────────────────────────────────────────── */}
      <Reveal style={{
        padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,64px)',
        background: 'var(--paper-2)',
      }} id="gemstones">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '64px', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--rust)', marginBottom: '14px' }}>Certified Stones</div>
              <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,56px)', lineHeight: 1, margin: 0, letterSpacing: '-0.005em' }}>
                Precious <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>Gemstones.</em>
              </h2>
              <div style={{ width: 48, height: 1.5, background: 'var(--rust)', marginTop: 22 }} />
            </div>
            <a href="https://www.gemsindia.co.in/gemstones" target="_blank" rel="noreferrer"
              style={{
                fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                border: '1.5px solid var(--ink)', color: 'var(--ink)', padding: '14px 28px',
                fontWeight: 500, textDecoration: 'none', transition: 'background 0.25s, color 0.25s',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)' }}
              onMouseOut={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--ink)' }}
            >View All</a>
          </div>

          {/* Gem grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '48px 24px' }} className="library-grid-resp">
            {LIBRARY_GEMS.map((gem, idx) => (
              <a key={gem.name} href="https://www.gemsindia.co.in/gemstones" target="_blank" rel="noreferrer"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', textDecoration: 'none' }}
              >
                <div className={gem.cls} style={{
                  width: 90, height: 90, borderRadius: '50%',
                  border: '1px solid var(--hair)', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  position: 'relative', flexShrink: 0,
                  animation: `gem-float ${3.6 + (idx % 4) * 0.5}s ${idx * 0.35}s ease-in-out infinite`,
                  transition: 'box-shadow 0.3s ease',
                }}
                  onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.14)')}
                  onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)')}
                >
                  <div className="gem-overlay" style={{ borderRadius: '50%' }} />
                </div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>{gem.name}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{gem.origin}</div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── FEATURED STONES ──────────────────────────────────────────────── */}
      <Reveal style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,64px)' }} id="featured">
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'flex-end', marginBottom: '80px' }} className="featured-header-resp">
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--rust)', marginBottom: '24px' }}>— The Vault</div>
              <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,76px)', lineHeight: 1, margin: 0, letterSpacing: '-0.005em' }}>
                Two stones, <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>uncommonly held.</em>
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', lineHeight: 1.5, fontWeight: 300, color: 'var(--ink-soft)', maxWidth: '460px' }}>
              Each season, we select two singular specimens from the archive — stones whose colour, clarity and origin place them among the finest examples ever to leave their respective fields.
            </p>
          </div>

          {/* Pair */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,4vw,80px)' }} className="featured-pair-resp">
            {/* Stone 1 — Ruby */}
            <article style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="gem-ruby" style={{ aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 18, left: 18, color: 'var(--paper)', fontFamily: 'var(--display)', fontSize: '20px', letterSpacing: '0.2em', zIndex: 2, mixBlendMode: 'difference' }}>№ 01</div>
                <div className="gem-overlay" />
                <svg viewBox="0 0 400 500" preserveAspectRatio="none"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, mixBlendMode: 'screen', pointerEvents: 'none' }}>
                  <polygon points="200,40 360,200 200,460 40,200" fill="none" stroke="white" strokeWidth="0.5"/>
                  <polygon points="200,40 280,140 200,200 120,140" fill="none" stroke="white" strokeWidth="0.4"/>
                  <line x1="200" y1="40" x2="200" y2="460" stroke="white" strokeWidth="0.3"/>
                </svg>
                <span style={{ position: 'absolute', bottom: 18, right: 18, background: 'var(--paper)', color: 'var(--ink)', padding: '8px 14px', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, zIndex: 2 }}>KGCL Certified</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24 }}>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '36px', lineHeight: 1, fontWeight: 400, margin: 0 }}>
                  Pigeon&apos;s Blood <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>Ruby</em>
                </h3>
                <a href="https://www.gemsindia.co.in/gemstones" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--rust)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Enquire →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: '32px', paddingTop: '18px', borderTop: '1px solid var(--hair)' }}>
                {[['Weight', '21.5 ct'], ['Origin', 'Jaipur, India'], ['Cut', 'Cushion']].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink-soft)', marginBottom: 6 }}>{l}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 400 }}>{v}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', lineHeight: 1.5, fontWeight: 300, color: 'var(--ink-soft)', maxWidth: '480px' }}>
                A saturated, fluorescent crimson described in the trade as pigeon&apos;s blood. Cut and finished in our Jaipur atelier from rough sourced through our network of mines — unheated, with full provenance signed off by our in-house gemmologists at KGCL.
              </p>
            </article>

            {/* Stone 2 — Emerald (offset) */}
            <article style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: 'clamp(40px,6vw,80px)' }}>
              <div className="gem-emerald" style={{ aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 18, left: 18, color: 'var(--paper)', fontFamily: 'var(--display)', fontSize: '20px', letterSpacing: '0.2em', zIndex: 2, mixBlendMode: 'difference' }}>№ 02</div>
                <div className="gem-overlay" />
                <svg viewBox="0 0 400 500" preserveAspectRatio="none"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, mixBlendMode: 'screen', pointerEvents: 'none' }}>
                  <rect x="80" y="70" width="240" height="360" fill="none" stroke="white" strokeWidth="0.6"/>
                  <rect x="120" y="110" width="160" height="280" fill="none" stroke="white" strokeWidth="0.4"/>
                  <line x1="80" y1="70" x2="120" y2="110" stroke="white" strokeWidth="0.3"/>
                  <line x1="320" y1="70" x2="280" y2="110" stroke="white" strokeWidth="0.3"/>
                  <line x1="80" y1="430" x2="120" y2="390" stroke="white" strokeWidth="0.3"/>
                  <line x1="320" y1="430" x2="280" y2="390" stroke="white" strokeWidth="0.3"/>
                </svg>
                <span style={{ position: 'absolute', bottom: 18, right: 18, background: 'var(--paper)', color: 'var(--ink)', padding: '8px 14px', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, zIndex: 2 }}>KGCL Certified</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24 }}>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '36px', lineHeight: 1, fontWeight: 400, margin: 0 }}>
                  <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>Colombian</em> Emerald
                </h3>
                <a href="https://www.gemsindia.co.in/gemstones" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--rust)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Enquire →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: '32px', paddingTop: '18px', borderTop: '1px solid var(--hair)' }}>
                {[['Weight', '11.50 ct'], ['Origin', 'Colombia'], ['Cut', 'Step']].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink-soft)', marginBottom: 6 }}>{l}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 400 }}>{v}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', lineHeight: 1.5, fontWeight: 300, color: 'var(--ink-soft)', maxWidth: '480px' }}>
                A statement emerald with the soft bluish-green hue and crystalline transparency that defines collector-grade material. Hand-cut in our factory, set aside for the bench, certified through our in-house Kikan Gem Certification Lab.
              </p>
            </article>
          </div>
        </div>
      </Reveal>

      {/* ── STORY ────────────────────────────────────────────────────────── */}
      <Reveal style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,64px)',
      }} id="about">
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,120px)', alignItems: 'center' }} className="story-grid-resp">
          {/* Image placeholder */}
          <div className="gem-onyx" style={{ aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 400 500" preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, mixBlendMode: 'screen', pointerEvents: 'none' }}>
              <circle cx="200" cy="250" r="180" fill="none" stroke="#a5683c" strokeWidth="0.6"/>
              <circle cx="200" cy="250" r="120" fill="none" stroke="#a5683c" strokeWidth="0.4"/>
              <line x1="20" y1="250" x2="380" y2="250" stroke="#a5683c" strokeWidth="0.3"/>
              <line x1="200" y1="70" x2="200" y2="430" stroke="#a5683c" strokeWidth="0.3"/>
            </svg>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--taupe)', marginBottom: '24px' }}>— Our Story</div>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1.02, margin: '0 0 36px', letterSpacing: '-0.005em' }}>
              A fascination,<br />passed <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--taupe)', fontWeight: 300 }}>stone by stone.</em>
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '19px', lineHeight: 1.55, fontWeight: 300, color: 'rgba(244,239,230,0.78)', marginBottom: '28px' }}>
              GemsIndia was founded in New Delhi in 2011 from one man&apos;s quiet fascination with natural stones — a fascination that began long before, in a small Rohini office under the name Kikan International, est. 1997. What started with crushed-gemstone paintings has, slowly and stubbornly, grown into thousands of pieces: spheres, sculptures, loose stones, jewels.
            </p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '19px', lineHeight: 1.55, fontWeight: 300, color: 'rgba(244,239,230,0.78)', marginBottom: '28px' }}>
              We source locally and ship the world over — bridging a mine in Jaipur, a market in Gujarat, a collector in upstate New York, a designer in Los Angeles. Every stone in our archive has been seen, sorted and signed off by the family.
            </p>
            <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', paddingTop: '36px', borderTop: '1px solid rgba(244,239,230,0.18)' }}>
              {[
                ['Locally sourced', '15+ years', 'Direct relationships with miners and cutters across Jaipur, Gujarat and the wider subcontinent.'],
                ['In-house certified', 'KGCL', 'Every stone authenticated by our own Kikan Gem Certification Lab — complimentary on every purchase.'],
              ].map(([label, val, small]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--taupe)', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, lineHeight: 1 }}>{val}</div>
                  <small style={{ display: 'block', marginTop: 6, fontSize: '13px', color: 'rgba(244,239,230,0.6)' }}>{small}</small>
                </div>
              ))}
            </div>
            <a href="https://www.gemsindia.co.in/about" target="_blank" rel="noreferrer"
              style={{
                marginTop: '48px', display: 'inline-flex', gap: '14px', alignItems: 'center',
                borderBottom: '1px solid var(--paper)', paddingBottom: '8px',
                fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
                fontWeight: 500, textDecoration: 'none', color: 'var(--paper)',
                transition: 'gap 0.3s, color 0.3s, border-color 0.3s',
              }}
              onMouseOver={e => { e.currentTarget.style.gap = '22px'; e.currentTarget.style.color = 'var(--taupe)'; e.currentTarget.style.borderColor = 'var(--taupe)' }}
              onMouseOut={e => { e.currentTarget.style.gap = '14px'; e.currentTarget.style.color = 'var(--paper)'; e.currentTarget.style.borderColor = 'var(--paper)' }}
            >
              Read the full story <span style={{ fontFamily: 'var(--serif)', fontSize: '18px' }}>→</span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* ── FOUNDER QUOTE ────────────────────────────────────────────────── */}
      <Reveal style={{
        padding: 'clamp(80px,9vw,120px) clamp(20px,4vw,64px)',
        textAlign: 'center', background: 'var(--paper)',
      }}>
        <blockquote style={{
          maxWidth: '980px', margin: '0 auto',
          fontFamily: 'var(--display)', fontWeight: 400,
          fontSize: 'clamp(28px,3.6vw,52px)', lineHeight: 1.1,
          color: 'var(--ink)', letterSpacing: '-0.005em',
        }}>
          &ldquo;Come find your <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>companion</em> —<br />
          and listen to what they have to say.&rdquo;
        </blockquote>
        <div style={{ marginTop: '36px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink-soft)' }}>
          — Our Founder · New Delhi
        </div>
      </Reveal>

      {/* ── COLLECTIONS ──────────────────────────────────────────────────── */}
      <Reveal style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,64px) clamp(40px,5vw,60px)' }} id="collections">
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--rust)', marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: 8 }}>
              <span>—</span><span>Shop the House</span><span>—</span>
            </div>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,76px)', lineHeight: 1, margin: 0, letterSpacing: '-0.005em' }}>
              Worn, kept, <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>passed down.</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }} className="collections-grid-resp">
            {COLLECTIONS.map(col => (
              <a key={col.name} href={col.href} target="_blank" rel="noreferrer"
                style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', display: 'block', cursor: 'pointer', textDecoration: 'none' }}
                onMouseOver={e => { const bg = e.currentTarget.querySelector<HTMLDivElement>('.col-bg'); if (bg) bg.style.transform = 'scale(1.04)' }}
                onMouseOut={e => { const bg = e.currentTarget.querySelector<HTMLDivElement>('.col-bg'); if (bg) bg.style.transform = '' }}
              >
                <div className={`col-bg ${col.cls}`} style={{ position: 'absolute', inset: 0, transition: 'transform 1.2s ease' }}>
                  <div className="gem-overlay" />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28, color: 'var(--paper)', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: 400, margin: 0, lineHeight: 1 }}>{col.name}</h3>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.85)', marginTop: 8 }}>{col.count}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '20px', transition: 'transform 0.3s' }}>↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <Reveal style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,64px)' }} id="services">
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--rust)', marginBottom: '16px' }}>— The House</div>
              <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,76px)', lineHeight: 1, margin: 0, letterSpacing: '-0.005em' }}>
                Beyond <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>the stone.</em>
              </h2>
            </div>
            <a href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, borderBottom: '1px solid var(--ink)', paddingBottom: 6, textDecoration: 'none', color: 'var(--ink)', whiteSpace: 'nowrap' }}>All services →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '32px' }} className="services-grid-resp">
            {SERVICES.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textDecoration: 'none', color: 'inherit' }}>
                <div className={s.cls} style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                  <div className="gem-overlay" />
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: 'var(--ink-soft)', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500 }}>
                  <span>{s.label}</span>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--rust)', flexShrink: 0 }} />
                  <span>{s.detail}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 400, margin: 0, lineHeight: 1.15 }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', lineHeight: 1.55, fontWeight: 300, color: 'var(--ink-soft)', margin: 0 }}>{s.body}</p>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── TRUST ────────────────────────────────────────────────────────── */}
      <Reveal style={{ borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)' }} id="trust">
        <div style={{
          maxWidth: 'var(--maxw)', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '48px',
          padding: 'clamp(60px,8vw,110px) clamp(20px,4vw,64px)',
        }} className="trust-grid-resp">
          {TRUST_ITEMS.map(t => (
            <div key={t.title} style={{ paddingLeft: '22px', borderLeft: '2px solid var(--taupe)' }}>
              <div style={{ color: 'var(--rust)', marginBottom: '16px' }}>{t.icon}</div>
              <h4 style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 500, margin: '0 0 12px' }}>{t.title}</h4>
              <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '17px', lineHeight: 1.45, fontWeight: 300, color: 'var(--ink-soft)' }}>{t.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Reveal style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,64px)', background: 'var(--paper-2)' }} id="testimonials">
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--rust)', marginBottom: '16px' }}>— Client Stories</div>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px,5vw,76px)', lineHeight: 1, margin: 0, letterSpacing: '-0.005em' }}>
              Trusted <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>worldwide.</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px' }} className="testimonials-grid-resp">
            {TESTIMONIALS.map(t => (
              <figure key={t.name} className="testimonial-lift" style={{ margin: 0, padding: '36px', background: 'var(--paper)', borderTop: '3px solid var(--rust)' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: '64px', lineHeight: 0.8, color: 'var(--rust)', marginBottom: '24px' }}>&ldquo;</div>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', lineHeight: 1.6, fontWeight: 300, color: 'var(--ink-soft)', margin: '0 0 28px' }}>{t.quote}</p>
                <figcaption>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 400, color: 'var(--ink)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: 4 }}>{t.loc}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,64px) 0' }}>
        <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
          {/* 4-col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '64px', paddingBottom: '80px' }} className="footer-grid-resp">
            {/* Brand */}
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: '28px', letterSpacing: '0.32em', color: 'var(--paper)', marginBottom: '24px', paddingLeft: '0.32em' }}>GEMS INDIA</div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '16px', lineHeight: 1.6, fontWeight: 300, color: 'rgba(244,239,230,0.65)', maxWidth: '320px' }}>
                An independent gem house from New Delhi, founded in 2011 from one man&apos;s quiet fascination with natural stones — carried forward from a small Rohini office, est. 1997 as Kikan International.
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '32px' }}>
                {[['YT', 'http://www.youtube.com/gemsindia'], ['IG', 'https://instagram.com/gemsindia/'], ['FB', 'http://www.facebook.com/gemsindia.net'], ['PT', 'http://www.pinterest.com/gemsindia']].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--paper)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'rgba(244,239,230,0.4)')}
                  >{label}</a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {(Object.entries(FOOTER_LINKS) as [string, string[][]][]).map(([heading, links]) => (
              <div key={heading}>
                <h5 style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: 'var(--label-tracking)', textTransform: 'uppercase', fontWeight: 500, color: 'var(--paper)', margin: '0 0 24px' }}>{heading}</h5>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer"
                        style={{ fontFamily: 'var(--serif)', fontSize: '15px', fontWeight: 300, color: 'rgba(244,239,230,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseOver={e => (e.currentTarget.style.color = 'var(--paper)')}
                        onMouseOut={e => (e.currentTarget.style.color = 'rgba(244,239,230,0.55)')}
                      >{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(244,239,230,0.1)', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(244,239,230,0.3)' }}>© 2026 GEMS, New Delhi · India · Kikan International Pvt. Ltd.</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(244,239,230,0.3)', display: 'flex', gap: '20px' }}>
              {['Privacy', 'Terms', 'Imprint'].map(l => <span key={l} style={{ cursor: 'default' }}>{l}</span>)}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Responsive styles ─────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .featured-header-resp { grid-template-columns: 1fr !important; }
          .featured-pair-resp { grid-template-columns: 1fr !important; }
          .featured-pair-resp article:last-child { margin-top: 0 !important; }
          .story-grid-resp { grid-template-columns: 1fr !important; }
          .story-grid-resp > :first-child { aspect-ratio: 3/2 !important; }
          .collections-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .services-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .trust-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .testimonials-grid-resp { grid-template-columns: 1fr !important; }
          .footer-grid-resp { grid-template-columns: 1fr 1fr !important; }
          .library-grid-resp { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 600px) {
          .collections-grid-resp { grid-template-columns: 1fr !important; }
          .services-grid-resp { grid-template-columns: 1fr !important; }
          .trust-grid-resp { grid-template-columns: 1fr !important; }
          .footer-grid-resp { grid-template-columns: 1fr !important; }
          .library-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}
