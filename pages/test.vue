<template>
  <div>
    <div>
      {{ model }}
      <atomic-test-input v-model="model.state.value" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      model: ref({ state: { value: '1234' } }),
    }
  },
})
</script>
