import { AbsoluteFill, random, useCurrentFrame } from "remotion";

export const STICKER_RAIN_FRAMES = 240;
export const STICKER_RAIN_FPS = 30;

const GLYPHS = ["$", "⛧", "✦", "$MEEKO", "✧", "MEOW"];
const COLORS = ["#C8FF00", "#4DF3FF", "#FF3DAE", "#E8ECF3"];
const COUNT = 22;

// Holo glyphs raining on a seamless loop. All randomness is seeded through
// remotion's random() so every render is deterministic.
export default function StickerRain() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", overflow: "hidden" }}>
      {Array.from({ length: COUNT }, (_, i) => {
        const x = random(`x-${i}`) * 100;
        const offset = random(`o-${i}`) * STICKER_RAIN_FRAMES;
        const size = 14 + random(`s-${i}`) * 22;
        const spin = (random(`r-${i}`) - 0.5) * 720;
        const glyph = GLYPHS[Math.floor(random(`g-${i}`) * GLYPHS.length)];
        const color = COLORS[Math.floor(random(`c-${i}`) * COLORS.length)];

        const progress = ((frame + offset) % STICKER_RAIN_FRAMES) / STICKER_RAIN_FRAMES;
        const y = -12 + progress * 124;
        const rotation = progress * spin;
        const fade =
          progress < 0.1 ? progress / 0.1 : progress > 0.85 ? (1 - progress) / 0.15 : 1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: `rotate(${rotation}deg)`,
              fontSize: size,
              fontWeight: 900,
              fontFamily: "var(--font-unbounded), sans-serif",
              color,
              opacity: fade * 0.8,
              textShadow: `0 0 12px ${color}66`,
            }}
          >
            {glyph}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
