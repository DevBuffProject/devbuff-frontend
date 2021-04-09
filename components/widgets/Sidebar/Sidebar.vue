<template>
  <aside>
    <nav>
      <nuxt-link
        v-if="isAuthorized"
        :to="localePath({ name: 's-profile' })"
        :class="[
          'flex items-center rounded-full px-4 mb-5 cursor-pointer',
          'transition-colors hover:dark:bg-blueGray',
        ]"
      >
        <v-avatar :avatar="$store.getters['user/profile'].id" class="mr-4" />
        <div>
          <div class="text-md font-semibold">{{ profile.firstName }}</div>
          <div class="text-xs mt-1 text-gray-500 dark:text-blueGray-700">
            @{{ profile.userName }}
          </div>
        </div>
      </nuxt-link>

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
              isActive
                ? 'text-primary'
                : 'text-gray-900 dark:text-blueGray-500',
            ]"
            @click="navigate"
          >
            <v-material-icon :name="link.icon" class="text-2xl mr-4" />
            <span class="text-md font-semibold"> {{ link.title }} </span>
          </a>
        </nuxt-link>
        <div v-if="index < nav.length - 1" :key="index" class="mx-10">
          <v-delimiter />
        </div>
      </template>

      <div
        :class="[
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isAdmin']),
    ...mapGetters('user', ['isAuthorized', 'profile', 'fullName']),
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

      if (this.isAuthorized) {
        main.push({
          title: this.$t('components.header.dashboard'),
          icon: 'space_dashboard',
          to: this.localePath({ name: 's-dashboard' }),
          exact: true,
        })
        userNav.push({
          title: 'Настройки',
          icon: 'settings',
          to: this.localePath({ name: 's-profile' }),
          exact: true,
        })
      }

      if (this.isAdmin)
        adminNav.push({
          title: 'admin',
          icon: 'admin_panel_settings',
          to: this.localePath({ name: 'a' }),
        })

      return Object.values({ main, userNav, adminNav })
    },
  },
}
</script>
