"use client";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "background 0.4s, border-color 0.4s",
      background: scrolled ? "rgba(250,250,250,0.97)" : "transparent",
      borderBottom: scrolled ? "0.5px solid var(--border)" : "0.5px solid rgba(255,255,255,0.15)",
      backdropFilter: scrolled ? "blur(20px)" : "none",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left nav */}
        <nav style={{ display: "flex", gap: 36, flex: 1 }}>
          {["Gemstones", "Jewelry", "Sculptures"].map((l) => (
            <a key={l} href="#" style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: scrolled ? "#0a0a0a" : "#fff", textDecoration: "none", textTransform: "uppercase", opacity: 0.85, transition: "opacity 0.2s, color 0.4s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
            >{l}</a>
          ))}
        </nav>

        {/* Logo center */}
        <a href="/" style={{ textDecoration: "none", flex: "0 0 auto" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, letterSpacing: 6, color: scrolled ? "#0a0a0a" : "#fff", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Gems<span style={{ color: "var(--gold)" }}>India</span>
          </div>
        </a>

        {/* Right nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 36, flex: 1, justifyContent: "flex-end" }}>
          {["Wholesale", "About"].map((l) => (
            <a key={l} href="#" style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: scrolled ? "#0a0a0a" : "#fff", textDecoration: "none", textTransform: "uppercase", opacity: 0.85, transition: "opacity 0.2s, color 0.4s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
            >{l}</a>
          ))}
          <Search size={17} style={{ color: scrolled ? "#0a0a0a" : "#fff", cursor: "pointer", opacity: 0.85 }} />
          <ShoppingBag size={17} style={{ color: scrolled ? "#0a0a0a" : "#fff", cursor: "pointer", opacity: 0.85 }} />
        </div>
      </div>
    </header>
  );
}
