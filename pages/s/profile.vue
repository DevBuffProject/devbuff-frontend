<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>

export default {
  async middleware({ store, route, error }) {
    try {
      await store.dispatch('user/getProfile', route.params.id)
      await store.dispatch('skills/getSkills')
    } catch (e) {
      return error({ statusCode: 400 })
    }
  },
}
</script>
