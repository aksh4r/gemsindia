'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  { text: 'The item is just as described and pictured. It arrived quickly with excellent packaging. Thrilled with my purchase and will definitely return.', author: 'Brett Oliveira', loc: 'United States' },
  { text: 'Exceptional quality stones. The certification gave me total confidence. My custom ring turned out absolutely stunning — truly collector grade.', author: 'Sarah Müller', loc: 'Germany' },
  { text: "I've ordered from GemsIndia three times now. The large sapphire was even more beautiful in person. Outstanding service every time.", author: 'Ravi Krishnaswamy', loc: 'Singapore' },
]

const INTERVAL = 5000

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = useCallback((next: number) => {
    const n = (next + TESTIMONIALS.length) % TESTIMONIALS.length
    setDirection(n > index ? 1 : -1)
    setIndex(n)
  }, [index])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(index + 1), INTERVAL)
    return () => clearTimeout(t)
  }, [index, paused, go])

  const variants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative' }}
    >
      {/* Card */}
      <div style={{ overflow: 'hidden', position: 'relative', minHeight: 260 }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              background: 'var(--cream)', border: '1px solid var(--border)',
              padding: '2.5rem 2.2rem', maxWidth: 680, margin: '0 auto',
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem',
              color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem', opacity: 0.6,
            }}>&ldquo;</div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '1.12rem',
              fontStyle: 'italic', lineHeight: 1.9, color: 'var(--ink2)', marginBottom: '1.5rem',
            }}>{TESTIMONIALS[index].text}</p>
            <div style={{ width: 30, height: 1, background: 'var(--gold)', marginBottom: '1rem' }} />
            <p style={{
              fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink)', fontWeight: 500,
            }}>{TESTIMONIALS[index].author}</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--muted2)', marginTop: '0.2rem' }}>
              {TESTIMONIALS[index].loc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.8rem' }}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <motion.div
              layout
              style={{
                height: 6, borderRadius: 3,
                background: i === index ? 'var(--gold)' : 'var(--border-dark)',
              }}
              animate={{ width: i === index ? 24 : 6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </button>
        ))}
      </div>

      {/* Prev / Next */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.2rem' }}>
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={() => go(index + d)}
            style={{
              background: 'none', border: '1px solid var(--border-dark)',
              width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
              color: 'var(--muted)', fontSize: '0.9rem', transition: 'border-color 0.2s, color 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label={d === -1 ? 'Previous' : 'Next'}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-dark)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
          >
            {d === -1 ? '←' : '→'}
          </button>
        ))}
      </div>
    </div>
  )
}
