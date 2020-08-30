<template>
  <v-card
    style="width: 500px;"
    class="idea-card-skeleton"
  >
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
      <v-skeleton-paragraph :rows="4" class="w-100" />
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
</template>
