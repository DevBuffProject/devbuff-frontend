import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'
import ViteComponents from 'vite-plugin-components'
import i18nResources from 'vite-plugin-i18n-resources'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    viteSvgIcons({
      iconDirs: [path.resolve('src/assets/svg')],
      symbolId: 'icon-[name]',
    }),
    ViteComponents({
      directoryAsNamespace: true,
      customComponentResolvers: [
        (name) =>
          name.endsWith('Icon') && {
            importName: name,
            path: '@iconicicons/vue3',
          },
      ],
    }),
    ViteFonts({
      google: {
        display: 'swap',
        families: [
          {
            name: 'Rubik',
            styles:
              'ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900',
          },
        ],
      },
    }),
    i18nResources({
      path: path.resolve(__dirname, 'src/locales'),
    }),
  ],
})
