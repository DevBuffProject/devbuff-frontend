<template>
  <pre
    >{{ tokens }}
  </pre>
  <hr />
  <pre
    >{{ route.query }}
  </pre>
  <AtomicButton @click="continueAuth"> continue </AtomicButton>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composes/core'
import { getUser } from '../middlewares'

export default defineComponent({
  name: 'Callback',
  setup() {
    const route = useRoute()
    const { auth, tokens } = useAuth()
    const continueAuth = async () => {
      await auth({
        code: route.query?.code,
        provider: route.params.provider,
      })
      await getUser()
    }

    return {
      tokens,
      route,
      continueAuth,
    }
  },
})
</script>
