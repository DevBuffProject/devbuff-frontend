<template>
  <aside>
    <nav>
      <nuxt-link
        v-if="$auth.loggedIn"
        :to="localePath({ name: 's-profile' })"
        class="mb-8 ml-4 block"
      >
        <widget-user
          avatar-gradient-border
          :avatar="profile.avatar"
          :firstname="profile.firstName"
          :lastname="profile.lastName"
          :username="profile.userName"
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
              'flex items-center rounded-full px-4 py-2 mb-2 cursor-pointer',
              'transition-all hover:bg-gray-200 dark:hover:bg-blueGray-800 bg-opacity-50',
              'transform active:scale-95',
              link.activeState !== false && isActive
                ? 'text-primary'
                : 'text-gray-900 dark:text-blueGray-300',
            ]"
            @click="goNavigate($event, link.to, navigate)"
          >
            <div class="mr-4 w-6 h-6 flex items-center justify-center">
              <atomic-loading v-if="link.to === loadingRoute" />
              <svg-icon v-else :name="link.icon" />
            </div>
            <span class="text-md font-medium"> {{ link.title }} </span>
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
        v-if="$auth.loggedIn"
        :class="[
          'flex items-center rounded-full px-4 py-1.5 mb-2 cursor-pointer',
          'transition-colors hover:bg-danger text-danger hover:bg-opacity-10',
        ]"
      >
        <div>
          <svg-icon name="account/log-out" class="mr-4" />
        </div>
        <span class="text-md font-medium">
          {{ $t('layouts.sidebar.logOut') }}
        </span>
      </div>
    </nav>
  </aside>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loadingRoute: {},
  }),
  computed: {
    profile() {
      return this.$auth.user
    },
    nav() {
      const main = [
        {
          title: this.$t('components.header.overview'),
          icon: 'net/search',
          to: this.localePath({ name: 'ideas' }),
          exact: true,
        },
      ]

      const adminNav = []
      const userNav = []

      if (this.$auth.loggedIn) {
        main.push(
          {
            title: this.$t('components.header.dashboard'),
            icon: 'edit/layout',
            to: this.localePath({ name: 's-dashboard' }),
            exact: true,
          },
          {
            title: this.$t('layouts.sidebar.settings'),
            icon: 'menu/settings',
            to: this.localePath({
              ...this.$route,
              query: { ...this.$route.query, act: 'settings' },
            }),
            activeState: false,
          }
        )
      }

      if (this.$auth.hasScope('ROLE_ADMIN'))
        adminNav.push({
          title: 'Super user',
          icon: 'security/shield',
          to: this.localePath({ name: 'superuser' }),
        })

      return Object.values({ main, userNav, adminNav }).filter(
        (nav) => nav.length > 0
      )
    },
  },
  created() {
    this.$router.afterEach(() => {
      this.loadingRoute = {}
    })
  },
  methods: {
    ...mapActions('session', ['authorize']),
    async goNavigate(event, route, next) {
      if (this.$route.path === route) return event.preventDefault()
      this.loadingRoute = route
      await next(event)
    },
  },
}
</script>
