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
      keyframes: {
        'bg-arrow': {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)'},
          '40%': { transform: 'scale(1) translate3d(0, -0.5px, 0)'},
          '50%': { transform: 'scale(1.8) translate3d(0, -1.5px, 0)'},
          '90%': { transform: 'scale(1.8) translate3d(0, -2px, 0)'},
          '100%': { transform: 'scale(1) translate3d(0, -6px, 0)'},
        },
      },
      animation: {
        'bg-arrow': 'bg-arrow 9s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus', 'motion-safe'],
      ringWidth: ['hover', 'focus', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
