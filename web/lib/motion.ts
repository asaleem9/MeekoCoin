// Motion tiers — the single kill switch for the whole animation system.
//   off  → prefers-reduced-motion: static, native-scroll, fully readable page
//   lite → weak device / small screen: simple reveals, no pins, no WebGL extras
//   full → everything
export type MotionTier = "full" | "lite" | "off";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

export function computeTier(): MotionTier {
  if (typeof window === "undefined") return "lite";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "off";
  }

  const nav = navigator as NavigatorWithMemory;
  const weakDevice =
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);
  const smallOrCoarse =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

  if (weakDevice || smallOrCoarse) return "lite";
  return "full";
}
