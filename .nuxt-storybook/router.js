import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _703ef928 = () => interopDefault(import('../pages/callback.vue' /* webpackChunkName: "pages/callback" */))
const _67d58c8a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _7684ad48 = () => interopDefault(import('../pages/s.vue' /* webpackChunkName: "pages/s" */))
const _8402edbe = () => interopDefault(import('../pages/s/dashboard.vue' /* webpackChunkName: "pages/s/dashboard" */))
const _79d98ef6 = () => interopDefault(import('../pages/s/profile.vue' /* webpackChunkName: "pages/s/profile" */))
const _4f4c5c26 = () => interopDefault(import('../pages/s/ideas/explore.vue' /* webpackChunkName: "pages/s/ideas/explore" */))
const _25eca37a = () => interopDefault(import('../pages/s/ideas/new.vue' /* webpackChunkName: "pages/s/ideas/new" */))

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
    path: "/callback",
    component: _703ef928,
    name: "callback___ru"
  }, {
    path: "/en",
    component: _67d58c8a,
    name: "index___en"
  }, {
    path: "/s",
    component: _7684ad48,
    name: "s___ru",
    children: [{
      path: "dashboard",
      component: _8402edbe,
      name: "s-dashboard___ru"
    }, {
      path: "profile",
      component: _79d98ef6,
      name: "s-profile___ru"
    }, {
      path: "ideas/explore",
      component: _4f4c5c26,
      name: "s-ideas-explore___ru"
    }, {
      path: "ideas/new",
      component: _25eca37a,
      name: "s-ideas-new___ru"
    }]
  }, {
    path: "/en/callback",
    component: _703ef928,
    name: "callback___en"
  }, {
    path: "/en/s",
    component: _7684ad48,
    name: "s___en",
    children: [{
      path: "dashboard",
      component: _8402edbe,
      name: "s-dashboard___en"
    }, {
      path: "profile",
      component: _79d98ef6,
      name: "s-profile___en"
    }, {
      path: "ideas/explore",
      component: _4f4c5c26,
      name: "s-ideas-explore___en"
    }, {
      path: "ideas/new",
      component: _25eca37a,
      name: "s-ideas-new___en"
    }]
  }, {
    path: "/",
    component: _67d58c8a,
    name: "index___ru"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
