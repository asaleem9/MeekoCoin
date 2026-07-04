"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "./MotionProvider";

export default function Cursor() {
  const tier = useMotionTier();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tier !== "full") return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      document.body.classList.add("has-custom-cursor");

      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };

      const isInteractive = (t: EventTarget | null) =>
        t instanceof Element && !!t.closest("a, button, [data-cursor]");

      const onOver = (e: PointerEvent) => {
        if (!isInteractive(e.target)) return;
        gsap.to(ring, { scale: 1.8, duration: 0.3, ease: "back.out(2)" });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      };
      const onOut = (e: PointerEvent) => {
        if (!isInteractive(e.target)) return;
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      };
      const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
      const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
      const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(3)" });

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, true);
      window.addEventListener("pointerout", onOut, true);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        document.body.classList.remove("has-custom-cursor");
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver, true);
        window.removeEventListener("pointerout", onOut, true);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [tier], revertOnUpdate: true }
  );

  if (tier !== "full") return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9995] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chrome-light opacity-0 mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9995] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-acid opacity-0"
      />
    </>
  );
}
