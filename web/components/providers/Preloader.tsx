"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";
import { getLenis, lockScroll, unlockScroll } from "@/lib/scroll";

const PHRASES = [
  "SUMMONING THE PROPHECY",
  "POLISHING THE CHROME",
  "FEEDING MEEKO",
  "REVOKING AUTHORITIES",
  "CHARGING THE ZOOMIES",
];

const MIN_BEAT = 2.4; // seconds — minimum brand moment even on fast connections

export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      lockScroll();

      const finish = () => {
        unlockScroll();
        // Authoritative refresh: fires after layout is final and every
        // dynamically-mounted scene had the preloader as cover.
        ScrollTrigger.refresh();
        if (location.hash && location.hash !== "#treats") {
          getLenis()?.scrollTo(location.hash, { immediate: true });
        }
        window.dispatchEvent(new CustomEvent("app:ready"));
        setDone(true);
      };

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        document.fonts.ready.then(() => finish());
        return;
      }

      const counter = counterRef.current!;
      const phrase = phraseRef.current!;
      const value = { n: 0 };

      // Counter grinds 0 → 420.69% while phrases scramble underneath.
      gsap.to(value, {
        n: 420.69,
        duration: MIN_BEAT - 0.4,
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = `${value.n.toFixed(2)}%`;
        },
      });
      gsap.to(trackRef.current, {
        scaleX: 1,
        duration: MIN_BEAT - 0.4,
        ease: "power2.inOut",
      });

      const phraseTl = gsap.timeline({ repeat: -1 });
      PHRASES.forEach((p) => {
        phraseTl.to(phrase, {
          duration: 0.55,
          scrambleText: { text: p, chars: SCRAMBLE_CHARS, speed: 2 },
        });
        phraseTl.to({}, { duration: 0.25 });
      });

      const ready = Promise.all([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, MIN_BEAT * 1000)),
      ]);

      ready.then(() => {
        phraseTl.kill();
        gsap
          .timeline()
          .set(counter, { textContent: "420.69%" })
          .to(phrase, {
            duration: 0.4,
            scrambleText: { text: "THE PROPHECY IS LIVE", chars: SCRAMBLE_CHARS },
          })
          .to(counter, { scale: 1.12, duration: 0.18, ease: "power2.in" })
          .to(counter, { scale: 1, duration: 0.3, ease: "elastic.out(1.2, 0.4)" })
          .to(
            ".preloader-center",
            { yPercent: -30, autoAlpha: 0, duration: 0.5, ease: "power3.in" },
            "+=0.15"
          )
          .to(".preloader-slat", {
            yPercent: -101,
            duration: 0.8,
            ease: "power4.inOut",
            stagger: 0.07,
          })
          .call(finish);
      });
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      aria-label="Loading"
      role="status"
    >
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="preloader-slat h-full flex-1"
            style={{ backgroundColor: i % 2 === 0 ? "#08010F" : "#0B0217" }}
          />
        ))}
      </div>

      <div className="preloader-center absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
        <div
          ref={counterRef}
          className="font-chaos text-chrome text-6xl leading-none sm:text-8xl md:text-9xl"
        >
          0.00%
        </div>
        <div className="h-px w-48 overflow-hidden bg-white/10 sm:w-72">
          <div
            ref={trackRef}
            className="h-full w-full origin-left bg-acid"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div
          ref={phraseRef}
          className="font-mono text-[11px] tracking-[0.35em] text-acid"
        >
          SUMMONING THE PROPHECY
        </div>
      </div>
    </div>
  );
}
