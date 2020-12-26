<template>
  <div class="dashboard">
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> Модерация </h3>
        </div>
      </div>
    </v-toolbar>

    <div class="container">
      <div
        v-if="ideas && ideas.length"
        class="dashboard__ideas"
        style="width: 500px;"
      >

        <div
          v-for="idea in ideas"
          :key="idea.id"
          class="dashboard__idea"
          @click="viewIdea(idea.id)"
        >
          <v-idea-card
            :linked="false"
            :title="idea.name"
            :description="idea.description"
            :id="idea.id"
          />
        </div>
      </div>
      <div
        v-else
        class="d-flex flex-column align-items-center"
        style="width: 500px;"
      >
        <span class="text-muted"> 🤷 {{ $t('page.dashboard.noIdeas') }} </span>
      </div>
    </div>
  </div>
</template>

<script>
const ideaFastViewDialog = () => import('~/components/Admin/ViewIdeaDialog.vue')

export default {
  middleware: 'is-admin',

  async asyncData({ store }) {
    await store.dispatch('admin/getPendingIdeas')
    const ideas = store.getters['admin/pendingIdeas']
    return { ideas }
  },

  methods: {
    async refresh() {
      return this.ideas = await this.$store.dispatch('admin/getPendingIdeas')
    },

    async viewIdea(id) {
      const idea = await this.$store.dispatch('ideas/getIdea', id)
      this.$dialog
        .push(ideaFastViewDialog, { idea })
        .then(this.refresh)
    }
  },

  created() {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &__idea {
    margin-bottom: 1rem;
  }
}
</style>
