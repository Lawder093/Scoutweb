import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        mist: "var(--color-mist)",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(29, 43, 52, 0.10)",
        card: "0 8px 30px rgba(29, 43, 52, 0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(rgba(29, 43, 52, 0.16) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
