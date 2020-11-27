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
          <nuxt-link
            :to="localePath({ name: 's-profile-id', params: { id: idea.ownerIdea.id} })"
            class="mr-5 d-flex"
          >
            <v-avatar :avatar="idea.ownerIdea.id" class="mr-2" />
            <div>
              <div> {{ idea.ownerIdea.firstName }} {{ idea.ownerIdea.lastName }} </div>
              <div class="idea__owner-username"> {{ idea.ownerIdea.userName }} </div>
            </div>
          </nuxt-link>
          <v-label name="дата обновления" class="mr-5">
            {{ idea.lastUpdateDate | toLocaleDateTime($i18n.locale) }}
          </v-label>

          <v-label name="статус" class="mr-5">
            {{ idea.status }}
          </v-label>

          <v-label name="статус модерации">
            {{ idea.waitingValidation ? 'на модерации' : 'одобрено модератором' }}
          </v-label>
        </div>

        <v-label name="действия">
          <div v-if="isOwner">
            <v-button
              class="mr-2"
              :icon="['fas', 'edit']"
              type="muted"
              small
              @click="$router.push(localePath({ name: 's-editor', query: { id: idea.id }}))"
            >
              изменить
            </v-button>

            <v-button type="danger">
              удалить
            </v-button>
          </div>
          <v-button v-else type="primary">
            откликнуться
          </v-button>
        </v-label>
      </div>

      <v-card class="mt-3">
        <v-article>
          <div v-html="idea.text" />
        </v-article>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store, route }) {
    const { id } = await store.dispatch('ideas/getIdea', route.params.id)
  },

  computed: {
    ...mapGetters({
      idea: 'ideas/idea'
    }),

    isOwner() {
      return this.$store.getters['user/profile'].id === this.idea.ownerIdea.id
    },

    languages() {
      return this.idea.specialist.length
        ? this.idea.specialist.reduce((acc, spec) => {
            spec.languages.forEach(lang => acc.push(lang))
            return acc
          }, [])
        : [];
    },
    technologies() {
      return this.languages.length
        ? this.languages.reduce((acc, lang) => lang.frameworks.map(tech => tech.name), [])
        : [];
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

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
}
</style>
