<script>
import { defineComponent } from 'vue'
import { useMainRoute, useRouter } from '../core/router'
import { useAuth } from '../composes/core'

export default defineComponent({
  name: 'Callback',
  async setup() {
    const route = useMainRoute()
    const { auth } = useAuth()
    const code = route.value.query.code
    const provider = route.value.params.provider

    useRouter().replace({ name: 'explore' })

    try {
      await auth({ code, provider })
    } catch (e) {
      console.error(e)
    }
  },
})
</script>
