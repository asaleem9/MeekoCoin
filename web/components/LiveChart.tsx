"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CONTRACT_ADDRESS } from "@/lib/constants";

type ChartStatus = "loading" | "ready" | "unavailable";

export default function LiveChart() {
  const [status, setStatus] = useState<ChartStatus>("loading");
  const [pairAddress, setPairAddress] = useState<string | null>(null);

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

  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">Live Chart</span>
          </h2>
          <p className="text-gray-400 mb-8 text-center">
            Real-time price and transactions
          </p>

          <div className="card-brutal p-2 md:p-4 max-w-4xl mx-auto overflow-hidden">
            {status === "ready" && pairAddress ? (
              <iframe
                src={`https://dexscreener.com/solana/${pairAddress}?embed=1&theme=dark&trades=1&info=0`}
                className="w-full rounded-lg"
                style={{ height: "500px", border: "none" }}
                title="MeekoCoin Chart"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                {status === "loading" ? (
                  <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                    Scanning for pairs...
                  </p>
                ) : (
                  <>
                    <span className="font-display text-3xl md:text-4xl text-meeko-orange">
                      CHART COMING SOON
                    </span>
                    <p className="font-mono text-sm text-gray-500 max-w-md">
                      $MEEKO isn&apos;t indexed on DexScreener yet. Grab the
                      contract address above and watch this space.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {status === "ready" && (
            <div className="flex justify-center gap-4 mt-6">
              <a
                href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-meeko-orange hover:underline"
              >
                Open in DEXScreener →
              </a>
              <a
                href={`https://birdeye.so/token/${CONTRACT_ADDRESS}?chain=solana`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-meeko-orange hover:underline"
              >
                View on Birdeye →
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
