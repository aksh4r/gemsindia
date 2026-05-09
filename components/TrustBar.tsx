"use client";

const items = [
  { num: "15+", label: "Years of Excellence" },
  { num: "40+", label: "Countries Sourced" },
  { num: "500+", label: "Certified Stones" },
  { num: "10K+", label: "Happy Collectors" },
];

export default function TrustBar() {
  return (
    <div style={{ background: "#0a0a0a", padding: "56px 40px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "#0a0a0a", padding: "36px 24px", textAlign: "center", borderRight: i < 3 ? "0.5px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 300, color: "var(--gold-light)", marginBottom: 8, letterSpacing: -1 }}>{item.num}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", fontWeight: 300 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
