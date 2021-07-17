import { ref, nextTick } from 'vue'
import Masonry from 'masonry-layout'
import { get, set, whenever } from '@vueuse/core'

export const useMasonry = (target, options) => {
  const masonry = ref()
  whenever(target, () =>
    nextTick(() => set(masonry, new Masonry(get(target), options))),
  )

  return { masonry }
}
