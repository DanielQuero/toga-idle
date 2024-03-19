/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      scale: {
        '110-100': '1.10, 1.00',
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
