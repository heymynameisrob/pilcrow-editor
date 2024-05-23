import type { Config } from "tailwindcss"

const config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontSize: {
      "xs": ".688rem", // 12px
      "sm": "0.813rem", // 13px 
      "base": '1rem', // 16px
      "lg": "1.25rem", // 20px
      "xl": "1.5rem", // 24px
      "2xl": "2rem", // 32px
      "3xl": "2.25rem", // 36px
      "4xl": "3rem",  // 48px
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },      
    },
  },  
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config

export default config