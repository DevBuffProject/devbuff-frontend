<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" />
    <h1>Твои проекты ({{ ideas.length }})</h1>
    <v-split-view>
      <template #list="{ showView }">
        <div class="-mx-4">
          <div
            v-for="(idea, index) in ideas"
            :key="idea.id"
            :class="[
              'px-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-blueGray-900',
              {
                'bg-gray-100 dark:bg-blueGray-900': inspectedIdeaId === idea.id,
              },
            ]"
            @click="showView() || inspectIdea(idea)"
          >
            <div class="py-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-gray-400 dark:text-blueGray-400">
                    {{ idea.datePublished | toLocaleDateTime($i18n.locale) }}
                  </div>
                  <div class="flex items-center">
                    <div class="text-primary">{{ idea.name }}</div>

                    <div
                      class="text-xs text-gray-500 dark:text-blueGray-400 flex items-center"
                    >
                      <v-material-icon
                        :name="
                          !idea.waitingValidation ? 'done' : 'hourglass_empty'
                        "
                        :class="[
                          idea.waitingValidation
                            ? 'text-warning'
                            : 'text-success',
                          'text-xs',
                        ]"
                      />
                      <em class="opacity-50">
                        {{
                          idea.waitingValidation
                            ? $t(
                                'page.ideas.view.statusModeration.waitingValidation'
                              )
                            : $t(
                                'page.ideas.view.statusModeration.alreadyApproved'
                              )
                        }}
                      </em>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div
                    class="opacity-50 hover:opacity-100 cursor-pointer p-3"
                    @click="removeIdea(idea)"
                  >
                    <svg-icon name="edit/trash" class="text-sm text-danger" />
                  </div>

                  <div class="opacity-50 hover:opacity-100 cursor-pointer p-3">
                    <svg-icon name="edit/edit" class="text-sm text-primary" />
                  </div>
                </div>
              </div>
              <div class="mt-2">{{ idea.description }}</div>
            </div>
            <v-delimiter v-if="index < ideas.length - 1" />
          </div>
        </div>
      </template>

      <template #viewport>
        <div v-if="inspectedIdeaId" class="col-span-3">
          <h3 class="mt-0">Отклики</h3>
          <div
            v-for="{ userEntity: user, specialisationId } in pendingUsers"
            :key="user.id + specialisationId"
          >
            <portal :to="`userCard-${specialisationId}`">
              <v-dashboard-user-card
                slot-scope="{ isDialog }"
                :readonly="isDialog"
                :lastname="user.lastName"
                :firstname="user.firstName"
                :username="user.userName"
                :user-id="user.id"
                :vk-contact="user.vk"
                :telegram-contact="user.telegram"
                :skype-contact="user.skype"
                :discord-contact="user.discord"
                :specialisation="getPositionName(specialisationId)"
                class="mb-6"
                @onApprove="approveUser({ idea, user, specialisationId })"
              />
            </portal>
            <portal-target :name="`userCard-${specialisationId}`" />
          </div>
        </div>
      </template>
    </v-split-view>
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
          title: this.$t('components.breadcrumb.main'),
          to: this.localePath({ name: 'index' }),
        },
        { title: 'Твои идеи' },
      ]
    },
  },
  methods: {
    ...mapActions('dashboard', ['getPendingUsers']),
    ...mapActions('ideas', ['getIdea']),
    async approveUser({
      idea: { id: ideaId },
      user: { id: userId },
      specialisationId,
    }) {
      const approve = async () => {
        await this.$store.dispatch('dashboard/approveUser', {
          ideaId,
          specialisationId,
          userId,
        })
        await this.getPendingUsers(ideaId)
      }

      await this.$dialog.confirm({
        portal: `userCard-${specialisationId}`,
        title: 'Одобрить кандидатуру?',
        actions: [
          {
            text: 'Одобрить',
            type: 'success',
            action: async () => {
              await approve()
              this.$dialog.close()
            },
          },
        ],
      })
    },
    async removeIdea({ id, name }) {
      const remove = async () => {
        await this.$store.dispatch('ideas/deleteIdea', id)
        await this.$store.dispatch('dashboard/getIdeas')
      }

      await this.$dialog.confirm({
        title: 'Удалить проект?',
        actions: [
          {
            text: 'Удалить',
            type: 'danger',
            action: async () => {
              await remove()
              this.$dialog.close()
            },
          },
        ],
      })
    },
    async inspectIdea({ id }) {
      this.inspectedIdeaId = null
      try {
        await this.getIdea(id)
        await this.getPendingUsers(id)
        this.inspectedIdeaId = id
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
