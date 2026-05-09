"use client";

const collections = [
  { name: "Gemstones", sub: "Certified loose gems", bg: "#f5f0e8", accent: "#8a6a2a", emoji: "💎" },
  { name: "Jewelry", sub: "Rings, necklaces, earrings", bg: "#e8eef5", accent: "#2a4a7a", emoji: "💍" },
  { name: "Sculptures", sub: "Handcrafted art", bg: "#f0e8f5", accent: "#6a2a8a", emoji: "🗿" },
  { name: "Large Gems", sub: "Museum-size collectors", bg: "#e8f5f0", accent: "#2a7a5a", emoji: "🔮" },
];

export default function Collections() {
  return (
    <section id="collections" style={{ background: "#fafafa" }}>
      {/* Editorial intro */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 40px 64px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "0.5px solid var(--border)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#0a0a0a", lineHeight: 1.1, maxWidth: 500 }}>
          Our<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Collections</em>
        </h2>
        <div style={{ maxWidth: 320 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 300, color: "#888", lineHeight: 2 }}>
            From rare collector gems to handcrafted jewelry and sacred sculptures — all certified, all natural.
          </p>
          <a href="#" style={{ display: "inline-block", marginTop: 24, fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: 3, color: "#0a0a0a", textDecoration: "none", textTransform: "uppercase", borderBottom: "0.5px solid #0a0a0a", paddingBottom: 2 }}>
            View All →
          </a>
        </div>
      </div>

      {/* Full-bleed collection grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {collections.map((c, i) => (
          <a key={c.name} href="#" style={{ display: "block", textDecoration: "none", background: c.bg, padding: "64px 36px 48px", borderRight: i < 3 ? "0.5px solid rgba(0,0,0,0.06)" : "none", transition: "background 0.4s", position: "relative", overflow: "hidden", minHeight: 360 }}
            onMouseEnter={e => { (e.currentTarget.querySelector(".c-arrow") as HTMLElement)!.style.transform = "translateX(6px)"; }}
            onMouseLeave={e => { (e.currentTarget.querySelector(".c-arrow") as HTMLElement)!.style.transform = "translateX(0)"; }}
          >
            <div style={{ fontSize: 40, marginBottom: 32, opacity: 0.85 }}>{c.emoji}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, color: "#0a0a0a", marginBottom: 10 }}>{c.name}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "#888", letterSpacing: 0.3, marginBottom: 32, lineHeight: 1.7 }}>{c.sub}</div>
            <span className="c-arrow" style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2.5, color: c.accent, textTransform: "uppercase", display: "inline-block", transition: "transform 0.3s" }}>
              Shop Now →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
