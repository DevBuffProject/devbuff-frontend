import { defineAsyncComponent } from 'vue'

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
    meta: {
      name: 'Dashboard',
      breadcrumbs: ['home', 'explore'],
    },
  },
  {
    name: 'idea-detail',
    path: '/view-:id',
    component: () => import('./pages/idea.vue'),
    props: true,
    meta: {
      // preview: defineAsyncComponent(() =>
      //   import('./components/previews/idea.vue'),
      // ),
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
    },
  },
  {
    name: 'superuser',
    path: '/su',
    component: () => import('./pages/superuser.vue'),
    meta: {
      name: 'Superuser',
      breadcrumbs: ['home'],
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
  },
]
