import Vue from 'vue'
import dialogs from '~/components/Dialog/installer'
import filters from 'assets/js/filters'
import directives from '~/assets/js/directives'
import VueKinesis from 'vue-kinesis'

Vue.use(VueKinesis)
Vue.use(directives)
Vue.use(dialogs)
Vue.use(filters)
