import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ca0b5392 = () => interopDefault(import('../pages/app.vue' /* webpackChunkName: "pages/app" */))
const _00f9203c = () => interopDefault(import('../pages/app/dashboard.vue' /* webpackChunkName: "pages/app/dashboard" */))
const _776fc68a = () => interopDefault(import('../pages/app/explore.vue' /* webpackChunkName: "pages/app/explore" */))
const _7b2abce8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/app",
    component: _ca0b5392,
    name: "app",
    children: [{
      path: "dashboard",
      component: _00f9203c,
      name: "app-dashboard"
    }, {
      path: "explore",
      component: _776fc68a,
      name: "app-explore"
    }]
  }, {
    path: "/",
    component: _7b2abce8,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
