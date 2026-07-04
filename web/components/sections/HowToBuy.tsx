"use client";

import { useRef } from "react";
import { gsap, useGSAP, SECTION_PRIORITY } from "@/lib/gsap";
import { JUPITER_SWAP_URL } from "@/lib/constants";
import { useMotionTier } from "@/components/providers/MotionProvider";
import ChromeButton from "@/components/ui/ChromeButton";

const STEPS = [
  {
    num: "01",
    title: "Summon a Wallet",
    body: "Phantom or Solflare. Free, takes two minutes, no blood pact required.",
    glyph: "👻",
  },
  {
    num: "02",
    title: "Acquire SOL",
    body: "Buy SOL on Coinbase, Binance, or Kraken and send it to your new wallet.",
    glyph: "◎",
  },
  {
    num: "03",
    title: "Enter the Portal",
    body: "Open Jupiter — jup.ag — the swap portal blessed by the prophecy.",
    glyph: "🪐",
  },
  {
    num: "04",
    title: "Receive the Blessing",
    body: "Paste the sacred scroll, swap SOL for $MEEKO, ascend.",
    glyph: "⛧",
  },
];

export default function HowToBuy() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tier === "off") return;
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      if (tier === "lite") {
        gsap.utils.toArray<HTMLElement>(".buy-panel").forEach((panel) => {
          gsap.from(panel, {
            autoAlpha: 0,
            y: 40,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 85%", once: true },
          });
        });
        return;
      }

      const getDistance = () => track.scrollWidth - window.innerWidth;

      // Fake horizontal scroll: vertical scroll drives the track left.
      // ease:"none" is mandatory for containerAnimation triggers to line up.
      const scrollTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + getDistance(),
          invalidateOnRefresh: true,
          refreshPriority: SECTION_PRIORITY.howToBuy,
        },
      });

      gsap.utils.toArray<HTMLElement>(".buy-panel").forEach((panel) => {
        const num = panel.querySelector(".buy-num");
        const inner = panel.querySelector(".buy-inner");
        if (num) {
          gsap.from(num, {
            scale: 2.6,
            autoAlpha: 0,
            rotation: -10,
            duration: 0.6,
            ease: "back.out(1.8)",
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: panel,
              start: "left 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
        if (inner) {
          gsap.from(inner, {
            yPercent: 30,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: panel,
              start: "left 65%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  const horizontal = tier === "full";

  return (
    <section
      ref={rootRef}
      id="how-to-buy"
      className={`relative overflow-hidden ${horizontal ? "h-[100svh]" : "py-28"}`}
    >
      <div
        ref={trackRef}
        className={
          horizontal
            ? "flex h-full w-max items-stretch"
            : "section-shell flex flex-col gap-12"
        }
      >
        {/* intro panel */}
        <div
          className={`buy-panel flex flex-col justify-center gap-4 ${
            horizontal ? "w-screen shrink-0 px-[8vw]" : ""
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-acid">
            // instructions from the temple
          </p>
          <h2 className="buy-inner max-w-3xl font-display text-5xl font-black uppercase leading-[1.02] text-chrome sm:text-7xl">
            How to Ascend
          </h2>
          {horizontal && (
            <p className="font-mono text-xs tracking-[0.3em] text-chrome-mid">
              keep scrolling — the path unfolds sideways →
            </p>
          )}
        </div>

        {STEPS.map((step) => (
          <div
            key={step.num}
            className={`buy-panel relative flex flex-col justify-center ${
              horizontal
                ? "w-[85vw] shrink-0 border-l border-white/10 px-[6vw] md:w-[62vw]"
                : "chrome-panel p-8"
            }`}
          >
            <div
              aria-hidden
              className="buy-num pointer-events-none absolute font-chaos leading-none text-outline opacity-30"
              style={{
                fontSize: horizontal ? "26vw" : "6rem",
                right: horizontal ? "4vw" : "1rem",
                top: horizontal ? "8vh" : "0.5rem",
              }}
            >
              {step.num}
            </div>
            <div className="buy-inner relative z-10 flex max-w-xl flex-col gap-4">
              <span className="text-4xl" aria-hidden>
                {step.glyph}
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-chrome-light sm:text-5xl">
                {step.title}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-chrome-mid">{step.body}</p>
            </div>
          </div>
        ))}

        {/* CTA panel */}
        <div
          className={`buy-panel flex flex-col items-center justify-center gap-6 text-center ${
            horizontal ? "w-screen shrink-0 px-[8vw]" : "pt-4"
          }`}
        >
          <div className="buy-inner flex flex-col items-center gap-6">
            <h3 className="text-holo font-chaos text-5xl uppercase sm:text-7xl">Ascend Now</h3>
            <ChromeButton
              href={JUPITER_SWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="acid"
            >
              Trade on Jupiter
            </ChromeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
