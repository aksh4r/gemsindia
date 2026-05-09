import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
