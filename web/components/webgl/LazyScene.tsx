"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazySceneProps = {
  children: ReactNode;
  className?: string;
  /** How far outside the viewport to start mounting */
  rootMargin?: string;
};

// Mounts heavy children (WebGL canvases, Remotion players) only when the
// wrapper approaches the viewport. The wrapper must be sized by its parent
// so late mounting never shifts layout.
export default function LazyScene({
  children,
  className = "",
  rootMargin = "100%",
}: LazySceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : null}
    </div>
  );
}
