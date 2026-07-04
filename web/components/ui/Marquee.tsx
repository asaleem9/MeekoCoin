"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/components/providers/MotionProvider";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop at rest */
  duration?: number;
  /** Reverse base direction */
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
};

// Infinite marquee whose speed surges with scroll velocity and flips with
// scroll direction. Content is rendered twice; the track loops at -50%.
export default function Marquee({
  children,
  duration = 22,
  reverse = false,
  className = "",
  trackClassName = "",
}: MarqueeProps) {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tier === "off") return;
      const track = trackRef.current;
      if (!track) return;

      const base = reverse ? 1 : -1;
      const tween = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          repeat: -1,
          duration,
          ease: "none",
        }
      );

      if (tier !== "full") return;

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const surge = gsap.utils.clamp(-5, 5, velocity / 300);
          tween.timeScale(surge || self.direction * base * base || 1);
          gsap.to(tween, {
            timeScale: self.direction < 0 ? -1 : 1,
            duration: 1,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: rootRef, dependencies: [tier, duration, reverse], revertOnUpdate: true }
  );

  return (
    <div
      ref={rootRef}
      className={`relative w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        ref={trackRef}
        className={`flex w-max whitespace-nowrap will-change-transform ${trackClassName}`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
