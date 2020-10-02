<template>
  <div>
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ $t('page.dashboard.title') }} </h3>
        </div>
        <div>
          <!-- ... -->
        </div>
      </div>
    </v-toolbar>

    <div class="container">
      <v-card style="width: 500px;">
        <template #header>
          <div class="d-flex align-items-center w-100">
            <v-skeleton
              class="w-50"
              figure="line"
            />
          </div>
        </template>

        <div class="d-flex w-100">
          <v-skeleton
            class="mr-3"
            figure="tile"
          />
          <v-skeleton-paragraph class="w-100" />
        </div>

        <template #footer>
          <div class="d-flex justify-content-end w-100">
            <v-skeleton
              class="w-25"
              figure="line"
            />
          </div>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'name'
}
</script>

<style lang="scss" scoped>
</style>
