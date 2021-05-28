<template>
  <AtomicDialog :visible="true">
    <AtomicLoadingSpinner />
  </AtomicDialog>
</template>
<script>
import { defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composes/core'
import { getUser } from '../middlewares'

export default defineComponent({
  name: 'Callback',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { auth } = useAuth()
    const redirect = () => router.replace({ name: 'explore' })

    watch(
      () => route.query,
      async () => {
        if (!route.query.code) return await redirect()
        await auth({
          code: route.query.code,
          provider: route.params.provider,
        })
        await getUser()
        await redirect()
      },
    )
  },
})
</script>
