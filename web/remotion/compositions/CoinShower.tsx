import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  startY: number;
  speed: number;
  size: number;
  rotation: number;
  opacity: number;
  type: "coin" | "sparkle";
}

export default function CoinShower() {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    const items: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        startY: -(Math.random() * 100 + 20),
        speed: 0.3 + Math.random() * 0.5,
        size: 8 + Math.random() * 16,
        rotation: Math.random() * 360,
        opacity: 0.3 + Math.random() * 0.5,
        type: Math.random() > 0.3 ? "sparkle" : "coin",
      });
    }
    return items;
  }, []);

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {particles.map((particle) => {
        const y = interpolate(
          frame,
          [0, 300],
          [particle.startY, 120],
          { extrapolateRight: "wrap" }
        );

        const currentY = ((y + particle.id * 10) % 140) - 20;
        const spin = (frame * particle.speed * 2 + particle.rotation) % 360;

        if (particle.type === "sparkle") {
          return (
            <div
              key={particle.id}
              style={{
                position: "absolute",
                left: `${particle.x}%`,
                top: `${currentY}%`,
                width: particle.size / 2,
                height: particle.size / 2,
                background: `radial-gradient(circle, rgba(255,215,0,${particle.opacity}) 0%, transparent 70%)`,
                borderRadius: "50%",
                transform: `rotate(${spin}deg)`,
                filter: "blur(1px)",
              }}
            />
          );
        }

        return (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${currentY}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)`,
              opacity: particle.opacity,
              transform: `rotate(${spin}deg) rotateY(${spin}deg)`,
              boxShadow: `0 0 ${particle.size / 2}px rgba(255,107,53,0.5)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}
