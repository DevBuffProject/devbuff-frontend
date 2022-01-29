<template>
  <aside>
    <nav>
      <div class="mb-8 block relative group">
        <template v-if="isLoggedIn && user.id">
          <AppLink
            :to="{ name: 'user', params: { UUID: user.id } }"
            class="block p-1"
            v-slot="{ navigate }"
            v-ripple
          >
            <WidgetUser :user="user" @click="navigate" class="block" />
          </AppLink>
          <AppLink
            :to="{ name: 'user-edit' }"
            :class="'p-1 absolute -left-10 top-3 text-xs rounded-full transition-opacity opacity-30 group-hover:opacity-100'"
          >
            <BaseButton>
              <EditIcon />
            </BaseButton>
          </AppLink>
        </template>
      </div>

      <div
        v-if="!isLoggedIn"
        class="p-5 mb-5 bg-primary-500 bg-opacity-10 rounded-xl"
      >
        <h4 class="mt-0">{{ t('loginVia') }}</h4>

        <AtomicButton
          class="w-full flex items-center justify-center"
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

        <div class="mt-0">{{ t('loginReason') }}</div>
      </div>

      <AppLink
        v-for="link in nav"
        :key="link.title"
        :to="link.to"
        v-slot="{ isActive, isLoading }"
        class="flex items-center mb-2 cursor-pointer transition-all group"
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
          "
        >
          <AtomicSquircle
            :width="35"
            :height="35"
            :color="link.color"
            :roundness="1"
            background
            class="mr-4 transition-opacity group-hover:opacity-100"
            :class="{ 'opacity-100': isActive, 'opacity-50': !isActive }"
            :style="{ color: link.textColor }"
          >
            <AtomicLoadingSpinner v-if="isLoading" />
            <component v-else :is="link.icon" />
          </AtomicSquircle>
          <span class="text-md font-medium">{{ link.title }}</span>
        </div>
      </AppLink>

      <template v-if="isLoggedIn">
        <div class="divider-x my-6 ml-12" />
        <BaseButton
          class="
            flex
            items-center
            rounded-full
            pl-16
            py-1
            w-full
            !justify-start
            cursor-pointer
            transition-all
            text-danger-500
          "
          @click="logoutProcess"
        >
          <span class="text-md font-medium"> {{ t('links.logout') }} </span>
        </BaseButton>
      </template>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth, useI18n } from '../../composes'
import { useRouter } from '../../core/router'
import {
  SearchIcon,
  DashboardIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  HashtagIcon,
} from '@iconicicons/vue3'

const { t } = useI18n('components.layout.sidebar')
const {
  initAuth,
  logout,
  PROVIDERS: AuthProviders,
  isLoggedIn,
  isAdmin,
} = useAuth()
const { user } = useAuth()
const loadingRoute = ref({})
const router = useRouter()
const nav = computed(() =>
  [
    {
      title: t('links.explore'),
      icon: HashtagIcon,
      to: '/explore',
      exact: true,
      color: '#b6e0fe',
      textColor: '#003e6b',
    },

    isLoggedIn.value && {
      title: t('links.dashboard'),
      icon: UserIcon,
      to: '/dashboard',
      exact: true,
      color: '#c1f2c7',
      textColor: '#014807',
    },

    isLoggedIn.value && {
      title: t('links.settings'),
      icon: SettingsIcon,
      to: { name: 'user-edit' },
      exact: true,
      color: '#ffb8d2',
      textColor: '#620042',
    },

    isAdmin.value && {
      title: t('links.superuser'),
      icon: ShieldIcon,
      to: '/su',
      exact: true,
      color: '#ffb8d2',
      textColor: '#620042',
    },
  ].filter(Boolean),
)

const logoutProcess = () => {
  router.replace({ name: 'explore' })
  logout()
}

router.afterEach(() => (loadingRoute.value = ''))
</script>
