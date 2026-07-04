"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import { useMotionTier } from "./MotionProvider";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const tier = useMotionTier();

  useEffect(() => {
    // Reduced motion: native scroll, CSS scroll-margin handles anchors.
    if (tier === "off") return;

    // Window mode only — wrapper/transform mode breaks pins and fixed overlays.
    const lenis = new Lenis({
      lerp: 0.1,
      anchors: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onFonts = () => ScrollTrigger.refresh();
    document.fonts.ready.then(onFonts);

    return () => {
      gsap.ticker.remove(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, [tier]);

  return <>{children}</>;
}
