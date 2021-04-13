<template>
  <v-dialog title="Редактирование профиля" width-max>
    <template #controls>
      <div class="flex items-center">
        <v-button type="muted" class="mr-4" @click="$dialog.close">
          cancel
        </v-button>
        <v-button @click="updateProfile"> save </v-button>
      </div>
    </template>

    <v-notification :loading="loading" type="success" text="saved" />

    <div class="flex items-center">
      <div class="mr-4 flex flex-col items-center justify-center">
        <v-avatar :avatar="userId" class="w-36 h-36" />
        <div
          class="mt-1 text-primary cursor-pointer flex items-center"
          @click="updateAvatar"
        >
          <v-material-icon name="file_upload" class="text-base" />
          <span class="text-xs">Изменить</span>
        </div>
      </div>
      <div class="w-full">
        <v-input v-model="userData.userName" label="@username" class="mb-2" />
        <v-input v-model="userData.firstName" class="mb-2" />
        <v-input v-model="userData.lastName" />
      </div>
    </div>
    <h4>Немного о себе</h4>
    <v-input v-model="userData.bio" textarea />
    <v-input
      v-model="userData.birthday"
      type="date"
      label="Дата рождения"
      class="mt-4"
    />
    <div class="flex mt-2">
      <v-select
        v-model="userData.countryId"
        :options="countriesOptions"
        label="Страна"
        placeholder="Страна"
        class="mr-4 w-full"
        @change="getCities({ country: userData.countryId })"
      />
      <v-select
        v-model="userData.cityId"
        :disabled="!userData.countryId"
        :options="citiesOptions"
        no-search
        label="Город"
        placeholder="Город"
        class="w-full"
        @search="getCities({ query: $event, country: userData.countryId })"
      />
    </div>
    <h4 class="mt-6">Контакты</h4>
    <div class="mb-8">
      <v-input
        v-model="userData.email"
        type="email"
        placeholder="mail@example.com"
      />
      <div
        :class="[
          'mt-2 text-sm',
          statusEmailConfirm ? 'text-success' : 'text-warning',
        ]"
      >
        e-mail
        {{ statusEmailConfirm ? 'подтвержден' : 'не подтвержден!' }}
      </div>
    </div>
    <v-input
      v-model="userData.socialNetworks.vk"
      type="text"
      inline-label
      label="Vkontakte"
      class="mt-4"
      placeholder="https://vk.com/"
    />
    <v-input
      v-model="userData.socialNetworks.telegram"
      type="text"
      inline-label
      label="Telegram"
      class="mt-4"
      placeholder="@telegram"
    />
    <v-input
      v-model="userData.socialNetworks.discord"
      type="text"
      inline-label
      label="Dicord"
      class="mt-4"
      placeholder="discord#999"
    />
    <v-input
      v-model="userData.socialNetworks.skype"
      type="text"
      inline-label
      label="Skype"
      class="mt-4"
      placeholder="skype"
    />
  </v-dialog>
</template>

<script>
import { throttle } from 'lodash'

export default {
  data: () => ({
    loading: 0,
    userId: null,
    statusEmailConfirm: false,
    userData: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      birthday: '',
      countryId: null,
      cityId: null,
      socialNetworks: {
        vk: '',
        telegram: '',
        discord: '',
        skype: '',
      },
    },
    dict: {
      countries: [],
      cities: [],
    },
  }),
  computed: {
    countriesOptions() {
      return this.dict.countries.map((city) => ({
        value: city.id,
        label: city.title,
      }))
    },
    citiesOptions() {
      return this.dict.cities.map((city) => ({
        value: city.id,
        label: city.title,
      }))
    },
  },
  async created() {
    await this.getProfile()
    await this.getCountries()
  },
  methods: {
    async updateProfile() {
      try {
        await this.$store.dispatch('user/updateProfile', this.userData)
        this.$dialog.scrollTop()
        this.loading++
      } catch (e) {
        console.error(e)
      }
    },
    updateAvatar() {
      const picker = document.createElement('input')
      picker.type = 'file'
      picker.accept = 'image'
      picker.onchange = async (event) => {
        const image = event.target.files[0]
        try {
          await this.$store.dispatch('user/updateAvatar', image)
          await this.$store.dispatch('user/getProfile')
          await this.getProfile()
        } catch (e) {
          console.error(e)
        }
      }
      picker.click()
    },
    async getProfile() {
      const {
        id,
        status,
        statusEmailConfirm,
        ...profile
      } = this.$store.getters['user/profile']
      if (profile.countryId)
        await this.getCities({ country: profile.countryId })

      this.userData = JSON.parse(JSON.stringify(profile))
      this.statusEmailConfirm = statusEmailConfirm
      this.userId = id
    },
    async getCountries() {
      this.dict.countries = await this.$store.dispatch('hints/getCountries')
    },
    getCities: throttle(async function ({ country, query }) {
      this.dict.cities =
        (await this.$store.dispatch('hints/getCities', {
          country,
          query,
        })) || []
    }, 1000),
  },
}
</script>
