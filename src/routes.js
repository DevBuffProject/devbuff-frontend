import { defineAsyncComponent } from 'vue'
import {
  createMiddleware,
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
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('./pages/404.vue'),
    meta: {
      isDialog: true,
    },
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
    name: 'user',
    path: '/user-:UUID',
    component: () => import('./pages/user.vue'),
    beforeEnter: createMiddleware(isAuthenticated),
    props: true,
    meta: {
      name: 'User',
      breadcrumbs: ['home'],
    },
  },
  {
    name: 'idea-create',
    path: '/create',
    component: () => import('./pages/idea-creation.vue'),
    meta: {
      breadcrumbs: ['home', 'explore'],
      isDialog: true,
    },
  },
  {
    name: 'idea-edit',
    path: '/edit-:id',
    component: () => import('./pages/idea-creation.vue'),
    beforeEnter: createMiddleware(isOwnerOfIdea),
    props: true,
    meta: {
      breadcrumbs: ['home', 'explore'],
      isDialog: true,
    },
  },
  {
    name: 'idea-detail',
    path: '/view-:id',
    component: () => import('./pages/idea.vue'),
    beforeEnter: createMiddleware(isAuthenticated),
    props: true,
    meta: {
      preview: defineAsyncComponent(() =>
        import('./pages/previews/idea-detail.vue'),
      ),
      breadcrumbs: ['home', 'explore'],
    },
  },
  {
    name: 'user-edit',
    path: '/edit',
    component: () => import('./pages/edit.vue'),
    meta: { isDialog: true },
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('./pages/test.vue'),
    meta: {
      name: 'Settings',
      breadcrumbs: ['home'],
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
    // beforeEnter: createMiddleware(isAdmin),
    meta: {
      name: 'Approve',
      breadcrumbs: ['home', 'superuser'],
    },
  },
  {
    name: 'skillManager',
    path: '/su/skillManager',
    component: () => import('./pages/superuser/skill-manager.vue'),
    // beforeEnter: createMiddleware(isAdmin),
    meta: {
      name: 'Skill manager',
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
