<template>
  <section>
    <nuxt-child />
  </section>
</template>

<script>
export default {
  middleware: ['is-auth'],
}
</script>
