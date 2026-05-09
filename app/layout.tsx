import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GemsIndia — Certified Natural Gemstones & Jewelry",
  description: "Buy 100% natural, certified gemstones, handcrafted jewelry and sculptures. 15+ years of experience sourcing rare gems from across the globe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
