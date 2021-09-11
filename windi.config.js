import typography from 'windicss/plugin/typography'
import colors from 'windicss/colors'
import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
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
      dark: colors.dark,
      primary: colors.lightBlue,
      secondary: colors.violet,
      success: colors.green,
      danger: colors.red,
      warning: colors.yellow,
    },
  },
  plugins: [typography({ dark: true })],
})
