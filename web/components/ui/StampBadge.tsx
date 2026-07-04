import type { ReactNode } from "react";

type StampBadgeProps = {
  children: ReactNode;
  color?: "acid" | "zap";
  className?: string;
};

// Rubber-stamp lockup — GSAP slams it in from scale 3 wherever it's used
// (target the `.stamp` class); statically it reads as an inked stamp.
export default function StampBadge({
  children,
  color = "zap",
  className = "",
}: StampBadgeProps) {
  const ink = color === "zap" ? "border-zap text-zap" : "border-acid text-acid";
  return (
    <span
      className={`stamp inline-block -rotate-6 border-4 px-3 py-1 font-display text-lg font-black uppercase tracking-[0.2em] ${ink} ${className}`}
      style={{ boxShadow: "0 0 0 2px currentColor inset" }}
    >
      {children}
    </span>
  );
}
