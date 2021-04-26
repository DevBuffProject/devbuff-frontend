const IS_DEV = process.env.NODE_ENV !== 'production'
const proxyConfig = {}
const logLevel = IS_DEV ? 'debug' : 'info'

const {
  API_PROXY_ENABLED,
  API_PROXY_PATH,
  API_BASE_URL,
  STATUSPAGE_BASE_URL,
  VK_PROXY_ENABLED,
  VK_PROXY_PATH,
  VK_BASE_URL,
  VK_API_VERSION,
  VK_CLIENT_ID,
  VK_SERVICE_TOKEN,
  VK_TOKEN,
} = process.env

const API_URL = process.env.API_PROXY_ENABLED
  ? process.env.API_PROXY_PATH
  : process.env.API_BASE_URL

// https://github.com/nuxt-community/proxy-module
if (process.env.API_PROXY_ENABLED) {
  proxyConfig[process.env.API_PROXY_PATH] = {
    logLevel,
    target: process.env.API_BASE_URL,
    pathRewrite: { [`^${process.env.API_PROXY_PATH}`]: '' },
  }
}

if (process.env.VK_PROXY_ENABLED) {
  proxyConfig[process.env.VK_PROXY_PATH] = {
    logLevel,
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
  }
}

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
        src: 'https://6yzwffsm5625.statuspage.io/embed/script.js',
        body: true,
        defer: true,
      },
    ],
  },
  css: [{ src: '~/assets/css/common.css' }],
  loading: '~/page-loading.js',
  components: [
    {
      path: '~/components/',
      extensions: ['vue'],
    },
    {
      path: '~/app/dialogs/components',
      extensions: ['vue'],
      prefix: 'app',
    },
  ],
  plugins: [
    { src: '~/plugins/setup.js' },
    // Deprecated
    { src: '~/plugins/fontawesome.js' },
    // https://vee-validate.logaretm.com/v2/guide/rules.html
    { src: '~/plugins/vee-validate.js' },
    // https://github.com/robinvdvleuten/vuex-persistedstate
    { src: '~/plugins/vuex-persistedstate.js' },
    // https://vuescrolljs.yvescoding.org/
    { src: '~/plugins/vue-scroll.js' },
    // https://portal-vue.linusb.org
    { src: '~/plugins/vue-portal.client.js', mode: 'client' },
  ],
  modules: [
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // https://axios.nuxtjs.org
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org
    'nuxt-i18n',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
  ],
  buildModules: [
    // https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://html-validator.nuxtjs.org
    // '@nuxtjs/html-validator',
    // https://github.com/harlan-zw/nuxt-build-optimisations
    // 'nuxt-build-optimisations',
  ],
  privateRuntimeConfig: {
    VK_CLIENT_ID,
    VK_SERVICE_TOKEN,
    VK_TOKEN,
  },
  publicRuntimeConfig: {
    // Proxy env to runtime
    SESSION_COOKIE_KEY: 'remix_dvbff',
    IS_DEV,
    API_PROXY_ENABLED,
    API_PROXY_PATH,
    API_BASE_URL,
    STATUSPAGE_BASE_URL,
    VK_PROXY_ENABLED,
    VK_PROXY_PATH,
    VK_BASE_URL,
    VK_API_VERSION,
  },
  modern: !IS_DEV,
  build: {
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

  /* Modules configs */
  auth: {
    plugins: [
      // https://auth.nuxtjs.org/recipes/extend
      { src: '~/plugins/api.js', ssr: true },
      { src: '~/plugins/auth.js', ssr: true },
    ],
    strategies: {
      local: {
        scheme: 'cookie',
        grantType: 'github_oauth',
        scope: 'ui',
        scopeKey: 'authorities',
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer',
        },
        endpoints: {
          login: {
            url: `${API_URL}/oAuth/GitHub`,
            method: 'post',
          },
          user: false,
        },
      },
    },
  },
  tailwindcss: {
    jit: true,
    cssPath: '~/assets/css/tailwind.css',
    configPath: './tailwind.config.js',
  },
  proxy: proxyConfig,
  buildOptimisations: {
    profile: 'safe',
  },
  svgSprite: {
    input: '~/assets/svg',
    svgo: null,
    elementClass: 'dbff-svg-sprite',
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'dbff-color-mode-script',
    storageKey: 'dbff-color-mode',
    classPrefix: '',
    classSuffix: '',
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
}
