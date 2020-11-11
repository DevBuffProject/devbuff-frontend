<template>
  <div class="v-editor">
    <v-article>
      <client-only>
        <quill-editor
          class="v-editor__area"
          :options="editorOptions"
          content="
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          "
        />
      </client-only>
    </v-article>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'v-editor',

  components: {
    quillEditor: () => process.client && import('vue-quill-editor')
      .then(bundle => bundle.quillEditor)
  },

  data() {
    return {
      editorOptions: {
        theme: 'bubble',
        placeholder: 'Текст идеи',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': 2 }],
            ['link', 'image', 'video'],
            ['clean']
          ]
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>

.v-editor {
  &__area {
    /deep/ .ql {
      &-editor { padding: 0px !important; }
      &-blank:before {
        left: 0 !important;
        font-weight: 200;
        font-size: 1rem;
        font-style: normal;
      }
    }
  }
}

</style>
