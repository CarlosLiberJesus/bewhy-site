/** @type {import('tailwindcss').Config} */
const fluid = require("fluid-tailwind");
const { extract, screens, fontSize } = require("fluid-tailwind");

module.exports = {
  content: {
    files: ["./src/**/*.{html,ts,scss}"],
    extract,
  },
  darkMode: "class",
  theme: {
    screens,
    fontSize,
    extend: {
      fontFamily: {
        mono: ["Fira Code", "Monaco", "Consolas", "Ubuntu Mono", "monospace"],
      },
      colors: {
        // BeWhy Theme Colors
        dark: {
          primary: '#210810',
          secondary: '#E8E3E1',
          accent: '#A75A7B',
          neutral: '#4A4A4A',
          gold: '#D4C2A8',
        },
        light: {
          primary: '#E8E3E1',
          secondary: '#210810',
          accent: '#A75A7B',
          neutral: '#4A4A4A',
          gold: '#D4C2A8',
        },
        // Custom colors for syntax highlighting
        syntax: {
          keyword: "#3b82f6",
          string: "#f59e0b",
          type: "#10b981",
          comment: "#9ca3af",
        },
      },
      screens: {
        xs: "20rem",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'message-in': 'messageIn 0.4s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        messageIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    fluid,
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // Custom plugin for theme colors
    function({ addUtilities, theme }) {
      const themeColors = {
        '.text-dark-primary': { color: '#210810' },
        '.text-dark-secondary': { color: '#E8E3E1' },
        '.text-dark-accent': { color: '#A75A7B' },
        '.text-dark-neutral': { color: '#4A4A4A' },
        '.text-dark-gold': { color: '#D4C2A8' },
        '.text-light-primary': { color: '#E8E3E1' },
        '.text-light-secondary': { color: '#210810' },
        '.text-light-accent': { color: '#A75A7B' },
        '.text-light-neutral': { color: '#4A4A4A' },
        '.text-light-gold': { color: '#D4C2A8' },
        '.bg-dark-primary': { backgroundColor: '#210810' },
        '.bg-dark-secondary': { backgroundColor: '#E8E3E1' },
        '.bg-dark-accent': { backgroundColor: '#A75A7B' },
        '.bg-dark-neutral': { backgroundColor: '#4A4A4A' },
        '.bg-dark-gold': { backgroundColor: '#D4C2A8' },
        '.bg-light-primary': { backgroundColor: '#E8E3E1' },
        '.bg-light-secondary': { backgroundColor: '#210810' },
        '.bg-light-accent': { backgroundColor: '#A75A7B' },
        '.bg-light-neutral': { backgroundColor: '#4A4A4A' },
        '.bg-light-gold': { backgroundColor: '#D4C2A8' },
        '.border-dark-primary': { borderColor: '#210810' },
        '.border-dark-secondary': { borderColor: '#E8E3E1' },
        '.border-dark-accent': { borderColor: '#A75A7B' },
        '.border-dark-neutral': { borderColor: '#4A4A4A' },
        '.border-dark-gold': { borderColor: '#D4C2A8' },
        '.border-light-primary': { borderColor: '#E8E3E1' },
        '.border-light-secondary': { borderColor: '#210810' },
        '.border-light-accent': { borderColor: '#A75A7B' },
        '.border-light-neutral': { borderColor: '#4A4A4A' },
        '.border-light-gold': { borderColor: '#D4C2A8' },
        '.placeholder-dark-secondary\\/60::placeholder': { color: '#E8E3E199' },
        '.placeholder-light-secondary\\/60::placeholder': { color: '#21081099' },
        '.focus\\:ring-dark-accent\\/20:focus': { 
          '--tw-ring-color': '#A75A7B33',
          boxShadow: 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)'
        },
        '.focus\\:ring-light-accent\\/20:focus': { 
          '--tw-ring-color': '#A75A7B33',
          boxShadow: 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)'
        },
      };
      
      addUtilities(themeColors);
    }
  ],
};