"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, useGSAP, SECTION_PRIORITY } from "@/lib/gsap";
import { isAppReady } from "@/lib/scroll";
import { JUPITER_SWAP_URL } from "@/lib/constants";
import { useMotionTier } from "@/components/providers/MotionProvider";
import SplitHeading from "@/components/ui/SplitHeading";
import ChromeButton from "@/components/ui/ChromeButton";
import HoloSticker from "@/components/ui/HoloSticker";

const HeroScene = dynamic(() => import("@/components/webgl/HeroScene.client"), {
  ssr: false,
});

const STICKERS = [
  { text: "MINT REVOKED", rotate: -8, className: "left-[6%] top-[18%]", depth: 30 },
  { text: "0% TAX", rotate: 6, className: "right-[8%] top-[22%]", depth: 50 },
  { text: "CERTIFIED SMOL", rotate: -5, className: "left-[10%] bottom-[24%]", depth: 40 },
  { text: "NO RUGS EVER", rotate: 9, className: "right-[7%] bottom-[20%]", depth: 25 },
];

export default function Hero() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);
  const exitRef = useRef(0);

  useGSAP(
    () => {
      if (tier === "off") return;
      const root = rootRef.current;
      if (!root) return;

      // Entrance (plays when the preloader lifts).
      const entrance = gsap
        .timeline({ paused: true })
        .from(".hero-eyebrow", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from(
          ".hero-sub",
          { autoAlpha: 0, y: 30, duration: 0.6, ease: "power3.out" },
          "+=0.55"
        )
        .from(".hero-tag", { autoAlpha: 0, y: 20, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .from(
          ".hero-cta",
          { autoAlpha: 0, y: 26, scale: 0.9, stagger: 0.1, duration: 0.5, ease: "back.out(2.5)" },
          "-=0.2"
        )
        .from(
          ".hero-sticker",
          { autoAlpha: 0, scale: 0, rotation: 45, stagger: 0.08, duration: 0.55, ease: "back.out(2)" },
          "-=0.4"
        )
        .from(".hero-scrollhint", { autoAlpha: 0, duration: 0.6 }, "-=0.2");

      const onReady = () => entrance.play();
      if (isAppReady()) entrance.progress(1); // rebuilt after reveal: settle instantly
      else window.addEventListener("app:ready", onReady, { once: true });

      // Exit scrub: content splits apart as the hero scrolls away; the WebGL
      // coin reads exitRef every frame.
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
          refreshPriority: SECTION_PRIORITY.hero,
          onUpdate: (self) => {
            exitRef.current = self.progress;
          },
        },
      })
        .to(".hero-title-wrap", { yPercent: -35, scale: 0.85, autoAlpha: 0, ease: "none" }, 0)
        .to(".hero-below", { yPercent: -80, autoAlpha: 0, ease: "none" }, 0)
        .to(".hero-sticker", { yPercent: 60, autoAlpha: 0, stagger: 0.04, ease: "none" }, 0);

      // Pointer parallax on the sticker cluster.
      if (tier === "full") {
        const setters = gsap.utils.toArray<HTMLElement>(".hero-sticker").map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
          depth: Number(el.dataset.depth || 30),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.depth);
            s.y(ny * s.depth);
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("app:ready", onReady);
        };
      }
      return () => window.removeEventListener("app:ready", onReady);
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* backdrop: WebGL on full tier, static holo wash otherwise */}
      {tier === "full" ? (
        <HeroScene exitRef={exitRef} />
      ) : (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, rgba(255,61,174,0.18), transparent 70%), radial-gradient(50% 40% at 30% 70%, rgba(77,243,255,0.12), transparent 70%), radial-gradient(50% 40% at 70% 30%, rgba(200,255,0,0.1), transparent 70%)",
            }}
          />
        </div>
      )}

      {/* floating sticker cluster */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {STICKERS.map((s) => (
          <div
            key={s.text}
            data-depth={s.depth}
            className={`hero-sticker absolute ${s.className}`}
          >
            <HoloSticker rotate={s.rotate} floatDelay={s.depth / 25}>
              {s.text}
            </HoloSticker>
          </div>
        ))}
        <div id="hero-egg-sticker-slot" className="absolute right-[14%] top-[10%]" />
      </div>

      {/* content */}
      <div className="section-shell relative z-10 flex flex-col items-center gap-6 text-center">
        <p className="hero-eyebrow font-mono text-[11px] uppercase tracking-[0.45em] text-acid">
          ⛧ the prophecy is live — solana mainnet ⛧
        </p>

        {tier !== "full" && (
          <Image
            src="/meeko-logo.png"
            alt="Meeko the cat"
            width={200}
            height={200}
            className="h-36 w-36 rounded-full md:h-48 md:w-48"
            priority
          />
        )}

        <div className="hero-title-wrap">
          <SplitHeading
            as="h1"
            waitForReady
            type="chars"
            stagger={0.06}
            charClassName="text-holo"
            className="whitespace-nowrap font-chaos text-[clamp(4rem,15vw,13rem)] leading-[0.9]"
          >
            MEEKO
          </SplitHeading>
        </div>

        <div className="hero-below flex flex-col items-center gap-6">
          <h2 className="hero-sub font-display text-xl font-extrabold uppercase tracking-[0.3em] text-chrome-light sm:text-2xl md:text-3xl">
            Smol. Fierce. <span className="text-chrome">Inevitable.</span>
          </h2>
          <p className="hero-tag max-w-md font-mono text-sm leading-relaxed text-chrome-light">
            420,690,000 tokens of pure chaos. Zero utility. Infinite destiny.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="hero-cta">
              <ChromeButton
                href={JUPITER_SWAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="acid"
              >
                Buy $MEEKO
              </ChromeButton>
            </span>
            <span className="hero-cta">
              <ChromeButton href="#contract" variant="chrome">
                The Contract
              </ChromeButton>
            </span>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="hero-scrollhint absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-chrome-dark">
          descend
        </span>
        <span className="block h-8 w-px animate-blink bg-gradient-to-b from-acid to-transparent" />
      </div>
    </section>
  );
}
