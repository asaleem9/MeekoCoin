import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./remotion/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        meeko: {
          orange: "#FF6B35",
          gold: "#FFD700",
          black: "#000000",
          dark: "#0a0a0a",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "monospace"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "breathe": "breathe 2s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "flicker": "flicker 0.15s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "typewriter": "typewriter 2s steps(44) 1s forwards",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        breathe: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255,107,53,0.4), 0 0 40px rgba(255,107,53,0.2)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 50px rgba(255,107,53,0.8), 0 0 80px rgba(255,107,53,0.4)",
            transform: "scale(1.02)",
          },
        },
        glitch: {
          "0%": { clipPath: "inset(40% 0 61% 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: "1" },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: "0.4" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.1)",
          },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "noise": "url('/noise.png')",
        "grid": "linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "50px 50px",
      },
    },
  },
  plugins: [],
};

export default config;
