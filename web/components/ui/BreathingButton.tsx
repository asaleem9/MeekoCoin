"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BreathingButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export default function BreathingButton({
  children,
  href,
  onClick,
  className = "",
  target,
  rel,
}: BreathingButtonProps) {
  const content = (
    <motion.span
      className={`inline-flex items-center gap-2 btn-breathe ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
