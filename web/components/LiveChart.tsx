"use client";

import { motion } from "framer-motion";

const CONTRACT_ADDRESS = "9AqPGi9n7unEA8C6T6ujHxXsg1ywb1Ro6fitw9daMGNa";

export default function LiveChart() {
  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">Live Chart</span>
          </h2>
          <p className="text-gray-400 mb-8 text-center">
            Real-time price and transactions
          </p>

          <div className="card p-2 md:p-4 max-w-4xl mx-auto overflow-hidden">
            <iframe
              src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&theme=dark&trades=1&info=0`}
              className="w-full rounded-lg"
              style={{ height: "500px", border: "none" }}
              title="MeekoCoin Chart"
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <a
              href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-meeko-orange hover:underline"
            >
              Open in DEXScreener →
            </a>
            <a
              href={`https://birdeye.so/token/${CONTRACT_ADDRESS}?chain=solana`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-meeko-orange hover:underline"
            >
              View on Birdeye →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
