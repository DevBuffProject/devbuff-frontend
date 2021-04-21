<template>
  <div>
    <atomic-breadcrumbs :items="breadcrumbs" />
    <h1>Твои проекты ({{ ideas.length }})</h1>
    <widget-split-view>
      <template #list="{ showView }">
        <div class="-mx-4">
          <div v-for="(idea, index) in ideas" :key="idea.id">
            <widget-dashboard-idea
              :date="idea.datePublished | toLocaleDateTime($i18n.locale)"
              :title="idea.name"
              :description="idea.description"
              :waiting-validation="idea.waitingValidation"
              :class="
                inspectedIdeaId === idea.id &&
                'bg-gray-100 dark:bg-blueGray-900'
              "
              @click="showView() || inspectIdea(idea)"
            />
            <atomic-delimiter v-if="index < ideas.length - 1" />
          </div>
        </div>
      </template>

      <template #viewport>
        <div v-if="inspectedIdeaId" class="col-span-3">
          <h3 class="mt-0">Отклики</h3>
          <div
            v-for="{
              userEntity: user,
              specialisationName,
              specialisationId,
            } of pendingUsers"
            :key="user.id + specialisationId"
          >
            <widget-portal
              keep-content
              :target="`userCard-${specialisationId}`"
            >
              <widget-dashboard-user-card
                slot-scope="{ isDialog }"
                :readonly="isDialog"
                :lastname="user.lastName"
                :firstname="user.firstName"
                :username="user.userName"
                :user-id="user.id"
                :vk-contact="user.socialNetworks.vk"
                :telegram-contact="user.socialNetworks.telegram"
                :skype-contact="user.socialNetworks.skype"
                :discord-contact="user.socialNetworks.discord"
                :specialization="specialisationName"
                class="mb-6"
                @onApprove="approveUser({ idea, user, specialisationId })"
              />
            </widget-portal>
          </div>
        </div>
      </template>
    </widget-split-view>
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
        { title: this.$t('components.breadcrumb.dashboard') },
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
            title: 'Одобрить',
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
