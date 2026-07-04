"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, SECTION_PRIORITY, SCRAMBLE_CHARS } from "@/lib/gsap";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import { useMotionTier } from "@/components/providers/MotionProvider";
import LazyScene from "@/components/webgl/LazyScene";
import RemotionBackground from "@/remotion/RemotionBackground";
import HoloShimmer, { HOLO_SHIMMER_FRAMES } from "@/remotion/compositions/HoloShimmer";

type CopyState = "idle" | "copied" | "failed";

const BURST_GLYPHS = ["$", "✦", "⛧", "$", "✧", "$"];

export default function ContractShrine() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const { contextSafe } = useGSAP(
    () => {
      if (tier === "off") return;
      const root = rootRef.current;
      if (!root) return;

      gsap.from(".shrine-reveal", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
          refreshPriority: SECTION_PRIORITY.contract,
        },
      });

      if (tier === "full") {
        // the sacred scroll decodes itself as it enters
        gsap.to(addressRef.current, {
          duration: 2.2,
          scrambleText: {
            text: CONTRACT_ADDRESS,
            chars: SCRAMBLE_CHARS,
            revealDelay: 0.4,
            speed: 0.6,
          },
          scrollTrigger: { trigger: root, start: "top 65%", once: true },
        });
      }
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  const burstCoins = contextSafe(() => {
    if (tier !== "full") return;
    const btn = buttonRef.current;
    const root = rootRef.current;
    if (!btn || !root) return;

    const btnRect = btn.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const originX = btnRect.left - rootRect.left + btnRect.width / 2;
    const originY = btnRect.top - rootRect.top + btnRect.height / 2;

    for (let i = 0; i < 26; i++) {
      const glyph = document.createElement("span");
      glyph.textContent = BURST_GLYPHS[i % BURST_GLYPHS.length];
      glyph.className =
        "pointer-events-none absolute z-20 font-display text-xl font-black " +
        (i % 3 === 0 ? "text-acid" : i % 3 === 1 ? "text-zap" : "text-ice");
      glyph.style.left = `${originX}px`;
      glyph.style.top = `${originY}px`;
      root.appendChild(glyph);

      gsap.to(glyph, {
        physics2D: {
          velocity: gsap.utils.random(320, 620),
          angle: gsap.utils.random(-140, -40),
          gravity: 1000,
        },
        rotation: gsap.utils.random(-260, 260),
        autoAlpha: 0,
        duration: gsap.utils.random(1, 1.7),
        ease: "none",
        onComplete: () => glyph.remove(),
      });
    }
  });

  // Clipboard flow preserved from the original site (secure-context API with
  // execCommand fallback, 2s state reset).
  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = CONTRACT_ADDRESS;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!ok) throw new Error("execCommand failed");
      }
      setCopyState("copied");
      burstCoins();
    } catch {
      setCopyState("failed");
    }
    setTimeout(() => setCopyState("idle"), 2000);
  };

  return (
    <section ref={rootRef} id="contract" className="relative overflow-hidden py-28">
      {/* rotating god rays behind the shrine */}
      <div
        aria-hidden
        className="god-rays animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[160vmin] w-[160vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      {/* iridescent wash (Remotion loop, plays only in view) */}
      <LazyScene className="pointer-events-none absolute inset-0 opacity-30">
        <RemotionBackground
          component={HoloShimmer}
          durationInFrames={HOLO_SHIMMER_FRAMES}
          className="h-full w-full"
        />
      </LazyScene>

      <div className="section-shell relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="shrine-reveal">
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-zap">
            // the sacred scroll
          </p>
          <h2 className="mt-3 font-display text-4xl font-black uppercase text-chrome sm:text-6xl">
            The Contract
          </h2>
          <p className="mt-3 font-mono text-xs tracking-[0.2em] text-chrome-mid">
            verify before you worship. always.
          </p>
        </div>

        <div className="shrine-reveal holo-panel w-full max-w-3xl p-6 md:p-10">
          <div
            ref={addressRef}
            data-egg="address"
            className="break-all font-mono text-sm leading-relaxed text-acid md:text-lg"
          >
            {CONTRACT_ADDRESS}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              ref={buttonRef}
              onClick={copyToClipboard}
              className={`px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200 ${
                copyState === "copied"
                  ? "bg-acid text-void"
                  : copyState === "failed"
                    ? "bg-zap text-void"
                    : "bg-chrome-light text-void hover:bg-acid"
              }`}
            >
              {copyState === "copied"
                ? "⛧ Blessed — Copied!"
                : copyState === "failed"
                  ? "Copy Failed"
                  : "Copy the Scroll"}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-6">
            <a
              href={`https://solscan.io/token/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-mono text-xs uppercase tracking-[0.2em] text-chrome-mid transition-colors hover:text-acid"
            >
              <span className="text-acid">&gt;</span> Solscan
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">_</span>
            </a>
            <a
              href={`https://explorer.solana.com/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-mono text-xs uppercase tracking-[0.2em] text-chrome-mid transition-colors hover:text-acid"
            >
              <span className="text-acid">&gt;</span> Solana Explorer
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">_</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
