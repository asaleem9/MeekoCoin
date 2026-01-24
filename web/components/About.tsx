"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Who is <span className="gradient-text">Meeko</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Meeko thinks he&apos;s a big strong man, but he&apos;s actually just a little fry.
            He&apos;ll chase his toy like he&apos;s hunting the next 100x, growl under the bed
            like a whale defending support, and lick plastic bags because... well,
            that&apos;s just Meeko. Scared of doorbells, fearless in the charts.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 transition-all"
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-2 text-meeko-orange">
                Plastic Bag Connoisseur
              </h3>
              <p className="text-gray-400">
                HODL like Meeko HODLs his favorite crinkly bag. Pure grr energy.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 transition-all"
            >
              <div className="text-4xl mb-4">😼</div>
              <h3 className="text-xl font-bold mb-2 text-meeko-orange">
                Smol But Fierce
              </h3>
              <p className="text-gray-400">
                420.69 million tokens of grr. No rugs, just a little guy pretending to be huge.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 transition-all"
            >
              <div className="text-4xl mb-4">🛏️</div>
              <h3 className="text-xl font-bold mb-2 text-meeko-orange">
                Under-Bed Warrior
              </h3>
              <p className="text-gray-400">
                Scared of doorbells, fearless in the charts. Growls at FUD from his safe space.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
