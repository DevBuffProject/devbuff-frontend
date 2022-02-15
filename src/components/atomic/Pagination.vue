<template>
  <div class="flex justify-center">
    <AtomicButton
      type="success"
      class="mr-2"
      :disabled="vModel <= 1"
      @click="vModel--"
    >
      <ArrowLeftIcon />
      Назад
    </AtomicButton>
    <AtomicButton
      type="success"
      is-small
      class="ml-2"
      :disabled="elements < perPage"
      @click="() => vModel++"
    >
      Вперед
      <ArrowRightIcon />
    </AtomicButton>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core/index'

export default defineComponent({
  name: 'Pagination',
  props: {
    perPage: {
      type: Number,
      required: true,
    },
    elements: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  async setup(props, { emit }) {
    const vModel = useVModel(props, 'modelValue', emit)

    watch(vModel, () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    })
    return {
      vModel,
    }
  },
})
</script>
