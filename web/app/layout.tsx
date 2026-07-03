import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MeekoCoin | The Purrfect Memecoin on Solana",
  description:
    "MeekoCoin ($MEEKO) - A meme cryptocurrency on Solana inspired by Meeko the cat. No utility, just vibes.",
  keywords: ["memecoin", "solana", "cryptocurrency", "meeko", "cat coin"],
  openGraph: {
    title: "MeekoCoin | The Purrfect Memecoin on Solana",
    description: "No utility, just vibes. Join the Meeko revolution.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/meeko-logo.png",
        width: 1024,
        height: 1024,
        alt: "MeekoCoin - Meeko the cat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeekoCoin | The Purrfect Memecoin on Solana",
    description: "No utility, just vibes. Join the Meeko revolution.",
    images: ["/meeko-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable}`}>
      <body className="scanlines">
        {children}
      </body>
    </html>
  );
}
