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
      :placeholder="$t('page.profile.userName')"
      class="w-100 mb-2 mt-5"
      v-model="profile.userName"
    />
    <div class="d-flex mb-2">
      <v-input
        :icon="['fas', 'signature']"
        :placeholder="$t('page.profile.firstName')"
        class="w-100 mr-2"
        v-model="profile.firstName"
      />
      <v-input
        :icon="['fas', 'signature']"
        :placeholder="$t('page.profile.lastName')"
        class="w-100"
        v-model="profile.lastName"
      />
    </div>
    <v-input
      :placeholder="$t('page.profile.about')"
      class="w-100 mb-2"
      type="textarea"
      v-model="profile.bio"
    />

    <v-input
      :icon="['fas', 'calendar']"
      :placeholder="$t('page.profile.birthdate')"
      class="w-100 mt-3"
      type="date"
      v-model="profile.birthday"
    />

    <v-dropdown
      :icon="['fas', 'globe']"
      :placeholder="$t('page.profile.country')"
      class="w-100 mb-2 mt-4"
      :options="countries"
      v-model="profile.country"
    />
    <v-input
      :icon="['fas', 'city']"
      :placeholder="$t('page.profile.city')"
      class="w-100 mb-2"
      v-model="profile.city"
    />

    <v-input
      :icon="['fas', 'mail']"
      placeholder="mail@example.com"
      class="w-100 mt-3"
      v-model="profile.email"
    />
    <div class="d-flex align-items-center mt-1 profile-edit__email-status">
      {{ emailStatusText }}
      <a
        v-show="!profile.statusEmailConfirm && !verifyRequestSent"
        class="ml-2 profile-edit__email-verify"
        @click="resendVerifyMail"
      >
        {{ $t('page.profile.emailSendVerifyMail') }}
      </a>
      <span class="text-muted ml-2" v-show="!profile.statusEmailConfirm && verifyRequestSent">
        {{ $t('page.profile.emailVerificationMailSent') }}
      </span>
    </div>

    <h5>{{ $t('page.profile.socialNetworks') }}</h5>
    <v-input
      :value="profile.socialNetworks.vk"
      :icon="['fab', 'vk']"
      :placeholder="$t('page.profile.vk')"
      @input="setContact('vk', $event)"
      class="w-100 mb-2"
    />
    <v-og-preview :key="1" v-if="profile.socialNetworks.vk" class="mb-4" :url="urls.vk" />

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
        <v-button class="mr-2" type="muted" @click="reject"> {{ $t('common.cancel') }} </v-button>
        <v-button type="primary" :loading="progress" @click="send"> {{ $t('common.save') }} </v-button>
      </div>
    </template>
  </v-dialog-viewport>
</template>

<script>
import { debounce } from 'lodash'
import { codes } from '~/kernel/UI/Countries'
import WindowAbstract from '~/components/Dialog/Window'

export default {
  extends: WindowAbstract,

  props: {
    dataProfile: Object
  },

  data() {
    return {
      progress: false,
      verifyRequestSent: false,
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
    emailStatusText() {
      return this.profile.statusEmailConfirm
        ? this.$t('page.profile.emailVerified')
        : this.$t('page.profile.emailNoVerified')
    },
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
    resendVerifyMail() {
      this.$store
        .dispatch('user/resendVerifyMail')
        .then(() => this.verifyRequestSent = true)
    },
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

  &__email-status {
    font-size: .75rem;
    font-weight: 100;
  }

  &__email-verify {
    color: var(--color-primary) !important;
  }
}
.profile-socials-dialog {
  width: 100%;
  min-width: 450px;
}
</style>
