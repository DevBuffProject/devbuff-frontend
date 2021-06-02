<template>
  <AtomicCard class="mb-6">
    <div class="flex items-center justify-between">
      <WidgetUser
        :avatar="avatar"
        :firstname="firstname"
        :lastname="lastname"
        :username="username"
      />
      <div v-if="!readonly" class="text-sm flex flex-col">
        <AtomicButton
          type="success"
          is-small
          is-outline
          class="mb-2"
          @click="approveUserToIdea(ideaId, specializationId, userId)"
        >
          approve
        </AtomicButton>
      </div>
    </div>
    <AtomicDelimiter class="my-4" />
    <div class="flex">
      <AtomicLabel name="specialization">{{ specialization }}</AtomicLabel>
      <div class="ml-10">
        <WidgetUserContacts
          :vk="vkContact"
          :telegram="telegramContact"
          :skype="skypeContact"
          :discord="discordContact"
        />
      </div>
    </div>
  </AtomicCard>
</template>

<script>
import { useUser, useIdea } from '../../../../composes/core'

import { tryOnUnmounted } from '@vueuse/core'
const rooElement = window.document.documentElement
export default {
  name: 'WidgetDashboardUserCard',
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    firstname: {
      type: String,
      default: '',
    },
    lastname: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      default: '',
    },
    vkContact: {
      type: String,
      default: '',
    },
    telegramContact: {
      type: String,
      default: '',
    },
    skypeContact: {
      type: String,
      default: '',
    },
    discordContact: {
      type: String,
      default: '',
    },
    specialization: {
      type: String,
      default: '',
    },
    specializationId: {
      type: String,
      default: '',
    },
    ideaId: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { approveUser } = useIdea()

    const approveUserToIdea = (uuidIdea, uuidSpecialisation, uuidUser) => {
      approveUser(uuidIdea, uuidSpecialisation, uuidUser)
      //TODO unmount component
    }

    return {
      approveUserToIdea,
    }
  },
  computed: {
    avatar() {
      const { getUserProfileUrl } = useUser()
      return getUserProfileUrl(this.userId)
    },
  },
}
</script>
