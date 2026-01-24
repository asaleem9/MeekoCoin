"use client";

import { motion } from "framer-motion";

export default function Tokenomics() {
  const stats = [
    { label: "Total Supply", value: "420,690,000", subtext: "MEEKO" },
    { label: "Decimals", value: "9", subtext: "Solana Standard" },
    { label: "Tax", value: "0%", subtext: "No Buy/Sell Tax" },
    { label: "Mint Authority", value: "Revoked", subtext: "Forever" },
  ];

  return (
    <section className="section bg-gradient-to-b from-transparent via-meeko-orange/5 to-transparent">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Tokenomics</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Simple. Clean. No complicated mechanisms. Just a memecoin doing
            memecoin things.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                <div className="text-2xl md:text-3xl font-bold text-meeko-orange mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.subtext}</div>
              </motion.div>
            ))}
          </div>

          {/* Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 card p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-6">Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Liquidity Pool</span>
                <span className="text-meeko-orange font-bold">100%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-meeko-orange to-meeko-gold h-full rounded-full"
                />
              </div>
              <p className="text-sm text-gray-400 text-center mt-4">
                All tokens added to liquidity. No team allocation. No presale.
                Fair launch.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
