<template>
  <div class="container pt-4">
    <div class="idea">
      <v-label name="название">
        <strong>
          <h1 class="idea__title m-0 p-0"> {{ idea.name }} </h1>
        </strong>
      </v-label>

      <div class="d-flex mt-3">
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
    await store.dispatch('user/getUser', id)
  },

  computed: {
    ...mapGetters({
      idea: 'ideas/idea'
    }),

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

.idea {
  max-width: 800px;

  &__title {
    font-family: 'Rubik Mono One', sans-serif;
  }
}
</style>
