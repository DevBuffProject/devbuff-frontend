const config = {
  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  dev: process.env.NODE_ENV !== 'production',

  head: {
    title: 'DevBuff',
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
    ],
    script: [
      { src: 'https://6yzwffsm5625.statuspage.io/embed/script.js', body: true, defer: true }
    ]
  },
  css: [
    { src: '~/assets/styles/common.scss', lang: 'sass' }
  ],

  loading: '~/page-loading.vue',

  components: [{
    path: '~/components/',
    prefix: 'v'
  }],

  plugins: [
    { src: '~/plugins/api.js' },
    { src: '~/plugins/sentry.js' },
    { src: '~/plugins/fontawesome.js' },
    { src: '~/plugins/ui-setup.js' },
  ],

   modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-i18n',
    'cookie-universal-nuxt'
  ],

  i18n : {
    locales: [
      { code: 'ru', name: '🇷🇺', file: 'ru.js' },
      { code: 'en', name: '🇬🇧', file: 'en.js' }
    ],
    defaultLocale: 'ru',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    lazy: true,
    langDir: 'lang/'
  },

  storybook: {
    addons: [
      '@storybook/addon-knobs'
    ]
  },

  serverMiddleware: [
    { path: '/_api/help/og', handler: '~endpoints/opengraph.js' }
  ],

  publicRuntimeConfig: {
    // Proxy env to runtime
    API_BASE_URL: process.env.API_BASE_URL,
    STATUSPAGE_BASE_URL: process.env.STATUSPAGE_BASE_URL
  },

  modern: true,

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
