"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Player } from "@remotion/player";
import dynamic from "next/dynamic";
import GlitchText from "./ui/GlitchText";
import BreathingButton from "./ui/BreathingButton";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

const CoinShower = dynamic(() => import("@/remotion/compositions/CoinShower"), {
  ssr: false,
});

const GlowOrb = dynamic(() => import("@/remotion/compositions/GlowOrb"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden grid-bg">
      {/* Remotion CoinShower Background */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <Player
          component={CoinShower}
          durationInFrames={300}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          loop
          autoPlay
          style={{ width: "100%", height: "100%" }}
          controls={false}
          acknowledgeRemotionLicense
        />
      </div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-meeko-orange/10" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-meeko-orange/10" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-meeko-orange/10" />
      </div>

      <div className="container-custom w-full px-4 md:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Coin with GlowOrb */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="relative order-2 md:order-1"
          >
            {/* GlowOrb behind coin */}
            <div className="absolute inset-0 -m-16 pointer-events-none">
              <Player
                component={GlowOrb}
                durationInFrames={60}
                fps={30}
                compositionWidth={500}
                compositionHeight={500}
                loop
                autoPlay
                style={{ width: "100%", height: "100%" }}
                controls={false}
                acknowledgeRemotionLicense
              />
            </div>

            {/* Floating coin */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                <Image
                  src="/meeko-logo.png"
                  alt="MeekoCoin - Meeko the cat"
                  width={320}
                  height={320}
                  className="relative w-full h-full rounded-full glow-orange"
                  priority
                />
              </div>
            </motion.div>

            {/* $MEEKO tag below coin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center mt-6"
            >
              <span className="font-mono text-meeko-orange text-2xl tracking-widest">
                $MEEKO
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="text-left order-1 md:order-2"
          >
            {/* Massive glitch title */}
            <div className="mb-6">
              <GlitchText
                text="MEEKO"
                as="h1"
                className="text-7xl md:text-9xl text-white text-glow-orange tracking-tight"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-400 mb-2 font-mono"
            >
              Smol but fierce.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-meeko-orange mb-8 font-mono"
            >
              420.69M tokens of pure chaos.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <BreathingButton href="#how-to-buy" variant="primary">
                BUY $MEEKO
              </BreathingButton>
              <BreathingButton href="#contract" variant="ghost">
                CONTRACT
              </BreathingButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
            Scroll
          </span>
          <svg
            className="w-5 h-5 text-meeko-orange"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
