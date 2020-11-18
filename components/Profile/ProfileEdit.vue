<template>
  <v-dialog-viewport class="profile-socials-dialog">

    <div class="profile-edit__cover d-flex align-items-center">
      <v-avatar
        class="profile-edit__avatar"
        :avatar="$store.getters['user/profile'].avatar"
        size="60px"
      />
    </div>

    <v-input
      :icon="['fas', 'at']"
      placeholder="Имя пользователя"
      class="w-100 mb-2 mt-5"
      v-model="profile.userName"
    />
    <div class="d-flex mb-2">
      <v-input
        :icon="['fas', 'signature']"
        placeholder="Имя"
        class="w-100 mr-2"
        v-model="profile.firstName"
      />
      <v-input
        :icon="['fas', 'signature']"
        placeholder="Фамилия"
        class="w-100"
        v-model="profile.lastName"
      />
    </div>
    <v-input
      placeholder="О себе"
      class="w-100 mb-2"
      type="textarea"
      v-model="profile.bio"
    />

    <v-input
      :icon="['fas', 'calendar']"
      placeholder="День рождения"
      class="w-100 mt-3"
      type="date"
      v-model="profile.birthday"
    />

    <v-dropdown
      :icon="['fas', 'globe']"
      placeholder="Страна"
      class="w-100 mb-2 mt-4"
      :options="countries"
      v-model="profile.country"
    />
    <v-input
      :icon="['fas', 'city']"
      placeholder="Город"
      class="w-100 mb-2"
      v-model="profile.city"
    />

    <h5>Социальные сети</h5>
    <v-input
      :value="profile.socialNetworks.vk"
      :icon="['fab', 'vk']"
      placeholder="вконтакте"
      @input="setContact('vk', $event)"
      class="w-100 mb-2"
    />
    <div class="">
      <v-og-preview :key="1" v-if="profile.socialNetworks.vk" class="mb-4" :url="urls.vk" />
    </div>

    <v-input
      :value="profile.socialNetworks.telegram"
      :icon="['fab', 'telegram']"
      placeholder="@telegram"
      @input="setContact('telegram', $event)"
      class="w-100 mb-2"
    />
    <div class="">
      <v-og-preview :key="2" v-if="profile.socialNetworks.telegram" class="mb-4" :url="urls.telegram" />
    </div>

    <v-input
      v-model="profile.socialNetworks.skype"
      :icon="['fab', 'skype']"
      placeholder="Skype"
      class="w-100 mb-2"
    />
    <v-input
      v-model="profile.socialNetworks.discord"
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
import { codes } from '~/kernel/UI/Countries'

export default {
  extends: WindowAbstract,

  props: {
    dataProfile: Object
  },

  data() {
    return {
      progress: false,
      profile: {
        userName: null,
        firstName: null,
        lastName: null,
        email: null,
        birthday: null,
        country: null,
        city: null,
        bio: null,
        status: null,
        socialNetworks: {
          telegram: null,
          vk: null,
          skype: null,
          discord:null,
        },
        ...this.dataProfile,
      }
    }
  },

  computed: {
    countries() {
      return codes.map(code => ({ code, title: this.$t(`country.${code}`) }))
    },
    urls() {
      return {
        vk: this.profile.socialNetworks.vk && `https://vk.com/${this.profile.socialNetworks.vk}`,
        telegram: this.profile.socialNetworks.telegram && `https://t.me/${this.profile.socialNetworks.telegram}`,
      }
    }
  },

  methods: {
    setContact: debounce(function (contact, value) {
      this.profile.socialNetworks[contact] = value
    }, 500),
    send() {
      this.progress = true
      this.$store
        .dispatch('user/update', this.profile)
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
.profile-edit {
  &__cover {
    position: relative;
    margin: 0 -1.5rem;
    margin-top: -1.5rem;
    padding: 2.5rem;
    background-image: url('/partials.jpg');
    background-size: cover;
  }

  &__avatar {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.profile-socials-dialog {
  width: 100%;
  min-width: 450px;
}
</style>
