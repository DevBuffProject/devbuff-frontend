import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
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
        families: [{ name: 'Roboto', styles: 'wght@300;400;500;700' }],
      },
    }),

    ViteComponents({
      dts: false,
      directoryAsNamespace: true,
      resolvers: [
        VueUseComponentsResolver(),
        (name) => {
          const namespaceParts = name.split('.')
          namespaceParts.shift()

          if (name.startsWith('A.'))
            return {
              path: path.resolve('./src/components/atomic'),
              importName: `Atomic${name.split('.').pop()}`,
            }
        },
        (name) => {
          if (name.endsWith('Icon'))
            return { importName: name, path: '@iconicicons/vue3' }
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
