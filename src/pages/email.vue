<template>
  <div>
    <AtomicLoadingSpinner v-if="statusConfirmation === 'PENDING'" />
    <h3 v-if="statusConfirmation === 'SUCCESS'">
      {{ t('onSuccess') }}
    </h3>
    <h3 v-if="statusConfirmation === 'ERROR'">
      {{ t('onError') }}
    </h3>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '../composes/core'
import { useI18n } from '../composes/utils'
export default defineComponent({
  name: 'Email',
  setup() {
    const statusConfirmation = ref('PENDING')
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n('pages.email')
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
      t,
      statusConfirmation,
    }
  },
})
</script>
