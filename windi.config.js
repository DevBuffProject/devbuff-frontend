import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import heropatterns from '@windicss/plugin-heropatterns'

export default defineConfig({
  attributify: {
    prefix: 'w',
  },
  extract: {
    include: ['index.html', 'src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      ...colors,
      dark: {
        ...colors.dark,
      },
      primary: {
        ...colors.sky,
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
    heropatterns({
      patterns: ['bubbles', 'signal', 'circuit-board'],
      includeThemeColors: true,
    }),
  ],
})
