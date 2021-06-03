<template>
  <aside>
    <nav>
      <router-link v-if="isLoggedIn" to="/" custom v-slot="{ navigate }">
        <div class="mb-8">
          <WidgetUser
            avatar-gradient-border
            :avatar="user.avatar"
            :firstname="user.firstName"
            :lastname="user.lastName"
            :username="user.userName"
            @click="navigate"
            class="block"
            v-focusable
          />
        </div>
      </router-link>
      <div
        v-if="!isLoggedIn"
        class="p-5 mb-5 bg-primary bg-opacity-10 rounded-xl"
      >
        <h4 class="mt-0">Login via</h4>

        <AtomicButton
          class="w-full mb-2 flex items-center justify-center"
          v-focusable.indexOnly
          @click="initAuth(AuthProviders.GitHub)"
        >
          <div class="text-black dark:text-blueGray-50 flex items-center">
            <Svg name="Github" />
            <span class="ml-2">GitHub</span>
          </div>
        </AtomicButton>

        <AtomicButton
          class="w-full mb-4 flex items-center justify-center"
          v-focusable.indexOnly
          @click="initAuth(AuthProviders.GitLab)"
        >
          <div class="text-black dark:text-blueGray-50 flex items-center">
            <Svg name="Gitlab" />
            <span class="ml-2">GitLab</span>
          </div>
        </AtomicButton>
        <div class="mt-0">login for publish idea and respond</div>
      </div>

      <template v-for="link in nav" :key="link.title">
        <router-link v-slot="{ href, navigate, isActive }" :to="link.to" custom>
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
              :class="[
                'flex items-center pr-4 pl-3 py-2 rounded-full transition-colors',
                'group-focus:bg-primary group-focus:text-primary group-focus:bg-opacity-10',
                'group-hover:bg-primary group-hover:text-primary group-hover:bg-opacity-10 group-active:bg-opacity-20',
                link.activeState !== false && isActive
                  ? 'text-primary'
                  : 'text-gray-900 dark:text-blueGray-300',
              ]"
            >
              <div class="mr-4 w-6 h-6 flex items-center justify-center">
                <AtomicLoadingSpinner
                  v-if="link.to === loadingRoute"
                  class="text-primary"
                />
                <component v-else :is="link.icon" />
              </div>
              <span class="text-md font-medium"> {{ link.title }} </span>
            </div>
          </a>
        </router-link>
      </template>
      <template v-if="isLoggedIn">
        <AtomicDelimiter class="mx-10 my-4" />
        <div
          :class="[
            'flex items-center rounded-full px-4 py-2 mb-2 cursor-pointer transition-all',
            'hover:bg-danger text-danger hover:bg-opacity-10 focus:bg-danger focus:bg-opacity-10',
          ]"
          v-focusable.indexOnly
          @click="logout"
        >
          <LogOutIcon class="mr-4" />
          <span class="text-md font-medium"> log out </span>
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
import { useGlobalState } from '../../store'

export default defineComponent({
  setup() {
    const { initAuth, logout, PROVIDERS: AuthProviders, isLoggedIn } = useAuth()
    const state = useGlobalState()
    const user = state.value.user
    const loadingRoute = ref({})
    const router = useRouter()
    const nav = computed(() =>
      [
        {
          title: 'Explore',
          icon: SearchIcon,
          to: '/explore',
          exact: true,
        },
        isLoggedIn.value && {
          title: 'Dashboard',
          icon: DashboardIcon,
          to: '/dashboard',
          exact: true,
        },
        isLoggedIn.value && {
          title: 'Settings',
          icon: SettingsIcon,
          to: '/',
          exact: true,
        },
        isLoggedIn.value && {
          title: 'Superuser',
          icon: ShieldIcon,
          to: '/su',
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
