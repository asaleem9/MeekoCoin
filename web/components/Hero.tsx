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
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <BreathingButton href="#how-to-buy" variant="primary">
                BUY $MEEKO
              </BreathingButton>
              <BreathingButton href="#contract" variant="ghost">
                CONTRACT
              </BreathingButton>
            </motion.div>

            {/* GitHub Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6"
            >
              <a
                href="https://github.com/asaleem9/meekocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-meeko-orange transition-all hover:scale-110 flex items-center gap-2 font-mono text-sm"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
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
