<template>
  <div className="transition-all resize-none ring-opacity-50 w-full editor">
    <CKEditor
      :editor="EditorClassic"
      :config="config"
      @focus="onBlur"
      @blur="onFocus"
      @input="onInput"
      v-model="value"
      style="border: none; padding: 0; box-shadow: none; width: 100%"
    />
    <textarea :name="name" class="hidden" v-model="text" />
    <AtomicTextError v-show="errorMessage" :text="errorMessage" />
  </div>
</template>

<script>
import { computed, defineComponent, ref, useCssModule, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import CKEditor from '@ckeditor/ckeditor5-vue'
import EditorClassic from '@ckeditor/ckeditor5-build-classic'
import { useFiles } from '../../composes'
import { convert as asText } from 'html-to-text'
import { useField } from 'vee-validate'

class UploadAdapter {
  constructor(loader) {
    this.loader = loader
    this.uploader = useFiles()
  }

  async upload() {
    const { uploadUserImage, onUpload } = this.uploader
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
    name: { type: String, default: '' },
    rules: { type: [String, Array], default: () => [] },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const vModel = useVModel(props)
    const isFocused = ref(false)
    const styles = useCssModule()
    const { handleChange, handleBlur, errors, errorMessage, value } = useField(
      props.name,
      props.rules,
      {
        initialValue: vModel.value,
      },
    )

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
    const text = computed(() => asText(vModel.value))
    const onInput = (...e) => {
      console.log(e)
      emit('update:modelValue', value)

      //TODO ?
      // console.log(text.value)
    }
    const onFocus = () => (isFocused.value = true)
    const onBlur = () => {
      isFocused.value = false
      handleBlur()
    }

    return {
      value,
      styles,
      vModel,
      text,
      config,
      isFocused,
      handleChange,
      handleBlur,
      errors,
      errorMessage,
      EditorClassic,
      onFocus,
      onBlur,
      onInput,
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

.editor:deep(.ck-toolbar__separator) {
  @apply bg-light-900 !important;
}
</style>
