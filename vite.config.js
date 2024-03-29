import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'unplugin-vue-components/vite'
import viteI18n from '@intlify/vite-plugin-vue-i18n'
import ViteWindiCSS from 'vite-plugin-windicss'
import ViteFonts from 'vite-plugin-fonts'
import ViteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),

    ViteSvgIcons({
      iconDirs: [path.resolve('src/assets/svg')],
      symbolId: 'icon-[name]',
    }),

    ViteFonts({
      google: {
        families: [{ name: 'Roboto', styles: ['100', '200', '300', '400'] }],
      },
    }),

    ViteComponents({
      directoryAsNamespace: true,
      resolvers: [
        (name) => {
          if (name.endsWith('Icon'))
            return { importName: name, path: '@iconicicons/vue3' }
          if (name.startsWith('Use'))
            return { importName: name, path: '@vueuse/components' }
        },
      ],
    }),

    viteI18n({
      include: './src/locales/**',
    }),

    ViteWindiCSS({
      config: 'windi.config.js',
    }),
  ],
})
