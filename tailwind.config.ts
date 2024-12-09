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
        primary: {
          DEFAULT: "#003963",
          50: "#E6EEF4",
          100: "#CCDDE8",
          200: "#99BAD2",
          300: "#6698BB",
          400: "#3375A5",
          500: "#003963",
          600: "#002E4F",
          700: "#00223B",
          800: "#001728",
          900: "#000B14",
          950: "#00060A",
        },
        secondary: {
          DEFAULT: "#CC9132",
          50: "#FAF3E8",
          100: "#F5E7D1",
          200: "#EBCEA3",
          300: "#E1B675",
          400: "#D69D47",
          500: "#CC9132",
          600: "#A37428",
          700: "#7B571E",
          800: "#523A14",
          900: "#291D0A",
          950: "#150F05",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
