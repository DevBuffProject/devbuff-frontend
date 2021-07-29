import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import viteI18n from '@intlify/vite-plugin-vue-i18n'
import ViteWindiCSS from 'vite-plugin-windicss'
import ViteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    ViteWindiCSS({
      // eslint-disable-next-line no-undef
      config: 'tailwind.config.js',
    }),
    ViteSvgIcons({
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
    viteI18n({
      include: './src/locales/**',
    }),
  ],
})
