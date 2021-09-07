<template>
  <div className="transition-all resize-none ring-opacity-50 w-full editor">
    <CKEditor
      :editor="EditorClassic"
      :config="config"
      @focus="isFocused = true"
      @blur="isFocused = false"
      v-model="vModel"
      style="border: none; padding: 0; box-shadow: none; width: 100%"
    />
  </div>
</template>

<script>
import { defineComponent, ref, useCssModule } from 'vue'
import { useVModel } from '@vueuse/core'
import CKEditor from '@ckeditor/ckeditor5-vue'
import EditorClassic from '@ckeditor/ckeditor5-build-classic'
import { useFiles } from '../../composes'

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

export default defineComponent({
  components: {
    CKEditor: CKEditor.component,
  },
  props: {
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const vModel = useVModel(props)
    const isFocused = ref(false)
    const styles = useCssModule()

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

    return {
      styles,
      vModel,
      config,
      isFocused,
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
