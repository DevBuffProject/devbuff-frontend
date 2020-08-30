<template>
  <div class="ideas">
    <div v-if="mountedCard !== ideas.length">
      <v-idea-card-skeleton
        v-for="i in 3"
        :key="i"
      />
    </div>
    <div
      class="ideas__list"
      v-show="mountedCard === ideas.length"
    >
      <transition-group name="top">
        <lazy-v-idea-card
          v-for="(idea, index) in ideas"
          v-if="mountedCard + 1 >= index"
          @idea:mounted="incMountedCards"
          :key="idea.id"
          :title="idea.title"
          :description="idea.body"
          avatar="//source.unsplash.com/random"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-ideas-list',

  data() {
    return {
      mountedCard: 0,
    }
  },

  props: {
    ideas: {
      type: Array,
      required: true,
    }
  },

  methods: {
    incMountedCards() {
      setTimeout(() => this.mountedCard++, 100)
    }
  },

  mounted() {
    this.mountedCard = 0
  }
}
</script>

<style lang="scss" scoped>
</style>
