import type { Metadata } from "next";
import { Unbounded, Climate_Crisis, Azeret_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import Providers from "@/components/providers/Providers";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});

const climateCrisis = Climate_Crisis({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-climate",
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MeekoCoin | The Chosen Cat of Solana",
  description:
    "MeekoCoin ($MEEKO) — the chosen cat of the Solana blockchain. 420,690,000 tokens of pure chaos. No utility, just destiny.",
  keywords: ["memecoin", "solana", "cryptocurrency", "meeko", "cat coin"],
  openGraph: {
    title: "MeekoCoin | The Chosen Cat of Solana",
    description:
      "420,690,000 tokens of pure chaos. No utility, just destiny. The prophecy is live.",
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
    title: "MeekoCoin | The Chosen Cat of Solana",
    description:
      "420,690,000 tokens of pure chaos. No utility, just destiny. The prophecy is live.",
    images: ["/meeko-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${climateCrisis.variable} ${azeretMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
