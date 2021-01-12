<template>
  <footer class="v-footer">
    <div class="container mx-auto">
      <v-status-badge
        v-if="health.status"
        :indicator="health.status.indicator"
        :description="health.status.description"
        :href="health.page.url"
      />
    </div>
    <div class="v-footer__content">
      <div class="container mx-auto flex items-center justify-between">
        <section class="">

        </section>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'v-footer',
  computed: {
    health() {
      return this.$store.getters['health']
    }
  },

  mounted() {
    this.$store.dispatch('getHealth', null, { root: true })
  }
}
</script>

<style lang="scss" scoped>
  .v-footer {
    padding: 1rem 0;
    border-top: 1px solid var(--color-muted);
    background-color: var(--color-background-accent);

    &__health-badge--fixed {
      position: fixed;
      bottom: 0px;
      background: #fff;
      padding: .5rem;
      box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, .1);
      border-radius: 4px 4px 0 0;
    }
  }
</style>
