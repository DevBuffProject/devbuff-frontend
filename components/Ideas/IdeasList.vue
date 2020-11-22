<template>
  <v-card class="ideas">
    <div class="ideas__list">
      <v-idea-card
        v-for="idea in ideas"
        :key="idea.id"
        :title="idea.name"
        :publishDate="idea.publishDate || idea.datePublished"
        :description="idea.description"
        :specialists="idea.specialists"
        :id="idea.id"
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
  }
}
</script>

<style lang="scss" scoped>
.ideas {

}
</style>
