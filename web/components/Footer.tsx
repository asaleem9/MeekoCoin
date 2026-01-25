"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleEasterEgg = () => {
    const newCount = easterEggClicks + 1;
    setEasterEggClicks(newCount);
    if (newCount >= 5) {
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowEasterEgg(false);
        setEasterEggClicks(0);
      }, 3000);
    }
  };

  return (
    <footer className="section border-t border-meeko-orange/20 relative overflow-hidden">
      {/* Large wordmark background */}
      <div className="absolute -right-20 -bottom-20 font-display text-[15rem] md:text-[25rem] text-meeko-orange/[0.02] leading-none pointer-events-none select-none">
        MEEKO
      </div>

      <div className="container-custom relative">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand - takes more space */}
          <div className="md:col-span-5">
            <h3
              className="text-4xl md:text-5xl font-display text-white mb-4 cursor-pointer"
              onClick={handleEasterEgg}
            >
              MEEKO<span className="text-meeko-orange">COIN</span>
            </h3>
            <p className="text-gray-500 font-mono text-sm leading-relaxed max-w-xs">
              The purrfect memecoin on Solana. No utility, just vibes.
            </p>

            {/* Easter egg */}
            {showEasterEgg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 bg-meeko-orange/10 border-l-4 border-meeko-orange"
              >
                <p className="font-mono text-xs text-meeko-orange">
                  *purrs* You found me! Meeko approves. grr grr
                </p>
              </motion.div>
            )}
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs text-meeko-orange uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#contract"
                  className="font-mono text-sm text-gray-500 hover:text-meeko-orange transition-colors"
                >
                  &gt; Contract Address
                </a>
              </li>
              <li>
                <a
                  href="#how-to-buy"
                  className="font-mono text-sm text-gray-500 hover:text-meeko-orange transition-colors"
                >
                  &gt; How to Buy
                </a>
              </li>
              <li>
                <a
                  href="https://jup.ag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-gray-500 hover:text-meeko-orange transition-colors"
                >
                  &gt; Trade on Jupiter
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-meeko-orange uppercase tracking-widest mb-6">
              Community
            </h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/meekocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-gray-800 text-gray-500 hover:border-meeko-orange hover:text-meeko-orange transition-all group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/meekocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-gray-800 text-gray-500 hover:border-meeko-orange hover:text-meeko-orange transition-all group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-900 pt-8"
        >
          <p className="font-mono text-xs text-gray-700 leading-relaxed mb-6">
            <span className="text-meeko-orange">DISCLAIMER:</span> $MEEKO is a
            memecoin with no intrinsic value or expectation of financial return.
            It is purely for entertainment purposes. Cryptocurrency investments
            are highly volatile and risky. Never invest more than you can afford
            to lose. This is not financial advice. DYOR.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="font-mono text-xs text-gray-800">
              &copy; {new Date().getFullYear()} MeekoCoin. All rights reserved.
            </p>
            <p className="font-mono text-xs text-gray-800">
              Meeko reserves the right to nap at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
