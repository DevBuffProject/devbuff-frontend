<template>
  <div
    :class="[
      'border-b border-gray-200 bg-white dark:bg-blueGray-800 dark:border-blueGray-700',
      'sticky top-0 z-40 w-full',
    ]"
  >
    <div class="flex items-center container mx-auto">
      <div class="flex items-center w-full">
        <nuxt-link
          v-for="(link, index) in nav"
          :key="index"
          v-slot="{ isActive, isExactActive, href, navigate }"
          :to="link.to"
        >
          <a
            :href="href"
            :class="[
              'block mr-8 py-3 transition-opacity opacity-50 hover:opacity-100 text-white dark:text-blueGray-50',
              'border-b-2 border-purple-500 border-opacity-0 flex items-center',
              isExactActive
                ? 'text-black dark:text-white border-opacity-100'
                : 'text-gray-900 dark:text-blueGray-50',
              isActive && 'opacity-100 bg-opacity-10',
            ]"
            @click="navigate"
          >
            <span class="text-sm font-normal">{{ link.title }}</span>
          </a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSubheader',
  props: {
    nav: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
