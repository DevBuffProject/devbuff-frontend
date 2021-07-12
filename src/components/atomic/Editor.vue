<template>
  <div :style="[errorMessage && 'border-color: red ']">
    <div
      v-if="label"
      class="font-medium text-xs mt-2 mb-1 mr-6"
      style="min-width: 70px; max-width: 150px"
    >
      {{ label }}
    </div>
    <QuillEditor
      content-type="html"
      :name="name"
      :id="name"
      v-model:content="inputValue"
      :modules="modules"
      theme="snow"
      :placeholder="placeholder"
      :toolbar="toolbar"
      :style="[errorMessage && 'border-color: red']"
    />
    <div
      v-if="errorMessage"
      v-motion="'errorMessage'"
      :initial="{ marginTop: -10, opacity: 0 }"
      :enter="{ marginTop: 0, opacity: 1 }"
      class="flex items-center pt-1 text-xs text-danger-500"
    >
      <span class="mt-px">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, useCssModule, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useUser } from '../../composes/core'
import ImageUploader from 'quill-image-uploader'
import { useField } from 'vee-validate'

export default defineComponent({
  components: {
    QuillEditor,
  },
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  name: 'EditorNew',

  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    })

    const { uploadUserImage } = useUser()
    const toolbar = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],

      ['clean'],
    ] // remove formatting button

    const modules = {
      name: 'imageUploader',
      module: ImageUploader,
      options: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            resolve(uploadUserImage(file))
          })
        },
      },
    }

    return {
      inputValue,
      meta,
      errorMessage,
      handleChange,
      handleBlur,
      toolbar,
      modules,
    }
  },
})
</script>

<style></style>
