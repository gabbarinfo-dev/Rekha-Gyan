import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: "#05040a",
          900: "#090816",
          850: "#0e0c22",
          800: "#14112e",
          700: "#1d1942",
          600: "#2d2666",
        },
        mystic: {
          purple: "#36165e",
          violet: "#4c1d95",
          magenta: "#701a75",
          indigo: "#312e81",
        },
        gold: {
          300: "#fde68a",
          400: "#fcd34d",
          500: "#f59e0b",
          metallic: "#d4af37",
          bright: "#f5d77f",
          dark: "#997b24",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mystic-gradient": "linear-gradient(135deg, #090816 0%, #170f38 50%, #0c0a1f 100%)",
        "gold-shimmer": "linear-gradient(90deg, #d4af37 0%, #fef3c7 50%, #d4af37 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
