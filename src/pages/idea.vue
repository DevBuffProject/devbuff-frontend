<template>
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

      <AtomicLabel v-if="isOwner" name="moderation">
        {{ idea.waitingValidation ? 'waiting' : 'aproove' }}
      </AtomicLabel>
    </div>
    <div class="grid grid-cols-5">
      <div class="mb-3 col-span-5">
        <div
          v-html="idea.text"
          class="p-4 border border-gray-200 dark:border-blueGray-600 rounded-xl"
        />
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
            >Откликнуться
          </AtomicButton>

          <AtomicButton
            v-if="getStatusAtPosition(specialist.id) === 'PENDING'"
            v-focusable.indexOnly
            :is-small="true"
            :disabled="true"
            >Заявка оправлена
          </AtomicButton>

          <AtomicButton
            v-if="getStatusAtPosition(specialist.id) === 'ACCEPTED'"
            v-focusable.indexOnly
            :is-small="true"
            :disabled="true"
            >Вы в команде
          </AtomicButton>
        </div>
      </AtomicCard>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
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
    const { idea, getIdea } = useIdea(props.id)
    const { joinToIdea, getUserProfileUrl, getStatusPositions, getUser, user } =
      useUser()
    await getIdea()
    await getUser()

    useTitle(`${idea.value.name} - Devbuff`)
    const publishedAgo = useTimeAgo(new Date(idea.value.lastUpdateDate))

    const statusPositions = ref(await getStatusPositions(idea.value.id))

    function send(specialistId) {
      joinToIdea(idea.value.id, specialistId)
      let result = statusPositions.value.find((statusPosition) => {
        return statusPosition.specializationId === specialistId
      })
      if (result !== undefined) {
        result.positionStatus = 'PENDING'
      }
    }

    function getStatusAtPosition(specialistId) {
      let result = statusPositions.value.find((statusPosition) => {
        return statusPosition.specializationId === specialistId
      })

      if (result !== undefined) {
        return result.positionStatus
      }
      return undefined
    }

    const isOwnerIdea = user.value.id === idea.value.ownerIdea.id

    return {
      idea,
      isOwnerIdea,
      send,
      publishedAgo,
      getUserProfileUrl,
      getStatusAtPosition,
    }
  },
})
</script>
