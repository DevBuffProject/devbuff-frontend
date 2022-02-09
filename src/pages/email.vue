<template>
  <div>
    <AtomicLoadingSpinner v-if="statusConfirmation === 'PENDING'" />
    <h3 v-if="isEmailConfirmed">
      {{ t('onSuccess') }}
    </h3>
    <h3 v-else>
      {{ t('onError') }}
    </h3>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotifications, useUser } from '../composes/services'
import { useI18n } from '../composes/utils'
import { whenever } from '@vueuse/core'

export default defineComponent({
  name: 'Email',
  async setup() {
    const isEmailConfirmed = ref(false)
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n('pages.email')
    const { confirmEmail } = useNotifications()
    const redirect = () => router.replace({ name: 'explore' })

    whenever(
      () => route.query,
      async () => {
        await confirmEmail(route.query.token)
        isEmailConfirmed.value = true
        await redirect()
      },
    )

    return {
      t,
      isEmailConfirmed,
    }
  },
})
</script>
