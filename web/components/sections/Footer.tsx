"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, SECTION_PRIORITY } from "@/lib/gsap";
import { JUPITER_SWAP_URL } from "@/lib/constants";
import { useMotionTier } from "@/components/providers/MotionProvider";
import Marquee from "@/components/ui/Marquee";
import ChromeButton from "@/components/ui/ChromeButton";
import LazyScene from "@/components/webgl/LazyScene";
import RemotionBackground from "@/remotion/RemotionBackground";
import StickerRain, { STICKER_RAIN_FRAMES } from "@/remotion/compositions/StickerRain";

export default function Footer() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);
  const [clicks, setClicks] = useState(0);
  const [purring, setPurring] = useState(false);

  useGSAP(
    () => {
      if (tier === "off") return;
      gsap.from(".footer-reveal", {
        autoAlpha: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
          refreshPriority: SECTION_PRIORITY.footer,
        },
      });
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  const handleWordmarkClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setPurring(true);
      // The egg layer answers with a cat-head confetti storm.
      window.dispatchEvent(new CustomEvent("meeko:purr"));
      setTimeout(() => {
        setPurring(false);
        setClicks(0);
      }, 3000);
    }
  };

  return (
    <footer ref={rootRef} className="relative overflow-hidden border-t border-white/10 pt-16">
      {/* the finale marquee */}
      <Marquee duration={16} className="mb-16 select-none">
        <span className="font-chaos text-[16vw] leading-none text-outline opacity-80">
          MEEKO&nbsp;⛧&nbsp;$MEEKO&nbsp;⛧&nbsp;
        </span>
      </Marquee>

      {/* glyph rain over the finale (Remotion loop, plays only in view) */}
      <LazyScene className="pointer-events-none absolute inset-0 opacity-40">
        <RemotionBackground
          component={StickerRain}
          durationInFrames={STICKER_RAIN_FRAMES}
          className="h-full w-full"
        />
      </LazyScene>

      <div className="section-shell relative pb-14">
        <div className="footer-reveal mb-16 flex flex-col items-center gap-6 text-center">
          <h3 className="text-holo font-display text-3xl font-black uppercase sm:text-5xl">
            Join the Prophecy
          </h3>
          <ChromeButton
            href={JUPITER_SWAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="acid"
          >
            Buy $MEEKO
          </ChromeButton>
        </div>

        <div className="footer-reveal mb-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={handleWordmarkClick}
              className="text-left font-display text-3xl font-black uppercase text-chrome-light md:text-4xl"
              aria-label="MeekoCoin"
            >
              MEEKO<span className="text-acid">COIN</span>
            </button>
            <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-chrome-mid">
              The chosen cat of Solana. No utility, just destiny.
            </p>
            {purring && (
              <div className="mt-4 border-l-4 border-acid bg-acid/10 p-4">
                <p className="font-mono text-xs text-acid">
                  *purrs* You found me! Meeko approves.
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-7">
            <h4 className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#contract"
                  className="font-mono text-sm text-chrome-mid transition-colors hover:text-acid"
                >
                  &gt; The Sacred Scroll
                </a>
              </li>
              <li>
                <a
                  href="#how-to-buy"
                  className="font-mono text-sm text-chrome-mid transition-colors hover:text-acid"
                >
                  &gt; How to Ascend
                </a>
              </li>
              <li>
                <a
                  href={JUPITER_SWAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-chrome-mid transition-colors hover:text-acid"
                >
                  &gt; Trade on Jupiter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-reveal border-t border-white/5 pt-8">
          <p className="mb-6 font-mono text-[11px] leading-relaxed text-chrome-dark">
            <span className="text-zap">DISCLAIMER:</span> $MEEKO is a memecoin
            with no intrinsic value or expectation of financial return. It is
            purely for entertainment purposes. Cryptocurrency investments are
            highly volatile and risky. Never invest more than you can afford to
            lose. This is not financial advice. DYOR.
          </p>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="font-mono text-[11px] text-chrome-dark">
              &copy; {new Date().getFullYear()} MeekoCoin. All rights reserved.
            </p>
            <p className="font-mono text-[11px] text-chrome-dark">
              Meeko reserves the right to nap at any time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
