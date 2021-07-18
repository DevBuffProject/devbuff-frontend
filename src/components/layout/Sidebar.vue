<template>
  <aside>
    <nav>
      <router-link v-if="isLoggedIn" to="/" custom v-slot="{ navigate }">
        <div class="mb-8">
          <WidgetUser
            :user="user"
            @click="navigate"
            class="block"
            v-focusable
          />
        </div>
      </router-link>
      <div
        v-if="!isLoggedIn"
        class="p-5 mb-5 bg-primary-500 bg-opacity-10 rounded-xl"
      >
        <h4 class="mt-0">
          {{ t('loginVia') }}
        </h4>

        <AtomicButton
          class="w-full flex items-center justify-center"
          v-focusable.indexOnly
          @click="initAuth(AuthProviders.GitHub)"
        >
          <div class="text-white dark:text-dark-50 flex items-center">
            <Svg class="dark:text-black" name="Github" />
            <span class="ml-2">GitHub</span>
          </div>
        </AtomicButton>

        <div class="mt-2 mb-2">
          <AtomicButton
            class="w-full flex items-center justify-center"
            v-focusable.indexOnly
            @click="initAuth(AuthProviders.GitLab)"
          >
            <div class="text-white dark:text-dark-50 flex items-center">
              <Svg name="Gitlab" />
              <span class="ml-2">GitLab</span>
            </div>
          </AtomicButton>
        </div>
        <div class="mt-0">
          {{ t('loginReason') }}
        </div>
      </div>

      <template v-for="link in nav" :key="link.title">
        <router-link :to="link.to" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            :class="[
              'flex items-center mb-2 cursor-pointer',
              'transition-all group',
            ]"
            @click="goNavigate($event, link.to, navigate)"
            v-focusable.indexOnly
          >
            <div
              class="
                flex
                items-center
                pr-4
                pl-3
                py-1.5
                rounded-full
                transition-colors
                group-focus:bg-primary-400
                group-focus:text-primary-500
                group-focus:bg-opacity-10
                group-hover:bg-primary-400
                group-hover:text-primary-500
                group-hover:bg-opacity-10
                group-active:bg-opacity-20
              "
              :class="{
                'text-primary-500': link.activeState !== false && isActive,
              }"
            >
              <div class="mr-4 w-6 h-6 flex items-center justify-center">
                <AtomicLoadingSpinner
                  v-if="link.to === loadingRoute"
                  class="text-primary-500"
                />
                <component v-else :is="link.icon" />
              </div>
              <span class="text-md font-medium"> {{ link.title }} </span>
            </div>
          </a>
        </router-link>
      </template>
      <template v-if="isLoggedIn">
        <div
          :class="[
            'flex items-center rounded-full px-4 py-1 mt-8 cursor-pointer transition-all',
            'hover:bg-danger-500 text-danger-500 hover:bg-opacity-10 focus:bg-danger-500 focus:bg-opacity-10',
          ]"
          v-focusable.indexOnly
          @click="logout"
        >
          <LogOutIcon class="mr-3" />
          <span class="text-md font-medium"> {{ t('links.logout') }} </span>
        </div>
      </template>
    </nav>
  </aside>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useUser } from '../../composes/core'
import {
  SearchIcon,
  DashboardIcon,
  SettingsIcon,
  ShieldIcon,
} from '@iconicicons/vue3'
import { useI18n } from '../../composes/utils'

export default defineComponent({
  setup() {
    const { t } = useI18n('components.layout.sidebar')
    const {
      initAuth,
      logout,
      PROVIDERS: AuthProviders,
      isLoggedIn,
      isAdmin,
    } = useAuth()
    const { user } = useUser()
    const loadingRoute = ref({})
    const router = useRouter()
    const nav = computed(() =>
      [
        {
          title: t('links.explore'),
          icon: SearchIcon,
          to: '/explore',
          exact: true,
        },
        isLoggedIn.value && {
          title: t('links.dashboard'),
          icon: DashboardIcon,
          to: '/dashboard',
          exact: true,
        },
        isAdmin.value && {
          title: t('links.superuser'),
          icon: ShieldIcon,
          to: '/su',
          exact: true,
        },
        isLoggedIn.value && {
          title: t('links.settings'),
          icon: SettingsIcon,
          to: { name: 'settings', params: { _isDialog: true } },
          exact: true,
        },
      ].filter((i) => !!i),
    )
    const goNavigate = async (event, route, next) => {
      if (route.path === route) return event.preventDefault()
      loadingRoute.value = route
      await next(event)
    }

    router.afterEach(() => (loadingRoute.value = ''))

    return {
      t,
      user,
      AuthProviders,
      isLoggedIn,
      nav,
      loadingRoute,
      initAuth,
      logout,
      goNavigate,
    }
  },
})
</script>
