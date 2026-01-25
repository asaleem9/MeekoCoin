"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const cards = [
  {
    icon: "[ * ]",
    title: "Plastic Bag Connoisseur",
    description: "HODL like Meeko HODLs his favorite crinkly bag. Pure grr energy.",
  },
  {
    icon: "< ! >",
    title: "Smol But Fierce",
    description: "420.69 million tokens of grr. No rugs, just a little guy pretending to be huge.",
  },
  {
    icon: "{ ~ }",
    title: "Under-Bed Warrior",
    description: "Scared of doorbells, fearless in the charts. Growls at FUD from his safe space.",
  },
];

export default function About() {
  return (
    <section className="section">
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
              // WHO IS
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-white mt-2">
              MEEKO<span className="text-meeko-orange">?</span>
            </h2>
          </motion.div>

          {/* Main text */}
          <motion.div variants={fadeInUp} className="max-w-3xl mb-16">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-mono">
              Meeko thinks he&apos;s a big strong man, but he&apos;s actually just a{" "}
              <span className="text-meeko-orange">little fry</span>.
              He&apos;ll chase his toy like he&apos;s hunting the next 100x, growl under the bed
              like a whale defending support, and lick plastic bags because... well,
              that&apos;s just Meeko.{" "}
              <span className="text-white">Scared of doorbells, fearless in the charts.</span>
            </p>
          </motion.div>

          {/* Cards - staggered masonry layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                className={`card-brutal p-8 ${
                  index === 1 ? "md:-translate-y-6" : ""
                }`}
              >
                {/* ASCII icon */}
                <div className="font-mono text-meeko-orange text-2xl mb-6">
                  {card.icon}
                </div>

                <h3 className="text-xl font-display text-white mb-3 uppercase tracking-wide">
                  {card.title}
                </h3>

                <p className="text-gray-500 text-sm font-mono leading-relaxed">
                  {card.description}
                </p>

                {/* Corner decoration */}
                <div className="absolute bottom-4 right-4 text-meeko-orange/20 font-mono text-xs">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
