<template>
  <AtomicFormFiles
    @update:modelValue="upload"
    class="relative rounded-full overflow-hidden inline-block"
  >
    <template #default="{ pickFiles }">
      <span
        class="
          group
          cursor-pointer
          absolute
          z-20
          top-0
          left-0
          h-full
          w-full
          flex
          items-center
          justify-center
          bg-black bg-opacity-30
        "
        @click="pickFiles"
      >
        <AtomicProgressCircle
          class="stroke-primary-500 absolute top-0 left-0"
          :size="200"
          :percent="uploadProgress"
        />
        <PhotoIcon
          class="
            text-lg text-white
            transition-all
            opacity-50
            scale-90
            transform
            group-hover:opacity-100 group-hover:scale-110
          "
        />
      </span>
    </template>
    <template #preview>
      <AtomicAvatar :src="avatar" size="200px" />
    </template>
  </AtomicFormFiles>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useFiles, useUser } from '../../../composes/core'

export default defineComponent({
  name: 'WidgetSettingsAvatar',
  setup() {
    const { uploadUserPhoto, uploadProgress } = useFiles()
    const { user } = useUser()
    const avatar = computed(() => user.value.avatar)

    const upload = async (files) => {
      try {
        const image = files[0]
        await uploadUserPhoto(image)
        user.value.avatar = URL.createObjectURL(image)
      } catch (e) {
        // mute temporary
        // TODO: Sentry logs
      }
    }

    return {
      uploadProgress,
      avatar,
      upload,
    }
  },
})
</script>
