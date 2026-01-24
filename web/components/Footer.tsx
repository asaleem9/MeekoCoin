"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="section border-t border-white/10">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">MeekoCoin</h3>
            <p className="text-gray-400 text-sm">
              The purrfect memecoin on Solana. No utility, just vibes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#contract"
                  className="text-gray-400 hover:text-meeko-orange transition-colors"
                >
                  Contract Address
                </a>
              </li>
              <li>
                <a
                  href="#how-to-buy"
                  className="text-gray-400 hover:text-meeko-orange transition-colors"
                >
                  How to Buy
                </a>
              </li>
              <li>
                <a
                  href="https://jup.ag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-meeko-orange transition-colors"
                >
                  Trade on Jupiter
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/meekocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-meeko-orange transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/meekocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-meeko-orange transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
          className="border-t border-white/10 pt-8"
        >
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <strong>Disclaimer:</strong> $MEEKO is a memecoin with no intrinsic
            value or expectation of financial return. It is purely for
            entertainment purposes. Cryptocurrency investments are highly
            volatile and risky. Never invest more than you can afford to lose.
            This is not financial advice. DYOR (Do Your Own Research).
          </p>
          <p className="text-xs text-gray-600 text-center mt-4">
            &copy; {new Date().getFullYear()} MeekoCoin. All rights reserved.
            Meeko reserves the right to nap at any time.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
