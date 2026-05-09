"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; size: number; speed: number; opacity: number; phase: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random(),
        phase: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      particles.forEach(p => {
        p.phase += p.speed * 0.02;
        const o = (Math.sin(p.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${o * 0.7})`;
        ctx.fill();
        // draw cross sparkle for some
        if (p.size > 1.8) {
          ctx.strokeStyle = `rgba(232,204,128,${o * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 3, p.y);
          ctx.lineTo(p.x + p.size * 3, p.y);
          ctx.moveTo(p.x, p.y - p.size * 3);
          ctx.lineTo(p.x, p.y + p.size * 3);
          ctx.stroke();
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 700, background: "linear-gradient(160deg, #0a0604 0%, #14100a 30%, #1e1812 60%, #100c06 100%)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Sparkle canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: 800 }}>
        <p className="fade-in delay-1" style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 300, letterSpacing: 5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 28 }}>
          Certified · Natural · Since 2008
        </p>
        <h1 className="fade-in delay-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 300, color: "#fff", lineHeight: 1.05, marginBottom: 28, letterSpacing: -1 }}>
          Every stone<br />
          <em style={{ fontStyle: "italic", color: "var(--gold-light)", fontWeight: 300 }}>tells a story</em>
        </h1>
        <p className="fade-in delay-3" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.5)", maxWidth: 380, margin: "0 auto 48px", lineHeight: 2, letterSpacing: 0.5 }}>
          Rare gemstones. Handcrafted jewels. Spiritual sculptures. Sourced from 40+ countries, certified natural.
        </p>
        <div className="fade-in delay-4" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#collections" style={{ display: "inline-block", background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: 3, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", transition: "background 0.3s, color 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0a0a0a"; }}
          >
            Discover
          </a>
          <a href="#contact" style={{ display: "inline-block", background: "transparent", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 400, letterSpacing: 3, padding: "16px 40px", textDecoration: "none", textTransform: "uppercase", border: "0.5px solid rgba(255,255,255,0.25)" }}>
            Wholesale
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 3, color: "#fff", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 0.5, height: 40, background: "#fff" }} />
      </div>
    </section>
  );
}
