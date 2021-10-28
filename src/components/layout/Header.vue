<template>
  <header>
    <div
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
      "
      style="box-shadow: 0 5px 8px #00098000, 0 5px 16px rgb(0 9 128 / 5%)"
    >
      <div class="container flex mx-auto">
        <div class="flex items-center w-full">
          <AppLink to="/">
            <AtomicLogo
              :src="`/images/logos/logo-${isDark ? 'light' : 'dark'}.svg`"
              class="p-1 rounded"
              v-ripple
            />
          </AppLink>
        </div>
        <div class="flex items-center">
          <WidgetUserNotification v-if="isLoggedIn" />
          <WidgetColorSwitcher class="ml-4" />

          <nav class="hidden lg:block ml-6" v-if="isLoggedIn">
            <AppLink v-slot="{ isActive, isLoading }" to="/create">
              <AtomicButton :disabled="isActive || isLoading">
                <div class="mr-4">
                  <AtomicLoadingSpinner v-if="isLoading" />
                  <AnnouncementIcon v-else />
                </div>

                {{ t('newIdea') }}
              </AtomicButton>
            </AppLink>
          </nav>
        </div>
      </div>
    </div>

    <div id="header-nprogress-container" class="h-[2px] overflow-hidden" />
  </header>
</template>

<script setup>
import { useAuth, useAppearance, useI18n } from '../../composes'

const { t } = useI18n('components.layout.header')
const { isDark, isLight } = useAppearance()
const { isLoggedIn } = useAuth()
</script>
