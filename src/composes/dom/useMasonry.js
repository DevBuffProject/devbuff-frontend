import { ref, nextTick } from 'vue'
import Masonry from 'masonry-layout'

export const useMasonry = (target, options) => {
  const masonry = ref()
  nextTick(() => (masonry.value = new Masonry('#ideas', options)))

  return { masonry: masonry.value }
}
