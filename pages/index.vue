<template>
  <section>
    <div v-if="$store.getters['auth/user']" class="w-full">
      Sign in with
      <atomic-button class="w-full" @click="authorize('GitHub')">
        <svg-icon name="outline/logout" class="mr-4" /> GitHub
      </atomic-button>
      <atomic-button class="w-full" @click="authorize('GitLab')">
        <svg-icon name="outline/logout" class="mr-4" /> GitLab
      </atomic-button>
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
import { mapActions } from 'vuex'

export default {
  layout: 'white-screen',
  // async middleware({ store, redirect, app }) {
  // if (store.getters['user/isAuthorized'])
  //   await redirect(app.localePath({ name: 'ideas' }))
  // },
  // computed: {
  //   ...mapGetters('user', ['isAuthorized']),
  // },
  methods: {
    ...mapActions('auth', ['authorize']),
  },
}
</script>
