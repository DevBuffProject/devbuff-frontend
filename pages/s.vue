<template>
  <section>
    <nuxt-child />
  </section>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>
