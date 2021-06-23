<template>
  <header
    class="flex flex-col items-center bg-white dark:bg-blueGray-800"
    style="box-shadow: 0 5px 8px #00098000, 0 5px 16px rgb(0 9 128 / 5%)"
  >
    <div class="container mx-auto flex py-4">
      <div class="w-full flex items-center">
        <RouterLink to="/" custom v-slot="{ href, navigate }">
          <a :href="href" @click="navigate" v-focusable>
            <AtomicLogo
              :src="`/images/logos/logo-${isDark ? 'light' : 'dark'}.svg`"
            />
          </a>
        </RouterLink>
      </div>
      <div class="flex items-center">
        <div
          :class="[
            'flex items-center mr-4 pr-6',
            'border-r border-gray-200 dark:border-blueGray-600',
          ]"
        >
          <WidgetUserNotification v-focusable />
        </div>
        <div
          :class="[
            'flex items-center mr-4 pr-6',
            'border-r border-gray-200 dark:border-blueGray-600',
          ]"
        >
          <WidgetColorSwitcher v-focusable />
        </div>
        <nav class="flex items-center">
          <RouterLink v-slot="{ isActive }" to="/">
            <AtomicButton
              :disabled="isActive"
              v-focusable.indexOnly="{ indexOnly: true }"
            >
              <template #icon> <EditIcon /> </template>
              Create new idea
            </AtomicButton>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppearance } from '../../composes/utils'

export default defineComponent({
  setup() {
    const { isDark, isLight } = useAppearance()

    return { isDark, isLight }
  },
})
</script>
