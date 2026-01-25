"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BreathingButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
}

export default function BreathingButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
}: BreathingButtonProps) {
  const baseStyles =
    variant === "primary"
      ? "btn-breathe"
      : "btn-ghost";

  const content = (
    <motion.span
      className={`inline-flex items-center gap-2 ${baseStyles} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
