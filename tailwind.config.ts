import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5f0e8",
        ink: "#1a1510",
        rust: "#c4500a",
        rustLight: "#e8601a",
        warmMid: "#7a6248",
        pale: "#e8e0d2",
        pale2: "#ddd4c4",
        warmDark: "#3d2e1e"
      },
      fontFamily: {
        display: ["var(--font-playfair)"],
        sans: ["var(--font-dm-sans)"],
        mono: ["var(--font-dm-mono)"]
      },
      keyframes: {
        sweepFill: {
          to: { width: "100%" }
        },
        wipeUp: {
          to: { transform: "translateY(-100%)" }
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          to: { opacity: "1" }
        },
        spinCW: {
          to: { transform: "rotate(360deg)" }
        },
        spinCCW: {
          to: { transform: "rotate(-360deg)" }
        },
        tickerMove: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        tickV: {
          "0%": { top: "-28%" },
          "100%": { top: "100%" }
        }
      },
      animation: {
        sweepFill: "sweepFill 1.3s cubic-bezier(0.77,0,0.18,1) 0.2s forwards",
        wipeUp: "wipeUp 0.75s cubic-bezier(0.76,0,0.24,1) forwards",
        slideUp: "slideUp 0.7s ease forwards",
        fadeIn: "fadeIn 0.6s ease forwards",
        spinCW: "spinCW 22s linear infinite",
        spinCCW: "spinCCW 18s linear infinite",
        tickerMove: "tickerMove 22s linear infinite",
        tickV: "tickV 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
