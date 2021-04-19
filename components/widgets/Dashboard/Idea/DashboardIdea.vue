<template>
  <v-card class="mb-6 group" v-on="$listeners">
    <template #controls>
      <div
        class="text-xs text-gray-500 flex items-center justify-between w-full"
      >
        <div class="flex"></div>
        <div>
          <div
            class="flex items-center cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <span class="mr-1 capitalize"> Смотреть отклики </span>
            <svg-icon
              name="chevrons/chevron-right"
              class="text-sm text-primary"
            />
          </div>
        </div>
      </div>
    </template>
    <template #bottom> </template>

    <div class="transition-all cursor-pointer">
      <div class="flex items-start justify-between">
        <div>
          <div class="text-xs text-gray-400 dark:text-blueGray-400">
            {{ date | toLocaleDateTime($i18n.locale) }}
          </div>
          <nuxt-link
            :to="localePath({ name: 'ideas-id', params: { id } })"
            class="text-primary hover:underline text-xl"
          >
            {{ title }}
          </nuxt-link>
        </div>
      </div>
      <div class="mt-2 text-sm text-gray-500 leading-5">
        {{ description }}
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'VDashboardIdea',
  props: {
    date: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    waitingValidation: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
