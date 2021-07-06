module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // false or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
        '180': '45rem',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      ringWidth: ['hover', 'focus', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
