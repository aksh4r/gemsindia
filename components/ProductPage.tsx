"use client";
import { useEffect, useRef, useState } from "react";

const GEMS = [
  { name: "Ruby", color: "#c0392b", shimmer: "#ff6b6b", light: "#ff0000" },
  { name: "Emerald", color: "#1a7a4a", shimmer: "#2ecc71", light: "#00ff88" },
  { name: "Sapphire", color: "#1a3a8a", shimmer: "#4a90d9", light: "#0088ff" },
  { name: "Amethyst", color: "#6a1a8a", shimmer: "#9b59b6", light: "#cc44ff" },
  { name: "Topaz", color: "#c47a2a", shimmer: "#f39c12", light: "#ffaa00" },
];

const METALS = ["Platinum", "White Gold", "Yellow Gold", "Rose Gold"];

export default function ProductPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotRef = useRef({ x: 0.3, y: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const [selectedGem, setSelectedGem] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const gem = GEMS[selectedGem];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width = 500;
    const H = canvas.height = 500;
    const cx = W / 2, cy = H / 2;

    // Sparkle particles
    const sparks: { x: number; y: number; size: number; phase: number; speed: number; angle: number; dist: number }[] = [];
    for (let i = 0; i < 40; i++) {
      sparks.push({ x: 0, y: 0, size: Math.random() * 3 + 1, phase: Math.random() * Math.PI * 2, speed: Math.random() * 0.02 + 0.01, angle: Math.random() * Math.PI * 2, dist: Math.random() * 80 + 60 });
    }

    function hexToRgb(hex: string) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    }

    function drawGem(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Dark radial background
      const bg = ctx!.createRadialGradient(cx, cy, 10, cx, cy, 260);
      bg.addColorStop(0, "#1a1410");
      bg.addColorStop(1, "#050302");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      const rotY = rotRef.current.y + t * 0.008;
      const rotX = rotRef.current.x;
      const c = gem.color;
      const s = gem.shimmer;
      const rgb = hexToRgb(c);
      const srgb = hexToRgb(s);

      // Shadow
      ctx!.beginPath();
      ctx!.ellipse(cx, cy + 115, 70, 12, 0, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(0,0,0,0.5)";
      ctx!.fill();

      // Main gem body - brilliant cut simulation
      const facets = 16;
      const outerR = 110;
      const innerR = 55;
      const girdle = cy + 10;
      const table = cy - 55;
      const culet = cy + 100;

      // Crown facets (top)
      for (let i = 0; i < facets; i++) {
        const a1 = (i / facets) * Math.PI * 2 + rotY;
        const a2 = ((i + 1) / facets) * Math.PI * 2 + rotY;
        const facing = Math.cos(a1 + (a2 - a1) / 2);
        const brightness = (facing + 1) / 2;
        const shimmerEffect = Math.sin(a1 * 3 + t * 0.05) * 0.3 + 0.7;

        const x1 = cx + Math.cos(a1) * outerR;
        const y1 = girdle + Math.sin(a1) * outerR * Math.abs(Math.sin(rotX));
        const x2 = cx + Math.cos(a2) * outerR;
        const y2 = girdle + Math.sin(a2) * outerR * Math.abs(Math.sin(rotX));
        const x3 = cx + Math.cos((a1 + a2) / 2) * innerR;
        const y3 = table;

        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.lineTo(x3, y3);
        ctx!.closePath();

        const lum = brightness * shimmerEffect;
        const r = Math.min(255, Math.floor(rgb.r * lum + srgb.r * (1 - lum) * 0.5));
        const g = Math.min(255, Math.floor(rgb.g * lum + srgb.g * (1 - lum) * 0.5));
        const b = Math.min(255, Math.floor(rgb.b * lum + srgb.b * (1 - lum) * 0.5));
        ctx!.fillStyle = `rgb(${r},${g},${b})`;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(255,255,255,${0.05 + brightness * 0.1})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      // Table (top center)
      ctx!.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + rotY;
        const x = cx + Math.cos(a) * innerR * 0.8;
        const y = table + Math.sin(a) * innerR * 0.2;
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.closePath();
      const tableGrad = ctx!.createRadialGradient(cx, table, 5, cx, table, innerR);
      tableGrad.addColorStop(0, `rgba(255,255,255,0.9)`);
      tableGrad.addColorStop(0.3, s);
      tableGrad.addColorStop(1, c);
      ctx!.fillStyle = tableGrad;
      ctx!.fill();

      // Pavilion facets (bottom)
      for (let i = 0; i < facets; i++) {
        const a1 = (i / facets) * Math.PI * 2 + rotY;
        const a2 = ((i + 1) / facets) * Math.PI * 2 + rotY;
        const facing = Math.cos(a1 + (a2 - a1) / 2 + Math.PI);
        const brightness = (facing + 1) / 2 * 0.7;

        const x1 = cx + Math.cos(a1) * outerR;
        const y1 = girdle + Math.sin(a1) * outerR * Math.abs(Math.sin(rotX));
        const x2 = cx + Math.cos(a2) * outerR;
        const y2 = girdle + Math.sin(a2) * outerR * Math.abs(Math.sin(rotX));

        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.lineTo(cx, culet);
        ctx!.closePath();

        ctx!.fillStyle = `rgba(${rgb.r * brightness},${rgb.g * brightness},${rgb.b * brightness},0.9)`;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(255,255,255,0.05)`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      // Girdle ring
      ctx!.beginPath();
      ctx!.ellipse(cx, girdle, outerR, outerR * Math.abs(Math.sin(rotX)) * 0.3 + 4, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(255,255,255,0.3)";
      ctx!.lineWidth = 2;
      ctx!.stroke();

      // Light flare
      const flareX = cx - 30;
      const flareY = table + 10;
      const flare = ctx!.createRadialGradient(flareX, flareY, 0, flareX, flareY, 40);
      flare.addColorStop(0, "rgba(255,255,255,0.9)");
      flare.addColorStop(0.3, `rgba(255,255,255,0.3)`);
      flare.addColorStop(1, "rgba(255,255,255,0)");
      ctx!.fillStyle = flare;
      ctx!.fillRect(flareX - 40, flareY - 40, 80, 80);

      // Light rays
      for (let r = 0; r < 6; r++) {
        const ra = (r / 6) * Math.PI * 2 + t * 0.01;
        const rx = flareX + Math.cos(ra) * 60;
        const ry = flareY + Math.sin(ra) * 60;
        ctx!.beginPath();
        ctx!.moveTo(flareX, flareY);
        ctx!.lineTo(rx, ry);
        ctx!.strokeStyle = `rgba(255,255,255,${0.1 + Math.sin(t * 0.05 + r) * 0.05})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Sparkles
      sparks.forEach(sp => {
        sp.phase += sp.speed;
        const opacity = (Math.sin(sp.phase) + 1) / 2;
        const sx = cx + Math.cos(sp.angle) * sp.dist;
        const sy = cy + Math.sin(sp.angle) * sp.dist * 0.6;
        if (opacity > 0.3) {
          ctx!.beginPath();
          ctx!.arc(sx, sy, sp.size * opacity, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${opacity * 0.8})`;
          ctx!.fill();
          // cross sparkle
          ctx!.strokeStyle = `rgba(255,255,255,${opacity * 0.5})`;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(sx - sp.size * 4, sy);
          ctx!.lineTo(sx + sp.size * 4, sy);
          ctx!.moveTo(sx, sy - sp.size * 4);
          ctx!.lineTo(sx, sy + sp.size * 4);
          ctx!.stroke();
        }
      });

      // Setting mount hint at bottom
      ctx!.beginPath();
      ctx!.ellipse(cx, culet + 5, 8, 4, 0, 0, Math.PI * 2);
      ctx!.fillStyle = selectedMetal === 0 ? "#e8e8f0" : selectedMetal === 1 ? "#d4d4e0" : selectedMetal === 2 ? "#d4a844" : "#d4927a";
      ctx!.fill();
    }

    let frame = 0;
    function animate() {
      drawGem(frame++);
      animRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, [selectedGem, selectedMetal]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.dragging) return;
    rotRef.current.y += (e.clientX - dragRef.current.lastX) * 0.01;
    rotRef.current.x += (e.clientY - dragRef.current.lastY) * 0.005;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };
  const handleMouseUp = () => { dragRef.current.dragging = false; };

  const thumbnails = ["💎", "💍", "✨", "🔮"];

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "var(--font-body)" }}>
      {/* Breadcrumb */}
      <div style={{ padding: "16px 40px", borderBottom: "0.5px solid var(--border)", background: "#fff" }}>
        <span style={{ fontSize: 11, color: "#888", letterSpacing: 1 }}>
          <a href="/" style={{ color: "#888", textDecoration: "none" }}>Home</a>
          {" / "}
          <a href="#" style={{ color: "#888", textDecoration: "none" }}>Gemstones</a>
          {" / "}
          <span style={{ color: "#0a0a0a" }}>{gem.name} Stud Earrings</span>
        </span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>

        {/* LEFT — 3D Viewer */}
        <div>
          {/* Main 3D canvas */}
          <div style={{ background: "#0a0604", borderRadius: 4, overflow: "hidden", position: "relative", marginBottom: 12 }}>
            <canvas
              ref={canvasRef}
              width={500} height={500}
              style={{ width: "100%", height: "auto", display: "block", cursor: "grab" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2, padding: "6px 16px", textTransform: "uppercase" }}>
              Drag to rotate
            </div>
            <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(201,168,76,0.15)", border: "0.5px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: 2, padding: "5px 12px", textTransform: "uppercase" }}>
              3D View
            </div>
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 8 }}>
            {thumbnails.map((t, i) => (
              <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, background: i === activeImg ? "#0a0604" : "#f0eeea", border: i === activeImg ? "1.5px solid var(--gold)" : "0.5px solid var(--border)", borderRadius: 2, fontSize: 24, cursor: "pointer", transition: "all 0.2s" }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Product Info */}
        <div style={{ paddingTop: 8 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 12 }}>GemsIndia · Certified Natural</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, color: "#0a0a0a", lineHeight: 1.2, marginBottom: 16 }}>
            {METALS[selectedMetal]} {gem.name}<br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>Stud Earrings</em>
          </h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ color: "var(--gold)", fontSize: 13 }}>★★★★★</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888" }}>4.9 (128 reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 32, paddingBottom: 32, borderBottom: "0.5px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400, color: "#0a0a0a" }}>$369.00</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", textDecoration: "line-through" }}>$450.00</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#2ecc71", letterSpacing: 1 }}>18% OFF</span>
          </div>

          {/* Gem selector */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
              Stone — <span style={{ color: "#0a0a0a", fontWeight: 500 }}>{gem.name}</span>
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {GEMS.map((g, i) => (
                <button key={g.name} onClick={() => setSelectedGem(i)} title={g.name} style={{ width: 32, height: 32, borderRadius: "50%", background: g.color, border: i === selectedGem ? `3px solid #0a0a0a` : "2px solid transparent", cursor: "pointer", boxShadow: i === selectedGem ? `0 0 0 1px ${g.shimmer}` : "none", transition: "all 0.2s" }} />
              ))}
            </div>
          </div>

          {/* Metal selector */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
              Metal — <span style={{ color: "#0a0a0a", fontWeight: 500 }}>{METALS[selectedMetal]}</span>
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {METALS.map((m, i) => (
                <button key={m} onClick={() => setSelectedMetal(i)} style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 1, color: i === selectedMetal ? "#fff" : "#0a0a0a", background: i === selectedMetal ? "#0a0a0a" : "transparent", border: "0.5px solid #0a0a0a", padding: "8px 16px", cursor: "pointer", transition: "all 0.2s" }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 12 }}>Quantity</p>
            <div style={{ display: "flex", alignItems: "center", border: "0.5px solid #0a0a0a", width: "fit-content" }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#0a0a0a" }}>−</button>
              <span style={{ width: 40, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14 }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#0a0a0a" }}>+</button>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }} style={{ background: "#0a0a0a", color: "#fff", fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 3, padding: "18px", border: "none", cursor: "pointer", textTransform: "uppercase", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.background = "#0a0a0a"}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button style={{ background: "transparent", color: "#0a0a0a", fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 3, padding: "18px", border: "0.5px solid #0a0a0a", cursor: "pointer", textTransform: "uppercase" }}>
              Buy It Now
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, paddingTop: 24, borderTop: "0.5px solid var(--border)" }}>
            {[
              { icon: "⬡", label: "Certified Natural" },
              { icon: "◈", label: "Free Shipping" },
              { icon: "◇", label: "30-Day Returns" },
            ].map(b => (
              <div key={b.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--gold)", marginBottom: 4 }}>{b.icon}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 1, color: "#888", textTransform: "uppercase" }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px", borderTop: "0.5px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, paddingTop: 48 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, marginBottom: 20 }}>About this piece</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#555", lineHeight: 2, fontWeight: 300 }}>
              These exquisite stud earrings feature a brilliant-cut {gem.name.toLowerCase()}, expertly held in a classic four-prong basket setting. Each stone is hand-selected for exceptional clarity and depth of color, then set in lustrous {METALS[selectedMetal]} for a timeless, elegant finish.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#555", lineHeight: 2, fontWeight: 300, marginTop: 16 }}>
              Sourced ethically from certified mines and accompanied by a full certificate of authenticity. A perfect gift for any occasion.
            </p>
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, marginBottom: 20 }}>Specifications</h2>
            {[
              ["Stone", gem.name],
              ["Cut", "Brilliant Round"],
              ["Metal", METALS[selectedMetal]],
              ["Carat Weight", "1.2 ct (pair)"],
              ["Setting", "Four-prong basket"],
              ["Certificate", "GIA Certified"],
              ["Origin", "India"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", letterSpacing: 0.5 }}>{k}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#0a0a0a", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
