'use client'
import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import dynamic from 'next/dynamic'

const GemOrb = dynamic(() => import('@/components/GemOrb'), { ssr: false })

interface GemQuickViewProps {
  open: boolean
  onClose: () => void
  gem: {
    name: string
    cat: string
    badge: string
    price: string
    href: string
    color: number
    origin?: string
  } | null
}

export function GemQuickView({ open, onClose, gem }: GemQuickViewProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onClose}>
      <AnimatePresence>
        {open && gem && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed', inset: 0, zIndex: 300,
                  background: 'rgba(26,23,20,0.55)', backdropFilter: 'blur(6px)',
                }}
              />
            </DialogPrimitive.Overlay>

            {/* Sheet sliding up from bottom */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                style={{
                  position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 301,
                  background: 'var(--white)',
                  borderTop: '1px solid var(--border)',
                  borderRadius: '1.5rem 1.5rem 0 0',
                  padding: '2.5rem 2.5rem 3rem',
                  maxWidth: '520px',
                  margin: '0 auto',
                }}
              >
                <DialogPrimitive.Title className="sr-only">{gem.name}</DialogPrimitive.Title>

                {/* Close */}
                <DialogPrimitive.Close
                  style={{
                    position: 'absolute', top: '1.2rem', right: '1.5rem',
                    background: 'var(--cream)', border: '1px solid var(--border)',
                    borderRadius: '50%', width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--ink)',
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </DialogPrimitive.Close>

                {/* Drag handle */}
                <div style={{
                  width: 40, height: 4, borderRadius: 2,
                  background: 'var(--border-dark)', margin: '0 auto 2rem',
                }} />

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  {/* Gem preview */}
                  <div style={{
                    width: 140, height: 140, flexShrink: 0,
                    borderRadius: '1rem', overflow: 'hidden',
                    background: 'var(--cream2)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <GemOrb color={gem.color} shape="octa" size={140} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                      background: 'var(--ink)', color: 'var(--white)',
                      padding: '0.22rem 0.6rem', marginBottom: '0.75rem', display: 'inline-block',
                    }}>{gem.badge}</span>

                    <p style={{
                      fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                      color: 'var(--gold)', marginBottom: '0.35rem',
                    }}>{gem.cat}</p>

                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.4rem', fontWeight: 300,
                      color: 'var(--ink)', lineHeight: 1.25, marginBottom: '0.5rem',
                    }}>{gem.name}</h3>

                    {gem.origin && (
                      <p style={{
                        fontSize: '0.68rem', color: 'var(--muted)',
                        letterSpacing: '0.08em', marginBottom: '1rem',
                      }}>{gem.origin}</p>
                    )}

                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.8rem', fontWeight: 300,
                      color: 'var(--ink)', marginBottom: '1.25rem',
                    }}>{gem.price}</div>

                    <a
                      href={gem.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                        background: 'var(--ink)', color: 'var(--white)',
                        padding: '0.85rem 1.8rem', textDecoration: 'none', fontWeight: 500,
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
                    >
                      View Full Details <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
