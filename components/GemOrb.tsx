'use client'

interface Props {
  color: number
  shape?: 'octa' | 'ico'
  size?: number
  ior?: number
}

function toHsl(color: number) {
  const r = ((color >> 16) & 0xff) / 255
  const g = ((color >> 8) & 0xff) / 255
  const b = (color & 0xff) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(Math.min(s * 100, 80)), l: Math.round(l * 100) }
}

export default function GemOrb({ color, size = 90 }: Props) {
  const { h, s } = toHsl(color)
  const f = (l: number, a = 1) => `hsla(${h},${s}%,${l}%,${a})`
  const id = `g${color.toString(16)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ overflow: 'visible', filter: `drop-shadow(0 6px 18px ${f(45, 0.55)}) drop-shadow(0 2px 6px ${f(55, 0.3)})` }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}a`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={f(92)} />
          <stop offset="100%" stopColor={f(68)} />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={f(58)} />
          <stop offset="100%" stopColor={f(36)} />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={f(78)} />
          <stop offset="100%" stopColor={f(52)} />
        </linearGradient>
        <linearGradient id={`${id}d`} x1="0%" y1="0%" x2="40%" y2="100%">
          <stop offset="0%" stopColor={f(48)} />
          <stop offset="100%" stopColor={f(22)} />
        </linearGradient>
        <linearGradient id={`${id}e`} x1="100%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor={f(65)} />
          <stop offset="100%" stopColor={f(38)} />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="50%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={f(32)} />
          <stop offset="100%" stopColor={f(16)} />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="50%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={f(52)} />
          <stop offset="100%" stopColor={f(28)} />
        </linearGradient>
        <radialGradient id={`${id}h`} cx="38%" cy="28%" r="40%">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Table (top flat face) */}
      <polygon points="50,8 79,26 50,37 21,26" fill={`url(#${id}a)`} />

      {/* Crown — right facets */}
      <polygon points="79,26 50,37 92,55" fill={`url(#${id}b)`} />
      <polygon points="79,26 92,55 92,40" fill={f(42)} />

      {/* Crown — left facets */}
      <polygon points="21,26 50,37 8,55" fill={`url(#${id}c)`} />
      <polygon points="21,26 8,55 8,40" fill={f(62)} />

      {/* Girdle band */}
      <polygon points="8,55 50,37 92,55 70,62 30,62" fill={f(58, 0.5)} />

      {/* Pavilion — right */}
      <polygon points="92,55 70,62 50,95" fill={`url(#${id}d)`} />
      <polygon points="70,62 50,62 50,95" fill={f(34)} />

      {/* Pavilion — left */}
      <polygon points="8,55 30,62 50,95" fill={`url(#${id}e)`} />
      <polygon points="30,62 50,62 50,95" fill={f(54)} />

      {/* Culet facets */}
      <polygon points="92,55 70,62 50,95 72,74" fill={`url(#${id}f)`} />
      <polygon points="8,55 30,62 50,95 28,74" fill={`url(#${id}g)`} />

      {/* Specular highlight */}
      <ellipse cx="42" cy="22" rx="14" ry="7" fill={`url(#${id}h)`} transform="rotate(-18 42 22)" />

      {/* Rim outline for depth */}
      <polygon
        points="50,8 79,26 92,55 70,62 50,95 30,62 8,55 21,26"
        fill="none"
        stroke={f(30, 0.25)}
        strokeWidth="0.5"
      />
    </svg>
  )
}
