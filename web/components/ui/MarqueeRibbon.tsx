import Marquee from "./Marquee";

type MarqueeRibbonProps = {
  items: string[];
  tone?: "acid" | "zap";
  tilt?: number;
  reverse?: boolean;
};

// Tilted solid ribbon slicing between sections.
export default function MarqueeRibbon({
  items,
  tone = "acid",
  tilt = -2,
  reverse = false,
}: MarqueeRibbonProps) {
  return (
    <div className="relative z-20 -my-6 overflow-visible" style={{ transform: `rotate(${tilt}deg) scale(1.02)` }}>
      <Marquee
        duration={18}
        reverse={reverse}
        className={tone === "acid" ? "bg-acid" : "bg-zap"}
        trackClassName="py-3"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-6 font-display text-sm font-black uppercase tracking-[0.25em] text-void"
          >
            {item} <span aria-hidden>⛧</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
