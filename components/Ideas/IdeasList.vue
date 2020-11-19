<template>
  <v-card class="ideas">
    <div class="ideas__list">
      <v-idea-card
        v-for="idea in ideas"
        :key="idea.id"
        :title="idea.name"
        :description="idea.description"
        :specialists="idea.specialists"
        class="ideas__idea"
      />
    </div>
  </v-card>
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
.ideas {
  &__idea {
    margin: -1rem;
    margin-bottom: 1rem;
    padding: 1rem 1rem 0;
    border-bottom: 1px solid var(--color-muted-accent);
  }
}
</style>
