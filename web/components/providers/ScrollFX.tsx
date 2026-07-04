"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "./MotionProvider";

// Global scroll systems: acid progress bar + velocity → `--skew` CSS var
// consumed by `.skew-target` elements (see globals.css).
export default function ScrollFX() {
  const tier = useMotionTier();
  const barRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const [nice, setNice] = useState(false);

  useGSAP(
    () => {
      if (tier === "off") return;
      const bar = barRef.current;
      const readout = readoutRef.current;
      if (!bar) return;

      const setScaleX = gsap.quickSetter(bar, "scaleX");
      const skewSetter = gsap.quickSetter(document.documentElement, "--skew");
      const clampSkew = gsap.utils.clamp(-5, 5);
      const proxy = { skew: 0 };
      let niceShown = 0;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setScaleX(self.progress);
          const pct = Math.round(self.progress * 100);
          if (readout) readout.textContent = `${pct}%`;

          // 42% / 69% → "nice." (once per value per pageload)
          if ((pct === 42 || pct === 69) && niceShown !== pct) {
            niceShown = pct;
            setNice(true);
            gsap.delayedCall(1.6, () => setNice(false));
          }

          if (tier !== "full") return;
          const skew = clampSkew(self.getVelocity() / -400);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
    },
    { dependencies: [tier], revertOnUpdate: true }
  );

  if (tier === "off") return null;

  return (
    <div className="group fixed inset-x-0 top-0 z-[9990]" aria-hidden>
      <div className="h-1 w-full bg-white/5">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-acid via-ice to-zap"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div
        ref={readoutRef}
        className="absolute right-3 top-2 font-mono text-[10px] tracking-widest text-acid opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        className={`absolute right-3 top-7 font-mono text-[11px] lowercase text-zap transition-opacity duration-300 ${
          nice ? "opacity-100" : "opacity-0"
        }`}
      >
        nice.
      </div>
    </div>
  );
}
