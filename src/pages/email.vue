<template>
  <h2>Confirmation email</h2>
  <AtomicLoadingSpinner v-if="statusConfirmation === 'PENDING'" />
  <h3 v-if="statusConfirmation === 'SUCCESS'">Success!</h3>
  <h3 v-if="statusConfirmation === 'ERROR'">Something wrong, try again.</h3>
</template>
<script>
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '../composes/core'

export default defineComponent({
  name: 'Email',
  setup() {
    const statusConfirmation = ref('PENDING')
    const route = useRoute()
    const router = useRouter()
    const { confirmEmail } = useUser()
    const redirect = () => router.replace({ name: 'explore' })

    watch(
      () => route.query,
      async () => {
        if (!route.query || !route.query.token) return await redirect()
        try {
          await confirmEmail(route.query.token)
          statusConfirmation.value = 'SUCCESS'
        } catch (err) {
          statusConfirmation.value = 'ERROR'
        }
      },
    )
    return {
      statusConfirmation,
    }
  },
})
</script>
