<template>
  <div>
    <h1>{{ idea.name }}</h1>

    <div class="flex flex-wrap items-start my-5">
      <AtomicLabel :name="t('info.date')" class="mb-4 mt-0 mx-4">
        {{ publishedAgo }}
      </AtomicLabel>

      <AtomicLabel :name="t('info.status.title')" class="mb-4 mt-0 mx-4">
        {{ t(`info.status.${idea.status}`) }}
      </AtomicLabel>

      <AtomicLabel
        v-if="isOwnerIdea"
        :name="t('info.moderationStatus.title')"
        class="mb-4 mt-0 mx-4"
      >
        {{
          idea.waitingValidation
            ? t('info.moderationStatus.waiting')
            : t('info.moderationStatus.approved')
        }}
      </AtomicLabel>
    </div>
    <div class="grid gap-6 grid-cols-6">
      <AtomicCard class="col-span-4 mb-3">
        <div v-html="idea.text" class="overflow-hidden" />
      </AtomicCard>

      <div class="col-span-2">
        <div class="flex items-center mb-6" v-if="isOwnerIdea">
          <span class="opacity-50">вы создатель</span>
          <AtomicActions>
            <template #activator>
              <div class="flex items-center ml-2 text-primary-500">
                {{ t('control.title') }}
                <ChevronDownIcon />
              </div>
            </template>
            <div class="flex flex-col items-start -mx-4 text-xs">
              <AtomicAction type="danger" class="w-full">
                <StopIcon />
                Stop company
              </AtomicAction>

              <AtomicAction
                type="danger"
                class="w-full"
                @click="deleteIdeaProcess"
              >
                <TrashIcon />
                {{ t('control.delete') }}
              </AtomicAction>
              <RouterLink
                class="w-full"
                :to="{ name: 'idea-edit', params: { id: idea.id } }"
                v-slot="{ href, navigate }"
              >
                <AtomicAction :href="href" @click="navigate" class="w-full">
                  <EditIcon />
                  {{ t('control.edit') }}
                </AtomicAction>
              </RouterLink>
            </div>
          </AtomicActions>
        </div>

        <AtomicCard>
          <div class="dark:divide-dark-700 divide-gray-200 divide-y -mt-6">
            <div
              class="-mx-4 px-4 py-3"
              v-for="specialist in idea.specialist"
              :key="specialist.id"
            >
              <h5 class="m-0 !mb-4 font-normal">
                {{ t(`commons.specialist.${specialist.name}`, true) }}
              </h5>
              <AtomicLabel
                :name="t('positions.titleLanguages')"
                v-if="languagesForSpecialist(specialist.id).length > 0"
              >
                <div class="flex flex-wrap">
                  <div
                    v-for="language in languagesForSpecialist(specialist.id)"
                    :key="`language-${language}-${specialist.id}`"
                  >
                    <AtomicChip
                      :text="language"
                      class="mb-2 mr-1"
                      type="auto"
                    />
                  </div>
                </div>
              </AtomicLabel>
              <AtomicLabel
                v-if="frameworksForSpecialist(specialist.id).length > 0"
                :name="t('positions.titleTechnologies')"
                class="mt-4"
              >
                <div class="flex flex-wrap">
                  <div
                    v-for="framework of frameworksForSpecialist(specialist.id)"
                    :key="`language-${framework}-${specialist.id}`"
                  >
                    <AtomicChip
                      :text="framework"
                      class="mb-2 mr-1"
                      type="auto"
                    />
                  </div>
                </div>
              </AtomicLabel>

              <AtomicLabel
                v-if="specialist.acceptedUsers.length > 0"
                :name="t('positions.titleAcceptedUsers')"
                class="mt-4"
              >
                <div class="flex flex-wrap">
                  <AppLink
                    :to="{ name: 'user', params: { UUID: acceptedUser.id } }"
                    modal
                    v-for="(acceptedUser, key) of specialist.acceptedUsers"
                    :key="`acceptedUser${key}`"
                    class="text-xs"
                  >
                    {{ acceptedUser.firstName }}
                    {{ acceptedUser.lastName }} (@{{ acceptedUser.userName }})
                  </AppLink>
                </div>
              </AtomicLabel>

              <div v-if="!isOwnerIdea" class="mt-6">
                <AtomicButton
                  v-if="getStatusAtPosition(specialist.id) === 'NONE'"
                  @click="send(specialist.id)"
                  is-depressed
                  class="w-full"
                >
                  {{ t('positions.status.NONE') }}
                </AtomicButton>
                <div
                  v-else
                  class="
                    py-2
                    w-full
                    text-center text-gray-400
                    bg-gray-100
                    rounded
                  "
                >
                  {{
                    t(`positions.status.${getStatusAtPosition(specialist.id)}`)
                  }}
                </div>
              </div>
            </div>
          </div>
        </AtomicCard>
      </div>
      <!--      await for design-->
      <!--      <div class="col-span-4">-->
      <!--        <WidgetCommentsFast :id="`idea-${idea.id}`" :sso="ssoData" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useIdea, useUser, useSso, useI18n } from '../composes'
import { useTimeAgo, useTitle } from '@vueuse/core'
import { useRouter } from '../core/router'

export default defineComponent({
  name: 'IdeaDetail',
  props: {
    id: { type: String, required: true },
  },
  async setup(props) {
    const router = useRouter()
    const {
      idea,
      statusPositions,
      languagesForSpecialist,
      deleteIdea,
      frameworksForSpecialist,
      getIdea,
      getStatusPositions,
      joinToIdea,
      changeStatusIdea,
    } = useIdea(props.id)
    const { ssoData, getSsoData } = useSso()
    const { t } = useI18n('pages.idea')
    const { getUserProfileUrl, getUser, user } = useUser()

    const send = (specialistId) => {
      joinToIdea(idea.value.id, specialistId)
      let result = statusPositions.value.find(
        (statusPosition) => statusPosition.specializationId === specialistId,
      )
      if (result) result.positionStatus = 'PENDING'
    }
    const getStatusAtPosition = (specialistId) => {
      let result = statusPositions.value.find(
        (statusPosition) => statusPosition.specializationId === specialistId,
      )
      return result && result.positionStatus
    }

    const deleteIdeaProcess = async () => {
      await deleteIdea()
      await router.replace({ name: 'dashboard' })
    }

    await getIdea()
    await getUser()
    idea.value.ownerIdea.avatar = getUserProfileUrl(idea.value.ownerIdea.id)

    await getStatusPositions(idea.value.id)
    // await getSsoData()

    const isOwnerIdea = user.value.id === idea.value.ownerIdea.id
    const publishedAgo = useTimeAgo(idea.value.lastUpdateDate)

    useTitle(`${idea.value.name} - DevBuff`)

    return {
      idea,
      ssoData,
      isOwnerIdea,
      publishedAgo,
      t,
      send,
      deleteIdeaProcess,
      changeStatusIdea,
      getUserProfileUrl,
      getStatusAtPosition,
      languagesForSpecialist,
      frameworksForSpecialist,
    }
  },
})
</script>
