import type Lenis from "lenis";

// Module-level Lenis handle so the preloader and easter eggs can
// stop/start/scrollTo without context re-renders or prop drilling.
let lenis: Lenis | null = null;
let locked = false;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  // The preloader may lock scroll before Lenis exists (providers mount async).
  if (instance && locked) instance.stop();
}

export function getLenis() {
  return lenis;
}

export function lockScroll() {
  locked = true;
  lenis?.stop();
  document.documentElement.classList.add("scroll-locked");
}

export function unlockScroll() {
  locked = false;
  lenis?.start();
  document.documentElement.classList.remove("scroll-locked");
}
