import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { CustomEase } from "gsap/CustomEase";

// Single registration site. Every component imports gsap from "@/lib/gsap",
// never from "gsap" directly, so plugins are always registered first.
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    ScrambleTextPlugin,
    DrawSVGPlugin,
    MotionPathPlugin,
    Physics2DPlugin,
    CustomEase
  );

  // iOS URL-bar show/hide fires resize; a full refresh mid-scroll causes pin jumps.
  ScrollTrigger.config({ ignoreMobileResize: true });

  CustomEase.create("meekoSlam", "M0,0 C0.3,0 0.4,1.4 0.6,1.4 0.8,1.4 0.9,1 1,1");
}

// Dynamic imports make ScrollTrigger creation order nondeterministic across
// sections; refresh must still run top-of-page-first. Higher = refreshed first.
export const SECTION_PRIORITY = {
  hero: 90,
  lore: 80,
  tokenomics: 70,
  contract: 60,
  chart: 50,
  howToBuy: 40,
  roadmap: 30,
  footer: 20,
} as const;

export const SCRAMBLE_CHARS = "MEKO$4269X¥Ξ†⛧#%&";

export { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase };
