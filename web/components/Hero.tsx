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
              420.69M tokens of pure grr.
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

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6"
            >
              <a
                href="https://twitter.com/meekocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-meeko-orange transition-all hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/meekocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-meeko-orange transition-all hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
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
