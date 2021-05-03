<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  async middleware({ store, route, error }) {
    try {
      let uuid = route.params.id
      if (uuid === undefined) {
        uuid = store.getters['auth/user'].id
      }
      await store.dispatch('user/getProfile', uuid)
      await store.dispatch('skills/getSkills')
    } catch (e) {
      return error({ statusCode: 400 })
    }
  },
}
</script>
