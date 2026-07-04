import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./remotion/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#08010F",
          deep: "#030008",
          soft: "#150A2E",
        },
        acid: {
          DEFAULT: "#C8FF00",
          dim: "#8FB800",
        },
        zap: {
          DEFAULT: "#FF3DAE",
          dim: "#C42A85",
        },
        ice: {
          DEFAULT: "#4DF3FF",
          dim: "#37B8C2",
        },
        chrome: {
          white: "#FFFFFF",
          light: "#E8ECF3",
          mid: "#9BA3B4",
          dark: "#6E7687",
        },
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "sans-serif"],
        chaos: ["var(--font-climate)", "Impact", "sans-serif"],
        mono: ["var(--font-azeret)", "ui-monospace", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--float-rot, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(var(--float-rot, 0deg))" },
        },
        "holo-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "holo-shift": "holo-shift 6s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        blink: "blink 1.4s steps(2) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
