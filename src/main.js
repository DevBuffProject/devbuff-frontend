import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { useQueryString } from './composes/utils'
import { createMiddleware, getUser } from './middlewares'
import { MotionPlugin } from '@vueuse/motion'
// Will raised build error "undefined nextTick"
// import { VueMasonryPlugin } from 'vue-masonry/src/masonry-vue3.plugin'
import mitt from 'mitt'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import focusable from './app/directives/focusable'
import routes from './routes'
import App from './App.vue'

import 'virtual:svg-icons-register'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { createOverlayRouter } from './router'

const qs = useQueryString()
const emitter = mitt()

const router = createOverlayRouter({
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

const app = createApp(App)

router.beforeResolve(createMiddleware(getUser, { throttle: 1000 * 5 }))

app.config.globalProperties.emitter = emitter
app.directive(focusable.name, focusable)
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
// see file head
// app.use(VueMasonryPlugin)

app.mount('#app')
