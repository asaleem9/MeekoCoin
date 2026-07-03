"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const stats = [
  { label: "Total Supply", value: "420,690,000", subtext: "MEEKO" },
  { label: "Decimals", value: "9", subtext: "Solana Standard" },
  { label: "Tax", value: "0%", subtext: "No Buy/Sell Tax" },
  { label: "Mint Authority", value: "REVOKED", subtext: "Forever" },
];

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

      // Non-numeric values ("REVOKED") can't count up — show them as-is
      if (isNaN(numericValue)) {
        setDisplayValue(value);
        return;
      }

      const isPercentage = value.includes("%");
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(numericValue * eased);

        if (isPercentage) {
          setDisplayValue(current + "%");
        } else if (value.includes(",")) {
          setDisplayValue(current.toLocaleString());
        } else {
          setDisplayValue(current.toString());
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      animate();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Tokenomics() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background decoration - hidden on mobile to prevent overflow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20rem] font-display text-meeko-orange/[0.02] leading-none">
          420
        </div>
      </div>

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-16">
            <span className="font-mono text-meeko-orange text-sm uppercase tracking-widest">
              // METRICS
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-white mt-2">
              TOKENOMICS
            </h2>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="relative pl-3 md:pl-4"
              >
                <div className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">
                  {stat.label}
                </div>

                {/* Number - sized to fit on one line */}
                <div
                  className={`font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-meeko-orange whitespace-nowrap ${
                    index === 0 ? "md:text-glow-orange" : ""
                  }`}
                >
                  <AnimatedNumber value={stat.value} />
                </div>

                <div className="text-xs font-mono text-gray-500 mt-2">
                  {stat.subtext}
                </div>

                {/* Vertical line decoration */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-meeko-orange/20" />
              </motion.div>
            ))}
          </div>

          {/* Distribution bar */}
          <motion.div
            variants={fadeInUp}
            className="card-brutal p-8 max-w-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-gray-400 uppercase tracking-widest">
                Distribution
              </span>
              <span className="font-mono text-meeko-orange text-2xl">
                100%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-900 mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-meeko-orange to-meeko-gold"
              />
            </div>

            <p className="text-gray-500 font-mono text-sm">
              All tokens added to liquidity. No team allocation. No presale.{" "}
              <span className="text-meeko-orange">Fair launch.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
