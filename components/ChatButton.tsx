'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ChatButton() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  // Lock body scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setOpen(false)
      setForm({ name: '', email: '', phone: '', message: '' })
    }, 2800)
  }

  const field = (key: keyof typeof form, label: string, type = 'text', rows?: number) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
      <label style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ink-soft)' }}>{label}</label>
      {rows ? (
        <textarea rows={rows} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
          style={{ width: '100%', background: 'var(--paper-2)', border: 0, borderBottom: '1px solid var(--hair)', padding: '10px 0', fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 300, color: 'var(--ink)', outline: 0, resize: 'vertical', minHeight: 72 }} />
      ) : (
        <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required={key !== 'phone'}
          style={{ width: '100%', background: 'transparent', border: 0, borderBottom: '1px solid var(--hair)', padding: '10px 0', fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 300, color: 'var(--ink)', outline: 0 }} />
      )}
    </div>
  )

  return (
    <>
      {/* ── Vertical chat tab ───────────────────────────────────── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Open chat"
        style={{
          position: 'fixed', right: 0, top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'right center',
          background: open ? 'var(--rust)' : 'rgb(51,49,50)',
          color: '#ffffff',
          height: '22px', lineHeight: '22px', padding: '0 15px',
          fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 400,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          border: 'none', cursor: 'pointer', zIndex: 500,
          transition: 'background 0.45s cubic-bezier(0.785,0.135,0.15,0.86)',
          whiteSpace: 'nowrap',
        }}
        onMouseOver={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'var(--rust)' }}
        onMouseOut={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'rgb(51,49,50)' }}
      >Chat</button>

      {/* ── Scrim ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 498,
              background: 'rgba(26,22,17,0.2)', backdropFilter: 'blur(1px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Chat panel (slides up from bottom-right) ────────────── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="chat-panel"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '110%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.55, ease: [0.22, 0.7, 0.2, 1] }}
            style={{
              position: 'fixed',
              right: 24, bottom: 24,
              width: 'min(380px, calc(100vw - 48px))',
              maxHeight: 'min(640px, calc(100vh - 48px))',
              background: 'var(--paper)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              zIndex: 499,
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px 28px 18px', borderBottom: '1px solid var(--hair)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexShrink: 0 }}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: 400, margin: 0, lineHeight: 1 }}>
                Chat <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--rust)', fontWeight: 300 }}>with us.</em>
              </h3>
              <button onClick={() => setOpen(false)} aria-label="Close"
                style={{ fontFamily: 'var(--sans)', fontSize: '18px', color: 'var(--ink-soft)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1, transition: 'color 0.2s, transform 0.2s' }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--rust)'; (e.currentTarget as HTMLButtonElement).style.transform = 'rotate(90deg)' }}
                onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-soft)'; (e.currentTarget as HTMLButtonElement).style.transform = '' }}
              >✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 28px 28px', flex: 1 }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--rust)', color: 'var(--paper)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: 16, animation: 'pop 0.4s ease' }}>✓</div>
                  <p style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 400, margin: '0 0 8px' }}>Sent.</p>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', fontWeight: 300, color: 'var(--ink-soft)', margin: 0 }}>We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', lineHeight: 1.5, fontWeight: 300, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
                    Leave a message and our team will respond within one business day.
                  </p>
                  <form onSubmit={handleSubmit}>
                    {field('name', 'Full name')}
                    {field('email', 'Email', 'email')}
                    {field('phone', 'Phone (optional)', 'tel')}
                    {field('message', 'Message', 'text', 4)}
                    <button type="submit" style={{
                      width: '100%', background: 'var(--ink)', color: 'var(--paper)',
                      padding: '16px', marginTop: 8, fontFamily: 'var(--sans)',
                      fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase',
                      fontWeight: 500, border: 'none', cursor: 'pointer',
                      transition: 'background 0.25s',
                    }}
                      onMouseOver={e => (e.currentTarget.style.background = 'var(--rust)')}
                      onMouseOut={e => (e.currentTarget.style.background = 'var(--ink)')}
                    >Send message →</button>
                  </form>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hair)', display: 'flex', gap: 24 }}>
                    <a href="tel:+919810011169" style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', textDecoration: 'none' }}>Call us</a>
                    <a href="mailto:gemsindia@ymail.com" style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', textDecoration: 'none' }}>Email us</a>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pop { 0% { transform: scale(0.4); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @media (max-width: 480px) {
          .chat-panel { right: 12px !important; left: 12px !important; width: auto !important; }
        }
      `}</style>
    </>
  )
}
