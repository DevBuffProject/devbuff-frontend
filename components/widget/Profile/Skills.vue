<template>
  <div></div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useUser } from '@/composes'

export default defineComponent({
  name: 'WidgetProfileSkillsEditor',
  setup() {
    const { user } = useUser()

    return {
      user,
    }
  },
})
</script>
