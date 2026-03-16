import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: "#00B5B2",
        orange: "#FF5A1F",
        gold: "#FFB800",
        htgreen: "#4ADE80",
        htbg: "#FAFAFA",
        htdark: "#1E293B",
        htcard: "#FFFFFF",
        htcard2: "#F1F5F9",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        serif: ["Fraunces", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      animation: {
        tick: "tick 28s linear infinite",
      },
      keyframes: {
        tick: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
