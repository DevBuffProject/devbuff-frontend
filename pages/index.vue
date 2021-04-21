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
      <atomic-delimiter />
    </div>
    <nuxt-link :to="localePath({ name: 'ideas' })">
      <atomic-button type="muted">
        {{ $t('page.index.action.projects') }}
      </atomic-button>
    </nuxt-link>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'white-screen',
  async middleware({ store, redirect, app }) {
    if (store.getters['user/isAuthorized'])
      await redirect(app.localePath({ name: 'ideas' }))
  },
  computed: {
    ...mapGetters('user', ['isAuthorized']),
  },
  methods: {
    ...mapActions('auth', ['authorize']),
  },
}
</script>
