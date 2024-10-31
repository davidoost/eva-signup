import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        fenix: {
          extend: "light", // <- inherit default values from dark theme
          colors: {
            primary: {
              50: "#002B11",
              100: "#00391A",
              200: "#00522B",
              300: "#006C3C",
              400: "#00864E",
              500: "#00A260",
              600: "#00BF73",
              700: "#00D788",
              800: "#00F19D",
              900: "#00F9A8",
              DEFAULT: "#00A260",
              foreground: "#ffffff",
            },
            focus: "#00BF73",
          },
          layout: {
            radius: {
              small: "0px",
              medium: "0px",
              large: "0px",
            },
          },
        },
      },
    }),
  ],
};
export default config;
