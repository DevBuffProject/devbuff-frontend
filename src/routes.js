import { defineAsyncComponent } from 'vue'
import {
  createMiddleware,
  getUser,
  isAdmin,
  isAuthenticated,
  isOwnerOfIdea,
} from './middlewares'

export default [
  {
    name: 'home',
    path: '/',
    redirect: '/explore',
    meta: { name: 'Main' },
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('./pages/test.vue'),
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
    meta: {
      name: 'Dashboard',
      breadcrumbs: ['home', 'explore'],
      middleware: createMiddleware(getUser),
    },
  },
  {
    name: 'idea-create',
    path: '/create',
    component: () => import('./pages/idea-creation.vue'),
    meta: {
      breadcrumbs: ['home', 'explore'],
      middleware: createMiddleware(getUser),
    },
  },
  {
    name: 'idea-edit',
    path: '/edit-:id',
    component: () => import('./pages/idea-creation.vue'),
    props: true,
    meta: {
      breadcrumbs: ['home', 'explore'],
      middleware: createMiddleware(isOwnerOfIdea),
    },
  },
  {
    name: 'idea-detail',
    path: '/view-:id',
    component: () => import('./pages/idea.vue'),
    props: true,
    meta: {
      preview: defineAsyncComponent(() =>
        import('./pages/previews/idea-detail.vue'),
      ),
      breadcrumbs: ['home', 'explore'],
      middleware: createMiddleware(isAuthenticated),
    },
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('./pages/settings.vue'),
    meta: {
      name: 'Settings',
      breadcrumbs: ['home'],
      middleware: createMiddleware(getUser),
    },
  },
  {
    name: 'superuser',
    path: '/su',
    component: () => import('./pages/superuser/superuser.vue'),
    meta: {
      name: 'Superuser',
      breadcrumbs: ['home'],
      middleware: createMiddleware(isAdmin),
    },
  },
  {
    name: 'approve',
    path: '/su/approve',
    component: () => import('./pages/superuser/approve.vue'),
    meta: {
      name: 'Approve',
      breadcrumbs: ['home', 'superuser'],
      middleware: createMiddleware(isAdmin),
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
