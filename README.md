# Arsenal - Free Fire Items Database

A modern, highly-responsive, and blazing-fast web application for browsing the comprehensive Garena Free Fire items catalog.

Live Website: [Arsenal Free Fire Community](https://arsenal.freefirecommunity.com/)

## Features

- **Comprehensive Database**: Detailed views of every Free Fire item, weapon, character, and cosmetic collection.
- **Lightning Fast Search Engine**: Instant filtering across Item IDs, descriptions, and names with debounced execution. Let users find items smoothly among massive datasets.
- **Premium UI/UX**: State-of-the-art dark mode design enhanced by glassmorphism, fluid micro-animations, and dynamic glow effects (using `framer-motion` and Tailwind CSS v4).
- **SEO Optimized**: Fully leverages Next.js App Router metadata features generating standard `<title>`, Description, Twitter Cards, and rich Open Graph components natively.
- **Native Sharing API**: Integration of the Web Share API ensuring seamless sharing experiences across iOS, Android, and Web with a beautiful clipping fallback utilizing toast animations.
- **Google AdSense Enabled**: Smart ad placements integrated without layout shifting.

## Technical Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Core Library**: React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript Strict Mode

## Folder Structure Highlights

- `/src/app/` - Core routing, layout (`layout.tsx`), page (`page.tsx`), and globals (`globals.css`).
- `/src/components/` - Interactive components like `ItemExplorer.tsx`.
- `/src/types/` - TypeScript interface definitions for robust API mapping.
- `/data/` - Contains all historically harvested static data files (`ItemData.json`, `OB51-Items.json`, etc.) related to Free Fire content drops. The frontend actively hydrates from remote datasets as requested but retains offline dumps here for backup purposes.
- `/index.old.html` - The legacy application architecture preserved for historical reference and backup fallback.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

This project is fully optimized and ready for production on Vercel or any Next.js runtime.

```bash
npm run build
npm start
``` 

## Legal Disclaimer

All game assets, item data, names, images, and related content are the exclusive property of Garena International and Sea Limited. We do not claim ownership of any game-related content. This site operates under fair use principles for educational research and reference by the Free Fire Community.
