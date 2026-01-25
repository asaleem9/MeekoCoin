"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const CONTRACT_ADDRESS = "9AqPGi9n7unEA8C6T6ujHxXsg1ywb1Ro6fitw9daMGNa";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const [displayedAddress, setDisplayedAddress] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    const interval = setInterval(() => {
      if (index <= CONTRACT_ADDRESS.length) {
        setDisplayedAddress(CONTRACT_ADDRESS.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

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
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-meeko-orange text-sm uppercase tracking-widest">
              // VERIFY
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-white mt-2">
              CONTRACT
            </h2>
          </div>

          {/* Terminal box */}
          <div className="terminal p-6 md:p-8 max-w-4xl bracket-frame">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-meeko-orange/20">
              <div className="w-3 h-3 rounded-full bg-meeko-orange/50" />
              <div className="w-3 h-3 rounded-full bg-meeko-gold/50" />
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <span className="ml-4 text-gray-600 font-mono text-xs">
                meeko@solana:~
              </span>
            </div>

            {/* Address display */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1 w-full">
                <div className="text-gray-600 font-mono text-sm mb-2">
                  $ cat contract_address.txt
                </div>
                <div className="bg-black/50 p-4 font-mono text-sm md:text-base text-meeko-orange break-all glow-orange">
                  {displayedAddress}
                  {isTyping && (
                    <span className="inline-block w-2 h-5 bg-meeko-orange ml-1 animate-blink" />
                  )}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="relative px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all"
                style={{
                  background: copied ? "#22c55e" : "#FF6B35",
                  color: copied ? "white" : "black",
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      COPIED!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      COPY
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Explorer links */}
            <div className="mt-8 pt-4 border-t border-meeko-orange/20 flex flex-wrap gap-6">
              <a
                href={`https://solscan.io/token/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-gray-500 hover:text-meeko-orange transition-colors group"
              >
                <span className="text-meeko-orange">&gt;</span> View on Solscan
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
                  _
                </span>
              </a>
              <a
                href={`https://explorer.solana.com/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-gray-500 hover:text-meeko-orange transition-colors group"
              >
                <span className="text-meeko-orange">&gt;</span> View on Solana Explorer
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
                  _
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
