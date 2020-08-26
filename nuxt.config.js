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

  /*
  ** Customize the progress bar color
  */
  loading: '~/components/Loading/PageLoading.vue',
  /*
  ** Components Discovery
  */
  components: [{
    path: '~/components/',
    prefix: 'v'
  }],
  plugins: [
    '~/plugins/fontawesome.js'
  ],
  /*
   * Modules
   */
   modules: [
    ['nuxt-vuex-localstorage', {
      localStorage: ['shared'],
      sessionStorage: ['session']
    }]
  ],
  /*
   * Build configuration
   */
  build: {
    /*
    ** Run ESLint on save
    */
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
