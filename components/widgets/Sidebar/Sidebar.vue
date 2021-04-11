<template>
  <aside>
    <nav>
      <nuxt-link
        v-if="isAuth"
        :to="localePath({ name: 's-profile' })"
        class="mb-8 block"
      >
        <v-user
          avatar-gradient-border
          :user-id="profile.id"
          :firstname="profile.firstName"
          :lastname="profile.lastName"
          :username="profile.userName"
        />
      </nuxt-link>
      <div v-else class="p-5 mb-5 bg-primary bg-opacity-10 rounded-xl">
        <v-button class="w-full" @click="authorize">Войти</v-button>
        <div class="mt-2 text-xs font-medium">
          Чтобы публиковать проекты, собирать команду и откликаться на идеи
          пользователей
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
              'flex items-center rounded-full px-4 py-1.5 mb-2 cursor-pointer',
              'transition-all hover:bg-gray-100 dark:hover:bg-blueGray-800',
              'transform active:scale-95',
              link.activeState !== false && isActive
                ? 'text-primary'
                : 'text-gray-900 dark:text-blueGray-300',
            ]"
            @click="goNavigate($event, link.to, navigate)"
          >
            <div class="mr-4 w-6 h-6 flex items-center justify-center">
              <v-loading v-if="link.to === loadingRoute" />
              <v-material-icon v-else :name="link.icon" class="text-2xl" />
            </div>
            <span class="text-md font-semibold"> {{ link.title }} </span>
          </a>
        </nuxt-link>
        <div v-if="index < nav.length - 1" :key="index" class="mx-10 my-4">
          <v-delimiter />
        </div>
      </template>
      <div class="mx-10 my-4">
        <v-delimiter />
      </div>
      <div
        v-if="isAuth"
        :class="[
          'sticky bottom-10',
          'flex items-center rounded-full px-4 py-1.5 mb-2 cursor-pointer',
          'transition-colors hover:bg-danger text-danger hover:bg-opacity-10',
        ]"
      >
        <v-material-icon name="logout" class="text-2xl mr-4" />
        <span class="text-md font-semibold"> Выйти </span>
      </div>
    </nav>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    loadingRoute: {},
  }),
  computed: {
    ...mapGetters('session', ['isAdmin', 'isAuth']),
    ...mapGetters('user', ['profile', 'fullName']),
    nav() {
      const main = [
        {
          title: this.$t('components.header.overview'),
          icon: 'search',
          to: this.localePath({ name: 'ideas' }),
          exact: true,
        },
      ]

      const adminNav = []
      const userNav = []

      if (this.isAuth) {
        main.push(
          {
            title: this.$t('components.header.dashboard'),
            icon: 'space_dashboard',
            to: this.localePath({ name: 's-dashboard' }),
            exact: true,
          },
          {
            title: 'Настройки',
            icon: 'settings',
            to: this.localePath({ ...this.$route, query: { act: 'settings' } }),
            activeState: false,
          }
        )
      }

      if (this.isAdmin)
        adminNav.push({
          title: 'admin',
          icon: 'admin_panel_settings',
          to: this.localeRoute({ name: 'a' }),
        })

      return Object.values({ main, userNav, adminNav }).filter(
        (nav) => nav.length > 0
      )
    },
  },
  created() {
    this.$router.afterEach((to) => {
      this.loadingRoute = {}
    })
  },
  methods: {
    ...mapActions('session', ['authorize']),
    async goNavigate(event, route, next) {
      this.loadingRoute = route
      await next(event)
    },
  },
}
</script>
