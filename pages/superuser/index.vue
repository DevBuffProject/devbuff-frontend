<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" />
    <h1>Superuser</h1>
    <div class="flex">
      <nuxt-link :to="localePath({ name: 'superuser-moderation' })">
        <v-card>
          <div class="flex items-center">
            <svg-icon
              class="text-gradient-laguna text-2xl"
              name="security/shield"
            />
            <span class="ml-4 text-2xl">Модерация</span>
          </div>
        </v-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return [
        {
          title: 'Главная',
          to: this.localePath({ name: 'index' }),
        },
        { title: 'Superuser' },
      ]
    },
  },
}
</script>
