<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" />
    <h1>Твои проекты ({{ ideas.length }})</h1>
    <div class="grid grid-cols-6 gap-6">
      <div class="col-span-3">
        <v-card v-for="idea in ideas" :key="idea.id" class="mb-6 group">
          <template #controls>
            <div class="text-xs text-gray-500 flex items-center">
              <div class="flex items-center mr-4 transition-opacity">
                <v-material-icon
                  name="delete_forever"
                  class="text-lg text-danger"
                />
                <span class="ml-1 capitalize"> удалить </span>
              </div>
              <span class="mr-4 mr-4 transition-opacity"> редактировать </span>
            </div>
          </template>
          <template #bottom>
            <div
              class="text-xs text-gray-500 dark:text-blueGray-400 flex items-center"
            >
              <v-material-icon
                :name="!idea.waitingValidation ? 'done' : 'hourglass_empty'"
                :class="[
                  idea.waitingValidation ? 'text-warning' : 'text-success',
                  'text-xs',
                ]"
              />
              <em class="opacity-50">
                {{
                  idea.waitingValidation
                    ? $t('page.ideas.view.statusModeration.waitingValidation')
                    : $t('page.ideas.view.statusModeration.alreadyApproved')
                }}
              </em>
            </div>
          </template>

          <div class="transition-all cursor-pointer" @click="inspectIdea(idea)">
            <div class="flex items-start justify-between">
              <div>
                <div class="text-xs text-gray-400 dark:text-blueGray-400">
                  {{ idea.datePublished | toLocaleDateTime($i18n.locale) }}
                </div>
                <nuxt-link
                  :to="localePath({ name: 'ideas-id', params: idea })"
                  class="text-primary hover:underline text-xl"
                >
                  {{ idea.name }}
                </nuxt-link>
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-500 leading-5">
              {{ idea.description }}
            </div>
          </div>
        </v-card>
      </div>
      <div class="col-span-3">
        <h3 class="mt-0">Отклики</h3>
        <v-card
          v-for="user in pendingUsers"
          :key="user.userEntity.id"
          class="mb-6"
        >
          <v-user
            :user-id="user.userEntity.id"
            :firstname="user.userEntity.firstName"
            :lastname="user.userEntity.lastName"
            :username="user.userEntity.userName"
          />
          <v-delimiter class="my-4" />
          <v-label name="Специальность">
            {{ getPositionName(user.specialisationId) }}
          </v-label>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('dashboard/getIdeas')
  },
  data: () => ({
    loading: false,
    inspectedIdeaId: null,
  }),
  computed: {
    ...mapGetters('dashboard', ['ideas', 'pendingUsers']),
    ...mapGetters('ideas', ['idea']),
    breadcrumbs() {
      return [
        {
          title: 'Главная',
          to: this.localePath({ name: 'index' }),
        },
        { title: 'Твои идеи' },
      ]
    },
  },
  methods: {
    ...mapActions('dashboard', ['getPendingUsers']),
    ...mapActions('ideas', ['getIdea']),
    async inspectIdea({ id }) {
      this.inspectedIdeaId = id
      try {
        await this.getIdea(id)
        await this.getPendingUsers(id)
      } catch (e) {
        console.error(e)
      }
    },
    getPositionName(positionId) {
      if (!this.idea) return false
      const spec = this.idea.specialist.find(
        (specialist) => specialist.id === positionId
      )
      return spec && spec.name
    },
  },
}
</script>
