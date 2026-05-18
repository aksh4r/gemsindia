import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'GemsIndia — Certified Natural Gemstones',
  description: '100% Natural, Certified, Collector-Grade Gemstones sourced directly from mines across the globe. 15+ years of expertise.',
  openGraph: {
    title: 'GemsIndia — Certified Natural Gemstones',
    description: "Probably the world's largest collection of large-size natural collector gemstones.",
    url: 'https://gemsindia.co.in',
    siteName: 'GemsIndia',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Italiana&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
