<template>
  <section>
    <v-card style="width: 500px;">
      <template #header>
        <div class="d-flex align-items-center w-100">
          <v-skeleton
            class="mr-3"
            figure="circle"
          />
          <v-skeleton
            class="w-50"
            figure="line"
          />
        </div>
      </template>

      <v-skeleton-paragraph />

      <template #footer>
        <div class="d-flex justify-content-end w-100">
          <v-skeleton
            class="w-25"
            figure="line"
          />
        </div>
      </template>
    </v-card>

  </section>
</template>

<script>
export default {
  mounted() {
    console.log(this)
  },
  async middleware({ store }) {
    return new Promise(resolve => {
      setTimeout(() => resolve() || store.commit('setPageName', 'Проекты'), 1000)
    })
  },
  name: 'name'
}
</script>

<style lang="scss" scoped>
</style>
