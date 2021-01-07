<template>
  <client-only>
    <ValidationProvider
      rules="quillRequired"
      ref="validator"
      name="text"
      v-slot="{ errors }"
    >
      <div :class="['v-editor', errors.length && 'v-editor--state-invalid']">
        <input type="hidden" :value="value" @change="validate" />
        <v-skeleton-paragraph v-show="!ready" :rows="3" />
        <quill-editor
          ref="quill"
          v-show="ready"
          class="v-editor__area"
          :options="editorOptions"
          :content="value"
          @blur="validate"
          @ready="onReady"
          @change="change"
        >
          <div id="toolbar" class="v-editor__toolbar" slot="toolbar">
            <v-icon
              v-for="tool in ['bold', 'italic', 'underline']"
              :key="tool"
              :icon="['fas', tool]"
              class="v-editor__tool ql-bold"
            />
            <button class="ql-insertName">Name</button>
          </div>
        </quill-editor>
        <div v-if="errors.length" class="v-editor__error">
          <v-icon :icon="['fas', 'exclamation']" class="v-editor__error-icon" />
          <span>{{ errors[0] }}</span>
        </div>
      </div>
    </ValidationProvider>
  </client-only>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
// import ImageUploader from 'quill-image-uploader'
import { quillEditor } from 'vue-quill-editor'
import { localize, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('quillRequired', { ...required });

localize({
  en: {
    messages:{
      quillRequired: 'Text can\'t be empty'
    }
  },
  ru: {
    messages: {
      quillRequired: 'Текст не может быть пустым'
    }
  }
})

// Quill.register("modules/imageUploader", ImageUploader);

export default {
  name: 'v-editor',

  model: {
    event: 'change',
    prop: 'value'
  },

  components: {
    quillEditor
  },
  // components: {
  //   quillEditor: () => process.client && import('vue-quill-editor')
  //     .then(bundle => bundle.quillEditor)
  // },

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
        placeholder: 'Текст идеи',
        // modules: {
        //   imageUploader: {
        //     upload: this.imageUpload,
        //   },
        //   toolbar: [
        //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        //     ['blockquote', 'code-block', 'code'],
        //     [{ 'header': 2 }],                                // headers
        //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //     [{ 'direction': 'rtl' }], // text direction
        //     [{ 'align': [] }],
        //     ['link', 'image', 'video'],
        //     ['clean']                                         // remove formatting button
        //   ]
        // }
        toolbar: '#toolbar'
      },
    }
  },

  methods: {
    validate() {
      this.$refs.validator.validate()
    },
    change({ html }) {
      this.$emit('change', html)
    },
    async imageUpload(file) {
      return await this.$store.dispatch('files/uploadImage', file)
    },
    onReady() {
      this.ready = true
      this.$emit('ready')
    }
  }
}
</script>

<style lang="scss" scoped>

.v-editor {
  margin: -1rem;
  padding: 1rem;
  border-radius: 8px;

  &--state-invalid {
    box-shadow: inset 0 0px 0px 1px var(--color-danger);
  }

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

  &__toolbar {
    background-color: var(--color-muted-accent);
    padding: .25rem;
    border-radius: 4px;
    margin: -.25rem;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
  }

  &__tool {
    color: var(--color-text-tint);
    padding: .5rem;
    border-radius: 4px;
    transition: background-color .3s var(--base-transition);
  }

  &__tool:hover {
    background-color: var(--color-background);
  }

  &__error {
    background-color: var(--color-danger-fade);
    display: flex;
    align-items: center;
    font-size: .85rem;
    color: var(--color-danger);
    margin: 0 -1rem;
    margin-bottom: -1rem;
    margin-top: 1rem;
    padding: .5rem 1rem;
  }

  &__error-icon {
    font-size: .7rem;
    margin-right: .5rem;
    transform: translateY(-1px);
  }
}

</style>
