<template>
  {{ t('home.test') }}
  <div class="grid gap-6 grid-cols-2">
    <div class="col-span-1">
      <AtomicCard class="px-0">
        <div
          class="divide-y divide-gray-200 dark:divide-blueGray-700"
          v-if="userIdeas.length > 0"
        >
          <WidgetDashboardIdeaCard
            v-for="idea of userIdeas"
            :key="idea.id"
            :date="idea.datePublished"
            :title="idea.name"
            :description="idea.description"
            :waiting-validation="idea.waitingValidation"
            @click="
              () => {
                pendingUsers = undefined
                getPendingUsers(idea.id)
                currentIdeaId = idea.id
              }
            "
          />
        </div>
        <div class="ml-4" v-else>У вас нет созданных идей.</div>
      </AtomicCard>
    </div>
    <aside class="col-span-1">
      <div v-if="currentIdeaId === undefined"></div>
      <AtomicLoadingSpinner v-else-if="pendingUsers === undefined" />
      <div v-else-if="pendingUsers" class="col-span-3">
        <h3 class="mt-0">Responses</h3>
        <div
          v-for="{
            userEntity: user,
            specialisationName,
            specialisationId,
          } of pendingUsers"
          :key="user.id + specialisationId"
        >
          <WidgetDashboardIdeaUser
            :lastname="user.lastName"
            :firstname="user.firstName"
            :username="user.userName"
            :user-id="user.id"
            :vk-contact="user.socialNetworks.vk"
            :telegram-contact="user.socialNetworks.telegram"
            :skype-contact="user.socialNetworks.skype"
            :discord-contact="user.socialNetworks.discord"
            :specialization="specialisationName"
            :specialization-id="specialisationId"
            :idea-id="currentIdeaId"
            class="mb-6"
          />
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useIdeas, useIdea } from '../composes/core'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  async setup() {
    useTitle(`DevBuff Dashboard`)
    const { t } = useI18n()
    const { userIdeas, getUserIdeas } = useIdeas()
    const { pendingUsers, getPendingUsers } = useIdea()

    const currentIdeaId = ref(undefined)
    await getUserIdeas()

    return {
      t,
      userIdeas,
      pendingUsers,
      isPendingLoading: true,
      getPendingUsers,
      currentIdeaId,
    }
  },
})
</script>
