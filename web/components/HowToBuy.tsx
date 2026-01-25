"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import BreathingButton from "./ui/BreathingButton";

const steps = [
  {
    number: "01",
    title: "Get a Wallet",
    description:
      "Download Phantom or Solflare wallet from their official websites. Never download from unofficial sources.",
    icon: ">_",
  },
  {
    number: "02",
    title: "Get SOL",
    description:
      "Buy SOL from an exchange like Coinbase, Binance, or Kraken. Transfer it to your wallet address.",
    icon: "$_",
  },
  {
    number: "03",
    title: "Connect to Jupiter",
    description:
      "Go to jup.ag (Jupiter Exchange) and connect your wallet. This is the best DEX on Solana.",
    icon: "[]",
  },
  {
    number: "04",
    title: "Swap for $MEEKO",
    description:
      "Paste the MEEKO contract address, enter the amount of SOL you want to swap, and confirm the transaction.",
    icon: "<>",
  },
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="section relative overflow-hidden">
      {/* Vertical line through center on mobile, zigzag on desktop */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-meeko-orange/20" />

      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-16">
            <span className="font-mono text-meeko-orange text-sm uppercase tracking-widest">
              // INSTRUCTIONS
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-white mt-2">
              HOW TO BUY
            </h2>
          </motion.div>

          {/* Steps - zigzag timeline */}
          <div className="relative max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse md:text-right"
                }`}
              >
                {/* Large offset number */}
                <div
                  className={`hidden md:block absolute top-0 font-display text-[10rem] leading-none text-meeko-orange/5 ${
                    index % 2 === 0 ? "-left-20" : "-right-20"
                  }`}
                >
                  {step.number}
                </div>

                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-meeko-orange -translate-x-1/2 mt-2 z-10">
                  <div className="absolute inset-0 bg-meeko-orange animate-ping opacity-50" />
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 ml-12 md:ml-0 card-brutal p-6 ${
                    index % 2 === 0 ? "md:mr-[55%]" : "md:ml-[55%]"
                  }`}
                >
                  {/* Icon */}
                  <div className="font-mono text-meeko-orange text-xl mb-4">
                    {step.icon}
                  </div>

                  {/* Step label */}
                  <div className="font-mono text-meeko-orange/50 text-xs uppercase tracking-widest mb-2">
                    Step {step.number}
                  </div>

                  <h3 className="text-xl font-display text-white mb-3 uppercase">
                    {step.title}
                  </h3>

                  <p className="text-gray-500 font-mono text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line to next step */}
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block absolute w-[calc(50%-2rem)] h-px bg-meeko-orange/20 top-8 ${
                      index % 2 === 0 ? "left-1/2 ml-4" : "right-1/2 mr-4"
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <BreathingButton
              href="https://jup.ag"
              variant="primary"
            >
              TRADE ON JUPITER
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </BreathingButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
