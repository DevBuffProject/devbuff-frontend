<template>
  <atomic-card class="mb-6">
    <div class="flex items-center justify-between">
      <widget-user
        :avatar="avatar"
        :firstname="firstname"
        :lastname="lastname"
        :username="username"
      />
      <div v-if="!readonly" class="text-sm flex flex-col">
        <atomic-button
          type="success"
          is-small
          is-outline
          class="mb-2"
          @click="$emit('onApprove')"
        >
          {{ $t('widget.dashboard.userCard.approve') }}
        </atomic-button>
      </div>
    </div>
    <atomic-delimiter class="my-4" />
    <div class="flex">
      <atomic-label :name="$t('widget.dashboard.userCard.specialization')">
        {{ t('specializations.' + specialization + '.title', specialization) }}
      </atomic-label>
      <div class="ml-10">
        <widget-user-contacts
          :vk="vkContact"
          :telegram="telegramContact"
          :skype="skypeContact"
          :discord="discordContact"
        />
      </div>
    </div>
  </atomic-card>
</template>

<script>
export default {
  name: 'VDashboardUserCard',
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
      return `${this.$config.API_BASE_URL}/photo/profile/${this.userId}`
    },
  },
  methods: {
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr || str
    },
  },
}
</script>
