<template>
  <div class="inline-block rounded-md mb-8">
    <slot v-bind="{ files: modelValue, pickFiles }">
      <AtomicButton
        type="muted"
        class="py-1 px-4 inline-flex items-center"
        role="button"
        @click="pickFiles"
      >
        <div class="flex items-center">
          <FilePlusIcon class="mr-2" />
          pick files
        </div>
      </AtomicButton>
    </slot>

    <slot name="preview" v-bind="{ files: modelValue }">
      <div
        v-for="file of modelValue"
        :key="file.name"
        class="flex items-center mt-2 ml-1"
      >
        <PhotoIcon v-if="file.type.startsWith('image')" />
        <VideoIcon v-else-if="file.type.startsWith('video')" />
        <FileTextIcon v-else-if="file.type.startsWith('text')" />
        <DotsIcon v-else-if="file.type.startsWith('application')" />
        <FileIcon v-else />
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
    </slot>
  </div>
</template>

<script>
import { defineComponent, useSlots } from 'vue'

export default defineComponent({
  name: 'FormFiles',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Array, default: null },
    accept: { type: String, default: null },
    multiple: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const slots = useSlots()
    const pickFiles = () => {
      const picker = document.createElement('input')
      picker.type = 'file'
      picker.accept = props.accept
      if (props.multiple) picker.multiple = true
      picker.onchange = (event) => {
        emit('update:modelValue', [...event.target.files])
      }
      picker.click()
    }

    return { slots, pickFiles }
  },
})
</script>
