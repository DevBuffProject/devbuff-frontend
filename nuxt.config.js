const IS_DEV = process.env.NODE_ENV !== 'production'
// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
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
        src: 'https://ssmr5v2lldg4.statuspage.io/embed/script.js',
        body: true,
        defer: true,
      },
    ],
  },
  css: [{ src: '~/assets/css/common.css', lang: 'sass' }],
  loading: '~/page-loading.js',
  components: [
    {
      path: '~/components/',
      ignore: ['~/components/dialogs'],
      prefix: 'v',
    },
  ],
  plugins: [
    { src: '~/plugins/api.js' },
    { src: '~/plugins/setup.js' },
    { src: '~/plugins/fontawesome.js' },
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/vuex-persist.js' },
    { src: '~/plugins/vue-scroll.js' },
  ],
  modules: [
    // '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  proxy: {
    [process.env.VK_PROXY_PATH]: {
      logLevel: IS_DEV ? 'debug' : 'info',
      target: process.env.VK_BASE_URL,
      pathRewrite: { [`^${process.env.VK_PROXY_PATH}`]: '' },
      onProxyReq(proxyReq) {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${process.env.VK_SERVICE_TOKEN}`
        )
        proxyReq.setHeader('Content-Type', 'application/json')
        proxyReq.setHeader('Accept', 'application/json')
      },
    },
  },
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
  privateRuntimeConfig: {
    VK_CLIENT_ID: '7820928',
    VK_TOKEN: '6j8Yj9ymxXhMRJsWwid9',
    VK_SERVICE_TOKEN:
      '4a7af3284a7af3284a7af328cf4a0da5a844a7a4a7af3282a09fa8d57bf84db3e5379d2',
  },
  publicRuntimeConfig: {
    // Proxy env to runtime
    IS_DEV,
    SESSION_COOKIE_KEY: 'remix_dvbff',
    VK_PROXY_PATH: '/api/vkdata',
    VK_BASE_URL: 'https://api.vk.com/method/',
    VK_API_VERSION: '5.130',
    API_BASE_URL: process.env.API_BASE_URL,
    STATUSPAGE_BASE_URL: process.env.STATUSPAGE_BASE_URL,
  },
  modern: !IS_DEV,
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
