<template>
  <section>
    <nuxt-child />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['pageName'])
  },

  middleware: ['auth-guard']
}
</script>

<style lang="scss" scoped>
</style>
