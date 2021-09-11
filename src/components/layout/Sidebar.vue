<template>
  <aside class="w-[180px]">
    <nav>
      <router-link v-if="isLoggedIn" to="/" custom v-slot="{ navigate }">
        <WidgetUser :user="user" @click="navigate" class="block mb-8" />
      </router-link>
      <WidgetLogin v-else />

      <router-link
        v-for="link in nav"
        :key="link.title"
        :to="link.to"
        custom
        v-slot="{ href, isActive, navigate }"
      >
        <a
          :href="href"
          class="flex items-center mb-2 cursor-pointer transition-all group"
          @click="navigate"
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
              'text-primary-500': isActive,
            }"
          >
            <component
              :is="link.icon"
              class="mr-4 w-6 h-6 flex items-center justify-center"
            />
            <span class="text-md font-medium"> {{ link.title }} </span>
          </div>
        </a>
      </router-link>

      <div
        v-if="isLoggedIn"
        class="
          flex
          items-center
          rounded-full
          px-4
          py-1
          mt-8
          cursor-pointer
          transition-all
          hover:bg-danger-500
          text-danger-500
          hover:bg-opacity-10
          focus:bg-danger-500 focus:bg-opacity-10
        "
        v-focusable.indexOnly
        @click="logoutProcess"
      >
        <LogOutIcon class="mr-3" />
        <span class="text-md font-medium"> {{ t('links.logout') }} </span>
      </div>
    </nav>
  </aside>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useAuth, useUser, useI18n } from '../../composes'
import { useRouter } from '../../core/router'
import {
  SearchIcon,
  DashboardIcon,
  SettingsIcon,
  ShieldIcon,
} from '@iconicicons/vue3'

export default defineComponent({
  setup() {
    const { t } = useI18n('components.layout.sidebar')
    const { logout, isLoggedIn, isAdmin } = useAuth()
    const { user } = useUser()
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
          to: { name: 'settings' },
          exact: true,
        },
      ].filter(Boolean),
    )

    const logoutProcess = () => {
      router.replace({ name: 'explore' })
      logout()
    }

    return {
      t,
      logoutProcess,
      nav,
      user,
      isAdmin,
      isLoggedIn,
    }
  },
})
</script>
