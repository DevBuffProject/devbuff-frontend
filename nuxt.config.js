const IS_DEV = process.env.NODE_ENV !== 'production'
const config = {
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  head: {
    title: 'Devbuff',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://6yzwffsm5625.statuspage.io/embed/script.js',
        body: true,
        defer: true,
      },
    ],
  },
  css: [{ src: '~/assets/css/common.css', lang: 'sass' }],
  loading: '~/page-loading.vue',
  components: [
    {
      path: '~/components/',
      ignore: ['_**'],
      prefix: 'v',
    },
  ],
  plugins: [
    { src: '~/plugins/api.js' },
    { src: '~/plugins/setup.js' },
    { src: '~/plugins/fontawesome.js' },
    { src: '~/plugins/vee-validate.js' },
  ],
  modules: [
    // '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-i18n',
    'cookie-universal-nuxt',
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'remix-color-mode-script',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'remix-color-mode',
  },
  i18n: {
    locales: [
      { code: 'ru', name: 'русский', file: 'ru.js' },
      { code: 'en', name: 'english', file: 'en.js' },
    ],
    defaultLocale: 'ru',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    lazy: true,
    langDir: 'lang/',
  },
  storybook: {
    addons: ['@storybook/addon-knobs'],
  },
  publicRuntimeConfig: {
    // Proxy env to runtime
    API_BASE_URL: process.env.API_BASE_URL,
    STATUSPAGE_BASE_URL: process.env.STATUSPAGE_BASE_URL,
  },
  // modern: true,
  router: {
    middleware: ['restore-profile'],
  },
  build: {
    // parallel: true,
    // hardSource: true,
    // extractCSS: true,
    transpile: ['vee-validate/dist/rules'],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}

if (!IS_DEV) {
  config.plugins.push({ src: '~/plugins/sentry.js' })
}
// Proxy dev prop to publicRuntimeConfig
config.publicRuntimeConfig.IS_DEV = IS_DEV
module.exports = config
