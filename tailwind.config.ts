import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#E6EEF4",
          "100": "#CCDDE8",
          "200": "#99BAD2",
          "300": "#6698BB",
          "400": "#3375A5",
          "500": "#003963",
          "600": "#002E4F",
          "700": "#00223B",
          "800": "#001728",
          "900": "#000B14",
          "950": "#00060A",
          DEFAULT: "#003963",
        },
        secondary: {
          "50": "#FAF3E8",
          "100": "#F5E7D1",
          "200": "#EBCEA3",
          "300": "#E1B675",
          "400": "#D69D47",
          "500": "#CC9132",
          "600": "#A37428",
          "700": "#7B571E",
          "800": "#523A14",
          "900": "#291D0A",
          "950": "#150F05",
          DEFAULT: "#CC9132",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
