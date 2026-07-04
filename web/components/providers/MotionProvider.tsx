"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { computeTier, type MotionTier } from "@/lib/motion";

const MotionContext = createContext<MotionTier>("lite");

export function useMotionTier() {
  return useContext(MotionContext);
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  // "lite" pre-mount avoids hydration mismatch; the real tier lands before
  // the preloader reveals, so the swap is never visible.
  const [tier, setTier] = useState<MotionTier>("lite");

  useEffect(() => {
    setTier(computeTier());
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setTier(computeTier());
    reduced.addEventListener("change", onChange);
    return () => reduced.removeEventListener("change", onChange);
  }, []);

  return <MotionContext.Provider value={tier}>{children}</MotionContext.Provider>;
}
