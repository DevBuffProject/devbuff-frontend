<template>
  <v-dialog-viewport class="profile-socials-dialog">
    <template #header>
      <h3 class="mt-0 mb-4"> Контакты </h3>
    </template>

    <v-input
      :value="contacts.vk"
      :icon="['fab', 'vk']"
      placeholder="вконтакте"
      @input="setContact('vk', $event)"
      class="w-100 mb-2"
    />
    <div class="">
      <v-og-preview :key="1" v-if="contacts.vk" class="mb-4" :url="urls.vk" />
    </div>

    <v-input
      :value="contacts.telegram"
      :icon="['fab', 'telegram']"
      placeholder="@telegram"
      @input="setContact('telegram', $event)"
      class="w-100 mb-2"
    />
    <div class="">
      <v-og-preview :key="2" v-if="contacts.telegram" class="mb-4" :url="urls.telegram" />
    </div>

    <v-input
      v-model="contacts.skype"
      :icon="['fab', 'skype']"
      placeholder="Skype"
      class="w-100 mb-2"
    />
    <v-input
      v-model="contacts.discord"
      class="w-100 mb-2"
      :icon="['fab', 'discord']"
      placeholder="Discord"
    />

    <template #controls>
      <div>
        <v-button class="mr-2" type="muted" @click="reject"> отмена </v-button>
        <v-button type="primary" :loading="progress" @click="send"> сохранить </v-button>
      </div>
    </template>
  </v-dialog-viewport>
</template>

<script>
import { debounce } from 'lodash'
import WindowAbstract from '~/components/Dialog/Window'

export default {
  extends: WindowAbstract,

  props: {
    vk: String,
    telegram: String,
    skype: String,
    discord: String
  },

  data() {
    return {
      progress: false,
      contacts: {
        vk: this.vk,
        telegram: this.telegram,
        skype: this.skype,
        discord: this.discord
      }
    }
  },

  computed: {
    urls() {
      return {
        vk: this.contacts.vk && `https://vk.com/${this.contacts.vk}`,
        telegram: this.contacts.telegram && `https://t.me/${this.contacts.telegram}`,
      }
    }
  },

  methods: {
    setContact: debounce(function (contact, value) {
      this.contacts[contact] = value
    }, 500),
    send() {
      this.progress = true
      this.$store
        .dispatch('user/update', { socialNetworks: { ...this.contacts } })
        .then(() => {
          this.progress = false
          this.resolve()
        })
        .catch(() => {
          this.progress = false
        })
    }
  },
}
</script>

<style lang="scss" scoped>
.profile-socials-dialog {
  width: 100%;
  max-width: 400px;
  min-width: 300px;
}
</style>
