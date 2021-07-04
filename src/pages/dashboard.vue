<template>
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
            @click="changeIdea(idea.id)"
          />
        </div>
        <div class="ml-4" v-else>{{ t('notFound') }}</div>
      </AtomicCard>
    </div>
    <aside class="col-span-1">
      <AtomicLoadingSpinner v-if="isPendingLoading" />
      <div v-if="inspectedIdea.id" class="col-span-3">
        <h1 class="mt-0 mb-3">{{ inspectedIdea.name }}</h1>
        <p class="mt-0 mb-6 opacity-50">{{ inspectedIdea.description }}</p>
        <AtomicCard class="mb-4">
          <div class="flex">
            <AtomicButton
              v-focusable.indexOnly
              is-depressed
              is-wide
              :type="
                inspectedIdea.status === 'WAITING_FULL_TEAM'
                  ? 'danger'
                  : 'success'
              "
              @click="
                changeStatusIdea(
                  inspectedIdea.id,
                  inspectedIdea.status === 'WAITING_FULL_TEAM'
                    ? 'DISABLE_SET_OF_CANDIDATES'
                    : 'ENABLE_SET_OF_CANDIDATES',
                )
              "
            >
              <div class="flex flex-col items-center justify-center">
                <StopIcon v-if="inspectedIdea.status === 'WAITING_FULL_TEAM'" />
                <PlayIcon v-else />
                <span>
                  {{ t(`controls.changeStatus.${inspectedIdea.status}`) }}
                </span>
              </div>
            </AtomicButton>
            <i class="bg-gray-200 dark:bg-blueGray-600 mx-2 w-px h-10" />
            <AtomicButton type="danger" is-depressed is-wide>
              <div
                class="flex flex-col items-center justify-center"
                @click="deleteIdea(inspectedIdea.id)"
              >
                <TrashIcon />
                <span>{{ t('controls.delete') }}</span>
              </div>
            </AtomicButton>
            <i class="bg-gray-200 dark:bg-blueGray-600 mx-2 w-px h-10" />
            <AtomicButton type="primary" is-depressed is-wide>
              <div class="flex flex-col items-center justify-center">
                <EditIcon />
                <span>{{ t('controls.edit') }}</span>
              </div>
            </AtomicButton>
          </div>
        </AtomicCard>
        <h3 class="mt-0">{{ t('responses') }}</h3>
        <div v-if="pendingUsers.length > 0">
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
              :idea-id="inspectedIdea.id"
              class="mb-6"
            />
          </div>
        </div>
        <AtomicCard v-else>
          <div class="ml-4">{{ t('nonResponses') }}</div>
        </AtomicCard>
      </div>
    </aside>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import { useIdeas, useIdea } from '../composes/core'
import { useI18n } from '../composes/utils'
import { useRoute } from 'vue-router'

export default defineComponent({
  async setup() {
    useTitle(`DevBuff Dashboard`)
    const { t } = useI18n('pages.dashboard')
    const { userIdeas, getUserIdeas } = useIdeas()
    const isPendingLoading = ref(false)
    const {
      idea: inspectedIdea,
      pendingUsers,
      getIdea,
      getPendingUsers,
      changeStatusIdea,
      deleteIdea: deleteIdeaComponent,
    } = useIdea()

    const route = useRoute()

    const changeIdea = async (ideaId) => {
      isPendingLoading.value = true
      pendingUsers.value = undefined
      getPendingUsers(ideaId)
      await getIdea(ideaId)
      isPendingLoading.value = false
    }

    watch(
      () => route.query,
      async () => {
        if (route.query?.ideaId) {
          changeIdea(route.query?.ideaId)
        }
      },
    )
    await getUserIdeas()

    const deleteIdea = async (ideaId) => {
      await deleteIdeaComponent(ideaId)
      await getUserIdeas()
    }

    return {
      t,
      userIdeas,
      pendingUsers,
      inspectedIdea,
      isPendingLoading,
      deleteIdea,
      changeIdea,
      getIdea,
      getPendingUsers,
      changeStatusIdea,
    }
  },
})
</script>
