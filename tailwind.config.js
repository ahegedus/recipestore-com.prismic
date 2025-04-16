/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/slices/**/*.{js,ts,jsx,tsx}',
    './src/prismic.ts', // if you use components there
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
