const config = {
  host: '0.0.0.0',
  port: 3000,
  dev: process.env.NODE_ENV !== 'production',
  head: {
    title: 'devbuff-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Devbuff web client' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;300;400;600;900&display=swap' }
    ]
  },
  css: [
    { src: '~/assets/styles/common.scss', lang: 'sass' }
  ],

  loading: '~/components/Loading/PageLoading.vue',

  components: [{
    path: '~/components/',
    prefix: 'v'
  }],

  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/ui-installer.js',
    '~/plugins/api.js'
  ],

   modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  proxy: {
    '/api/v1': {
      target: process.env.API_BASE_URL,
      pathRewrite: { '^/api/v1' : '/' },
    }
  },

  router: {
    middleware: [
      'auth-refresh'
    ],
  },

  storybook: {
    addons: [
      '@storybook/addon-knobs'
    ]
  },

  publicRuntimeConfig: {
    // Proxy env to runtime
    API_BASE_URL: process.env.API_BASE_URL,
    API_BASE_PROXY_URL: '/api',
  },

  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

// Proxy dev prop to publicRuntimeConfig
config.publicRuntimeConfig.isDev = config.dev

module.exports = config
