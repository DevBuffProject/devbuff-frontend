<template>
  <AtomicFormFiles
    @update:modelValue="upload"
    class="relative rounded-full inline-block"
  >
    <template #default="{ pickFiles }">
      <BaseButton
        @click="pickFiles"
        aria-label="Загрузить фото"
        class="
          absolute
          bottom-0
          right-0
          rounded-full
          flex
          items-center
          justify-center
          h-10
          w-10
          z-50
          bg-white
          dark:bg-dark-300
          focus:bg-light-900
          text-primary-500
        "
      >
        <UploadIcon v-if="!uploadProgress" />
        <AtomicLoadingSpinner v-else />
      </BaseButton>
    </template>
    <template #preview>
      <AtomicAvatar aria-label="Фото профиля" :src="avatar" :size="150" />
    </template>
  </AtomicFormFiles>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useAuth, useFiles } from '../../../composes'
import BaseButton from '../../base/Button.vue'

export default defineComponent({
  name: 'WidgetSettingsAvatar',
  components: { BaseButton },

  setup() {
    const { uploadUserPhoto, uploadProgress } = useFiles()
    const { user } = useAuth()
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
