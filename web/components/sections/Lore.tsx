"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, SECTION_PRIORITY, SCRAMBLE_CHARS } from "@/lib/gsap";
import { useMotionTier } from "@/components/providers/MotionProvider";

const SLIDES = [
  {
    id: "lore-1",
    title: "BORN UNDER A BED",
    sub: "Every legend starts somewhere dark.",
  },
  {
    id: "lore-2",
    title: "FORGED IN CHAOS",
    sub: "Plastic bags. Doorbells. 3am zoomies.",
  },
  {
    id: "lore-3",
    title: "DESTINED FOR THE BLOCKCHAIN",
    sub: "The prophecy said moon. Meeko heard it.",
  },
];

export default function Lore() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (tier === "off") return;
      const root = rootRef.current;
      if (!root) return;

      if (tier === "lite") {
        gsap.utils.toArray<HTMLElement>(".lore-slide").forEach((slide) => {
          gsap.from(slide, {
            autoAlpha: 0,
            y: 40,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: slide, start: "top 85%", once: true },
          });
        });
        return;
      }

      const split1 = SplitText.create("#lore-1 .lore-title", { type: "chars", mask: "chars" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1,
          refreshPriority: SECTION_PRIORITY.lore,
        },
      });

      // backdrop drifts through the palette for the whole ride
      tl.fromTo(
        ".lore-backdrop",
        { filter: "hue-rotate(0deg)" },
        { filter: "hue-rotate(300deg)", ease: "none", duration: 10 },
        0
      );
      tl.to(".lore-watermark", { xPercent: -18, ease: "none", duration: 10 }, 0);

      // ── Slide 1: rise in, hold, scatter with physics ──
      tl.from(split1.chars, { yPercent: 130, rotate: 10, stagger: 0.035, duration: 1 }, 0.2);
      tl.from("#lore-1 .lore-sub", { autoAlpha: 0, y: 24, duration: 0.5 }, 1);
      tl.to({}, { duration: 0.8 }); // hold
      tl.to(
        split1.chars,
        {
          physics2D: {
            velocity: "random(400, 750)",
            angle: "random(-130, -50)",
            gravity: 900,
          },
          rotation: "random(-120, 120)",
          autoAlpha: 0,
          stagger: { each: 0.015, from: "random" },
          duration: 1.4,
        },
        "<"
      );
      tl.to("#lore-1 .lore-sub", { autoAlpha: 0, y: -30, duration: 0.4 }, "<+=0.2");

      // ── Slide 2: scramble decode, glitch out ──
      tl.set("#lore-2", { autoAlpha: 1 }, ">-0.4");
      tl.fromTo(
        "#lore-2 .lore-title",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1.2,
          scrambleText: {
            text: "FORGED IN CHAOS",
            chars: SCRAMBLE_CHARS,
            revealDelay: 0.3,
          },
        }
      );
      tl.from("#lore-2 .lore-sub", { autoAlpha: 0, y: 24, duration: 0.5 }, "<+=0.6");
      tl.to({}, { duration: 0.8 });
      tl.to("#lore-2 .lore-inner", {
        skewX: 20,
        xPercent: -12,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power4.in",
      });

      // ── Slide 3: slam + chrome sweep, hold to the end ──
      tl.set("#lore-3", { autoAlpha: 1 });
      tl.from("#lore-3 .lore-title", {
        scale: 3.2,
        autoAlpha: 0,
        rotate: -6,
        duration: 0.9,
        ease: "power4.out",
      });
      tl.fromTo(
        "#lore-3 .lore-title",
        { backgroundPosition: "0% 50%" },
        { backgroundPosition: "200% 50%", duration: 1.6, ease: "none" },
        "<+=0.4"
      );
      tl.from("#lore-3 .lore-sub", { autoAlpha: 0, y: 24, duration: 0.5 }, "<");
      tl.to({}, { duration: 1 });

      return () => split1.revert();
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  const pinned = tier === "full";

  return (
    <section
      ref={rootRef}
      id="lore"
      className={`relative overflow-hidden ${pinned ? "h-[100svh]" : "py-28"}`}
    >
      {/* hue-drifting backdrop */}
      <div
        aria-hidden
        className="lore-backdrop absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, rgba(255,61,174,0.13), transparent 70%), radial-gradient(40% 40% at 20% 80%, rgba(200,255,0,0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="lore-watermark pointer-events-none absolute top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-chaos text-[38vw] leading-none text-outline-chrome opacity-[0.12]"
      >
        LORE ⛧ LORE ⛧ LORE
      </div>

      <div className={pinned ? "relative h-full" : "relative flex flex-col gap-28"}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            id={slide.id}
            className={`lore-slide px-5 text-center ${
              pinned
                ? "absolute inset-0 flex flex-col items-center justify-center"
                : "flex flex-col items-center"
            }`}
            style={pinned && i > 0 ? { visibility: "hidden", opacity: 0 } : undefined}
          >
            <div className="lore-inner flex flex-col items-center gap-6">
              <h2
                className={`lore-title max-w-5xl font-display text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl ${
                  i === 2 ? "text-chrome" : "text-chrome-light"
                }`}
                style={i === 2 ? { backgroundSize: "300% 100%" } : undefined}
              >
                {slide.title}
              </h2>
              <p className="lore-sub font-mono text-sm tracking-[0.2em] text-acid">
                {slide.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
