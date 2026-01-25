import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export default function GlowOrb() {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.15, 1],
    { extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.4, 0.8, 0.4],
    { extrapolateRight: "clamp" }
  );

  const rotation = (frame * 0.5) % 360;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          width: "150%",
          height: "150%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,107,53,${opacity * 0.3}) 0%, transparent 70%)`,
          transform: `scale(${scale * 1.2})`,
          filter: "blur(40px)",
        }}
      />

      {/* Middle glow */}
      <div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,215,0,${opacity * 0.5}) 0%, rgba(255,107,53,${opacity * 0.3}) 50%, transparent 70%)`,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          filter: "blur(20px)",
        }}
      />

      {/* Inner core */}
      <div
        style={{
          position: "absolute",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.2}) 0%, rgba(255,215,0,${opacity * 0.4}) 30%, transparent 60%)`,
          transform: `scale(${scale * 0.9})`,
          filter: "blur(10px)",
        }}
      />
    </AbsoluteFill>
  );
}
