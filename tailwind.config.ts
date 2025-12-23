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
        golden: {
          warmth: '#D4AF37',
          light: '#F4E4C1',
        },
        rosy: {
          pink: '#E8B4B8',
          light: '#FFD6D1',
        },
        christmas: {
          red: '#8B0000',
          crimson: '#C41E3A',
          green: '#2C5F2D',
          forest: '#0B6623',
        },
        cream: '#FFFDD0',
        ivory: '#F5F5DC',
        gold: '#CFB53B',
        rose: '#C21E56',
      },
      fontFamily: {
        handwritten: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
