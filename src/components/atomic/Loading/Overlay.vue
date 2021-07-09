<template>
  <div
    :class="[
      'fixed z-50 top-0 left-0 w-screen h-screen',
      'flex items-center justify-center',
    ]"
  >
    <div
      :class="[
        'py-3 px-7 rounded-xl shadow-md backdrop-filter backdrop-blur-[5px]',
        'bg-black bg-opacity-60 dark:bg-blueGray-700 dark:bg-opacity-50',
      ]"
    >
      <Loading />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import Loading from './Bar.vue'

export default {
  name: 'Overlay',
  components: { Loading },
  setup() {
    onMounted(() => console.log('123'))
  }
}
</script>
