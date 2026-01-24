"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CONTRACT_ADDRESS = "9AqPGi9n7unEA8C6T6ujHxXsg1ywb1Ro6fitw9daMGNa";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="contract" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Contract Address</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Always verify you&apos;re using the official contract address
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="card p-6 md:p-8 max-w-3xl mx-auto glow-orange"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm md:text-base break-all">
                  {CONTRACT_ADDRESS}
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-meeko-orange text-white hover:bg-orange-500"
                }`}
              >
                {copied ? (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </motion.button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={`https://solscan.io/token/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-meeko-orange hover:underline"
              >
                View on Solscan →
              </a>
              <a
                href={`https://explorer.solana.com/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-meeko-orange hover:underline"
              >
                View on Solana Explorer →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
