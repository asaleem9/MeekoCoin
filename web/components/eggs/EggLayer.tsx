"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onKeySequence, onTypedWord, createIdleWatcher, KONAMI, MEEKO_ASCII } from "@/lib/eggs";
import { useMotionTier } from "@/components/providers/MotionProvider";

export default function EggLayer() {
  const tier = useMotionTier();
  const overlayRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const [blessed, setBlessed] = useState(false);

  // Console egg — every tier, it's free.
  useEffect(() => {
    console.log(
      `%c${MEEKO_ASCII}`,
      "color:#C8FF00;font-family:monospace;font-size:12px;font-weight:bold;"
    );
  }, []);

  const { contextSafe } = useGSAP(
    () => undefined,
    { scope: overlayRef, dependencies: [tier], revertOnUpdate: true }
  );

  useEffect(() => {
    if (tier !== "full") return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    // ── shared: physics glyph burst ──
    const burst = contextSafe(
      (glyphs: string[], count: number, origin?: { x: number; y: number }) => {
        for (let i = 0; i < count; i++) {
          const span = document.createElement("span");
          span.textContent = glyphs[i % glyphs.length];
          span.style.cssText = `position:fixed;left:${
            origin ? origin.x : gsap.utils.random(10, 90) + "v"
          }${origin ? "px" : "w"};top:${
            origin ? origin.y + "px" : "-5vh"
          };font-size:${gsap.utils.random(16, 34)}px;z-index:9992;pointer-events:none;`;
          overlay.appendChild(span);
          gsap.to(span, {
            physics2D: origin
              ? {
                  velocity: gsap.utils.random(350, 700),
                  angle: gsap.utils.random(-135, -45),
                  gravity: 1000,
                }
              : { velocity: gsap.utils.random(60, 160), angle: 90, gravity: 250 },
            rotation: gsap.utils.random(-360, 360),
            autoAlpha: 0,
            duration: gsap.utils.random(1.4, 2.4),
            ease: "none",
            onComplete: () => span.remove(),
          });
        }
      }
    );

    const slamStamp = contextSafe((text: string, tone: string) => {
      const stamp = stampRef.current;
      if (!stamp) return;
      stamp.textContent = text;
      stamp.style.color = tone;
      stamp.style.borderColor = tone;
      gsap
        .timeline()
        .fromTo(
          stamp,
          { autoAlpha: 0, scale: 4, rotation: 14 },
          { autoAlpha: 1, scale: 1, rotation: -6, duration: 0.35, ease: "power4.in" }
        )
        .to(stamp, { autoAlpha: 0, y: -40, duration: 0.5, delay: 1.4, ease: "power2.in" });
    });

    const cleanups: Array<() => void> = [];

    // ── 1. Konami → DEGEN MODE ──
    let degen = false;
    cleanups.push(
      onKeySequence(KONAMI, () => {
        degen = !degen;
        document.querySelector("main")?.classList.toggle("degen-mode", degen);
        window.dispatchEvent(new CustomEvent("meeko:degen", { detail: { on: degen } }));
        slamStamp(degen ? "DEGEN MODE ACTIVATED" : "DEGEN MODE OFF", "#C8FF00");
        if (degen) burst(["$", "⛧", "✦", "🚀"], 40);
      })
    );

    // ── 2. type "meow" → paw swipe + paw trail ──
    let trailUntil = 0;
    const onTrailMove = (e: PointerEvent) => {
      if (performance.now() > trailUntil) return;
      const paw = document.createElement("span");
      paw.textContent = "🐾";
      paw.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:16px;z-index:9991;pointer-events:none;transform:rotate(${gsap.utils.random(-40, 40)}deg);`;
      overlay.appendChild(paw);
      gsap.to(paw, { autoAlpha: 0, scale: 1.6, duration: 1.2, onComplete: () => paw.remove() });
    };
    window.addEventListener("pointermove", onTrailMove, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onTrailMove));
    cleanups.push(
      onTypedWord("meow", contextSafe(() => {
        const paw = document.createElement("div");
        paw.textContent = "🐾";
        paw.style.cssText =
          "position:fixed;top:35%;left:-20vw;font-size:18vh;z-index:9993;pointer-events:none;";
        overlay.appendChild(paw);
        gsap.to(paw, {
          x: "150vw",
          y: "12vh",
          rotation: 30,
          duration: 0.9,
          ease: "power2.inOut",
          onComplete: () => paw.remove(),
        });
        trailUntil = performance.now() + 10_000;
      }))
    );

    // ── 3. idle 60s → Meeko sleeps ──
    let zzzInterval: ReturnType<typeof setInterval> | null = null;
    cleanups.push(
      createIdleWatcher(
        60_000,
        contextSafe(() => {
          window.dispatchEvent(new CustomEvent("meeko:sleep"));
          gsap.to(dimRef.current, { autoAlpha: 1, duration: 2 });
          zzzInterval = setInterval(() => {
            const z = document.createElement("span");
            z.textContent = "z";
            z.style.cssText = `position:fixed;left:${gsap.utils.random(42, 58)}vw;top:55vh;font-size:${gsap.utils.random(14, 30)}px;color:#9BA3B4;font-family:var(--font-unbounded);z-index:9992;pointer-events:none;`;
            overlay.appendChild(z);
            gsap.to(z, {
              y: -160,
              x: gsap.utils.random(-40, 40),
              autoAlpha: 0,
              duration: 3,
              ease: "power1.out",
              onComplete: () => z.remove(),
            });
          }, 900);
        }),
        contextSafe(() => {
          window.dispatchEvent(new CustomEvent("meeko:wake"));
          gsap.to(dimRef.current, { autoAlpha: 0, duration: 0.4 });
          if (zzzInterval) clearInterval(zzzInterval);
        })
      )
    );
    cleanups.push(() => {
      if (zzzInterval) clearInterval(zzzInterval);
    });

    // ── 4. dizzy coin (HeroScene dispatches after 10 rapid clicks) ──
    const onDizzy = contextSafe(() => {
      burst(["⭐", "✦", "💫"], 18, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
      slamStamp("MEEKO IS DIZZY", "#FF3DAE");
    });
    window.addEventListener("meeko:dizzy", onDizzy);
    cleanups.push(() => window.removeEventListener("meeko:dizzy", onDizzy));

    // ── 6. roadmap "touch grass" hover → grass grows ──
    const grassTarget = document.querySelector<HTMLElement>('[data-egg="grass"]');
    if (grassTarget) {
      const onGrass = contextSafe(() => {
        if (grassTarget.querySelector(".egg-grass")) return;
        const grass = document.createElement("span");
        grass.className = "egg-grass";
        grass.style.cssText =
          "position:absolute;right:0;bottom:0;display:inline-flex;gap:2px;pointer-events:none;";
        grass.innerHTML = Array.from({ length: 7 })
          .map(
            (_, i) =>
              `<svg width="8" height="18" viewBox="0 0 8 18"><path class="blade" d="M4 18 C ${i % 2 ? 1 : 7} 12, ${i % 2 ? 6 : 2} 6, 4 0" stroke="#C8FF00" stroke-width="1.5" fill="none"/></svg>`
          )
          .join("");
        grassTarget.appendChild(grass);
        gsap.from(grass.querySelectorAll(".blade"), {
          drawSVG: "0% 0%",
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.delayedCall(4, () => {
          gsap.to(grass, { autoAlpha: 0, duration: 0.6, onComplete: () => grass.remove() });
        });
      });
      grassTarget.addEventListener("mouseenter", onGrass);
      cleanups.push(() => grassTarget.removeEventListener("mouseenter", onGrass));
    }

    // ── 8. 4:20 → "IT'S TIME" sticker in the hero cluster ──
    const checkTime = () => {
      const now = new Date();
      if (now.getHours() % 12 === 4 && now.getMinutes() === 20) {
        const slot = document.getElementById("hero-egg-sticker-slot");
        if (slot && !slot.hasChildNodes() && !sessionStorage.getItem("meeko-420")) {
          sessionStorage.setItem("meeko-420", "1");
          const sticker = document.createElement("span");
          sticker.className = "sticker animate-float";
          sticker.style.setProperty("--sticker-rot", "12deg");
          sticker.textContent = "IT'S TIME 🕰";
          slot.appendChild(sticker);
          gsap.from(sticker, { scale: 0, rotation: 180, duration: 0.7, ease: "back.out(2)" });
        }
      }
    };
    checkTime();
    const timeInterval = setInterval(checkTime, 20_000);
    cleanups.push(() => clearInterval(timeInterval));

    // ── 9. footer 5-click purr → cat-head storm ──
    const onPurr = contextSafe(() => burst(["🐱", "😺", "😸", "🐾"], 36));
    window.addEventListener("meeko:purr", onPurr);
    cleanups.push(() => window.removeEventListener("meeko:purr", onPurr));

    // ── 10. #treats hash → treat rain + blessed badge ──
    if (location.hash === "#treats" && !sessionStorage.getItem("meeko-treats")) {
      sessionStorage.setItem("meeko-treats", "1");
      const onReady = () => {
        burst(["🐟", "🍗", "🥩", "🐟"], 30);
        setBlessed(true);
      };
      if (document.querySelector(".preloader-slat")) {
        window.addEventListener("app:ready", onReady, { once: true });
        cleanups.push(() => window.removeEventListener("app:ready", onReady));
      } else {
        onReady();
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, [tier, contextSafe]);

  return (
    <div ref={overlayRef} aria-hidden>
      {/* sleep dim */}
      <div
        ref={dimRef}
        className="pointer-events-none fixed inset-0 z-[9989] bg-void-deep/60 opacity-0"
        style={{ visibility: "hidden" }}
      />
      {/* stamp toast */}
      <div
        ref={stampRef}
        className="pointer-events-none fixed left-1/2 top-1/2 z-[9994] -translate-x-1/2 -translate-y-1/2 border-4 px-6 py-3 font-display text-2xl font-black uppercase tracking-[0.2em] opacity-0 sm:text-4xl"
        style={{ visibility: "hidden", boxShadow: "0 0 0 3px currentColor inset" }}
      />
      {/* #treats blessing */}
      {blessed && (
        <div className="fixed bottom-4 right-4 z-[9992]">
          <span className="sticker" style={{ ["--sticker-rot" as string]: "6deg" }}>
            🐟 blessed
          </span>
        </div>
      )}
    </div>
  );
}
