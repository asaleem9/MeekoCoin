import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
