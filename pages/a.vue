<template>
  <section>
    <nuxt-child />
  </section>
</template>

<script>
export default {
  middleware: ['is-admin'],
}
</script>
