<template>
  <div class="editor">
    <v-toolbar class="mb-5">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ isEditMode ? 'Редактирование' : 'Создание идеи' }} </h3>
        </div>
        <div>
          <v-button
            :icon="['fas', 'plus']"
            :loading="loading"
            @click="save"
          >
            Сохранить
          </v-button>
        </div>
      </div>
    </v-toolbar>

    <div class="editor__form">
      <div class="container mb-4">
        <div class="editor__field editor__form-input">
          <v-label name="Заголовок">
            <v-input
              v-if="!isEditMode"
              class="w-100 mt-1"
              placeholder="Заголовок идеи"
              type="text"
              v-model="idea.name"
            />
            <b v-else> {{ idea.name }} </b>
          </v-label>
        </div>

        <div class="editor__field editor__form-input">
          <v-label name="Краткое описание">
            <v-input
              class="w-100 mt-1"
              placeholder="Краткое описание"
              type="textarea"
              v-model="idea.description"
            />
          </v-label>
        </div>

        <div class="editor__form-input">
          <v-label name="Выделите для форматирования">
            <v-card class="mt-1">
              <client-only>
                <lazy-v-editor :key="key" v-model="idea.text" />
              </client-only>
            </v-card>
          </v-label>
        </div>

        <div
          v-if="!isEditMode"
          class="editor__form-input"
        >
          <client-only>
            <v-label name="Позиции в команде">
              <v-specialist-picker
                :specialists="systemSkills"
                @change="idea.specialist = $event"
              />
            </v-label>
          </client-only>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store, route }) {
    try {
      await store.dispatch('skills/getSkills')
      if (route.query.id)  await store.dispatch('ideas/getIdea', route.query.id)
    } catch (e) {}
  },

  data() {
    return {
      key: 1,
      loading: false,
      title: 'Devbuff :: Публикация идеи',
      idea: {
        name: null,
        text: null,
        description: null,
        specialist: null,
      },
    }
  },

  computed: {
    ...mapGetters({
      systemSkills: 'skills/skills'
    }),

    isEditMode() {
      return !!this.$route.query.id
    }
  },

  methods: {
    async save() {
      try {
        const queryId = this.$route.query.id
        this.loading = true

        if (this.isEditMode) {
          const data = { text: this.idea.text, description: this.idea.description }
          await this.$store.dispatch('ideas/updateIdea', { id: queryId, data })
        } else {
          await this.$store.dispatch('ideas/appendIdea', this.idea)
        }

        await this.$nextTick()

        this.$router.push(this.localePath({
          name: 'ideas-id',
          params: { id: this.isEditMode ? queryId : newIdea.id }
        }))
      } catch (e) {
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    if (this.isEditMode) {
      const {description, text, name, specialist} = this.$store.getters['ideas/idea']
      this.idea = {name, text, description, specialist}
    }
  },

  mounted() {
    let showIdeaName = false

    setInterval(() => {
      showIdeaName = !showIdeaName
      this.title = showIdeaName && this.idea.name
        ? `Devbuff :: ${this.idea.name}`
        : 'Devbuff :: Публикация идеи'
    }, 2000)
  },

  head() {
    return { title: this.title }
  }
}
</script>

<style lang="scss">
.editor {
  &__field {
    width: 100%;
    max-width: 600px;
  }

  &__form-input {
    font-family: inherit;
    font-size: 1rem;
    display: block;
    border: 0;
    resize: none;
    border-left: 2px solid var(--color-muted);
    padding: .3rem 1rem;
    margin-bottom: 1rem;
    outline: none;
    &::placeholder {
      font: inherit;
      font-weight: 200;
    }
  }
}
</style>
