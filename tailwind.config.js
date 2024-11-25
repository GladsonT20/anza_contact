const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./public/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
   colors: {
    "Rose":colors.Rose,
    "Pink":colors.Pink,
   }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
