import { createApp, defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { MotionPlugin } from '@vueuse/motion'
import { useQueryString } from './composes/utils'
import { createMiddleware, getUser } from './middlewares'
import loadingComponent from './components/LoadingScreen.vue'
import focusable from './app/directives/focusable'
import mitt from 'mitt'
import App from './App.vue'
import routes from './routes'
import './styles.css'

const qs = useQueryString()
const emitter = mitt()
const router = createRouter({
  routes,
  history: createWebHistory(),
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
})

const loader = async () => {
  await getUser()

  router.beforeResolve(createMiddleware(getUser, { throttle: 1000 * 5 }))
  app.config.globalProperties.emitter = emitter
  app.directive(focusable.name, focusable)
  app.use(router)
  app.use(MotionPlugin)

  return App
}

const app = createApp(defineAsyncComponent({ loader, loadingComponent }))

app.mount('#app')
