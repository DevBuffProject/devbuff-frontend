<template>
  <div class="ideas">
    <div class="ideas__list">
      <v-idea-card
        v-for="idea in ideas"
        :key="idea.id"
        :title="idea.name"
        :description="idea.description"
        :specialists="idea.specialists"
        avatar="//source.unsplash.com/random"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-ideas-list',

  props: {
    ideas: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
