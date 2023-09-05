/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f1f8fe',
          '100': '#e1effd',
          '200': '#bddefa',
          '300': '#82c4f7',
          '400': '#40a7f0',
          '500': '#178be0',
          '600': '#0a6ab8',
          '700': '#0a579a',
          '800': '#0c4a80',
          '900': '#103f6a',
          '950': '#0b2846',
        }
      }
    },
  },
  plugins: [],
}

