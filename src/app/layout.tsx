import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Arsenal - Free Fire Items Database | Search Items, IDs & Details",
  description: "Explore the complete Free Fire items database. Search weapons, skins, characters & more by name, ID or description. Get detailed item information instantly.",
  keywords: "free fire items, ff items database, free fire weapons, ff skins, free fire characters, item ID search, ff arsenal, free fire community, garena free fire, battle royale items",
  authors: [{ name: "Free Fire Community" }],
  openGraph: {
    type: "website",
    url: "https://arsenal.freefirecommunity.com/",
    title: "Arsenal - Free Fire Items Database",
    description: "Explore the complete Free Fire items database. Search weapons, skins, characters & more by name, ID or description.",
    siteName: "Arsenal - Free Fire Community",
    images: [
      {
        url: "https://www.freefirecommunity.com/wp-content/uploads/2025/06/FreeFireCommunityLogoRefined.png",
        width: 1200,
        height: 630,
        alt: "Free Fire Community Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FreeFireCommunity",
    title: "Arsenal - Free Fire Items Database",
    description: "Explore the complete Free Fire items database. Search weapons, skins, characters & more by name, ID or description.",
    images: ["https://www.freefirecommunity.com/wp-content/uploads/2025/06/FreeFireCommunityLogoRefined.png"],
  },
  icons: {
    icon: [
      { url: "https://www.freefirecommunity.com/wp-content/uploads/2025/06/cropped-FFCRefinedFavicon-1.png", sizes: "32x32" },
      { url: "https://www.freefirecommunity.com/wp-content/uploads/2025/06/cropped-FFCRefinedFavicon-1.png", sizes: "16x16" },
    ],
    apple: [
      { url: "https://www.freefirecommunity.com/wp-content/uploads/2025/06/cropped-FFCRefinedFavicon-1.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <link rel="canonical" href="https://arsenal.freefirecommunity.com/" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K62W5JEY4K"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K62W5JEY4K');
            `,
          }}
        />

        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6409311049525505" crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.variable} antialiased selection:bg-primary-orange-light selection:text-primary-orange bg-background-dark text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
