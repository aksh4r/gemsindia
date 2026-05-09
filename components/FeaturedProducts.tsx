"use client";

const products = [
  { bg: "#f5f2ee", emoji: "🟣", category: "Amethyst", name: "Natural Amethyst Geode Cluster", price: "$264.99", tag: "New Arrival" },
  { bg: "#eef5f2", emoji: "💚", category: "Emerald", name: "Colombian Emerald Pear Cut Faceted", price: "$44.99", tag: null },
  { bg: "#f5eeee", emoji: "❤️", category: "Ruby", name: "Certified Natural Ruby Oval Cabochon", price: "$149.99", tag: "Certified" },
  { bg: "#eeeef5", emoji: "💙", category: "Sapphire", name: "Blue Sapphire Beaded Jewelry Set", price: "$279.99", tag: "Best Seller" },
  { bg: "#f5f2e8", emoji: "💛", category: "Topaz", name: "Blue Topaz Round Cabochon Lot", price: "$39.99", tag: null },
  { bg: "#f5eef2", emoji: "💜", category: "Alexandrite", name: "Brazilian Amethyst Oval Cut Rare Gem", price: "$24.99", tag: "Sale" },
];

export default function FeaturedProducts() {
  return (
    <section style={{ background: "#fff", padding: "100px 0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", fontWeight: 400, marginBottom: 16 }}>New Listings</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, color: "#0a0a0a" }}>
              Featured <em style={{ fontStyle: "italic" }}>Gems</em>
            </h2>
          </div>
          <a href="#" style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: 3, color: "#0a0a0a", textDecoration: "none", textTransform: "uppercase", borderBottom: "0.5px solid #0a0a0a", paddingBottom: 2 }}>View All</a>
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(0,0,0,0.06)" }}>
          {products.map((p) => (
            <div key={p.name} style={{ background: "#fff", cursor: "pointer" }}
              onMouseEnter={e => { (e.currentTarget.querySelector(".p-img") as HTMLElement)!.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { (e.currentTarget.querySelector(".p-img") as HTMLElement)!.style.transform = "scale(1)"; }}
            >
              {/* Image area */}
              <div style={{ overflow: "hidden", position: "relative" }}>
                <div className="p-img" style={{ height: 280, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
                  {p.emoji}
                </div>
                {p.tag && (
                  <span style={{ position: "absolute", top: 16, left: 16, background: "#0a0a0a", color: "#fff", fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 2, padding: "5px 12px", textTransform: "uppercase", fontWeight: 400 }}>{p.tag}</span>
                )}
              </div>
              {/* Info */}
              <div style={{ padding: "20px 24px 28px" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 8, fontWeight: 400 }}>{p.category}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "#0a0a0a", marginBottom: 16, lineHeight: 1.4 }}>{p.name}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 300, color: "#0a0a0a" }}>{p.price}</span>
                  <button style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 2, fontWeight: 500, color: "#0a0a0a", textTransform: "uppercase", background: "none", border: "0.5px solid #0a0a0a", padding: "8px 16px", cursor: "pointer", transition: "all 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0a0a0a"; }}
                  >Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
