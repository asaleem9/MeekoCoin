"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    phase: "Phase 1",
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
    phase: "Phase 2",
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
    phase: "Phase 3",
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
    phase: "Phase 4",
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
    <section className="section bg-gradient-to-b from-transparent via-meeko-orange/5 to-transparent">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-gray-400 mb-12 text-center max-w-xl mx-auto">
            Meeko&apos;s journey from lazy cat to internet legend
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card p-6 relative ${
                  milestone.status === "current"
                    ? "border-meeko-orange/50 glow-orange"
                    : ""
                }`}
              >
                {milestone.status === "current" && (
                  <div className="absolute -top-3 left-4 bg-meeko-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                    Current
                  </div>
                )}
                <div className="text-meeko-orange text-sm font-bold mb-2">
                  {milestone.phase}
                </div>
                <h3 className="text-xl font-bold mb-4">{milestone.title}</h3>
                <ul className="space-y-2">
                  {milestone.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-sm text-gray-400"
                    >
                      <span className="text-meeko-orange mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-gray-500 text-sm mt-8"
          >
            * Roadmap subject to change based on how Meeko is feeling that day
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
