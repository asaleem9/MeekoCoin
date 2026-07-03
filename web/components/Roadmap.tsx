"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const milestones = [
  {
    phase: "01",
    title: "The Awakening",
    items: [
      "Meeko opens his eyes",
      "Token launch on Solana",
      "Website goes live",
      "Community gathering begins",
    ],
    status: "current",
  },
  {
    phase: "02",
    title: "The Stretching",
    items: [
      "1,000 holders",
      "CoinGecko listing",
      "First meme competition",
      "Community raids",
    ],
    status: "upcoming",
  },
  {
    phase: "03",
    title: "The Zoomies",
    items: [
      "10,000 holders",
      "CMC listing",
      "CEX discussions",
      "Meeko merch store",
    ],
    status: "upcoming",
  },
  {
    phase: "04",
    title: "World Domination",
    items: [
      "100,000 holders",
      "Major CEX listing",
      "Meeko becomes a meme legend",
      "Touch grass (optional)",
    ],
    status: "upcoming",
  },
];

export default function Roadmap() {
  return (
    <section className="section overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12">
            <span className="font-mono text-meeko-orange text-sm uppercase tracking-widest">
              // TRAJECTORY
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-white mt-2">
              ROADMAP
            </h2>
          </motion.div>

          {/* Progress bar */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="live-indicator text-meeko-orange">
                PHASE 01 ACTIVE
              </div>
            </div>
            <div className="w-full h-1 bg-gray-900">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "25%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="h-full bg-meeko-orange"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Horizontal scrolling roadmap */}
        <div
          className="flex gap-6 overflow-x-auto scroll-snap-x pb-8 -mx-4 px-4 md:-mx-8 md:px-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.phase}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex-shrink-0 w-72 md:w-80 card-brutal p-6 ${
                milestone.status === "current" ? "glow-orange" : ""
              } ${milestone.status === "upcoming" ? "opacity-60" : ""}`}
            >
              {/* Status badge */}
              {milestone.status === "current" && (
                <div className="inline-flex items-center gap-2 bg-meeko-orange/20 px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-meeko-orange rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-meeko-orange uppercase">
                    Current
                  </span>
                </div>
              )}

              {/* Phase number */}
              <div className="font-display text-6xl text-meeko-orange/20 mb-2">
                {milestone.phase}
              </div>

              <h3 className="text-xl font-display text-white mb-4 uppercase">
                {milestone.title}
              </h3>

              <ul className="space-y-3">
                {milestone.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`flex items-start gap-3 font-mono text-sm ${
                      milestone.status === "upcoming"
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    <span className="text-meeko-orange mt-0.5">
                      {milestone.status === "upcoming" ? "[ ]" : "[x]"}
                    </span>
                    <span
                      className={
                        milestone.status === "upcoming"
                          ? ""
                          : "line-through decoration-meeko-orange/30"
                      }
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Glitch effect on upcoming */}
              {milestone.status === "upcoming" && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,107,53,0.1) 2px, rgba(255,107,53,0.1) 4px)",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-4 md:hidden"
        >
          <span className="font-mono text-xs text-gray-600">
            &lt; scroll to explore &gt;
          </span>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-mono text-xs text-gray-600 mt-8"
        >
          * Roadmap subject to change based on how Meeko is feeling that day
        </motion.p>
      </div>
    </section>
  );
}
