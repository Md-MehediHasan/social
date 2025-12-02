import type { Metadata } from "next";

import "./globals.css";
import { NextAuthProvider } from "./providers";



export const metadata = {
  title: {
    default: "LEAN — Leather Engineers and Association for Networking",
    template: "%s | LEAN"
  },

  description:
    "LEAN is the leading global networking platform for Leather Engineers, Footwear Engineers, Leather Goods Manufacturers, Students, Entrepreneurs, and Professionals in the leather industry.",

  keywords: [
    "LEAN",
    "Leather Engineers",
    "Footwear Engineers",
    "Leather Goods Producers",
    "Leather Networking",
    "Leather Social App",
    "Leather Community",
    "Footwear Industry",
    "Tannery Engineers",
    "Professional Networking Leather",
    "Shoemaker Community",
    "Shoe Industry Network",
    "Shoe Sector Professionals"
  ],

  metadataBase: new URL("https://lean-network.com"), // ⬅ Change to real domain later

  openGraph: {
    title: "LEAN — Leather Sector Professionals Network",
    description:
      "Best social networking platform for leather, footwear and leather goods professionals.",
    url: "https://lean-network.com",
    siteName: "LEAN Social Network",
    images: [
      {
        url: "/lean-og-image.png", // Add your SEO preview image
        width: 1200,
        height: 630,
        alt: "LEAN — Leather Engineers Social Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "LEAN — Leather Engineers and Association for Networking",
    description:
      "A global social app for leather engineers, footwear engineers, and leather goods producers.",
    images: ["/lean-og-image.png"]
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },

  manifest: "/site.webmanifest"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
