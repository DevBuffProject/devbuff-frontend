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

export default defineComponent({
  name: 'Callback',
  setup() {
    const route = useRoute()
    const { getTokens, tokens } = useAuth()
    const continueAuth = async () => {
      await getTokens({
        code: route.query?.code,
        provider: route.params.provider,
      })
    }

    return {
      tokens,
      route,
      continueAuth,
    }
  },
})
</script>
