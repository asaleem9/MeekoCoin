"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { useMotionTier } from "@/components/providers/MotionProvider";

type RemotionBackgroundProps = {
  component: ComponentType;
  durationInFrames: number;
  fps?: number;
  className?: string;
};

// Shared <Player> host for looping background compositions. Renders at low
// resolution (scaled by CSS), plays only while on screen, and skips entirely
// below the "full" tier — Player render loops are main-thread work we only
// spend when the section is visible on a capable device.
export default function RemotionBackground({
  component,
  durationInFrames,
  fps = 30,
  className = "",
}: RemotionBackgroundProps) {
  const tier = useMotionTier();
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !mounted) return;
    const io = new IntersectionObserver(([entry]) => {
      const player = playerRef.current;
      if (!player) return;
      if (entry.isIntersecting) player.play();
      else player.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  if (tier !== "full" || !mounted) return null;

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} aria-hidden>
      <Player
        ref={playerRef}
        component={component}
        durationInFrames={durationInFrames}
        fps={fps}
        compositionWidth={640}
        compositionHeight={360}
        style={{ width: "100%", height: "100%" }}
        loop
        controls={false}
        clickToPlay={false}
        acknowledgeRemotionLicense
      />
    </div>
  );
}
