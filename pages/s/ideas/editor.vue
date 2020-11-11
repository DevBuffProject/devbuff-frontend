<template>
  <div class="editor">
    <v-toolbar class="mb-5">
      <div class="container toolbar__grid">
        <div class="d-flex">
          <h3 class="m-0"> Создание идеи </h3>
        </div>
        <div>
          <v-button :icon="['fas', 'plus']">
            Сохранить
          </v-button>
        </div>
      </div>
    </v-toolbar>

    <div class="editor__form">
      <div class="container mb-4">
        <div class="editor__field editor__form-input">
          <v-input
            class="w-100"
            placeholder="Заголовок идеи"
            type="text"
            v-model="idea.name"
          />
        </div>

        <div class="editor__field editor__form-input">
          <v-input
            class="w-100"
            placeholder="Краткое описание"
            type="textarea"
            v-model="idea.preview"
          />
        </div>

        <v-editor
          class="editor__form-input"
        />

        <v-spec-picker :specialists="specs" />

      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor: () => process.client && import('vue-quill-editor')
      .then(bundle => bundle.quillEditor)
  },

  async middleware({ store }) {
    await store.dispatch('skills/getSkills')
  },

  data() {
    return {
      specs: [
        {
          name: 'front-end',
          count: 1,
          languages: [
            {
              name: 'JavaScript',
              frameworks: [
                {
                  name: 'Vue.js'
                }
              ]
            }
          ]
        },
        {
          name: 'desktop',
          count: 2,
          languages: [
            {
              name: 'CPlusPlus',
              frameworks: []
            }
          ]
        }
      ],
      idea: {
        name: null,
        content: null,
        preview: null,
      }
    }
  },

  computed: {
    ...mapGetters({
      systemSkills: 'skills/skills'
    })
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

  // &__content {
  //   background-color: var(--color-muted-accent);
  //   padding: 1rem 0;
  // }
}
</style>
