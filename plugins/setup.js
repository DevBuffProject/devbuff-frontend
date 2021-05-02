import { defineNuxtPlugin } from '@nuxtjs/composition-api'

import Vue from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import VueMasonry from 'vue-masonry-css'
import dialogs from '~/app/dialogs'
import notifications from '~/app/notifications'
import filters from '~/app/filters'
import { Masonry } from '~/app/directives'

Vue.use(VueMasonry)
Vue.use(MotionPlugin)
Vue.use(Masonry)
// Vue.use(dialogs)
// Vue.use(notifications)
Vue.use(filters)

export default defineNuxtPlugin((_, inject) => {
  dialogs.inject(inject)
  notifications.inject(inject)
})
