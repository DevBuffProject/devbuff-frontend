<template>
  <section>
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ pageName }} </h3>
        </div>
        <div>
          <nuxt-link to="/">
            <v-button :icon="['fas', 'plus']">
              Создать
            </v-button>
          </nuxt-link>
        </div>
      </div>
    </v-toolbar>
    <div class="container">
      <nuxt-child />
    </div>
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
