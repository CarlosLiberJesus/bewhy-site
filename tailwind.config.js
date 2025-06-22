/** @type {import('tailwindcss').Config} */
const fluid = require("fluid-tailwind");
const { extract, screens, fontSize } = require("fluid-tailwind");

module.exports = {
  content: {
    files: ["./src/**/*.{html,ts,scss}"],
    extract,
  },
  theme: {
    screens,
    fontSize,
    extend: {
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
