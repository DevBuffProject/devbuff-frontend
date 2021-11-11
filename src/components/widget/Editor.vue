<template>
  <div class="transition-all resize-none ring-opacity-50 w-full editor">
    <CKEditor
      :editor="EditorClassic"
      :config="config"
      @blur="onBlur"
      v-model="vModel"
      style="border: none; padding: 0; box-shadow: none; width: 100%"
    />

    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { useFiles } from '../../composes'
import { useField } from 'vee-validate'
import { htmlToText } from 'html-to-text'
import CKEditor from '@ckeditor/ckeditor5-vue'
import EditorClassic from '@ckeditor/ckeditor5-build-classic'

class UploadAdapter {
  constructor(loader) {
    this.loader = loader
    this.uploader = useFiles()
  }

  async upload() {
    const { uploadProgress, uploadUserImage, onUpload } = this.uploader
    const file = await this.loader.file

    onUpload((event) => {
      this.loader.uploadTotal = event.total
      this.loader.uploaded = event.loaded
    })

    try {
      const { data } = await uploadUserImage(file)
      return {
        default: `${import.meta.env.VITE_API_BASE_URL}/image/${data.imagePath}`,
      }
    } catch (e) {
      console.error(e)
    }
  }
}

class UploadAdapterPlugin {
  constructor(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>
      new UploadAdapter(loader)
  }
}

const config = {
  toolbar: [
    'heading',
    '|',
    'undo',
    'redo',
    '|',
    'bold',
    'italic',
    'link',
    '|',
    'blockquote',
    '|',
    'mediaembed',
    'uploadimage',
    '|',
    'numberedList',
    'bulletedList',
  ],
  extraPlugins: [UploadAdapterPlugin],
  heading: {
    options: [
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
    ],
  },
}

export default defineComponent({
  components: {
    CKEditor: CKEditor.component,
  },
  props: {
    name: { type: String, default: 'Editor' },
    rules: { type: [Array, Function], default: () => [] },
    minTextLength: { type: Number, default: 100 },
    maxTextLength: { type: Number, default: 1000 },
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'update:text'],

  setup(props, { emit }) {
    const isFocused = ref(false)
    const vModel = useVModel(props, 'modelValue', emit)
    const textValue = ref('')
    const { setValue, errors, errorMessage } = useField(props.name, props.rules)

    onMounted(() => setValue(htmlToText(vModel.value)))
    watch(vModel, (markup) => setValue((textValue.value = htmlToText(markup))))

    return {
      errors,
      errorMessage,
      vModel,
      textValue,
      isFocused,
      config,
      EditorClassic,
    }
  },
})
</script>

<style scoped>
.editor {
  --ck-border-radius: 4px;
  --ck-color-base-border: transparent;
  --ck-focus-ring: 1px solid transparent;
  --ck-color-base-background: transparent;
  --ck-inner-shadow: transparent;

  /* CKEditor toolbar */
  --ck-color-toolbar-background: transparent;
  --ck-color-toolbar-border: transparent;
}

.editor >>> .ck-toolbar__separator {
  @apply bg-light-900 !important;
}
</style>
