<template>
  <footer class="v-footer">
    <div class="container">
      <v-status-badge
        :indicator="health.status.indicator"
        :description="health.status.description"
        :href="health.page.url"
      />
    </div>
    <div class="v-footer__content">
      <div class="container d-flex align-items-center justify-content-between">
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
    border-top: 1px solid var(--color-muted-accent);
    background-color: var(--color-background-contrast);

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
