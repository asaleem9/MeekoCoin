"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/components/providers/MotionProvider";

type SplitHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Split granularity */
  type?: "chars" | "words" | "lines";
  stagger?: number;
  /** Delay reveal until the app:ready event instead of a ScrollTrigger */
  waitForReady?: boolean;
  refreshPriority?: number;
};

// Masked SplitText reveal: chars rise out of an overflow clip when the
// element scrolls into view (or on app:ready for above-the-fold use).
export default function SplitHeading({
  children,
  as: Tag = "h2",
  className = "",
  type = "chars",
  stagger = 0.018,
  waitForReady = false,
  refreshPriority,
}: SplitHeadingProps) {
  const tier = useMotionTier();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || tier === "off") return;

      if (tier === "lite") {
        gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        return;
      }

      const split = SplitText.create(el, {
        type,
        mask: type,
        autoSplit: true,
        onSplit: (self) => {
          const targets =
            type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
          const tween = gsap.from(targets, {
            yPercent: 130,
            rotate: type === "chars" ? 8 : 3,
            duration: 0.9,
            ease: "power4.out",
            stagger,
            paused: waitForReady,
            scrollTrigger: waitForReady
              ? undefined
              : {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                  refreshPriority,
                },
          });
          if (waitForReady) {
            const onReady = () => tween.play();
            window.addEventListener("app:ready", onReady, { once: true });
          }
          return tween;
        },
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
