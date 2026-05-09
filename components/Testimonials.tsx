"use client";

const testimonials = [
  { name: "Brett Oliveira", location: "United States", stars: 5, text: "The item is just as described and pictured. Arrived quickly with excellent packaging. I'm very happy with the purchase!" },
  { name: "Priya M.", location: "United Kingdom", stars: 5, text: "Stunning quality stones. The certification gives real peace of mind. The ruby I ordered is absolutely gorgeous." },
  { name: "James T.", location: "Australia", stars: 5, text: "Largest collection of large gems I've found anywhere. The Ganesha sculpture is breathtaking — museum quality." },
];

export default function Testimonials() {
  return (
    <section style={{ background: "#fff", padding: "100px 0", borderTop: "0.5px solid var(--border)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", fontWeight: 400, marginBottom: 16 }}>Reviews</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, color: "#0a0a0a" }}>
            Trusted by <em style={{ fontStyle: "italic" }}>Collectors</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ borderTop: "1px solid var(--gold)", paddingTop: 28 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: 3, color: "var(--gold)", marginBottom: 20 }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 300, fontStyle: "italic", color: "#333", lineHeight: 1.9, marginBottom: 28 }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: 2, color: "#0a0a0a", textTransform: "uppercase" }}>{t.name}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 300, color: "#888", marginTop: 3 }}>{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
