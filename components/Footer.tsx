"use client";

const products = ["Gemstones", "Jewelry", "Sculptures", "Large Gems", "Spheres", "Metaphysical", "Wholesale"];
const services = ["About Us", "Contact", "Gallery", "Loose Beads", "Deal of the Day", "Astrology"];

export default function Footer() {
  return (
    <footer style={{ background: "#050503", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 60, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 300, letterSpacing: 4, color: "#fff", marginBottom: 20 }}>
              Gems<span style={{ color: "var(--gold)" }}>India</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.3)", lineHeight: 2, maxWidth: 260, marginBottom: 28 }}>
              Kikan International Pvt. Ltd. — supplying the world's finest certified natural gemstones since 2008.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["YouTube", "Instagram", "Pinterest", "Facebook"].map(s => (
                <a key={s} href="#" style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 1.5, color: "rgba(255,255,255,0.25)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>Products</div>
            {products.map(l => (
              <a key={l} href="#" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.3)", textDecoration: "none", marginBottom: 12, letterSpacing: 0.3, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >{l}</a>
            ))}
          </div>

          {/* Services */}
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>Services</div>
            {services.map(l => (
              <a key={l} href="#" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.3)", textDecoration: "none", marginBottom: 12, letterSpacing: 0.3, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >{l}</a>
            ))}
          </div>

          {/* Contact + newsletter */}
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>Contact</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.3)", marginBottom: 6, lineHeight: 2 }}>+91 9810011169</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.3)", marginBottom: 32, lineHeight: 2 }}>gemsindia@ymail.com</p>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 14, fontWeight: 500 }}>Newsletter</div>
            <div style={{ display: "flex", border: "0.5px solid rgba(255,255,255,0.1)" }}>
              <input type="email" placeholder="Your email" style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontFamily: "var(--font-body)", fontSize: 11, padding: "12px 14px", outline: "none" }} />
              <button style={{ background: "var(--gold)", color: "#fff", border: "none", padding: "12px 16px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 12 }}>→</button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.18)", letterSpacing: 0.5 }}>
            © 2026 GemsIndia · Kikan International Pvt. Ltd.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.18)", letterSpacing: 0.5 }}>
            New Delhi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
