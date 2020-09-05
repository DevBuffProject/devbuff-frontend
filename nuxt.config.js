module.exports = {
  /*
  ** Headers of the page
  */
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
    { src: '~/assets/styles/common.scss', lang: 'sass' },
    { src: '~/assets/styles/bulma.loader.scss', lang: 'sass' },
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  pageTransition: 'top',

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
    ['nuxt-vuex-localstorage', {
      localStorage: ['shared'],
      sessionStorage: ['session']
    }],
    '@nuxtjs/pwa',
    '@nuxt/http',
  ],

  storybook: {
    addons: [
      '@storybook/addon-knobs'
    ]
  },

  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
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
