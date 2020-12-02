<template>
  <div class="container pt-4">
    <div class="idea">
      <nuxt-link
        :to="localePath({ name: 'ideas' })"
        class="idea__back-link"
      >
        <v-icon
          :icon="['fas', 'long-arrow-alt-left']"
          class="idea__back-link-icon"
        />
        список идей
      </nuxt-link>

      <strong>
        <h1 class="idea__title m-0 p-0"> {{ idea.name }} </h1>
      </strong>

      <div class="d-flex flex-wrap align-items-center justify-content-between mt-3">
        <div class="d-flex flex-wrap">
          <v-user
            :user-id="idea.ownerIdea.id"
            :firstname="idea.ownerIdea.firstName"
            :lastname="idea.ownerIdea.lastName"
            :username="idea.ownerIdea.userName"
            class="mr-4"
          />

          <v-label name="дата обновления" class="mr-5">
            {{ idea.lastUpdateDate | toLocaleDateTime($i18n.locale) }}
          </v-label>

          <v-label name="статус" class="mr-5">
            {{ idea.status }}
          </v-label>

          <v-label v-if="isOwner" name="статус модерации">
            {{ idea.waitingValidation ? 'на модерации' : 'одобрено модератором' }}
          </v-label>
        </div>

        <v-label name="действия">
            <v-button
              v-if="isOwner"
              class="mr-2"
              :icon="['fas', 'edit']"
              type="muted"
              small
              @click="$router.push(localePath({ name: 's-editor', query: { id: idea.id }}))"
            >
              изменить
            </v-button>

            <v-button
              v-if="isOwner || isAdmin"
              type="danger"
              small
              @click="deleteIdea"
            >
              удалить
            </v-button>

            <v-button
              v-if="!isOwner && !isAdmin"
              type="primary"
              small
            >
              откликнуться
            </v-button>
        </v-label>
      </div>

      <v-card class="mt-3">
        <v-article>
          <div v-html="idea.text" />
        </v-article>
      </v-card>

      <div class="mt-5">
        <h3 class="text-muted text-thin">Позиции в команде — {{ idea.specialist.length }}</h3>
        <div class="idea__positions">
          <v-card
            v-for="position in idea.specialist"
            :key="position.name"
            class="mr-2"
          >
            <template #header>
              <h4 class="m-0">{{ position.name }}</h4>
            </template>

            <template v-if="isAuthorized" #footer>
              <div class="w-100 d-flex justify-content-between align-items-center">
                <div>
                  мест <v-chip type="muted" :text="'' + position.count" />
                </div>
                <v-button
                  v-if="statusPositions
                    .find(s => s.specializationId === position.id)
                    .positionStatus !== 'PENDING'
                  "
                  flat
                  @click="respondPosition(position.id)"
                >
                  откликнуться
                </v-button>
                <div v-else-if="isOwner">
                   вы создатель идеи
                </div>
                <div v-else class="idea__position-status">
                  вы откликнулись
                </div>
              </div>
            </template>
            <v-label
              name="Языки программирования"
              class="mb-3"
            >
              <v-chip
                v-for="language in position.languages"
                :key="language.name"
                :text="language.name"
                type="auto"
              />
            </v-label>

            <v-label v-if="mapFrameworks(position.languages).length" name="Технологии">
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
import { mapGetters } from 'vuex'

export default {
  async middleware({ store, route }) {
    const isAdmin = store.getters['auth/isAdmin']
    const isAuthorized = store.getters['user/isAuthorized']
    const id = route.params.id

    await store.dispatch('ideas/getIdea', id)

    if (isAuthorized) await store.dispatch('ideas/getStatusPositions', id)
    if (isAdmin)  await store.dispatch('admin/getPendingIdeas')
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
      return this.isAdmin && this.pending.find(idea => idea.id === this.idea.id)
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
      } catch (e) {}
    },
    async deleteIdea() {
      try {
        this.progress = true
        const commit = this.isAdmin
          ? 'admin/deleteIdea'
          : 'ideas/deleteIdea'

        await this.$store.dispatch(commit, this.idea.id)
        this.progress = false
        this.$router.push(this.localePath({ name: 'ideas' }))
      } catch (e) {
        this.progress = false
      } finally {
        this.progress = false
      }
    },

    mapFrameworks(languages) {
      return languages.length
        ? languages.reduce((acc, lang) => lang.frameworks.map(f => f.name), [])
        : [];
    }
  },

  head() {
    return {
      title: `Devbuff :: ${this.idea.name}`,
      meta: [
        { hid: 'description', name: 'description', content: this.idea.description }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

.idea {
  max-width: 1000px;

  &__title {
    font-family: 'Rubik Mono One', sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
  }

  &__back-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: .5;
    transition: opacity .3s var(--base-transition);
    font-size: .8rem;
    margin-bottom: 2rem;
    font-weight: 600;
    &:hover { opacity: 1; }
  }

  &__back-link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    font-size: .5rem;
    padding: .3rem;
    margin-right: .5rem;
    border-radius: 1rem;
    transition: background-color .3s var(--base-transition);
  }
  &__back-link:hover &__back-link-icon {
    background-color: var(--color-muted);
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
