import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        opencyc: ['Open Dyslexic', 'sans-serif'], // Add Open Dyslexic here
      },
    },
  },
  plugins: [],
} satisfies Config;
