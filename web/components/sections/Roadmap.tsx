"use client";

import { useRef } from "react";
import { gsap, useGSAP, SECTION_PRIORITY } from "@/lib/gsap";
import { useMotionTier } from "@/components/providers/MotionProvider";

const PHASES = [
  {
    num: "01",
    title: "The Awakening",
    status: "active",
    items: [
      "Token forged on Solana ✓",
      "Temple (this site) opened ✓",
      "Authorities revoked ✓",
      "First believers gathered",
    ],
  },
  {
    num: "02",
    title: "The Stretching",
    status: "soon",
    items: [
      "1,000 holders",
      "CoinGecko listing",
      "Meme arsenal expansion",
      "Coordinated raids",
    ],
  },
  {
    num: "03",
    title: "The Zoomies",
    status: "soon",
    items: [
      "10,000 holders",
      "CoinMarketCap listing",
      "CEX whispers begin",
      "Merch for the faithful",
    ],
  },
  {
    num: "04",
    title: "World Domination",
    status: "soon",
    items: [
      "100,000 holders",
      "Major CEX listing",
      "Meme immortality",
      "Touch grass (optional)",
    ],
  },
];

export default function Roadmap() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (tier === "off") return;
      const root = rootRef.current;
      if (!root) return;

      gsap.utils.toArray<HTMLElement>(".phase-card").forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -90 : 90,
          autoAlpha: 0,
          rotation: i % 2 === 0 ? -3 : 3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
            refreshPriority: SECTION_PRIORITY.roadmap,
          },
        });
      });

      if (tier !== "full") return;

      // The prophecy line inks itself in as you descend; a chrome coin
      // rides the path.
      gsap.from("#roadmap-path", {
        drawSVG: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: ".roadmap-body",
          start: "top 70%",
          end: "bottom 75%",
          scrub: 1,
          refreshPriority: SECTION_PRIORITY.roadmap,
        },
      });
      gsap.to("#roadmap-coin", {
        motionPath: {
          path: "#roadmap-path",
          align: "#roadmap-path",
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".roadmap-body",
          start: "top 70%",
          end: "bottom 75%",
          scrub: 1,
          refreshPriority: SECTION_PRIORITY.roadmap,
        },
      });
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <section ref={rootRef} id="roadmap" className="relative overflow-hidden py-28">
      <div className="section-shell">
        <div className="mb-16 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-zap">
            // trajectory
          </p>
          <h2 className="mt-3 font-display text-4xl font-black uppercase text-chrome sm:text-6xl">
            The Prophecy Unfolds
          </h2>
        </div>

        <div className="roadmap-body relative">
          {/* serpentine prophecy line (desktop, full tier) */}
          {tier === "full" && (
            <svg
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-40 -translate-x-1/2 md:block"
              viewBox="0 0 160 1200"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                id="roadmap-path"
                d="M80 0 C 150 150, 10 250, 80 400 C 150 550, 10 650, 80 800 C 150 950, 10 1050, 80 1200"
                stroke="url(#roadmap-grad)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="roadmap-grad" x1="0" y1="0" x2="0" y2="1200" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#C8FF00" />
                  <stop offset="0.5" stopColor="#4DF3FF" />
                  <stop offset="1" stopColor="#FF3DAE" />
                </linearGradient>
              </defs>
              <g id="roadmap-coin">
                <circle r="10" fill="#E8ECF3" />
                <circle r="10" fill="none" stroke="#C8FF00" strokeWidth="2" />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fill="#08010F"
                  fontWeight="bold"
                >
                  M
                </text>
              </g>
            </svg>
          )}

          <div className="flex flex-col gap-16 md:gap-28">
            {PHASES.map((phase, i) => (
              <div
                key={phase.num}
                className={`phase-card w-full md:w-[44%] ${
                  i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div className={`p-6 ${phase.status === "active" ? "holo-panel" : "chrome-panel"}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-chaos text-4xl text-outline opacity-70">
                      {phase.num}
                    </span>
                    {phase.status === "active" ? (
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-acid">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-acid" />
                        active
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dark">
                        foretold
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-black uppercase text-chrome-light">
                    {phase.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        data-egg={item.startsWith("Touch grass") ? "grass" : undefined}
                        className="relative font-mono text-xs leading-relaxed text-chrome-mid"
                      >
                        <span className="text-acid">&gt;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 text-center font-mono text-[11px] italic text-chrome-dark">
          * Roadmap subject to change based on how Meeko is feeling that day.
        </p>
      </div>
    </section>
  );
}
