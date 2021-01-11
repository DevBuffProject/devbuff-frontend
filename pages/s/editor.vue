<template>
  <div class="editor">
    <v-toolbar class="mb-5">
      <div class="d-flex justify-content-between w-100">
        <h3 class="m-0"> {{ isEditMode ? $t('page.editor.title.ideaEdit') : $t('page.editor.title.ideaNew') }} </h3>
        <v-button
          :icon="['fas', 'plus']"
          :loading="loading"
          @click="save"
        >
          {{$t('common.save')}}
        </v-button>
      </div>
    </v-toolbar>

    <div class="editor__form">
      <ValidationObserver ref="form">
        <div class="container mb-4">
          <div class="editor__field editor__form-input">
            <v-label :name="$t('page.editor.idea.heading')">
              <v-input
                class="w-100 mt-1"
                :placeholder="$t('page.editor.idea.heading')"
                :name="$t('page.editor.idea.heading')"
                type="text"
                rules="required"
                autofocus
                v-model="idea.name"
              />
            </v-label>
          </div>

          <div class="editor__field editor__form-input">
            <v-label class="w-100" :name="$t('page.editor.idea.desc')">
              <v-input
                class="w-100 mt-1"
                :placeholder="$t('page.editor.idea.desc')"
                :label="$t('page.editor.idea.desc')"
                :name="$t('page.editor.idea.desc')"
                textarea
                rules="required"
                v-model="idea.description"
              />
            </v-label>
          </div>

          <div class="mt-3 mb-3">
            <client-only placeholder="Loading...">
<!--              <lazy-v-editor v-model="idea.text" />-->
              <component
                :is="editor"
                v-model="idea.text"
              />
            </client-only>
          </div>

          <div class="editor__form-input">
            <v-label :name="$t('page.editor.idea.positions')">
              <v-specialist-picker
                :specialists="systemSkills"
                :userData="idea.specialist"
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
// import VEditor from '@/components/Editor/Editor'



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
      editor: () => process.client ? import('@/components/Editor/Editor') : {},
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
          return
        }

        try {
          const queryId = this.$route.query.id
          this.loading = true

          if (this.isEditMode) {
            const data = {
              name: this.idea.name,
              text: this.idea.text,
              description: this.idea.description,
              specialist: this.idea.specialist
            }
            await this.$store.dispatch('ideas/updateIdea', { id: queryId, data })

          } else {
            const newIdea = await this.$store.dispatch('ideas/appendIdea', this.idea)
          }

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
      this.idea = { name, text, description, specialist }
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
    max-width: 450px;
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
