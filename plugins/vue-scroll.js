import Vue from 'vue'
import vuescroll from 'vuescroll/dist/vuescroll-native'

Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#000',
      keepShow: true,
      minSize: '30%',
    },
    vuescroll: {
      sizeStrategy: 'number',
      detectResize: true,
    },
  },
  name: 'v-scroll',
})
