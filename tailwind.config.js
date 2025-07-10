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
    },
  },
  plugins: [
    fluid,
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
