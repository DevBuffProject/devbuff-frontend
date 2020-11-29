<template>
  <div class="v-editor">
    <v-article>
      <client-only>
        <v-skeleton-paragraph v-show="!ready" :rows="3" />
        <quill-editor
          v-show="ready"
          class="v-editor__area"
          :options="editorOptions"
          :content="value"
          @ready="onReady"
          @change="$emit('change', $event.html)"
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

  model: {
    event: 'change',
    prop: 'value'
  },

  components: {
    quillEditor: () => process.client && import('vue-quill-editor')
      .then(bundle => bundle.quillEditor)
  },

  props: {
    value: {
      type: String,
      default: null,
    }
  },

  data() {
    return {
      ready: false,
      editorOptions: {
        theme: 'bubble',
        placeholder: 'Текст идеи',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block', 'code'],
            [{ 'header': 2 }],                                // headers
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }], // text direction
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']                                         // remove formatting button
          ]
        }
      },
    }
  },

  methods: {
    onReady() {
      this.ready = true
      this.$emit('ready')
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
