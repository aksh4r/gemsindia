"use client";

const gems = [
  "Aquamarine", "Amethyst", "Alexandrite", "Bi-Colour Sapphire", "Blue Sapphire",
  "Blue Topaz", "Brazilian Emerald", "Burma Pink Sapphire", "Burma Yellow Sapphire",
  "Ceylon Hessonite", "Cat's Eye", "Coral", "Cultured Pearl", "Diamond",
  "Emerald", "Indian Ruby", "Jasper", "Lapis Lazuli", "Moonstone", "Navratna",
  "Opal", "Ruby", "Turquoise", "White Coral", "Zircon", "Kyanite",
  "Tourmaline", "Citrine", "Garnet", "Peridot",
];

export default function GemsDirectory() {
  return (
    <section style={{ background: "#fafafa", padding: "100px 0", borderTop: "0.5px solid var(--border)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", fontWeight: 400, marginBottom: 16 }}>Explore</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, color: "#0a0a0a" }}>
              Certified <em style={{ fontStyle: "italic" }}>Gems</em>
            </h2>
          </div>
          <a href="#" style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: 3, color: "#0a0a0a", textDecoration: "none", textTransform: "uppercase", borderBottom: "0.5px solid #0a0a0a", paddingBottom: 2 }}>All Stones</a>
        </div>

        {/* Gems as elegant pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {gems.map((g) => (
            <a key={g} href="#" style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 300, letterSpacing: 1, color: "#444", textDecoration: "none", padding: "10px 20px", border: "0.5px solid rgba(0,0,0,0.12)", transition: "all 0.25s", background: "#fff" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#444"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
            >{g}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
