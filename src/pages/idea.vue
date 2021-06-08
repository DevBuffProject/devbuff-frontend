<template>
  <div>
    <div>
      <h1>{{ idea.name }}</h1>
      <div class="flex flex-wrap items-start my-5">
        <RouterLink to="/" custom v-slot="{ navigate }">
          <div class="mr-6 mb-4">
            <WidgetUser
              avatar-gradient-border
              :avatar="getUserProfileUrl(idea.ownerIdea.id)"
              :firstname="idea.ownerIdea.firstName"
              :lastname="idea.ownerIdea.lastName"
              :username="idea.ownerIdea.userName"
              @click="navigate"
              v-focusable
            />
          </div>
        </RouterLink>
        <AtomicLabel name="date" class="mt-0 mx-4 mb-4">
          {{ publishedAgo }}
        </AtomicLabel>

        <AtomicLabel name="status" class="mt-0 mx-4 mb-4">
          {{ idea.status }}
        </AtomicLabel>

        <AtomicLabel v-if="isOwnerIdea" name="moderation">
          {{ idea.waitingValidation ? 'waiting' : 'aproove' }}
        </AtomicLabel>
        <AtomicLabel
          v-if="isOwnerIdea"
          name="Организация команды"
          class="mt-0 mx-4 mb-4"
        >
          <AtomicButton
            v-if="idea.status === 'WAITING_FULL_TEAM'"
            v-focusable.indexOnly
            :is-small="true"
            :type="'danger'"
            @click="changeStatusIdea('DISABLE_SET_OF_CANDIDATES')"
          >
            Закрыть набор
          </AtomicButton>

          <AtomicButton
            v-if="idea.status === 'WORKING'"
            v-focusable.indexOnly
            :is-small="true"
            :type="'success'"
            @click="changeStatusIdea('ENABLE_SET_OF_CANDIDATES')"
          >
            Открыть набор
          </AtomicButton>
        </AtomicLabel>
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="mb-3 col-span-8">
        <div
          v-html="idea.text"
          class="p-4 border border-gray-200 dark:border-blueGray-600 rounded-xl"
        />
      </div>
      <div
        class="col-start-10 col-end-13"
        v-if="Object.keys(acceptedUsers).length > 0"
      >
        <AtomicCard>
          <h3 class="mt-0">Команда:</h3>

          <!--     TODO profile page @click  -->
          <div
            class="flex items-center"
            v-for="(userDate, userId) in acceptedUsers"
            :key="'accepted' + userId"
          >
            <atomic-avatar :avatar="getUserProfileUrl(userId)" class="mr-2" />
            <div>
              <div class="font-semibold">
                {{ userDate.firstName }} {{ userDate.lastName }}
              </div>
              <div class="text-xs text-gray-500 dark:text-blueGray-400">
                {{ userDate.positions.join(', ') }}
              </div>
            </div>
          </div>
        </AtomicCard>
      </div>
    </div>
    <h1 class="grid grid-cols-12">Позиции:</h1>

    <div class="flex items-baseline mb-6">
      <AtomicCard
        class="space-x-2 mr-1"
        v-for="specialist in idea.specialist"
        :key="specialist.id"
      >
        <h4 class="mt-0">{{ specialist.name }} Developer</h4>
        <AtomicLabel name="Необходимые ЯП" />
        <div class="flex flex-wrap">
          <div
            v-for="language in specialist.languages"
            :key="'language' + language.name + specialist.id"
          >
            <AtomicChip :text="language.name" class="ml-2 mb-2" type="auto" />

            <AtomicLabel
              v-if="language.frameworks && language.frameworks.length > 0"
              name="Технологии"
              class="ml-3"
            />
            <AtomicChip
              v-for="framework in language.frameworks"
              :key="
                'framework' + framework.name + language.name + specialist.id
              "
              :text="framework.name"
              type="auto"
              class="ml-4"
            />
          </div>
        </div>
        <div class="flex items-baseline content-center mt-4">
          <AtomicButton
            v-if="!isOwnerIdea && getStatusAtPosition(specialist.id) === 'NONE'"
            v-focusable.indexOnly
            :is-small="true"
            @click="send(specialist.id)"
          >
            Откликнуться
          </AtomicButton>

          <AtomicButton
            v-if="getStatusAtPosition(specialist.id) === 'PENDING'"
            v-focusable.indexOnly
            :is-small="true"
            :disabled="true"
          >
            Заявка оправлена
          </AtomicButton>

          <AtomicButton
            v-if="getStatusAtPosition(specialist.id) === 'ACCEPTED'"
            v-focusable.indexOnly
            :is-small="true"
            :disabled="true"
          >
            Вы в команде
          </AtomicButton>
        </div>
      </AtomicCard>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useIdea, useUser } from '../composes/core'
import { useTimeAgo, useTitle } from '@vueuse/core'

export default defineComponent({
  name: 'IdeaDetail',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const {
      idea,
      getIdea,
      statusPositions,
      getStatusPositions,
      joinToIdea,
      changeStatusIdea,
    } = useIdea(props.id)
    const { getUserProfileUrl, getUser, user } = useUser()

    useTitle(`${idea.value.name} - DevBuff`)

    const send = (specialistId) => {
      joinToIdea(idea.value.id, specialistId)
      let result = statusPositions.value.find((statusPosition) => {
        return statusPosition.specializationId === specialistId
      })
      if (result !== undefined) {
        result.positionStatus = 'PENDING'
      }
    }
    const getStatusAtPosition = (specialistId) => {
      let result = statusPositions.value.find(
        (statusPosition) => statusPosition.specializationId === specialistId,
      )
      return result !== undefined ? result.positionStatus : undefined
    }

    await getIdea()
    await getUser()
    await getStatusPositions(idea.value.id)

    const isOwnerIdea = user.value.id === idea.value.ownerIdea.id

    const publishedAgo = useTimeAgo(idea.value.lastUpdateDate)

    const acceptedUsers = {}

    for (let specialist of idea.value.specialist) {
      for (let acceptedUser of specialist.acceptedUsers) {
        if (acceptedUsers[acceptedUser.id] === undefined) {
          acceptedUsers[acceptedUser.id] = {}
          acceptedUsers[acceptedUser.id].firstName = acceptedUser.firstName
          acceptedUsers[acceptedUser.id].lastName = acceptedUser.lastName
          acceptedUsers[acceptedUser.id].positions = []
        }

        acceptedUsers[acceptedUser.id].positions.push(specialist.name)
      }
    }
    return {
      idea,
      isOwnerIdea,
      publishedAgo,
      send,
      changeStatusIdea,
      getUserProfileUrl,
      acceptedUsers,
      getStatusAtPosition,
    }
  },
})
</script>
