/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    },
    extend: {
      scale: {
        '110-100': '1.10, 1.00',
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      colors: {
        'main': 'var(--main-color)',
        'ui-bg': 'var(--ui-color)',
        'ui-bg-dark': 'var(--ui-color-dark)',
        'section-bg': 'var(--section-bg-color)',
      },
    },
  },
  plugins: [],
}
