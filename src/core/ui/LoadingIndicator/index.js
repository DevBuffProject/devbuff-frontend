import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { onMounted } from 'vue'

let loadingCount = 0
export const progress = {
  start() {
    if (loadingCount <= 0) NProgress.start()
    loadingCount++
  },
  done() {
    if (loadingCount <= 0) {
      setTimeout(NProgress.done)
      loadingCount = 0
    } else {
      setTimeout(NProgress.inc)
    }
    loadingCount--
  },
}

export default {
  install(app) {
    NProgress.configure({
      parent: '#header-nprogress-container',
      easing: 'ease',
      showSpinner: false,
    })
  },
}
