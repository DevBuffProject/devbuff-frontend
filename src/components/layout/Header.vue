<template>
  <header
    class="
      backdrop-blur-[10px]
      flex flex-col
      items-center
      dark:bg-blueGray-800
      bg-white bg-opacity-80
      dark:bg-opacity-80
      backdrop-filter
    "
    style="box-shadow: 0 5px 8px #00098000, 0 5px 16px rgb(0 9 128 / 5%)"
  >
    <div class="container flex mx-auto">
      <div class="flex items-center w-full">
        <RouterLink to="/" custom v-slot="{ href, navigate }">
          <a :href="href" @click="navigate" v-focusable>
            <AtomicLogo
              :src="`/images/logos/logo-${isDark ? 'light' : 'dark'}.svg`"
            />
          </a>
        </RouterLink>
      </div>
      <div class="flex items-center">
        <div v-if="isLoggedIn">
          <WidgetUserNotification />
        </div>
        <div class="flex items-center ml-6 pr-6">
          <WidgetColorSwitcher v-focusable />
        </div>
        <nav
          :class="[
            'flex items-center pl-6',
            'border-l border-gray-200 dark:border-blueGray-600',
          ]"
          v-if="isLoggedIn"
        >
          <RouterLink v-slot="{ isActive }" to="/create">
            <AtomicButton
              :disabled="isActive"
              v-focusable.indexOnly="{ indexOnly: true }"
            >
              <template #icon>
                <EditIcon />
              </template>
              {{ t('newIdea') }}
            </AtomicButton>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppearance, useI18n } from '../../composes/utils'
import { useAuth } from '../../composes/core'

export default defineComponent({
  setup() {
    const { t } = useI18n('components.layout.header')
    const { isDark, isLight } = useAppearance()
    const { isLoggedIn } = useAuth()
    return { t, isDark, isLight, isLoggedIn }
  },
})
</script>
