<template>
  <div class="dashboard">
    <v-toolbar class="mb-4">
      <div class="container mx-auto toolbar__grid">
        <div class="flex">
          <h3 class="m-0"> Модерация </h3>
        </div>
      </div>
    </v-toolbar>

    <div class="container mx-auto">
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
          <v-idea
            :linked="false"
            :title="idea.name"
            :description="idea.description"
            :id="idea.id"
          />
        </div>
      </div>
      <div
        v-else
        class="flex flex-column items-center"
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
