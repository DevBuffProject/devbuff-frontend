<template>
  <v-card class="mb-6">
    <div class="flex items-center justify-between">
      <v-user
        :avatar="avatar"
        :firstname="firstname"
        :lastname="lastname"
        :username="username"
      />
      <div v-if="!readonly" class="text-sm flex flex-col">
        <v-button
          type="success"
          is-small
          is-outline
          class="mb-2"
          @click="$emit('onApprove')"
        >
          отклонить
        </v-button>
      </div>
    </div>
    <v-delimiter class="my-4" />
    <div class="flex">
      <v-label name="Специальность">
        {{ specialization }}
      </v-label>
      <div v-if="userContacts" class="ml-10">
        <div
          v-for="(contact, index) of userContacts"
          :key="userId + index"
          class="flex items-center mb-2.5"
        >
          <svg-icon :name="contact.icon" class="mr-2 text-sm" />
          <a
            v-if="contact.link"
            :href="contact.link"
            target="_blank"
            class="text-primary hover:underline"
          >
            {{ contact.contact }}
          </a>
          <div v-else>{{ contact.contact }}</div>
        </div>
      </div>
    </div>
  </v-card>
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
    userContacts() {
      const { vkContact, telegramContact, skypeContact, discordContact } = this
      return [
        vkContact && {
          icon: 'social/brand-vk',
          title: 'Vkontakte',
          link: `https://vk.com/${vkContact}`,
          contact: vkContact,
        },
        telegramContact && {
          icon: 'social/brand-telegram',
          title: 'Telegram',
          link: `https://vk.com/${telegramContact}`,
          contact: telegramContact,
        },
        skypeContact && {
          icon: 'social/brand-skype',
          title: 'Skype',
          link: `skype:${skypeContact}`,
          contact: skypeContact,
        },
        discordContact && {
          icon: 'social/brand-discord',
          title: 'Discord',
          contact: discordContact,
        },
      ].filter((contact) => !!contact)
    },
    avatar() {
      return `${this.$config.API_BASE_URL}/photo/profile/${this.userId}`
    },
  },
}
</script>
