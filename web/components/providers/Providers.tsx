"use client";

import type { ReactNode } from "react";
import MotionProvider from "./MotionProvider";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import ScrollFX from "./ScrollFX";
import EggLayer from "@/components/eggs/EggLayer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll>
        {children}
        <ScrollFX />
        <Cursor />
        <EggLayer />
        <Preloader />
      </SmoothScroll>
    </MotionProvider>
  );
}
