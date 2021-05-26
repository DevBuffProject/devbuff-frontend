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
        <AtomicButton type="muted" is-small is-outline class="mb-2">
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
  },
  computed: {
    avatar() {
      return `${import.meta.VITE_API_BASE_URL}/photo/profile/${this.userId}`
    },
  },
}
</script>
