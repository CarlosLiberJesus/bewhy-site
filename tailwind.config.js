/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

module.exports = {
  content: {
    files: ["./src/**/*.{html,ts,scss}"],
    extract
  },
  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)
    extend: {
      screens: {
        xs: '20rem'
      }
    }
  },
  plugins: [
    fluid,
    require('@tailwindcss/forms'),      // Para forms bonitos
    require('@tailwindcss/typography'), // Para .prose
  ],
}
