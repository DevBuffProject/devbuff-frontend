<template>
  <div>
    <UseOnline v-slot="{ isOnline }">
      <div
        v-if="!isOnline"
        class="
          bg-red-500
          text-white text-sm
          font-semibold
          transition-all
          flex
          justify-center
          items-center
          h-6
        "
        :class="!isOnline ? 'mt-0' : '-mt-6'"
      >
        <AtomicLoadingSpinner />
        <span class="mt-px ml-4">связь с интернетом пропала</span>
      </div>
    </UseOnline>
    <header
      class="
        backdrop-blur-[10px]
        flex flex-col
        justify-center
        items-center
        dark:bg-dark-700
        bg-white bg-opacity-80
        dark:bg-opacity-80
        backdrop-filter
        h-[62px]
        border-b border-default
      "
      style="box-shadow: 0 5px 8px #00098000, 0 5px 16px rgb(0 9 128 / 5%)"
    >
      <div class="container flex mx-auto">
        <div class="flex items-center w-full">
          <RouterLink to="/" custom v-slot="{ href, navigate }">
            <a :href="href" @click="navigate">
              <AtomicLogo
                :src="`/images/logos/logo-${isDark ? 'light' : 'dark'}.svg`"
              />
            </a>
          </RouterLink>
        </div>
        <div class="flex items-center">
          <WidgetUserNotification v-if="isLoggedIn" />
          <WidgetColorSwitcher class="ml-4" />

          <nav class="hidden lg:block ml-6" v-if="isLoggedIn">
            <RouterLink v-slot="{ isActive }" to="/create">
              <AtomicButton :disabled="isActive">
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
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuth, useAppearance, useI18n } from '../../composes'

export default defineComponent({
  setup() {
    const { t } = useI18n('components.layout.header')
    const { isDark, isLight } = useAppearance()
    const { isLoggedIn } = useAuth()
    return { t, isDark, isLight, isLoggedIn }
  },
})
</script>
