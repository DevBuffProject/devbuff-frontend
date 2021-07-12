<template>
  <div class="p-2 rounded-md mb-8 inline-block">
    <AtomicButton
      type="muted"
      class="py-1 px-4 inline-flex items-center"
      role="button"
      @click="pickFile"
    >
      <div class="flex items-center">
        <FileIcon class="mr-2" />
        Select file
      </div>
    </AtomicButton>

    <div v-for="file of modelValue" class="flex items-center mt-2 ml-1">
      <PhotoIcon v-if="file.type.startsWith('image')" />
      <VideoIcon v-else-if="file.type.startsWith('video')" />
      <span class="ml-2 mt-px"> {{ file.name }} </span>
      <CloseIcon
        class="
          ml-2
          p-1
          inline-flex
          items-center
          rounded-md
          transition-colors
          bg-black bg-opacity-10
          dark:bg-white dark:bg-opacity-10
          hover:bg-opacity-20
          dark:hover:bg-opacity-20
          cursor-pointer
        "
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, useSlots } from 'vue'

export default defineComponent({
  name: 'FormFile',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Array, default: null },
  },
  setup(props, { emit }) {
    const slots = useSlots()
    const pickFile = () => {
      const picker = document.createElement('input')
      picker.type = 'file'
      picker.onchange = (event) => {
        emit('update:modelValue', [...event.target.files])
      }
      picker.click()
    }

    return { slots, pickFile }
  },
})
</script>
