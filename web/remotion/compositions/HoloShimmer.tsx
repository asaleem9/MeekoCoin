import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const HOLO_SHIMMER_FRAMES = 300;
export const HOLO_SHIMMER_FPS = 30;

// Slow iridescent wash: a rotating conic sheen plus two drifting blobs.
// Loops seamlessly at 300 frames.
export default function HoloShimmer() {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, HOLO_SHIMMER_FRAMES], [0, 360]);
  const driftX = interpolate(
    frame,
    [0, HOLO_SHIMMER_FRAMES / 2, HOLO_SHIMMER_FRAMES],
    [20, 80, 20]
  );
  const driftY = interpolate(
    frame,
    [0, HOLO_SHIMMER_FRAMES / 2, HOLO_SHIMMER_FRAMES],
    [70, 30, 70]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <AbsoluteFill
        style={{
          background: `conic-gradient(from ${angle}deg at 50% 50%,
            rgba(200,255,0,0.20),
            rgba(77,243,255,0.14),
            rgba(255,61,174,0.20),
            rgba(77,243,255,0.14),
            rgba(200,255,0,0.20))`,
          filter: "blur(40px)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(28% 32% at ${driftX}% ${driftY}%, rgba(255,61,174,0.35), transparent 70%)`,
          filter: "blur(30px)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(24% 28% at ${100 - driftX}% ${100 - driftY}%, rgba(200,255,0,0.3), transparent 70%)`,
          filter: "blur(30px)",
        }}
      />
    </AbsoluteFill>
  );
}
