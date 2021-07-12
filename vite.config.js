import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'
import ViteComponents from 'vite-plugin-components'
import viteI18n from '@intlify/vite-plugin-vue-i18n'
import ViteWindiCSS from 'vite-plugin-windicss'
import ViteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
import process from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    ViteWindiCSS({
      // eslint-disable-next-line no-undef
      config: 'tailwind.config.js',
    }),
    ViteSvgIcons({
      iconDirs: [path.resolve(process.cwd()), 'src/assets/svg'],
      symbolId: 'icon-[dir]-[name]',
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
    viteI18n({
      include: './src/locales/**',
    }),
  ],
})
