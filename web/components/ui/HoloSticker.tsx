import type { ReactNode, CSSProperties } from "react";

type HoloStickerProps = {
  children: ReactNode;
  /** Resting rotation in degrees */
  rotate?: number;
  /** Stagger the float loop so a cluster doesn't bob in unison */
  floatDelay?: number;
  className?: string;
};

// Holo-ringed badge that bobs on a cheap CSS loop. Rotation rides a CSS var
// so the float keyframes can preserve it.
export default function HoloSticker({
  children,
  rotate = -3,
  floatDelay = 0,
  className = "",
}: HoloStickerProps) {
  return (
    <span
      className={`sticker animate-float ${className}`}
      style={
        {
          "--sticker-rot": `${rotate}deg`,
          "--float-rot": `${rotate}deg`,
          animationDelay: `${floatDelay}s`,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
