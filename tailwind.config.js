/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          light: '#67e8f9',
          DEFAULT: '#343a40',
          'contrast': '#81c6dd',
        },
        secondary: {
          DEFAULT: '#e9b64d',
          dark: '#cc9119',
        },
        tertiary: '#90ca77',
      },
      fontFamily: {
        sans: ['"Roboto Mono"'],
      },
    },
  },
  plugins: [],
}
