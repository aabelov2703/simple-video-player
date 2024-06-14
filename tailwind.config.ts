import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "m-contrast": "rgb(var(--bg-contract))",
        "m-hover": "rgb(var(--color-hover))",
        "m-main": "rgb(var(--color-main))",
        "m-base-start": "rgb(var(--background-end-rgb))",
        "m-base-end": "rgb(var(--background-start-rgb))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
