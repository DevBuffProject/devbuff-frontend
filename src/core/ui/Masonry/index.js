import MasonryLayout from 'masonry-layout'
import { useMutationObserver } from '@vueuse/core'
import { nextTick } from 'vue'

const Grid = {
  mounted(el) {
    const masonry = new MasonryLayout(el, {
      percentPosition: true,
      transitionDuration: '0s',
    })

    const repaint = () => {
      masonry.reloadItems()
      masonry.layout()
    }

    nextTick(repaint)
    useMutationObserver(el, repaint, { childList: true })
  },
}

export default {
  install(app) {
    app.directive('masonry', Grid)
  },
}
