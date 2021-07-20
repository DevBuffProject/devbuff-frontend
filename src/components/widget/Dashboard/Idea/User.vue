<template>
  <AtomicCard class="mb-6">
    <div class="flex items-center justify-between">
      <WidgetUser :user="userData" />
      <div v-if="!readonly" class="text-sm flex flex-col">
        <AtomicButton
          v-if="!isApproved"
          type="success"
          is-small
          is-outline
          class="mb-2"
          @click="approveUserToIdea(ideaId, specializationId, userId)"
        >
          {{ t('approve') }}
        </AtomicButton>
      </div>
    </div>
    <div class="flex">
      <AtomicLabel :name="t('specialist')">
        {{ t(`commons.specialist.${specialization}`, true) }}
      </AtomicLabel>
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
import { computed, ref } from 'vue'
import { useI18n } from '../../../../composes/utils'

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
  setup(props) {
    const { t } = useI18n('components.widget.dashboard.idea.user')
    const { getUserProfileUrl } = useUser()
    const { approveUser } = useIdea()
    const isApproved = ref(false)
    const approveUserToIdea = (uuidIdea, uuidSpecialisation, uuidUser) => {
      isApproved.value = true
      approveUser(uuidIdea, uuidSpecialisation, uuidUser)
    }

    const userData = {
      avatar: getUserProfileUrl(props.userId),
      userName: props.username,
      lastName: props.lastname,
      firstName: props.firstname,
    }

    return {
      t,
      userData,
      isApproved,
      approveUserToIdea,
    }
  },
}
</script>
