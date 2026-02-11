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
        primary: {
          DEFAULT: '#1B4D4B',
          light: '#2A6B68',
          dark: '#143B3A',
          50: '#E8F0F0',
          100: '#D1E1E0',
          200: '#A3C3C1',
          300: '#75A5A3',
          400: '#478784',
          500: '#1B4D4B',
          600: '#163E3C',
          700: '#112F2E',
          800: '#0B1F1F',
          900: '#061010',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
