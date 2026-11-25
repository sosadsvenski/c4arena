import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07080b",
        panel: "#0d0f14",
        neon: {
          cyan: "#22e6ff",
          pink: "#ff2bd6",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 24px rgba(34, 230, 255, 0.35)",
        "neon-pink": "0 0 24px rgba(255, 43, 214, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
