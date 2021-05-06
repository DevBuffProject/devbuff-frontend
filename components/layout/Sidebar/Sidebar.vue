<template>
  <aside>
    <nav>
      <nuxt-link
        v-if="$store.getters['auth/isAuth']"
        :to="localePath({ name: 's-profile' })"
        class="mb-8 ml-4 block"
      >
        <widget-user
          v-motion-fade
          avatar-gradient-border
          :avatar="user.avatar"
          :firstname="user.firstName"
          :lastname="user.lastName"
          :username="user.userName"
        />
      </nuxt-link>
      <div v-else class="p-5 mb-5 bg-primary bg-opacity-10 rounded-xl">
        <atomic-button class="w-full" @click="authorize">
          {{ $t('layouts.sidebar.signInButton') }}
        </atomic-button>
        <div class="mt-2 text-xs font-medium">
          {{ $t('layouts.sidebar.notAuthorized') }}
        </div>
      </div>

      <template v-for="(section, index) in nav">
        <nuxt-link
          v-for="link in section"
          :key="link.title"
          v-slot="{ href, navigate, isActive }"
          :to="link.to"
        >
          <a
            :href="href"
            :class="[
              'flex items-center mb-2 cursor-pointer',
              'transition-all transform active:scale-95 group',
            ]"
            @click="goNavigate($event, link.to, navigate)"
          >
            <div
              :class="[
                'flex items-center pr-4 pl-3 py-2 rounded-full group-hover:text-primary',
                'transition-all group-hover:bg-primary group-hover:bg-opacity-10',
                link.activeState !== false && isActive
                  ? 'text-primary'
                  : 'text-gray-900 dark:text-blueGray-300',
              ]"
            >
              <div class="mr-4 w-6 h-6 flex items-center justify-center">
                <atomic-loading-spinner
                  v-if="link.to === loadingRoute"
                  class="text-primary"
                />
                <svg-icon v-else :name="link.icon" />
              </div>
              <span class="text-md font-medium"> {{ link.title }} </span>
            </div>
          </a>
        </nuxt-link>
        <div v-if="index < nav.length - 1" :key="index" class="mx-10 my-4">
          <atomic-delimiter />
        </div>
      </template>
      <div class="mx-10 my-4">
        <atomic-delimiter />
      </div>
      <div
        v-if="user"
        :class="[
          'flex items-center rounded-full px-4 py-2 mb-2 cursor-pointer',
          'transition-all hover:bg-danger text-danger hover:bg-opacity-10',
          'transform active:scale-95',
        ]"
      >
        <svg-icon name="outline/logout" class="mr-4" />
        <span class="text-md font-medium">
          {{ $t('layouts.sidebar.logOut') }}
        </span>
      </div>
    </nav>
  </aside>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import { useUser, useLocale } from '~/composes'

export default defineComponent({
  setup() {
    const loadingRoute = ref({})
    const router = useRouter()
    const { query, ...route } = computed(useRoute)
    const { user } = useUser()
    const { t, localePath } = useLocale()
    const nav = computed(() => {
      const main = [
        {
          title: t`components.header.overview`,
          icon: 'outline/search',
          to: localePath({ name: 'ideas' }),
          exact: true,
        },
      ]
      const adminNav = []
      const userNav = []

      if (user) {
        main.push(
          {
            title: t`components.header.dashboard`,
            icon: 'outline/collection',
            to: localePath({ name: 's-dashboard' }),
            exact: true,
          },
          {
            title: t`layouts.sidebar.settings`,
            icon: 'outline/cog',
            to: localePath({
              ...route.value,
              query: { ...query, act: 'settings' },
            }),
            activeState: false,
          }
        )
      }
      if (user)
        adminNav.push({
          title: 'Super user',
          icon: 'outline/shield-check',
          to: localePath({ name: 'superuser' }),
        })

      return Object.values({ main, userNav, adminNav }).filter(
        (nav) => nav.length > 0
      )
    })
    const goNavigate = async (event, route, next) => {
      if (route.path === route) return event.preventDefault()
      loadingRoute.value = route
      await next(event)
    }

    router.afterEach(() => (loadingRoute.value = ''))

    return {
      nav,
      user,
      loadingRoute,
      goNavigate,
    }
  },
  methods: {
    ...mapActions('session', ['authorize']),
  },
})
</script>
