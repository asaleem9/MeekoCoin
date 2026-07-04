"use client";

import { useRef, type ReactNode, type MouseEventHandler } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/components/providers/MotionProvider";

type ChromeButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
  variant?: "acid" | "chrome";
  className?: string;
  target?: string;
  rel?: string;
};

// Magnetic CTA: the whole button drifts toward the cursor and snaps back
// with an elastic release. Filled acid for primary, holo-ringed for secondary.
export default function ChromeButton({
  children,
  href,
  onClick,
  variant = "acid",
  className = "",
  target,
  rel,
}: ChromeButtonProps) {
  const tier = useMotionTier();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (tier !== "full") return;
      const el = ref.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * 0.35);
        yTo(relY * 0.45);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { dependencies: [tier], revertOnUpdate: true }
  );

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200";
  const look =
    variant === "acid"
      ? "bg-acid text-void hover:bg-ice"
      : "holo-panel text-chrome-light hover:text-acid";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {/* diagonal shine sweep on hover */}
      <span
        aria-hidden
        className="absolute inset-y-0 -left-full z-0 w-1/2 -skew-x-12 bg-white/30 transition-[left] duration-500 ease-out group-hover:left-[150%]"
      />
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${base} ${look} ${className}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={`${base} ${look} ${className}`}
    >
      {inner}
    </button>
  );
}
