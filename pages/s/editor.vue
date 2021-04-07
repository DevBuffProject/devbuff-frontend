<template>
  <div class="editor">
    <v-toolbar class="mb-5">
      <div class="flex justify-between w-full">
        <h3 class="m-0">
          {{
            isEditMode
              ? $t('page.editor.title.ideaEdit')
              : $t('page.editor.title.ideaNew')
          }}
        </h3>
        <v-button :icon="['fas', 'plus']" :loading="loading" @click="save">
          {{ $t('common.save') }}
        </v-button>
      </div>
    </v-toolbar>

    <div class="editor__form">
      <ValidationObserver ref="form">
        <div class="container mx-auto mb-4">
          <v-input
            v-model="idea.name"
            class="w-1/2 mb-4"
            :placeholder="$t('page.editor.idea.heading')"
            :label="$t('page.editor.idea.heading')"
            :name="$t('page.editor.idea.heading')"
            type="text"
            rules="required"
            autofocus
          />

          <v-input
            v-model="idea.description"
            class="w-1/2 mb-4"
            :placeholder="$t('page.editor.idea.desc')"
            :label="$t('page.editor.idea.desc')"
            :name="$t('page.editor.idea.desc')"
            textarea
            rules="required"
          />

          <div class="my-10">
            <client-only placeholder="Loading...">
              <component :is="editor" v-model="idea.text" />
            </client-only>
          </div>

          <div class="editor__form-input">
            <v-label :name="$t('page.editor.idea.positions')">
              <v-specialist-picker
                :specialists="skills"
                :user-data="idea.specialist"
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
  name: 'Editor',
  async middleware({ store, route }) {
    await store.dispatch('skills/getSkills')
    if (route.query.id) {
      await store.dispatch('ideas/getIdea', route.query.id)
    }
  },
  data() {
    return {
      editor: () =>
        process.client ? import('~/components/widgets/Editor/Editor') : {},
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
  head() {
    return { title: this.title }
  },
  computed: {
    ...mapGetters('skills', ['skills']),
    isEditMode() {
      return !!this.$route.query.id
    },
  },

  created() {
    if (this.isEditMode) {
      const { description, text, name, specialist } = this.$store.getters[
        'ideas/idea'
      ]
      this.idea = { name, text, description, specialist }
    }
  },
  methods: {
    async save() {
      if (!(await this.$refs.form.validate())) return false

      const { id } = this.$route.query
      const { name, text, description, specialist } = this.idea
      const action = this.isEditMode ? 'updateIdea' : 'appendIdea'
      const data = this.isEditMode
        ? { id, data: { name, text, description, specialist } }
        : this.idea

      try {
        this.loading = true
        const response = await this.$store.dispatch(`ideas/${action}`, data)

        this.localePath({
          name: 'ideas-id',
          params: { id: this.isEditMode ? id : response.id },
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
