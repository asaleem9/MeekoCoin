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
          <div className="md:col-span-7">
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
