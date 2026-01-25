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
                  *purrs* You found me! Meeko approves.
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

          {/* GitHub */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-meeko-orange uppercase tracking-widest mb-6">
              Source
            </h4>
            <a
              href="https://github.com/asaleem9/meekocoin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-gray-800 text-gray-500 hover:border-meeko-orange hover:text-meeko-orange transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
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
