"use client";

export default function ContactBanner() {
  return (
    <section id="contact" style={{ background: "#0a0a0a", padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      {/* subtle gold glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", fontWeight: 400, marginBottom: 24 }}>Wholesale</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
          Looking for<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>wholesale deals?</em>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.4)", marginBottom: 48, lineHeight: 2 }}>
          15+ years of experience. Competitive pricing for bulk orders worldwide.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:+919810011169" style={{ display: "inline-block", background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: 3, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", transition: "background 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0a0a0a"; }}
          >Call Us</a>
          <a href="mailto:gemsindia@ymail.com" style={{ display: "inline-block", background: "transparent", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 400, letterSpacing: 3, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", border: "0.5px solid rgba(255,255,255,0.2)" }}>
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
