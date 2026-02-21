# Xtract Landing Page

A modern **AI automation company landing page** for "Xtract" built with Next.js.

## Tech Stack

- **Framework**: Next.js 16.1.6 + React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Font**: Figtree (via @fontsource)
- **Language**: TypeScript

## Project Structure

```
landing-page/
├── src/
│   └── app/
│       ├── page.tsx       # Main entry (Navbar + Hero)
│       ├── layout.tsx     # Root layout
│       └── globals.css    # Global styles
│   └── components/
│       ├── layout/Navbar.tsx    # Fixed navigation
│       └── sections/Hero.tsx    # Hero section with animations
├── public/                # Static assets (SVG icons)
├── package.json          # Dependencies & scripts
├── next.config.ts        # Next.js config
├── tsconfig.json         # TypeScript config
└── tailwind.config       # Tailwind (in globals.css)
```

## Key Features

- Dark theme with purple accent (#814ac8)
- Animated background with breathing gradient orbs
- Staggered entrance animations using Framer Motion physics
- Responsive navbar with glassmorphism effect
- "Get in touch" & "View services" CTAs
- Social proof logos section

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

---
*The ADAL Bootcamp is awesome!* 🚀
