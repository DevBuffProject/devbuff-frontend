<template>
  <v-dialog title="Редактирование профиля" width-max>
    <div class="flex items-center">
      <div class="mr-4 flex flex-col items-center justify-center">
        <v-avatar :avatar="userData.id" class="w-20 h-20" />
        <a
          class="mt-1 text-primary hover:underline cursor-pointer flex items-center"
        >
          <v-material-icon name="file_upload" class="text-base" />
          <span class="text-xs">Изменить</span>
        </a>
      </div>
      <div class="w-full">
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
        v-model="userData.country"
        :options="countriesOptions"
        label="Страна"
        placeholder="Страна"
        class="mr-2 w-full"
        @change="getCities()"
      />
      <v-select
        v-model="userData.city"
        :disabled="!userData.country"
        :options="citiesOptions"
        no-search
        label="Город"
        placeholder="Город"
        class="w-full"
        @search="getCities"
      />
    </div>
  </v-dialog>
</template>

<script>
import { throttle } from 'lodash'

export default {
  data: () => ({
    userData: {},
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
    async getProfile() {
      const profile = await this.$store.dispatch('user/getProfile')
      this.userData = JSON.parse(JSON.stringify(profile))
    },
    async getCountries() {
      this.dict.countries = await this.$store.dispatch('hints/getCountries')
    },
    getCities: throttle(async function (query) {
      this.dict.cities = await this.$store.dispatch('hints/getCities', {
        country: this.userData.country,
        query,
      })
    }, 1000),
  },
}
</script>
