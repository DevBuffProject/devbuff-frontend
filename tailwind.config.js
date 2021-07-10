// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors')

// eslint-disable-next-line no-undef
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      purple: colors.purple,
      yellow: colors.yellow,
      blueGray: {
        50: '#f0f6fc',
        100: '#c9d1d9',
        200: '#b1bac4',
        300: '#8b949e',
        400: '#6e7681',
        500: '#484f58',
        600: '#30363d',
        700: '#21262d',
        800: '#161b22',
        900: '#0d1117',
      },
      primary: {
        DEFAULT: colors.lightBlue['500'],
        ...colors.lightBlue,
      },
      secondary: {
        DEFAULT: colors.violet['500'],
        ...colors.violet,
      },
      success: {
        DEFAULT: colors.green['500'],
        ...colors.green,
      },
      danger: {
        DEFAULT: colors.red['500'],
        ...colors.red,
      },
      warning: {
        DEFAULT: colors.yellow['500'],
        ...colors.yellow,
      },
    },
    screens: {
      '2xs': '320px',
      xs: '384px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
}
