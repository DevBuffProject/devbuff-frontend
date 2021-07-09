<template>
  <label>
    <input
      type="file"
      accept="image/*"
      @change="upload"
    >
    <AtomicAvatar />
  </label>
</template>

<script>
import { defineComponent } from 'vue'
import { useApi } from '../../composes/core'

export default defineComponent({
  name: 'AtomicImageUpload',
  emits: ['update:modelValue'],
  props: {
    value: { type: String, default: '' },
    target: { type: String, required: true },
  },
  setup(props) {
    const { request } = useApi()
    const upload = (e) => {
      const file = e.target.files[0]
      const data = new FormData()

      data.append('image', file)
      request('/image', { method: 'post', data })
    }

    return { upload }
  },
})
</script>
