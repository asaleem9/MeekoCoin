"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Get a Wallet",
    description:
      "Download Phantom or Solflare wallet from their official websites. Never download from unofficial sources.",
    icon: "👛",
  },
  {
    number: "02",
    title: "Get SOL",
    description:
      "Buy SOL from an exchange like Coinbase, Binance, or Kraken. Transfer it to your wallet address.",
    icon: "💰",
  },
  {
    number: "03",
    title: "Connect to Jupiter",
    description:
      "Go to jup.ag (Jupiter Exchange) and connect your wallet. This is the best DEX on Solana.",
    icon: "🔗",
  },
  {
    number: "04",
    title: "Swap for $MEEKO",
    description:
      "Paste the MEEKO contract address, enter the amount of SOL you want to swap, and confirm the transaction.",
    icon: "🔄",
  },
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">How to Buy</span>
          </h2>
          <p className="text-gray-400 mb-12 text-center max-w-xl mx-auto">
            Get your paws on some $MEEKO in just a few simple steps
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 relative overflow-hidden group"
              >
                {/* Step number watermark */}
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-white/5 group-hover:text-meeko-orange/10 transition-colors">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-meeko-orange text-sm font-bold mb-2">
                    Step {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href="https://jup.ag"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Trade on Jupiter
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
