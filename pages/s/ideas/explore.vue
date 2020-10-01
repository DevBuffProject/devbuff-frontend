<template>
  <div class="explore">
    <v-toolbar class="mb-4">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ $t('ideas') }} </h3>
        </div>
        <div>
          <nuxt-link to="/">
            <v-button :icon="['fas', 'plus']">
              {{ $t('new') }}
            </v-button>
          </nuxt-link>
        </div>
      </div>
    </v-toolbar>

    <div class="container">
      <div class="explore__filter mb-3">
        <div class="explore__filter-actions">
          <v-button
            type="flat-primary"
            :icon="['fas', 'sliders-h']"
          >
            {{ $t('advanced_search') }}
          </v-button>
        </div>
      </div>

      <v-ideas-list
        v-if="ideas"
        :ideas="ideas"
        style="width: 500px;"
      />
    </div>
  </div>
</template>

<i18n lang="yaml">
  ru:
    ideas: 'Идеи'
    new: 'создать'
    advanced_search: 'расширенный поиск'
  en:
    ideas: 'Ideas'
    new: 'create'
    advanced_search: 'advanced search'
</i18n>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('ideas/getIdeas')
  },

  computed: {
    ...mapGetters({
      ideas: 'ideas/list'
    })
  },
}
</script>

<style lang="scss" scoped>
</style>
