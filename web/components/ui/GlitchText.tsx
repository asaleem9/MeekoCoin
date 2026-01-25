"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function GlitchText({
  text,
  className = "",
  as: Component = "span",
}: GlitchTextProps) {
  return (
    <motion.div
      className="glitch-wrapper inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Component
        className={`glitch-text font-display ${className}`}
        data-text={text}
      >
        {text}
      </Component>
    </motion.div>
  );
}
