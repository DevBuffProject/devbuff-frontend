<template>
  <section>
    <nuxt-child />
  </section>
</template>

<script>
import AuthGuard from '~/middleware/auth-guard'

export default {
  middleware: ['auth-guard']
}
</script>
