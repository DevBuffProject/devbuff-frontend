const colors = require('windicss/colors')
import typography from 'windicss/plugin/typography'

export default {
  attributify: {
    prefix: 'w:',
  },
  extract: {
    include: ['index.html', 'src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      ...colors,
      dark: {
        ...colors.dark,
      },
      primary: {
        ...colors.lightBlue,
      },
      secondary: {
        ...colors.violet,
      },
      success: {
        ...colors.green,
      },
      danger: {
        ...colors.red,
      },
      warning: {
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
  plugins: [
    typography({
      dark: true,
    }),
  ],
}
