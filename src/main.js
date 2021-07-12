import { createApp, defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { MotionPlugin } from '@vueuse/motion'
import { useQueryString } from './composes/utils'
import { createMiddleware, getUser } from './middlewares'
import mitt from 'mitt'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import focusable from './app/directives/focusable'
import routes from './routes'
import App from './App.vue'

import 'virtual:svg-icons-register'
import 'virtual:windi.css'
import 'virtual:windi-devtools'

const qs = useQueryString()
const emitter = mitt()
const router = createRouter({
  routes,
  history: createWebHistory(),
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
})

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  messages,
})

const loader = async () => {
  await getUser()

  router.beforeResolve(createMiddleware(getUser, { throttle: 1000 * 5 }))

  app.config.globalProperties.emitter = emitter
  app.directive(focusable.name, focusable)
  app.use(router)
  app.use(MotionPlugin)
  app.use(i18n)

  return App
}

const app = createApp(defineAsyncComponent({ loader }))
app.mount('#app')
