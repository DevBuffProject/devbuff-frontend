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

          <v-label :name="$t('page.ideas.view.action.title')">
            <div class="flex items-center">
              <v-button
                v-if="isOwner"
                class="mr-2"
                :icon="['fas', 'edit']"
                type="muted"
                @click="$router.push(localePath({ name: 's-editor', query: { id: idea.id }}))"
              >
                {{ $t('page.ideas.view.action.change') }}
              </v-button>

              <a v-if="isOwner || isAdmin" type="danger" class="text-danger" @click="deleteIdea">
                {{ $t('page.ideas.view.action.delete') }}
              </a>

              <v-button v-if="!isOwner && !isAdmin" type="primary">
                {{ $t('page.ideas.view.action.respond') }}
              </v-button>
            </div>
          </v-label>
        </div>

        <div v-html="idea.text"/>
      </div>

      <div class="mt-5">
        <h3 class="text-muted text-thin">{{
            $t('page.ideas.view.team.countSpecialists') + '—' + idea.specialist.length
          }}</h3>
        <div class="idea__positions">
          <v-card
            v-for="position in idea.specialist"
            :key="position.name"
            class="mr-2"
          >
            <template #header>
              <h4 class="m-0">
                {{ t('specializations.' + position.name + ".title", position.name) }}</h4>
            </template>

            <template v-if="isAuthorized" #footer>
              <div class="w-full flex justify-between items-center">
                <div>
                  {{ $t('page.ideas.view.team.countPositionsPerSpecialists') }}
                  <v-chip type="muted" :text="'' + position.count"/>
                </div>

                <div v-if="isOwner">
                </div>
                <v-button
                  v-else-if="statusPositions
                    .find(s => s.specializationId === position.id)
                    .positionStatus !== 'PENDING'
                  "
                  flat
                  @click="respondPosition(position.id)"
                >
                  {{ $t('page.ideas.view.team.statusPending.not') }}
                </v-button>
                <div v-else class="idea__position-status">
                  {{ $t('page.ideas.view.team.statusPending.pending') }}
                </div>
              </div>
            </template>
            <v-label
              :name="$t('page.ideas.view.team.languages')"
              class="mb-3"
            >
              <v-chip
                v-for="language in position.languages"
                :key="language.name"
                :text="t('languages.' + language.name, language.name)"
                type="auto"
              />
            </v-label>

            <v-label v-if="mapFrameworks(position.languages).length" :name="$t('page.ideas.view.team.technologies')">
              <v-chip
                v-for="framework in mapFrameworks(position.languages)"
                :key="framework"
                :text="framework"
                type="auto"
              />
            </v-label>
          </v-card>
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

  &__positions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  &__position-status {
    font-size: .9rem;
    padding: .2rem 1rem;
  }
}
</style>
