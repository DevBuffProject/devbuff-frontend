<template>
  <div class="container mx-auto pt-4">
    <div class="idea">
      <div class="mt-3">
        <h1 class="idea__title mt-10 mb-3 p-0">
          {{ idea.name }}
        </h1>
        <div class="flex flex-wrap items-center justify-between mb-3">
          <div class="flex flex-wrap items-center my-5">
            <v-user
              :user-id="idea.ownerIdea.id"
              :firstname="idea.ownerIdea.firstName"
              :lastname="idea.ownerIdea.lastName"
              :username="idea.ownerIdea.userName"
              class="mr-10"
            />

            <v-label
              :name="$t('page.ideas.view.dateCreation')"
              class="mt-0 mr-8"
            >
              {{ idea.lastUpdateDate | toLocaleDateTime($i18n.locale) }}
            </v-label>

            <v-label
              :name="$t('page.ideas.view.status.title')"
              class="mt-0 mr-8"
            >
              {{ $t('page.ideas.view.status.' + idea.status) }}
            </v-label>

            <v-label
              v-if="isOwner"
              :name="$t('page.ideas.view.statusModeration.title')"
            >
              {{
                idea.waitingValidation
                  ? $t('page.ideas.view.statusModeration.waitingValidation')
                  : $t('page.ideas.view.statusModeration.alreadyApproved')
              }}
            </v-label>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-5">
          <v-card class="p-8 col-span-5" v-html="idea.text" />
          <div class="self-start col-span-2">
            <v-card class="overflow-hidden">
              <div class="flex justify-center items-center text-sm">
                <div
                  v-if="isOwner"
                  type="muted"
                  :class="[
                    'px-5 py-2 rounded w-full cursor-pointer flex flex-col justify-center items-center',
                    'transition-all transform active:scale-95 hover:bg-gray-100 dark:hover:bg-blueGray-800 text-primary',
                  ]"
                  @click="
                    $router.push(
                      localePath({ name: 's-editor', query: { id: idea.id } })
                    )
                  "
                >
                  <v-icon class="mb-1" :icon="['fas', 'edit']" />
                  <span>{{ $t('page.ideas.view.action.change') }}</span>
                </div>
                <i
                  v-if="isOwner"
                  class="bg-gray-200 dark:bg-blueGray-600 mx-2 w-px h-10"
                />
                <div
                  v-if="isOwner || isAdmin"
                  :class="[
                    'px-5 py-2 rounded w-full cursor-pointer flex flex-col justify-center items-center',
                    'transition-all transform active:scale-95 hover:bg-gray-100 dark:hover:bg-blueGray-800 text-danger',
                  ]"
                  @click="deleteIdea"
                >
                  <v-icon class="mb-1" :icon="['fas', 'trash']" />
                  <span>{{ $t('page.ideas.view.action.delete') }}</span>
                </div>
              </div>
            </v-card>
            <v-card class="mt-4">
              <h3 class="text-gray-400 dark:text-blueGray-500 text-thin mb-4">
                {{
                  `${$t('page.ideas.view.team.countSpecialists')} — ${
                    idea.specialist.length
                  }`
                }}
              </h3>

              <div v-for="(position, index) in idea.specialist" :key="index">
                <v-idea-position-widget
                  :name="
                    t(`specializations.${position.name}.title`, position.name)
                  "
                  :positions-count="position.count"
                  :languages="position.languages"
                  :technologies="mapFrameworks(position.languages)"
                  :class="$style.PositionWidget"
                >
                  <template #footer>
                    <div class="mt-8 text-sm font-medium">
                      <div
                        v-if="
                          statusPositions.find(
                            (s) => s.specializationId === position.id
                          ).positionStatus !== 'PENDING'
                        "
                        :class="[
                          'bg-gray-100 dark:bg-blueGray-800 dark:hover:bg-blueGray-700 text-primary',
                          'cursor-pointer py-2 rounded flex justify-center items-center w-full',
                        ]"
                        @click="respondPosition(position.id)"
                      >
                        {{ $t('page.ideas.view.team.statusPending.not') }}
                        <v-icon :icon="['fas', 'bullhorn']" class="ml-2" />
                      </div>
                      <div
                        v-else
                        class="bg-gray-100 dark:bg-blueGray-800 py-2 text-gray-400 text-center rounded"
                      >
                        {{ $t('page.ideas.view.team.statusPending.pending') }}
                      </div>
                    </div>
                    <v-delimiter
                      v-if="index + 1 < idea.specialist.length"
                      class="my-6"
                    />
                  </template>
                </v-idea-position-widget>
              </div>

              <!--              <div-->
              <!--                v-for="(position, index) in idea.specialist"-->
              <!--                :key="position.name"-->
              <!--              >-->
              <!--                <v-label-->
              <!--                  v-if="position.languages.length"-->
              <!--                  :name="$t('page.ideas.view.team.languages')"-->
              <!--                  class="mb-3 mt-4"-->
              <!--                >-->
              <!--                  <v-chip-->
              <!--                    v-for="language in position.languages"-->
              <!--                    :key="language.name"-->
              <!--                    :text="t(`languages.${language.name}`, language.name)"-->
              <!--                    type="auto"-->
              <!--                    class="mr-2"-->
              <!--                  />-->
              <!--                </v-label>-->

              <!--                <v-label v-if="mapFrameworks(position.languages).length" :name="$t('page.ideas.view.team.technologies')">-->
              <!--                  <v-chip-->
              <!--                    v-for="framework in mapFrameworks(position.languages)"-->
              <!--                    :key="framework"-->
              <!--                    :text="framework"-->
              <!--                    type="auto"-->
              <!--                    class="mr-2"-->
              <!--                  />-->
              <!--                </v-label>-->

              <!--                <template v-if="isAuthorized">-->
              <!--                  <div class="w-full flex justify-between items-center">-->
              <!--                    <div-->
              <!--                      v-if="statusPositions.find(s => s.specializationId === position.id).positionStatus !== 'PENDING'"-->
              <!--                      @click="respondPosition(position.id)"-->
              <!--                      :class="[-->
              <!--                        'bg-gray-100 dark:bg-blueGray-800 dark:hover:bg-blueGray-700',-->
              <!--                        'cursor-pointer text-primary font-medium mt-6 p-2',-->
              <!--                        'transition-colors rounded flex justify-center items-center w-full'-->
              <!--                      ]"-->
              <!--                    >-->
              <!--                      <span>{{ $t('page.ideas.view.team.statusPending.not') }}</span>-->
              <!--                      <v-icon :icon="['fas', 'bullhorn']" class="ml-2" />-->
              <!--                    </div>-->
              <!--                    <div v-else class="idea__position-status">-->
              <!--                      {{ $t('page.ideas.view.team.statusPending.pending') }}-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                </template>-->

              <!--              </div>-->
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store, route }) {
    const isAdmin = store.getters['auth/isAdmin']
    const isAuthorized = store.getters['user/isAuthorized']
    const id = route.params.id

    await store.dispatch('ideas/getIdea', id)

    if (isAuthorized) {
      await store.dispatch('ideas/getStatusPositions', id)
    }
    if (isAdmin) {
      await store.dispatch('admin/getPendingIdeas')
    }
  },
  data: () => ({
    responded: [],
  }),
  computed: {
    ...mapGetters({
      idea: 'ideas/idea',
      pending: 'admin/pendingIdeas',
      isAdmin: 'auth/isAdmin',
      isAuthorized: 'user/isAuthorized',
      statusPositions: 'ideas/statusPositions',
    }),
    isOwner() {
      const profile = this.$store.getters['user/profile']
      return profile && profile.id === this.idea.ownerIdea.id
    },
    isIdeaPending() {
      return (
        !!this.isAdmin && this.pending.find((idea) => idea.id === this.idea.id)
      )
    },
  },

  methods: {
    isResponded(position) {
      return this.$store.getters['ideas/isUserResponded'](position)
    },
    async respondPosition(position) {
      try {
        this.responded.push(position)
        await this.$store.dispatch('ideas/respondPosition', {
          idea: this.idea.id,
          position,
        })
        await this.$store.dispatch('ideas/getStatusPositions', this.idea.id)
      } catch (e) {}
    },
    async deleteIdea() {
      if (prompt('Введите "delete" чтобы подтвердить удаление') !== 'delete') {
        return false
      }

      try {
        const commit = this.isAdmin ? 'admin/deleteIdea' : 'ideas/deleteIdea'

        await this.$store.dispatch(commit, this.idea.id)
        this.$router.push(this.localePath({ name: 'ideas' }))
      } catch (e) {
        console.error(e)
      }
    },
    mapFrameworks(languages) {
      return languages.length
        ? Array.from(
            new Set(
              languages.reduce(
                (acc, lang) => acc.concat(lang.frameworks.map((f) => f.name)),
                []
              )
            )
          )
        : []
    },
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr || str
    },
  },

  head() {
    return {
      title: this.idea.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.idea.description,
        },
      ],
    }
  },
}
</script>

<style module>
.action_button {
  @apply hover:bg-primary dark:hover:bg-white;
}
</style>

<style lang="scss" scoped>
.idea {
  &__title {
    font-size: 2rem;
    font-weight: 900;
  }

  &__owner-username {
    margin-top: 0.1rem;
    font-size: 0.8rem;
    opacity: 0.5;
  }

  &__position-status {
    font-size: 0.9rem;
    padding: 0.2rem 1rem;
  }
}
</style>
