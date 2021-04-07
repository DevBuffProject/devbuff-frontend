<template>
  <v-dialog-viewport class="profile-socials-dialog">
    <div class="profile-edit__cover flex items-center">
      <v-avatar
        class="profile-edit__avatar"
        :avatar="$store.getters['user/profile'].id"
        size="60px"
      />
      <label>
        <input
          type="file"
          accept="image/*"
          @change="uploadAvatar($event.target.files[0])"
        />
        изменить фото
      </label>
    </div>

    <v-input
      v-model="profile.userName"
      :icon="['fas', 'at']"
      :placeholder="$t('page.profile.userName')"
      class="w-full mb-2 mt-5"
    />
    <div class="flex mb-2">
      <v-input
        v-model="profile.firstName"
        :icon="['fas', 'signature']"
        :placeholder="$t('page.profile.firstName')"
        class="w-full mr-2"
      />
      <v-input
        v-model="profile.lastName"
        :icon="['fas', 'signature']"
        :placeholder="$t('page.profile.lastName')"
        class="w-full"
      />
    </div>
    <v-input
      v-model="profile.bio"
      :placeholder="$t('page.profile.about')"
      class="w-full mb-2"
      type="textarea"
    />

    <v-input
      v-model="profile.birthday"
      :icon="['fas', 'calendar']"
      :placeholder="$t('page.profile.birthdate')"
      class="w-full mt-3"
      type="date"
    />

    <v-dropdown
      v-model="profile.country"
      :icon="['fas', 'globe']"
      :placeholder="$t('page.profile.country')"
      class="w-full mb-2 mt-4"
      :options="countries"
    />
    <v-input
      v-model="profile.city"
      :icon="['fas', 'city']"
      :placeholder="$t('page.profile.city')"
      class="w-full mb-2"
    />

    <v-input
      v-model="profile.email"
      :icon="['fas', 'mail']"
      placeholder="mail@example.com"
      class="w-full mt-3"
    />
    <div class="flex items-center mt-1 profile-edit__email-status">
      {{ emailStatusText }}
      <a
        v-show="!profile.statusEmailConfirm && !verifyRequestSent"
        class="ml-2 profile-edit__email-verify"
        @click="resendVerifyMail"
      >
        {{ $t('page.profile.emailSendVerifyMail') }}
      </a>
      <span
        v-show="!profile.statusEmailConfirm && verifyRequestSent"
        class="text-muted ml-2"
      >
        {{ $t('page.profile.emailVerificationMailSent') }}
      </span>
    </div>

    <h5>{{ $t('page.profile.socialNetworks') }}</h5>
    <v-input
      :value="profile.socialNetworks.vk"
      :icon="['fab', 'vk']"
      :placeholder="$t('page.profile.vk')"
      class="w-full mb-2"
      @input="setContact('vk', $event)"
    />
    <v-og-preview
      v-if="profile.socialNetworks.vk"
      :key="1"
      class="mb-4"
      :url="urls.vk"
    />

    <v-input
      :value="profile.socialNetworks.telegram"
      :icon="['fab', 'telegram']"
      placeholder="@telegram"
      class="w-full mb-2"
      @input="setContact('telegram', $event)"
    />
    <div class="">
      <v-og-preview
        v-if="profile.socialNetworks.telegram"
        :key="2"
        class="mb-4"
        :url="urls.telegram"
      />
    </div>

    <v-input
      v-model="profile.socialNetworks.skype"
      :icon="['fab', 'skype']"
      placeholder="Skype"
      class="w-full mb-2"
    />
    <v-input
      v-model="profile.socialNetworks.discord"
      class="w-full mb-2"
      :icon="['fab', 'discord']"
      placeholder="Discord"
    />

    <template #controls>
      <div>
        <v-button class="mr-2" type="muted" @click="reject">
          {{ $t('common.cancel') }}
        </v-button>
        <v-button type="primary" :loading="progress" @click="send">
          {{ $t('common.save') }}
        </v-button>
      </div>
    </template>
  </v-dialog-viewport>
</template>

<script>
import { debounce } from 'lodash'
import { codes } from 'assets/data/countries'

export default {
  props: {
    dataProfile: Object,
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
          discord: null,
        },
        ...this.dataProfile,
      },
    }
  },

  computed: {
    emailStatusText() {
      return this.profile.statusEmailConfirm
        ? this.$t('page.profile.emailVerified')
        : this.$t('page.profile.emailNoVerified')
    },
    countries() {
      return codes.map((code) => ({ code, title: this.$t(`country.${code}`) }))
    },
    urls() {
      return {
        vk:
          this.profile.socialNetworks.vk &&
          `https://vk.com/${this.profile.socialNetworks.vk}`,
        telegram:
          this.profile.socialNetworks.telegram &&
          `https://t.me/${this.profile.socialNetworks.telegram}`,
      }
    },
  },

  methods: {
    setContact: debounce(function (contact, value) {
      this.profile.socialNetworks[contact] = value
    }, 500),
    async resendVerifyMail() {
      await this.$store.dispatch('user/resendVerifyMail')
      this.verifyRequestSent = true
    },
    async uploadAvatar(image) {
      if (!image) {
        return
      }

      try {
        await this.$store.dispatch('user/uploadAvatar', image)
      } catch (e) {}
    },
    async send() {
      this.progress = true
      try {
        await this.$store.dispatch('user/update', this.profile)
        this.progress = false
        this.resolve()
      } catch (e) {
        this.progress = false
      }
    },
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
    background-image: url('/static/partials.jpg');
    background-size: cover;
  }

  &__avatar {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }

  &__email-status {
    font-size: 0.75rem;
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
