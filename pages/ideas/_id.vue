<template>
  <div class="container mx-auto pt-4">
    <div class="idea">
      <div class="mt-3">
        <h1 class="idea__title mb-3 p-0"> {{ idea.name }} </h1>
        <div class="flex flex-wrap items-center justify-between mb-3">
          <div class="flex flex-wrap items-start">
            <v-user
              :user-id="idea.ownerIdea.id"
              :firstname="idea.ownerIdea.firstName"
              :lastname="idea.ownerIdea.lastName"
              :username="idea.ownerIdea.userName"
              class="mr-4"
            />

            <v-label :name="$t('page.ideas.view.dateCreation')" class="mr-5">
              {{ idea.lastUpdateDate | toLocaleDateTime($i18n.locale) }}
            </v-label>

            <v-label :name="$t('page.ideas.view.status.title')" class="mr-5">
              {{ $t('page.ideas.view.status.' + idea.status) }}
            </v-label>

            <v-label v-if="isOwner" :name="$t('page.ideas.view.statusModeration.title')">
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
              <div class="flex justify-center items-center">
                <div
                  v-if="isOwner"
                  type="muted"
                  v-ripple
                  :class="[$style.action_button, 'text-primary hover:bg-primary-100 dark:hover:bg-blueGray-700']"
                  @click="$router.push(localePath({ name: 's-editor', query: { id: idea.id }}))"
                >
                  <v-icon class="ml-2" :icon="['fas', 'edit']" />
                  <span>{{ $t('page.ideas.view.action.change') }}</span>
                </div>
                <i class="bg-gray-200 dark:bg-blueGray-600 mx-2 w-px h-10" />
                <div
                  v-if="isOwner || isAdmin"
                  v-ripple
                  :class="[$style.action_button, 'text-danger hover:bg-danger-100 dark:hover:bg-blueGray-700']"
                  @click="deleteIdea"
                >
                  <v-icon :icon="['fas', 'trash']" />
                  <span>{{ $t('page.ideas.view.action.delete') }}</span>
                </div>
              </div>

<!--              <v-button v-if="!isOwner && !isAdmin" type="primary">-->
<!--                {{ $t('page.ideas.view.action.respond') }}-->
<!--              </v-button>-->
            </v-card>
            <v-card class="mt-4">
              <h3 class="text-muted text-thin mb-4">
                {{ `${$t('page.ideas.view.team.countSpecialists')} — ${idea.specialist.length}` }}
              </h3>

              <div
                v-for="(position, index) in idea.specialist"
                :key="position.name"
              >
                <div class="flex justify-between items-center w-full">
                  <h2 class="text-primary">
                    {{ t(`specializations.${position.name}.title`, position.name) }}
                  </h2>
                  <v-chip type="muted" :text="position.count" />
                </div>

                <v-label
                  :name="$t('page.ideas.view.team.languages')"
                  class="mb-3"
                >
                  <v-chip
                    v-for="language in position.languages"
                    :key="language.name"
                    :text="t(`languages.${language.name}`, language.name)"
                    type="auto"
                    class="mr-2"
                  />
                </v-label>

                <v-label v-if="mapFrameworks(position.languages).length" :name="$t('page.ideas.view.team.technologies')">
                  <v-chip
                    v-for="framework in mapFrameworks(position.languages)"
                    :key="framework"
                    :text="framework"
                    type="auto"
                    class="mr-2"
                  />
                </v-label>

                <template v-if="isAuthorized">
                  <div class="w-full flex justify-between items-center">
                    <div
                      v-if="statusPositions.find(s => s.specializationId === position.id).positionStatus !== 'PENDING'"
                      @click="respondPosition(position.id)"
                      v-ripple
                      :class="[
                        'bg-gray-100 dark:bg-blueGray-800 dark:hover:bg-blueGray-700',
                        'cursor-pointer text-primary font-medium mt-6 p-2',
                        'transition-colors rounded flex justify-center items-center w-full'
                      ]"
                    >
                      <span>{{ $t('page.ideas.view.team.statusPending.not') }}</span>
                      <v-icon :icon="['fas', 'bullhorn']" class="ml-2" />
                    </div>
                    <div v-else class="idea__position-status">
                      {{ $t('page.ideas.view.team.statusPending.pending') }}
                    </div>
                  </div>
                </template>

                <v-delimiter v-if="index < idea.specialist.length" class="my-6" />
              </div>
            </v-card>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  async middleware({store, route}) {
    const isAdmin = store.getters['auth/isAdmin']
    const isAuthorized = store.getters['user/isAuthorized']
    const id = route.params.id

    await store.dispatch('ideas/getIdea', id)

    if (isAuthorized) await store.dispatch('ideas/getStatusPositions', id)
    if (isAdmin) await store.dispatch('admin/getPendingIdeas')
  },

  data: () => ({
    progress: false,
    responded: [],
  }),

  computed: {
    ...mapGetters({
      idea: 'ideas/idea',
      pending: 'admin/pendingIdeas'
    }),

    statusPositions() {
      return this.$store.getters['ideas/statusPositions']
    },

    isAuthorized() {
      return this.$store.getters['user/isAuthorized']
    },

    isOwner() {
      const profile = this.$store.getters['user/profile']
      return profile && profile.id === this.idea.ownerIdea.id
    },

    isAdmin() {
      return this.$store.getters['auth/isAdmin']
    },

    isIdeaPending() {
      return !!this.isAdmin && this.pending.find(idea => idea.id === this.idea.id)
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
          position
        })
        await this.$store.dispatch('ideas/getStatusPositions', this.idea.id)
      } catch (e) {
      }
    },
    async deleteIdea() {
      try {
        this.progress = true
        const commit = this.isAdmin
          ? 'admin/deleteIdea'
          : 'ideas/deleteIdea'

        await this.$store.dispatch(commit, this.idea.id)
        this.progress = false
        this.$router.push(this.localePath({name: 'ideas'}))
      } catch (e) {
        this.progress = false
      } finally {
        this.progress = false
      }
    },

    mapFrameworks(languages) {
      return languages.length
        ? Array.from(new Set(languages.reduce((acc, lang) => acc.concat(lang.frameworks.map(f => f.name)), [])))
        : [];
    },
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr
          ? fallbackStr
          : str
    },
  },

  head() {
    return {
      title: `Devbuff :: ${this.idea.name}`,
      meta: [
        {hid: 'description', name: 'description', content: this.idea.description}
      ]
    }
  }
}
</script>

<style lang="scss" module>
.action_button {
  @apply px-5 py-2 flex items-center rounded w-full;
  @apply transition-colors cursor-pointer flex flex-col justify-center items-center;
}
</style>

<style lang="scss" scoped>
.idea {
  &__title {
    font-size: 2rem;
    font-weight: 900;
  }

  &__owner-username {
    margin-top: .1rem;
    font-size: .8rem;
    opacity: .5;
  }

  &__position-status {
    font-size: .9rem;
    padding: .2rem 1rem;
  }
}
</style>
