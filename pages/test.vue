<template>
  <div class="container mx-auto mt-4">
    <v-button @click="open"> Open Dialog </v-button>
  </div>
</template>

<script>
export default {
  methods: {
    async open() {
      await this.$dialog.push(() => import('~/components/d'))
    },
  },
}
</script>
