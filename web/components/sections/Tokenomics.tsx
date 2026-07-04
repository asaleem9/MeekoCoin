"use client";

import { useRef } from "react";
import { gsap, useGSAP, SECTION_PRIORITY } from "@/lib/gsap";
import { useMotionTier } from "@/components/providers/MotionProvider";
import StampBadge from "@/components/ui/StampBadge";

const STATS = [
  { label: "Total Supply", value: "420.69M", detail: "$MEEKO, forever fixed" },
  { label: "Decimals", value: "9", detail: "Solana standard" },
  { label: "Tax", value: "0%", detail: "no buy/sell tax, ever" },
  { label: "Liquidity", value: "100%", detail: "all tokens in the pool" },
];

export default function Tokenomics() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tier === "off") return;
      const root = rootRef.current;
      const counter = counterRef.current;
      if (!root || !counter) return;

      const value = { n: 0 };
      const renderCount = () => {
        counter.textContent = Math.round(value.n).toLocaleString("en-US");
      };

      if (tier === "lite") {
        gsap.to(value, {
          n: 420_690_000,
          duration: 2,
          ease: "power2.out",
          onUpdate: renderCount,
          scrollTrigger: { trigger: counter, start: "top 85%", once: true },
        });
        gsap.utils.toArray<HTMLElement>(".tok-card, .tok-stamp-row, .tok-fair").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 32,
            duration: 0.6,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          refreshPriority: SECTION_PRIORITY.tokenomics,
        },
      });

      // watermark drift across the whole pin
      tl.fromTo(".tok-watermark", { yPercent: 25 }, { yPercent: -25, ease: "none", duration: 10 }, 0);

      tl.from(".tok-eyebrow", { autoAlpha: 0, y: -16, duration: 0.4 }, 0.1);

      // the number grinds up from zero, decompressing from a blur
      tl.fromTo(
        counter,
        { scale: 1.6, filter: "blur(14px)", autoAlpha: 0 },
        { scale: 1, filter: "blur(0px)", autoAlpha: 1, duration: 1.2, ease: "power3.out" },
        0.3
      );
      tl.to(value, { n: 420_690_000, duration: 2.4, ease: "power1.inOut", onUpdate: renderCount }, 0.3);
      tl.from(".tok-counter-label", { autoAlpha: 0, y: 16, duration: 0.4 }, 1.4);

      // stat cards hurl in from alternating sides
      tl.from(".tok-card", {
        xPercent: (i) => (i % 2 === 0 ? -130 : 130),
        rotation: (i) => (i % 2 === 0 ? -14 : 14),
        autoAlpha: 0,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
      }, 2.2);

      // authority stamps slam down, each with a screen shake
      const slamStamp = (selector: string, at: string | number) => {
        tl.from(
          selector,
          { scale: 4, autoAlpha: 0, rotation: 20, duration: 0.4, ease: "power4.in" },
          at
        );
        tl.fromTo(
          ".tok-stage",
          { x: -7 },
          { x: 7, duration: 0.05, repeat: 5, yoyo: true, ease: "none" }
        );
        tl.to(".tok-stage", { x: 0, duration: 0.08 });
      };
      slamStamp(".tok-stamp-mint", ">+0.3");
      slamStamp(".tok-stamp-freeze", ">+0.4");

      tl.from(".tok-fair", { autoAlpha: 0, y: 24, duration: 0.6 }, ">+0.2");
      tl.to({}, { duration: 0.8 }); // settle before unpin
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  const pinned = tier === "full";

  return (
    <section
      ref={rootRef}
      id="tokenomics"
      className={`relative overflow-hidden ${pinned ? "h-[100svh]" : "py-28"}`}
    >
      <div
        aria-hidden
        className="tok-watermark pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-chaos text-[45vw] leading-none text-outline-chrome opacity-[0.1]"
      >
        420
      </div>

      <div className={`tok-stage relative flex flex-col items-center justify-center gap-8 px-5 text-center ${pinned ? "h-full" : ""}`}>
        <p className="tok-eyebrow font-mono text-[11px] uppercase tracking-[0.45em] text-ice">
          // the numbers don&apos;t lie
        </p>

        <div>
          <div
            ref={counterRef}
            className="text-chrome font-display text-[clamp(2.4rem,9vw,7.5rem)] font-black leading-none tracking-tight"
          >
            {pinned ? "0" : "420,690,000"}
          </div>
          <p className="tok-counter-label mt-3 font-mono text-xs uppercase tracking-[0.4em] text-chrome-mid">
            $MEEKO total supply — fixed for eternity
          </p>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="tok-card chrome-panel p-5 text-left">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dark">
                {stat.label}
              </div>
              <div className="text-holo mt-2 font-display text-3xl font-black">{stat.value}</div>
              <div className="mt-1 font-mono text-[11px] text-chrome-mid">{stat.detail}</div>
            </div>
          ))}
        </div>

        <div className="tok-stamp-row flex flex-wrap items-center justify-center gap-6 pt-2">
          <span className="tok-stamp-mint inline-flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dark">
              mint authority
            </span>
            <StampBadge color="zap">Revoked</StampBadge>
          </span>
          <span className="tok-stamp-freeze inline-flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dark">
              freeze authority
            </span>
            <StampBadge color="acid">Revoked</StampBadge>
          </span>
        </div>

        <p className="tok-fair max-w-lg font-mono text-xs leading-relaxed text-chrome-mid">
          100% of supply seeded to liquidity. No team bags. No presale. Fair
          launch, feral energy.
        </p>
      </div>
    </section>
  );
}
