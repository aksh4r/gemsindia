'use client'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import MarqueeBar from '@/components/MarqueeBar'
import ScrollReveal from '@/components/ScrollReveal'

const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false })
const GemOrb = dynamic(() => import('@/components/GemOrb'), { ssr: false })
const AboutCanvas = dynamic(() => import('@/components/AboutCanvas'), { ssr: false })

const GEMS = [
  { id: 'ruby',     name: 'Ruby',         origin: 'Burma · Certified',    color: 0xC9272D, shape: 'octa' as const },
  { id: 'emerald',  name: 'Emerald',       origin: 'Colombia · Certified', color: 0x1B5E20, shape: 'octa' as const },
  { id: 'sapphire', name: 'Blue Sapphire', origin: 'Ceylon · Certified',   color: 0x1565C0, shape: 'ico'  as const },
  { id: 'amethyst', name: 'Amethyst',      origin: 'Brazil · Certified',   color: 0x7B1FA2, shape: 'octa' as const },
  { id: 'aqua',     name: 'Aquamarine',    origin: 'Brazil · Certified',   color: 0x0288D1, shape: 'ico'  as const },
  { id: 'topaz',    name: 'Blue Topaz',    origin: 'Brazil · Natural',     color: 0x0277BD, shape: 'ico'  as const },
  { id: 'moon',     name: 'Moonstone',     origin: 'India · Natural',      color: 0x90A4AE, shape: 'octa' as const },
  { id: 'opal',     name: 'Opal',          origin: 'Australia · Natural',  color: 0x80CBC4, shape: 'ico'  as const },
  { id: 'pearl',    name: 'Pearl',         origin: 'Cultured · Certified', color: 0xBDBDBD, shape: 'octa' as const },
  { id: 'diamond',  name: 'Diamond',       origin: 'GIA · Certified',      color: 0xB3E5FC, shape: 'ico'  as const },
]

const COLLECTIONS = [
  { num: '01', name: 'Loose\nGemstones',  bg: 'bg-ruby',     href: 'https://www.gemsindia.co.in/gemstones',      span: 3 },
  { num: '02', name: 'Large\nGemstones',  bg: 'bg-sapphire',  href: 'https://www.gemsindia.co.in/largegemstones', span: 3 },
  { num: '03', name: 'Jewelry',           bg: 'bg-emerald',   href: 'https://www.gemsindia.co.in/jewelry',        span: 2 },
  { num: '04', name: 'Sculptures',        bg: 'bg-amethyst',  href: 'https://www.gemsindia.co.in/sculptures',     span: 2 },
  { num: '05', name: 'Metaphysical',      bg: 'bg-coral',     href: 'https://www.gemsindia.co.in/metaphysical',   span: 2 },
]

const PRODUCTS = [
  { badge: 'Certified', bg: 'bg-ruby',     cat: 'Loose Gemstone',  name: 'Ruby Oval Cabochon 21.50 Ct',       price: '$149.99', href: 'https://www.gemsindia.co.in/product-page/certified-21-50-ct-natural-eye-catching-rich-red-ruby-oval-cab-rare-gem-for-ring',    color: 0xC9272D },
  { badge: 'Museum',    bg: 'bg-emerald',  cat: 'Large Gemstone',  name: 'Green Emerald Pear Cut 1150 Ct',    price: '$44.99',  href: 'https://www.gemsindia.co.in/product-page/1150-ct-natural-green-emerald-pear-cut-faceted-earth-mined-huge-size-gemstone',       color: 0x1B5E20 },
  { badge: 'Geode',     bg: 'bg-amethyst', cat: 'Mineral Crystal', name: 'Amethyst Geode Rock Cluster 2.5 Kg', price: '$264.99', href: 'https://www.gemsindia.co.in/product-page/2-5-kilo-natural-amethyst-geode-rock-cluster-quartz-crystal-healing-mineral-gem', color: 0x7B1FA2 },
  { badge: 'Set',       bg: 'bg-sapphire', cat: 'Jewelry',         name: 'Sapphire Moonstone 5-Strand Set',   price: '$279.99', href: 'https://www.gemsindia.co.in/product-page/1050ct-natural-blue-sapphire-moonstone-round-beaded-handmade-5strand-jewelry-set', color: 0x1565C0 },
]

const JEWELRY = [
  { title: 'Earrings',  bg: 'bg-ruby',     href: 'https://www.gemsindia.co.in/earrings'  },
  { title: 'Necklaces', bg: 'bg-emerald',  href: 'https://www.gemsindia.co.in/necklaces' },
  { title: 'Rings',     bg: 'bg-sapphire', href: 'https://www.gemsindia.co.in/rings'     },
  { title: 'Bracelets', bg: 'bg-amethyst', href: 'https://www.gemsindia.co.in/bracelets' },
]

const TESTIMONIALS = [
  { text: 'The item is just as described and pictured. It arrived quickly with excellent packaging. Thrilled with my purchase and will definitely return.', author: 'Brett Oliveira', loc: 'United States' },
  { text: 'Exceptional quality stones. The certification gave me total confidence. My custom ring turned out absolutely stunning — truly collector grade.', author: 'Sarah Müller', loc: 'Germany' },
  { text: "I've ordered from GemsIndia three times now. The large sapphire was even more beautiful in person. Outstanding service every time.", author: 'Ravi Krishnaswamy', loc: 'Singapore' },
]

const TRUST = [
  { icon: '✦', title: '100% Natural', desc: 'All stones are earth-mined and untreated unless stated' },
  { icon: '✦', title: 'Lab Certified', desc: 'GIA, IGI & regional certifications on every stone' },
  { icon: '✦', title: 'Worldwide Shipping', desc: 'Fast, insured delivery to 50+ countries' },
  { icon: '✦', title: 'Wholesale Deals', desc: 'Trade pricing for bulk buyers and designers' },
]

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollReveal />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', paddingTop: '72px', background: 'var(--white)', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div style={{ padding: '0 3.5rem' }}>
          <p className="anim-0" style={{ fontSize: '0.62rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.8rem' }}>Est. 15+ Years · New Delhi, India</p>
          <h1 className="anim-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.2rem,5.5vw,5.8rem)', fontWeight: 300, lineHeight: 1.02, marginBottom: '2rem', color: 'var(--ink)' }}>
            Earth&apos;s<br />Rarest<em style={{ fontStyle: 'italic', color: 'var(--gold)', display: 'block' }}>Treasures</em>
          </h1>
          <p className="anim-2" style={{ fontSize: '0.82rem', lineHeight: 2, color: 'var(--muted)', maxWidth: '380px', marginBottom: '2.8rem', letterSpacing: '0.04em' }}>
            100% Natural, Certified, Collector-Grade Gemstones — Sourced Directly From Mines Across The Globe.
          </p>
          <div className="anim-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#collections-section" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--white)', padding: '1rem 2.2rem', textDecoration: 'none', fontWeight: 500 }}>Explore Collections</a>
            <a href="https://www.gemsindia.co.in/gemstones" target="_blank" rel="noreferrer" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1.5px solid var(--border-dark)', color: 'var(--ink)', padding: '1rem 2.2rem', textDecoration: 'none', fontWeight: 500 }}>Shop Gemstones</a>
          </div>
          <div className="anim-4" style={{ display: 'flex', gap: '2rem', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
            {[['15+', 'Years of expertise'], ['50+', 'Countries served'], ['10K+', 'Certified stones']].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted2)', marginTop: '0.3rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', height: '100vh', background: 'var(--cream)', overflow: 'hidden' }}>
          <HeroCanvas />
          {[{ text: 'Ruby — 21.5 Ct', sub: 'Burma Origin · GII Certified', pos: { bottom: '12%', left: '8%' } }, { text: 'Emerald — 1150 Ct', sub: 'Colombian · Untreated', pos: { top: '20%', right: '8%' } }].map(({ text, sub, pos }) => (
            <div key={text} style={{ position: 'absolute', background: 'var(--white)', border: '1px solid var(--border)', padding: '1rem 1.4rem', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink2)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', ...pos }}>
              <strong style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, letterSpacing: 0, marginBottom: '0.2rem', fontStyle: 'italic', color: 'var(--gold)' }}>{text}</strong>
              {sub}
            </div>
          ))}
        </div>
      </section>

      <MarqueeBar />

      {/* COLLECTIONS */}
      <section id="collections-section" style={{ padding: '6rem 3.5rem', background: 'var(--white)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', marginBottom: '3.5rem', gap: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.9rem' }}>Our World</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--ink)' }}>The Full <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Collection</em></h2>
            <div style={{ width: 48, height: 1.5, background: 'var(--gold)', marginTop: '1.4rem' }} />
          </div>
          <p style={{ maxWidth: 320, fontSize: '0.82rem', lineHeight: 2, color: 'var(--muted)' }}>Probably the world&apos;s largest collection of large-size natural collector gemstones.</p>
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gridTemplateRows: 'auto auto', gap: '1px', background: 'var(--border)' }}>
          {COLLECTIONS.map((c) => (
            <div key={c.num} className={c.bg} style={{ gridColumn: `span ${c.span}`, position: 'relative', overflow: 'hidden', aspectRatio: c.span === 3 ? '3/4' : '1', cursor: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,transparent 40%,rgba(26,23,20,0.65) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.6rem' }}>
                <p style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>{c.num}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: '0.8rem', whiteSpace: 'pre-line' }}>{c.name}</h3>
                <a href={c.href} target="_blank" rel="noreferrer" style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2 }}>Explore →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GEMS */}
      <section id="gemstones" style={{ padding: '6rem 3.5rem', background: 'var(--cream)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem' }}>
            <div>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.9rem' }}>Certified Stones</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--ink)' }}>Precious <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Gemstones</em></h2>
              <div style={{ width: 48, height: 1.5, background: 'var(--gold)', marginTop: '1.4rem' }} />
            </div>
            <a href="https://www.gemsindia.co.in/gemstones" target="_blank" rel="noreferrer" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1.5px solid var(--border-dark)', color: 'var(--ink)', padding: '0.9rem 2rem', textDecoration: 'none', fontWeight: 500 }}>View All</a>
          </div>
          {[GEMS.slice(0, 5), GEMS.slice(5)].map((row, ri) => (
            <div key={ri} className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '2.5rem', marginBottom: ri === 0 ? '2.5rem' : 0 }}>
              {row.map((gem) => (
                <div key={gem.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'none', transition: 'transform 0.3s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}
                >
                  <div style={{ width: 90, height: 90, marginBottom: '1rem', borderRadius: '50%', background: 'var(--white)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                    <GemOrb color={gem.color} shape={gem.shape} size={90} />
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '0.25rem' }}>{gem.name}</p>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted2)' }}>{gem.origin}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '6rem 3.5rem', background: 'var(--white)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ position: 'relative' }}>
          <div style={{ border: '1px solid var(--border)', padding: 10 }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--cream)', position: 'relative' }}>
              <AboutCanvas />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '-1.2rem', right: '-1.2rem', background: 'var(--ink)', color: 'var(--white)', padding: '1.8rem 2rem', minWidth: 150, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', fontWeight: 300, lineHeight: 1, color: 'var(--gold-light)' }}>15+</div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem' }}>Years Experience</div>
          </div>
        </div>
        <div className="reveal d1">
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.9rem' }}>Our Story</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--ink)' }}>Sourced With<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Integrity</em></h2>
          <div style={{ width: 48, height: 1.5, background: 'var(--gold)', margin: '1.4rem 0 2rem' }} />
          <p style={{ fontSize: '0.86rem', lineHeight: 2.1, color: 'var(--muted)', marginBottom: '1.5rem' }}>Kikan International Private Limited, trading as GemsIndia, has built one of the world&apos;s most extensive collections of natural, large-size collector gemstones. Every stone is ethically sourced and certified by leading gemological laboratories.</p>
          <p style={{ fontSize: '0.86rem', lineHeight: 2.1, color: 'var(--muted)', marginBottom: '2rem' }}>We serve collectors, jewelry designers, and metaphysical practitioners across 50+ countries — from museum-grade pieces to everyday healing crystals.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[['Certified Stones', 'Each gem backed by GIA, IGI, or regional lab certification.'], ['Worldwide Sourcing', 'Direct mine-to-market from Burma, Colombia, Sri Lanka, Brazil.'], ['Wholesale Pricing', 'Dedicated trade pricing for designers and bulk orders.'], ['Custom Jewelry', 'Bespoke design and custom stone setting for unique pieces.']].map(([title, desc]) => (
              <div key={title} style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--gold-pale)' }}>
                <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '0.35rem', fontWeight: 500 }}>{title}</h4>
                <p style={{ fontSize: '0.77rem', lineHeight: 1.75, color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <a href="https://www.gemsindia.co.in/about" target="_blank" rel="noreferrer" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--white)', padding: '1rem 2.2rem', textDecoration: 'none', fontWeight: 500 }}>Our Story</a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: '6rem 3.5rem', background: 'var(--cream)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.9rem' }}>New Listings</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--ink)' }}>Featured <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Pieces</em></h2>
          <div style={{ width: 48, height: 1.5, background: 'var(--gold)', margin: '1.4rem auto 0' }} />
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
          {PRODUCTS.map((p) => (
            <div key={p.name} style={{ background: 'var(--white)', border: '1px solid var(--border)', overflow: 'hidden', cursor: 'none', transition: 'box-shadow 0.25s, border-color 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-dark)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)' }}
            >
              <div className={p.bg} style={{ aspectRatio: '1', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', background: 'var(--ink)', color: 'var(--white)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.28rem 0.65rem', fontWeight: 500, zIndex: 2 }}>{p.badge}</span>
                <GemOrb color={p.color} shape="octa" size={120} />
              </div>
              <div style={{ padding: '1.2rem 1.3rem' }}>
                <p style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>{p.cat}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.35, marginBottom: '0.6rem' }}>{p.name}</p>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink)' }}>{p.price}</div>
                <a href={p.href} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', gap: '0.4rem', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted2)', marginTop: '0.8rem', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: 2 }}>Quick View →</a>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="https://www.gemsindia.co.in" target="_blank" rel="noreferrer" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1.5px solid var(--border-dark)', color: 'var(--ink)', padding: '1rem 2.2rem', textDecoration: 'none', fontWeight: 500 }}>Browse All Products</a>
        </div>
      </section>

      {/* JEWELRY */}
      <section id="jewelry" style={{ padding: '6rem 3.5rem', background: 'var(--white)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.9rem' }}>Handcrafted</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--ink)' }}>Fine <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Jewelry</em></h2>
          <div style={{ width: 48, height: 1.5, background: 'var(--gold)', margin: '1.4rem auto 0' }} />
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
          {JEWELRY.map((j) => (
            <div key={j.title} className={j.bg} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '2/3', cursor: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.8) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.4rem 1.5rem' }}>
                <p style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>Collection</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#fff', lineHeight: 1.15 }}>{j.title}</h3>
                <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold-light)', margin: '0.8rem 0' }} />
                <a href={j.href} target="_blank" rel="noreferrer" style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Shop Now →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <div className="reveal" style={{ background: 'var(--cream2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.5rem 3.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          {TRUST.map((t) => (
            <div key={t.title}>
              <div style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>{t.icon}</div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '0.4rem' }}>{t.title}</h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.05em', lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section style={{ padding: '6rem 3.5rem', background: 'var(--white)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.9rem' }}>Client Stories</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--ink)' }}>Trusted <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Worldwide</em></h2>
          <div style={{ width: 48, height: 1.5, background: 'var(--gold)', margin: '1.4rem auto 0' }} />
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.author} style={{ background: 'var(--cream)', border: '1px solid var(--border)', padding: '2.5rem 2.2rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem', opacity: 0.6 }}>&ldquo;</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.9, color: 'var(--ink2)', marginBottom: '1.5rem' }}>{t.text}</p>
              <div style={{ width: 30, height: 1, background: 'var(--gold)', marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 500 }}>{t.author}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--muted2)', marginTop: '0.2rem' }}>{t.loc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '5rem 3.5rem', background: 'var(--ink)', color: 'var(--white)', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '3rem', alignItems: 'center' }}>
          {[
            { label: 'Call Us', val: '+91 98100 11169', href: 'tel:+919810011169', desc: 'Mon–Sat 10am–7pm IST' },
            null,
            { label: 'Email Us', val: 'gemsindia@ymail.com', href: 'mailto:gemsindia@ymail.com', desc: 'Response within 24 hours' },
            null,
            { label: 'Wholesale', val: 'Get Best Prices', href: 'https://www.gemsindia.co.in/wholesale', desc: 'Trade pricing available' },
          ].map((item, i) =>
            item === null
              ? <div key={i} style={{ width: 1, height: 80, background: 'rgba(255,255,255,0.12)' }} />
              : (
                <div key={item.label}>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, lineHeight: 1.4 }}>
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{item.val}</a>
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.4rem' }}>{item.desc}</p>
                </div>
              )
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--ink2)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.2rem 3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 300, color: 'var(--gold-light)' }}>GemsIndia</div>
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>© 2025 Kikan International Pvt. Ltd. · New Delhi, India</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[['YouTube', 'http://www.youtube.com/gemsindia'], ['Instagram', 'https://instagram.com/gemsindia/'], ['Facebook', 'http://www.facebook.com/gemsindia.net'], ['Pinterest', 'http://www.pinterest.com/gemsindia']].map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{name}</a>
          ))}
        </div>
      </footer>
    </>
  )
}
