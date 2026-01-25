import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
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
  title: "MeekoCoin | The Purrfect Memecoin on Solana",
  description:
    "MeekoCoin ($MEEKO) - A meme cryptocurrency on Solana inspired by Meeko the cat. No utility, just vibes.",
  keywords: ["memecoin", "solana", "cryptocurrency", "meeko", "cat coin"],
  openGraph: {
    title: "MeekoCoin | The Purrfect Memecoin on Solana",
    description: "No utility, just vibes. Join the Meeko revolution.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeekoCoin | The Purrfect Memecoin on Solana",
    description: "No utility, just vibes. Join the Meeko revolution.",
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
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
