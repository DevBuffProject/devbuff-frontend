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
          class="w-full mb-4 content-center"
          v-focusable.indexOnly
          @click="initAuth(AuthProviders.GitHub)"
        >
          <span
            style="align-items: center"
            class="content-center place-items-center inline-flex"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="circle-notch"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20px"
              class="flex"
            >
              <path
                fill="currentColor"
                d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14   c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5   c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7   c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3   c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7   C480,134.8,379.7,32,256,32z"
              />
            </svg>
            <div class="flex">GitHub</div>
          </span>
        </AtomicButton>
        <AtomicButton
          class="w-full"
          v-focusable.indexOnly
          @click="initAuth(AuthProviders.GitLab)"
        >
          <span
            style="align-items: center"
            class="content-center place-items-center inline-flex"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="circle-notch"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 210 194"
              width="20px"
              class="flex"
            >
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Fill-1-+-Group-24">
                  <g id="Group-24">
                    <g id="Group">
                      <path
                        d="M105.0614,193.655 L105.0614,193.655 L143.7014,74.734 L66.4214,74.734 L105.0614,193.655 L105.0614,193.655 Z"
                        id="Fill-4"
                        fill="#E24329"
                      ></path>
                      <path id="Fill-6" fill="#FC6D26"></path>
                      <path
                        d="M105.0614,193.6548 L66.4214,74.7338 L12.2684,74.7338 L105.0614,193.6548 Z"
                        id="Fill-8"
                        fill="#FC6D26"
                      ></path>
                      <path id="Fill-10" fill="#FC6D26"></path>
                      <path
                        d="M12.2685,74.7341 L12.2685,74.7341 L0.5265,110.8731 C-0.5445,114.1691 0.6285,117.7801 3.4325,119.8171 L105.0615,193.6551 L12.2685,74.7341 Z"
                        id="Fill-12"
                        fill="#FCA326"
                      ></path>
                      <path id="Fill-14" fill="#FC6D26"></path>
                      <path
                        d="M12.2685,74.7342 L66.4215,74.7342 L43.1485,3.1092 C41.9515,-0.5768 36.7375,-0.5758 35.5405,3.1092 L12.2685,74.7342 Z"
                        id="Fill-16"
                        fill="#E24329"
                      ></path>
                      <path
                        d="M105.0614,193.6548 L143.7014,74.7338 L197.8544,74.7338 L105.0614,193.6548 Z"
                        id="Fill-18"
                        fill="#FC6D26"
                      ></path>
                      <path
                        d="M197.8544,74.7341 L197.8544,74.7341 L209.5964,110.8731 C210.6674,114.1691 209.4944,117.7801 206.6904,119.8171 L105.0614,193.6551 L197.8544,74.7341 Z"
                        id="Fill-20"
                        fill="#FCA326"
                      ></path>
                      <path
                        d="M197.8544,74.7342 L143.7014,74.7342 L166.9744,3.1092 C168.1714,-0.5768 173.3854,-0.5758 174.5824,3.1092 L197.8544,74.7342 Z"
                        id="Fill-22"
                        fill="#E24329"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div class="flex">GitLab</div>
          </span>
        </AtomicButton>
        <div class="mt-2 text-xs font-semibold">
          login for publish idea and respond
        </div>
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

    <!--    <AtomicDialog-->
    <!--      :visible="isSettingsVisible"-->
    <!--      @close="isSettingsVisible.value = false"-->
    <!--    >-->
    <!--    </AtomicDialog>-->
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
