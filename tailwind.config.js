/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#343a40',
      'primary-contrast': '#81c6dd',
      secondary: '#e9b64d',
      tertiary: '#90ca77',
      blue: colors.blue,
    },
    extend: {
      fontFamily: {
        sans: ['"Roboto Mono"'],
      },
    },
  },
}
