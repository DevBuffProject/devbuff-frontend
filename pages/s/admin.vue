<template>
  <div class="dashboard">
    <div class="container mx-auto">
      <div
        v-if="ideas && ideas.length"
        class="dashboard__ideas"
        style="width: 500px"
      >
        <div
          v-for="idea in ideas"
          :key="idea.id"
          class="dashboard__idea"
          @click="viewIdea(idea.id)"
        >
          <v-idea
            :id="idea.id"
            :linked="false"
            :title="idea.name"
            :description="idea.description"
          />
        </div>
      </div>
      <div v-else class="flex flex-column items-center" style="width: 500px">
        <span class="text-muted"> 🤷 {{ $t('page.dashboard.noIdeas') }} </span>
      </div>
    </div>
  </div>
</template>

<script>
const ideaFastViewDialog = () =>
  import('~/components/widgets/Admin/ViewIdeaDialog.vue')

export default {
  middleware: 'is-admin',

  async asyncData({ store }) {
    await store.dispatch('admin/getPendingIdeas')
    const ideas = store.getters['admin/pendingIdeas']
    return { ideas }
  },

  created() {},

  methods: {
    async refresh() {
      return (this.ideas = await this.$store.dispatch('admin/getPendingIdeas'))
    },

    async viewIdea(id) {
      const idea = await this.$store.dispatch('ideas/getIdea', id)
      this.$dialog.push(ideaFastViewDialog, { idea }).then(this.refresh)
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &__idea {
    margin-bottom: 1rem;
  }
}
</style>
