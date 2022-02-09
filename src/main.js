import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { GesturePlugin } from '@vueuse/gesture'
import { createOverlayRouter } from './core/router'
import { createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { useAuth, useQueryString } from './composes'
import setup from './core/setup'
import mitt from 'mitt'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import Ripple from './core/ui/Ripple'
import Masonry from './core/ui/Masonry'
import LoadingIndicator from './core/ui/LoadingIndicator'
import focusable from './app/directives/focusable'
import routes from './routes'
import App from './App.vue'

import './styles.css'
import 'virtual:svg-icons-register'
import 'virtual:windi.css'
import 'virtual:windi-devtools'

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
app.config.globalProperties.emitter = emitter
app
  .use(setup)
  .use(router)
  .use(i18n)
  .use(LoadingIndicator)
  .use(MotionPlugin)
  .use(GesturePlugin)
  .use(Ripple)
  .use(Masonry)
  .directive('focusable', focusable)

app.mount('#app')
