const colors = require('tailwindcss/colors')
const typography = require('@tailwindcss/typography')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // enabled: process.env.NODE_ENV === 'production',
    content: [
      './assets/**/*.{vue,js}',
      './components/**/*.{vue,js}',
      './app/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
    ],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
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
      muted: colors.gray[500],
      primary: {
        DEFAULT: colors.blue['500'],
        ...colors.blue,
      },
      secondary: {
        DEFAULT: colors.yellow['500'],
        ...colors.yellow,
      },
      success: {
        DEFAULT: colors.green['500'],
        ...colors.green,
      },
      danger: {
        DEFAULT: colors.rose['500'],
        ...colors.rose,
      },
      warning: {
        DEFAULT: colors.orange['500'],
        ...colors.orange,
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
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundOpacity: ['dark', 'active', 'hover'],
      scale: ['active'],
      display: ['dark'],
    },
  },
  plugins: [typography],
}
