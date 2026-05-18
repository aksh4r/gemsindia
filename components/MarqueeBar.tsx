const GEMS = ['Ruby', 'Emerald', 'Blue Sapphire', 'Tourmaline', 'Spinel', 'Opal', 'Tanzanite', 'Paraiba', 'Aquamarine', 'Citrine']

export default function MarqueeBar() {
  const items = [...GEMS, ...GEMS]
  return (
    <div style={{
      borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)',
      padding: '26px 0', overflow: 'hidden', background: 'var(--paper)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        display: 'flex', gap: '64px',
        animation: 'gems-scroll 50s linear infinite',
        width: 'max-content',
      }}>
        {items.map((gem, i) => (
          <span key={i} style={{
            fontFamily: 'var(--display)', fontSize: '32px',
            letterSpacing: '0.14em', color: 'var(--ink)',
            whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '64px',
          }}>
            {gem}
            <span style={{ color: 'var(--rust)', fontSize: '14px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
