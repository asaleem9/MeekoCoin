// Input watchers for the hidden-egg layer. Each returns a cleanup function.

export function onKeySequence(sequence: string[], callback: () => void) {
  let position = 0;
  const onKey = (e: KeyboardEvent) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === sequence[position]) {
      position++;
      if (position === sequence.length) {
        position = 0;
        callback();
      }
    } else {
      position = key === sequence[0] ? 1 : 0;
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}

export function onTypedWord(word: string, callback: () => void) {
  let buffer = "";
  const onKey = (e: KeyboardEvent) => {
    if (e.key.length !== 1) return;
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-word.length);
    if (buffer === word) {
      buffer = "";
      callback();
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}

export function createIdleWatcher(
  idleMs: number,
  onIdle: () => void,
  onWake: () => void
) {
  let timer: ReturnType<typeof setTimeout>;
  let idle = false;

  const reset = () => {
    if (idle) {
      idle = false;
      onWake();
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      idle = true;
      onIdle();
    }, idleMs);
  };

  const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;
  events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
  reset();

  return () => {
    clearTimeout(timer);
    events.forEach((ev) => window.removeEventListener(ev, reset));
  };
}

export const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const MEEKO_ASCII = String.raw`
      /\_/\
     ( o.o )   MEEKO SEES YOU.
      > ^ <
   You found the litter box.
   The prophecy is real.
`;
