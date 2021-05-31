import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'
import ViteComponents from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
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
  ],
})
