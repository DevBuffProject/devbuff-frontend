import { defineAsyncComponent } from 'vue'
import {
  createMiddleware,
  getUser,
  isAdmin,
  isAuthenticated,
  isOwnerOfIdea,
} from './middlewares'
import explore from './pages/explore.vue'

export default [
  {
    name: 'home',
    path: '/',
    redirect: '/explore',
    meta: { name: 'Main' },
  },
  {
    name: 'explore',
    path: '/explore',
    component: () => import('./pages/explore.vue'),
    meta: {
      name: 'Explore',
      breadcrumbs: ['home'],
    },
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('./pages/dashboard.vue'),
    beforeEnter: createMiddleware(isAuthenticated),
    meta: {
      name: 'Dashboard',
      breadcrumbs: ['home', 'explore'],
    },
  },
  {
    name: 'idea-create',
    path: '/create',
    component: () => import('./pages/idea-creation.vue'),
    meta: {
      breadcrumbs: ['home', 'explore'],
    },
  },
  {
    name: 'idea-edit',
    path: '/edit-:id',
    component: () => import('./pages/idea-creation.vue'),
    beforeEnter: createMiddleware(isOwnerOfIdea),
    meta: {
      breadcrumbs: ['home', 'explore'],
    },
  },
  {
    name: 'idea-detail',
    path: '/view-:id',
    component: () => import('./pages/idea.vue'),
    beforeEnter: createMiddleware(isAuthenticated),
    meta: {
      preview: defineAsyncComponent(() =>
        import('./pages/previews/idea-detail.vue'),
      ),
      breadcrumbs: ['home', 'explore'],
    },
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('./pages/settings.vue'),
    meta: {
      name: 'Settings',
      breadcrumbs: ['home'],
      isDialog: true,
    },
  },
  {
    name: 'superuser',
    path: '/su',
    component: () => import('./pages/superuser/superuser.vue'),
    beforeEnter: createMiddleware(isAdmin),
    meta: {
      name: 'Superuser',
      breadcrumbs: ['home'],
    },
  },
  {
    name: 'approve',
    path: '/su/approve',
    component: () => import('./pages/superuser/approve.vue'),
    beforeEnter: createMiddleware(isAdmin),
    meta: {
      name: 'Approve',
      breadcrumbs: ['home', 'superuser'],
    },
  },

  /* Emergency service routes */
  {
    name: 'callback',
    path: '/callback/:provider?',
    component: () => import('./pages/callback.vue'),
    props: true,
  },
  {
    name: 'email',
    path: '/email/:confirm?',
    component: () => import('./pages/email.vue'),
    meta: {
      name: 'Confirmation email',
      breadcrumbs: ['home'],
    },
  },
]
