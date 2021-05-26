import { computed, createApp, provide, ref, shallowRef } from 'vue'
import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { MotionPlugin } from '@vueuse/motion'
import { useQueryString } from './composes/utils'
import { getUser } from './middlewares'
import focusable from './app/directives/focusable'
import mitt from 'mitt'
import App from './App.vue'
import routes from './routes'
import './styles.css'
import { set } from '@vueuse/core'

const qs = useQueryString()
const emitter = mitt()
const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(),
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
})

router.beforeResolve(getUser)
// const renderRoute = shallowRef({}) // TODO: rename
// const dialogRoute = shallowRef(null)
// const isDialog = ref(false)

// router.beforeResolve((to, from, next) => {
// set(isDialog, Boolean(to.params._isDialog))
// set(dialogRoute, isDialog.value ? to : null)
// Prevent reactive triggers if background route isn't changed
// const bgRoute = isDialog.value ? from : to
// if (renderRoute.value.fullPath !== bgRoute.fullPath) set(renderRoute, bgRoute)
// next()
// })

app.config.globalProperties.emitter = emitter

// const provideRoute = computed(() => ({
//   main: renderRoute,
//   dialog: dialogRoute,
//   isDialog,
// }))
// provide('backgroundRoute', renderRoute)
// provide('dialogRoute', dialogRoute)
// provide('route', provideRoute)

app.directive(focusable.name, focusable)

app.use(router)
app.use(MotionPlugin)
app.mount('#app')

// console.log(useRoute())
