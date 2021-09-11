<template>
  <div
    class="
      fixed
      z-50
      bottom-0
      w-full
      h-[50px]
      backdrop-blur-[10px]
      flex flex-col
      justify-center
      items-center
      dark:bg-dark-500
      bg-white bg-opacity-70
      dark:bg-opacity-50
      backdrop-filter
      border-t border-default
    "
    style="touch-action: none"
  >
    <div class="flex justify-around flex-row w-full">
      <template v-if="isLoggedIn">
        <RouterLink
          :to="{ name: 'explore' }"
          :class="styles['btn']"
          :active-class="styles['btn--active']"
        >
          <SearchIcon />
        </RouterLink>
        <RouterLink
          :to="{ name: 'dashboard' }"
          :class="styles['btn']"
          :active-class="styles['btn--active']"
        >
          <DashboardIcon />
        </RouterLink>
        <RouterLink
          v-if="isAdmin"
          :to="{ name: 'superuser' }"
          :class="styles['btn']"
          :active-class="styles['btn--active']"
        >
          <ShieldIcon />
        </RouterLink>
        <RouterLink
          :to="{ name: 'settings' }"
          :class="styles['btn']"
          :active-class="styles['btn--active']"
        >
          <SettingsIcon />
        </RouterLink>
      </template>
      <template v-else>
        <div
          class="
            text-dark-50
            dark:text-light-50
            flex flex-row
            divide-x divide-default
            w-full
          "
        >
          <div
            class="w-full flex items-center justify-center"
            @click="initAuth(AuthProviders.GitHub)"
          >
            <div class="flex items-center">
              <Svg name="Github" />
              <span class="ml-2">войти с GitHub</span>
            </div>
          </div>

          <div
            class="w-full flex items-center justify-center"
            @click="initAuth(AuthProviders.GitLab)"
          >
            <div class="flex items-center">
              <Svg name="Gitlab" />
              <span class="ml-2">войти с GitLab</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, useCssModule } from 'vue'
import { useAuth, useI18n } from '../../composes'

export default defineComponent({
  name: 'BottomNav',
  setup() {
    const styles = useCssModule()
    const { t } = useI18n('components.layout.sidebar')
    const { logout, isLoggedIn, isAdmin } = useAuth()
    const { initAuth, PROVIDERS: AuthProviders } = useAuth()

    return {
      styles,
      isAdmin,
      isLoggedIn,
      AuthProviders,
      initAuth,
    }
  },
})
</script>

<style module>
.btn {
  @apply rounded-md py-1.5 px-4 transition-all transform;
}
.btn--active {
  @apply text-primary-500;
}
</style>
