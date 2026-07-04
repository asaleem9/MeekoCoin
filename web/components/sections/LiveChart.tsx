"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, SECTION_PRIORITY } from "@/lib/gsap";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import { useMotionTier } from "@/components/providers/MotionProvider";

type ChartStatus = "loading" | "ready" | "unavailable";

export default function LiveChart() {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<ChartStatus>("loading");
  const [pairAddress, setPairAddress] = useState<string | null>(null);
  // Defer the heavy DexScreener embed until the section approaches view.
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (cancelled) return;
        const pair = data?.pairs?.[0];
        if (pair?.pairAddress) {
          setPairAddress(pair.pairAddress);
          setStatus("ready");
        } else {
          setStatus("unavailable");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "100%" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (tier === "off") return;
      // One-shot reveal only — no transforms while the iframe lives inside.
      gsap.from(".chart-reveal", {
        autoAlpha: 0,
        y: 36,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
          refreshPriority: SECTION_PRIORITY.chart,
        },
      });
    },
    { scope: rootRef, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <section ref={rootRef} id="chart" className="relative py-28">
      <div className="section-shell">
        <div className="chart-reveal mb-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-ice">
            // live from the temple floor
          </p>
          <h2 className="mt-3 font-display text-4xl font-black uppercase text-chrome sm:text-6xl">
            The Charts
          </h2>
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-chrome-mid">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            real-time proof of the prophecy
          </p>
        </div>

        <div className="chart-reveal chrome-panel mx-auto max-w-4xl p-2 md:p-3">
          {status === "ready" && pairAddress && nearViewport ? (
            <iframe
              src={`https://dexscreener.com/solana/${pairAddress}?embed=1&theme=dark&trades=1&info=0`}
              className="w-full"
              style={{ height: "500px", border: "none" }}
              title="MeekoCoin Chart"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              {status === "loading" || (status === "ready" && !nearViewport) ? (
                <p className="font-mono text-sm uppercase tracking-widest text-chrome-dark">
                  Scanning for pairs...
                </p>
              ) : (
                <>
                  <span className="text-holo font-display text-3xl font-black uppercase md:text-4xl">
                    The Charts Awaken Soon
                  </span>
                  <p className="max-w-md font-mono text-sm text-chrome-mid">
                    $MEEKO isn&apos;t indexed on DexScreener yet. Liquidity is
                    brewing — grab the sacred scroll above and watch this space.
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {status === "ready" && (
          <div className="chart-reveal mt-6 flex justify-center gap-8">
            <a
              href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-chrome-mid transition-colors hover:text-acid"
            >
              Open in DEXScreener →
            </a>
            <a
              href={`https://birdeye.so/token/${CONTRACT_ADDRESS}?chain=solana`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-chrome-mid transition-colors hover:text-acid"
            >
              View on Birdeye →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
