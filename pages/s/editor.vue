<template>
  <div class="editor">
    <v-toolbar class="mb-5">
      <div class="flex justify-between w-full">
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
        <div class="container mx-auto mb-4">
          <v-input
            class="w-1/2 mb-4"
            :placeholder="$t('page.editor.idea.heading')"
            :label="$t('page.editor.idea.heading')"
            :name="$t('page.editor.idea.heading')"
            type="text"
            rules="required"
            autofocus
            v-model="idea.name"
          />

          <v-input
            class="w-1/2 mb-4"
            :placeholder="$t('page.editor.idea.desc')"
            :label="$t('page.editor.idea.desc')"
            :name="$t('page.editor.idea.desc')"
            textarea
            rules="required"
            v-model="idea.description"
          />

          <div class="my-10">
            <client-only placeholder="Loading...">
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
  },

  mounted() {
    if (this.isEditMode) {
      const { description, text, name, specialist } = this.$store.getters['ideas/idea']
      this.idea = { name, text, description, specialist }
    }

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
@layer components {

}
</style>
