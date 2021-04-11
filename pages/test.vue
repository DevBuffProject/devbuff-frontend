<template>
  <div>
    <v-button @click="getCountries">GET </v-button>
    <v-select
      v-model="city"
      :options="citiesOptions"
      label="Страна"
      placeholder="Страна"
    />
    <pre>{{ cities }}</pre>
  </div>
</template>

<script>
export default {
  data: () => ({
    cities: [],
    city: '',
  }),
  computed: {
    citiesOptions() {
      return this.cities
        ? this.cities.map((city) => ({
            value: city.id,
            label: city.title,
          }))
        : []
    },
  },
  methods: {
    async getCountries() {
      this.cities = await this.$store.dispatch('hints/getCountries')
    },
  },
}
</script>
