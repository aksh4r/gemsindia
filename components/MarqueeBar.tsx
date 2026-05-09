const GEMS = ['Ruby','Emerald','Blue Sapphire','Amethyst','Aquamarine','Alexandrite','Moonstone','Cat\'s Eye','Yellow Sapphire','Opal','Turquoise','Diamond','Lapis Lazuli','Coral']

export default function MarqueeBar() {
  const items = [...GEMS, ...GEMS]
  return (
    <div style={{
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '0.85rem 0', overflow: 'hidden', background: 'var(--cream2)',
      position: 'relative', zIndex: 1,
    }}>
      <div className="marquee-track">
        {items.map((gem, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', fontStyle: 'italic',
            color: 'var(--muted)', letterSpacing: '0.12em', padding: '0 2rem',
          }}>
            {gem} <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
