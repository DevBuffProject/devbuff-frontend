import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      directoryAsNamespace: true,
      customComponentResolvers: [
        (name) => {
          if (name.endsWith('Icon'))
            return { importName: name, path: '@iconicicons/vue3' }
        },
      ],
    }),
  ],
})
