# GemsIndia — Luxury Gemstone & Jewelry Website

A modern, Swarovski-inspired e-commerce website for GemsIndia, built with Next.js 15 and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS-in-JS with CSS Variables
- **Fonts**: Playfair Display + Raleway (Google Fonts)
- **Database**: Supabase (coming soon)
- **Deployment**: Vercel

## Getting Started

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/yourusername/gemsindia.git
cd gemsindia
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
# Fill in your Supabase credentials
\`\`\`

### 4. Run locally
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
gemsindia/
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles + CSS variables
├── components/
│   ├── Navbar.tsx      # Sticky transparent → white navbar
│   ├── Hero.tsx        # Full-bleed hero with sparkle canvas
│   ├── TrustBar.tsx    # Stats bar
│   ├── Collections.tsx # Category grid
│   ├── FeaturedProducts.tsx
│   ├── GemsDirectory.tsx
│   ├── Testimonials.tsx
│   ├── ContactBanner.tsx
│   └── Footer.tsx
├── .env.example        # Template for environment variables
├── .gitignore
└── README.md
\`\`\`

## Deployment

This project auto-deploys to Vercel on every push to `main`.

## License

© 2026 GemsIndia · Kikan International Pvt. Ltd.
