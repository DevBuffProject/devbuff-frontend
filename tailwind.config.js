const colors = require('tailwindcss/colors')
const typography = require('@tailwindcss/typography')

const baseColors = {
  white: colors.white,
  black: colors.black,
  gray: colors.gray,
  primary: {
    DEFAULT: colors.blue['500'],
    ...colors.blue
  },
  success: {
    DEFAULT: colors.green['500'],
    ...colors.green
  },
  danger: {
    DEFAULT: colors.rose['500'],
    ...colors.rose
  },
  warning: {
    DEFAULT: colors.orange['500'],
    ...colors.orange
  },
}

const darkModeColors = {
  // muted: {
  //   DEFAULT: colors.gray['200']
  // },
  // background: {
  //   DEFAULT: colors.gray['100'],
  //   contrast: colors.white
  // },
  'background-dark': {
    DEFAULT: colors.gray['700'],
    contrast: colors.gray['800']
  },
}

const lightModeColors = {
  muted: {
    DEFAULT: colors.gray['200']
  },
  background: {
    DEFAULT: colors.gray['100'],
    contrast: colors.white
  },
}

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './nuxt.config.js',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...baseColors,
      ...darkModeColors,
      ...lightModeColors,
    },
    screens: {
      '2xs': '320px',
      'xs': '384px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark']
    },
  },
  plugins: [
    typography
  ],
}
