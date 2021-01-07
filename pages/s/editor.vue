<template>
  <div class="editor">
    <v-toolbar class="mb-5">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> {{ isEditMode ? $t('page.editor.title.ideaEdit') : $t('page.editor.title.ideaNew') }} </h3>
        </div>
        <div>
          <v-button
            :icon="['fas', 'plus']"
            :loading="loading"
            @click="save"
          >
            {{$t('common.save')}}
          </v-button>
        </div>
      </div>
    </v-toolbar>

    <div class="editor__form">
      <ValidationObserver ref="form">
        <div class="container mb-4">
          <div class="editor__field editor__form-input">
            <v-label :name="$t('page.editor.idea.heading')">
              <v-input
                v-if="!isEditMode"
                class="w-100 mt-1"
                :placeholder="$t('page.editor.idea.heading')"
                :name="$t('page.editor.idea.heading')"
                type="text"
                rules="required"
                v-model="idea.name"
              />
              <b v-else> {{ idea.name }} </b>
            </v-label>
          </div>

          <div class="editor__field editor__form-input">
            <v-label :name="$t('page.editor.idea.desc')">
              <v-input
                class="w-100 mt-1"
                :placeholder="$t('page.editor.idea.desc')"
                :name="$t('page.editor.idea.desc')"
                type="textarea"
                rules="required"
                v-model="idea.description"
              />
            </v-label>
          </div>

          <div class="editor__form-input">
            <v-label :name="$t('page.editor.idea.selectForFormat')">
              <v-card class="mt-1">
                <client-only>
                  <lazy-v-editor :key="key" v-model="idea.text" />
                </client-only>
              </v-card>
            </v-label>
          </div>

          <div v-if="!isEditMode" class="editor__form-input">
            <v-label :name="$t('page.editor.idea.positions')">
              <v-specialist-picker
                :specialists="systemSkills"
                @change="idea.specialist = $event"
              />
            </v-label>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'editor',

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
      title: `Devbuff :: ${this.$t('page.editor.title.publish')}`,
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
      this.$refs.form.validate().then(async success => {
        if (!success) {
          return;
        }

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

          console.log(newIdea.id, this.localePath({
            name: 'ideas-id',
            params: { id: this.isEditMode ? queryId : newIdea.id }
          }))
          this.$router.push(this.localePath({
            name: 'ideas-id',
            params: { id: this.isEditMode ? queryId : newIdea.id }
          }))
        } catch (e) {
          this.loading = false
        } finally {
          this.loading = false
        }
      })
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
        : `Devbuff :: ${this.$t('page.editor.title.publish')}`
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
