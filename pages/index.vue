<template>
  <section>
    <div v-if="!isAuthorized" class="w-full">
      <v-button
        class="w-full"
        type="contrast"
        :icon="['fab', 'github']"
        rounded
        @click="authorize"
      >
        {{ $t('page.index.oAuth.gitHub') }}
      </v-button>
      <v-delimiter text="или" />
    </div>
    <nuxt-link :to="localePath({ name: 'ideas' })">
      <v-button type="muted" rounded :icon="['fas', 'long-arrow-alt-right']">
        {{ $t('page.index.action.projects') }}
      </v-button>
    </nuxt-link>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'white-screen',
  computed: {
    ...mapGetters('user', ['isAuthorized']),
  },
  methods: {
    ...mapActions('auth', ['authorize']),
  },
}
</script>
