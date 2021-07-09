<template>
  <ValidationProvider
    ref="validator"
    v-slot="{ errors }"
    :rules="['quillRequired', 'max:15000', rules].join('|')"
    name="text"
    tag="div"
  >
    <div
      :class="[
        {
          'border-danger': errors.length,
          'border-gray-200 dark:border-blueGray-700': errors.length === 0,
        },
        'p-4 pb-0 rounded-lg border bg-white dark:bg-blueGray-800',
      ]"
    >
      <div class="flex justify-between items-center -mt-4 mb-6 px-0 pt-0 py-4">
        <div class="v-editor__header-section overflow-hidden -ml-3.5 flex items-center">
          <div
            v-for="historyAction in ['undo', 'redo']"
            :key="historyAction"
            :class="[
              {
                'v-editor__history-control--active': state.historyMove === historyAction,
              },
              'v-editor__history-control',
            ]"
            @click="historyAction === 'undo' ? undo : redo"
          >
            <v-icon :icon="['fas', `${historyAction}-alt`]" />
          </div>
          <span class="text-xs font-medium uppercase text-gray-500 dark:text-blueGray-500">
            ctrl + (shift) + z
          </span>
        </div>

        <div
          id="toolbar"
          ref="toolbar"
          :class="[
            {
              'border-gray-200 dark:border-blueGray-700': errors.length === 0,
              'border-danger border-t-gray-200': errors.length,
            },
            'rounded-lg rounded-t-none border border-t-0 -mt-px bg-gray-100 dark:bg-blueGray-900 pb-2 px-4',
          ]"
        >
          <div class="v-editor__toolbar-tools">
            <div
              v-for="(section, index) in state.tools.list.inline"
              :key="index"
              class="v-editor__toolbar-section"
            >
              <div
                v-for="tool in section"
                :key="tool.format"
                class="v-editor__tool"
                :class="state.formats[tool.format] && 'v-editor__tool--active'"
                @click.stop.prevent="toggleInlineFormat(tool.format)"
              >
                <v-icon
                  :icon="tool.icon"
                  class="v-editor__tool-icon"
                />
              </div>
              <div
                v-if="index + 1 < state.tools.list.inline.length"
                class="v-editor__tools-delimiter"
              />
            </div>

            <div class="v-editor__tools-delimiter" />

            <div class="v-editor__toolbar-section">
              <div
                v-for="tool in state.tools.list.line"
                :key="tool.format + tool.value"
                ref="tools"
                v-ripple
                class="v-editor__tool"
                :class="state.formats[tool.format] === tool.value && 'v-editor__tool--active'"
                :data-tool-name="`${tool.format}-${tool.value}`"
                @click="lineFormat(tool.format, tool.value)"
              >
                <v-icon
                  :icon="tool.icon"
                  class="v-editor__tool-icon"
                />
              </div>
            </div>

            <div class="v-editor__tools-delimiter" />

            <div class="v-editor__toolbar-section">
              <div
                v-for="tool in state.tools.list.media"
                :key="tool.format"
                class="v-editor__tool"
                :class="state.formats[tool.type] && 'v-editor__tool--active'"
                @click="insertMedia(tool.type)"
              >
                <v-icon
                  :icon="tool.icon"
                  class="v-editor__tool-icon"
                />
              </div>
            </div>

            <div class="v-editor__toolbar-section">
              <v-tooltip
                v-for="tool in state.tools.list.embed"
                :key="tool.format"
                class="v-editor__tool"
                :class="state.formats[tool.type] && 'v-editor__tool--active'"
                activate-by-click
              >
                <v-icon
                  :icon="tool.icon"
                  class="v-editor__tool-icon"
                />

                <template #tip="{ hide }">
                  <input
                    type="text"
                    :placeholder="tool.placeholder"
                    class="v-editor__shadow-input"
                    @keydown.enter.prevent.stop="
                      insertEmbed(tool.type, $event.target.value) || hide()
                    "
                  >
                </template>
              </v-tooltip>
            </div>
          </div>
        </div>

        <div class="v-editor__help v-editor__header-section">
          <v-icon :icon="['fas', 'question-circle']" />
        </div>
      </div>

      <div
        id="editor"
        class="v-editor__area"
        @keydown.ctrl.z.exact="state.historyMove = 'undo'"
        @keydown.ctrl.shift.z="state.historyMove = 'redo'"
        @keyup="state.historyMove = false"
      />

      <input
        type="hidden"
        name="Текст"
        :value="state.text"
        @input="validate"
      >
      <div
        v-if="errors.length"
        class="v-editor__error"
      >
        <v-icon
          :icon="['fas', 'exclamation']"
          class="v-editor__error-icon"
        />
        <span>{{ errors[0] }}</span>
      </div>

      <div class="text-xs py-3">
        {{ state.text.length }}/15000
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
import createQuill from 'assets/js/quill'
import { required as veeRuleRequired } from 'vee-validate/dist/rules'
import { extend as veeExtend, localize as veeLocalize } from 'vee-validate'
import 'highlight.js/styles/atom-one-dark.css'

veeExtend('quillRequired', { ...veeRuleRequired })
veeLocalize({
  en: { messages: { quillRequired: "Text can't be empty" } },
  ru: { messages: { quillRequired: 'Текст не может быть пустым' } },
})

export default {
  name: 'VEditor',
  model: {
    event: 'change',
    prop: 'value',
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    rules: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: `
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid blanditiis cum cupiditate,
        delectus deleniti dolores doloribus eaque eos laborum laudantium, magnam natus necessitatibus quod reiciendis
        saepe sapiente tempora unde?
      `,
    },
  },
  data: () => ({
    quill: null,
    state: {
      historyMove: false,
      text: '',
      formats: {},
      tools: {
        list: {
          inline: [
            [
              { format: 'bold', icon: ['fas', 'bold'] },
              { format: 'italic', icon: ['fas', 'italic'] },
              { format: 'underline', icon: ['fas', 'underline'] },
            ],
            [{ format: 'header', icon: ['fas', 'heading'] }],
            [
              { format: 'blockquote', icon: ['fas', 'quote-right'] },
              { format: 'core-block', icon: ['fas', 'code'] },
              { format: 'list', icon: ['fas', 'list'] },
            ],
          ],
          line: [
            { format: 'align', value: false, icon: 'align-left' },
            { format: 'align', value: 'center', icon: 'align-center' },
            { format: 'align', value: 'right', icon: 'align-right' },
          ],
          media: [{ type: 'image', icon: ['fas', 'file-image'] }],
          embed: [
            {
              type: 'video',
              icon: ['fab', 'youtube'],
              placeholder: 'ссылка на youtube или vimeo',
            },
            {
              type: 'twitter',
              icon: ['fab', 'twitter'],
              placeholder: 'ссылка на твит',
            },
          ],
        },
      },
    },
  }),
  watch: {
    'state.text'() {
      this.validate()
    },
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      const options = {
        placeholder: this.placeholder,
        modules: {
          imageUploader: {
            upload: async (file) => await this.$store.dispatch('files/uploadImage', file),
          },
        },
      }

      const quill = createQuill('#editor', options)

      quill.on('editor-change', this.onEditorChange)
      quill.on('text-change', this.onTextChange)
      quill.on('selection-change', this.onSelectionChange)
      quill.root.addEventListener('blur', this.validate)

      this.quill = quill

      if (this.value?.length) {
        this.quill.pasteHTML(this.value)
      }

      this.quill.blur()
    },
    undo() {
      this.quill.history.undo()
    },
    redo() {
      this.quill.history.redo()
    },
    validate() {
      setTimeout(this.$refs.validator.validate)
    },
    updateState() {
      if (this.quill.hasFocus()) {
        this.state.formats = this.quill.getFormat() || {}
      }
    },
    toggleInlineFormat(format) {
      this.quill.format(format, !this.state.formats[format])
    },
    lineFormat(format, value) {
      this.quill.format(format, value)
    },
    insertMedia(type) {
      const quill = this.quill
      const range = quill.getSelection()

      quill.focus()

      switch (type) {
        case 'image':
          this._insertImage(range)
          break
        // this architecture for future composes
      }
    },
    _insertImage() {
      this.quill.getModule('imageUploader').selectLocalImage()
    },
    insertEmbed(type, option = null) {
      const quill = this.quill

      quill.focus()

      const range = quill.getSelection()

      switch (type) {
        case 'video':
          quill.insertEmbed(range, 'video', option)
          break
        case 'twitter':
          quill.insertEmbed(range, 'twitter', { url: option })
      }
    },
    _insertVideo() {
      const range = this.quill.getSelection()
      this.quill.insertText(range.index, 'insert an youtube video link', 'italic')
    },
    _insertHtml(range, type, args) {
      this.quill.insertEmbed(range.index, type, args)
    },
    onSelectionChange(range) {
      if (!range) {
        this.quill.blur()
        this.validate()
      }
    },
    onEditorChange() {
      this.updateState()
      this.$emit('change', this.quill.container.firstChild.innerHTML)
    },
    onTextChange() {
      this.state.text = this.quill.getText().trim()
    },
  },
}
</script>

<style>
.image-uploading::before {
  border-color: transparent !important;
  border-top-color: theme('colors.primary.DEFAULT') !important;
  animation: spinner 5s linear infinite !important;
}
.ql-clipboard {
  display: none;
}
.ql-editor.ql-blank {
  position: relative;
}
.ql-editor {
  overflow: hidden;
}
.ql-editor.ql-blank::before {
  color: var(--color-muted-darken);
  content: attr(data-placeholder);
  pointer-events: none;
  position: absolute;
  width: 100%;
  word-break: break-all;
}
</style>

<style lang="scss" scoped>
.v-editor {
  &__error {
    @apply text-danger;
  }

  &__shadow-input {
    background-color: transparent;
    font-size: 0.9rem;
    min-width: 300px;
    color: #fff;
    border: none;
    outline: none;
    margin: -0.5rem -1.5rem;
    padding: 0.5rem 1.5rem;
  }

  &__header-section {
    @apply flex w-full;
  }

  &__header-section:last-of-type {
    @apply justify-end;
  }

  &__history-control {
    @apply py-2 px-3 my-1 cursor-pointer transition-colors flex text-gray-900 dark:text-blueGray-400 hover:text-primary;
  }

  &__history-control:first-of-type {
    @apply border-r border-gray-200 dark:border-blueGray-700;
  }

  &__history-control:active,
  &__history-control--active {
    @apply text-primary #{!important};
  }

  &__toolbar {
    padding: 0.5rem;
    margin-top: -1px;
    width: fit-content;
    border-radius: 0 0 8px 8px;
    border: 1px solid var(--color-muted);
    border-top-color: var(--color-background);
    background-color: var(--color-background);
  }

  &__toolbar-hightlight {
    @apply bg-gray-300 dark:bg-blueGray-700 absolute h-4 opacity-0 rounded-md box-border;

    transform: translate(calc(8px - 0.5rem));
    transition: opacity 0.3s var(--base-transition);
    z-index: 1;
  }

  &__toolbar--hover &__toolbar-hightlight {
    opacity: 1 !important;
  }

  &__toolbar--anim &__toolbar-hightlight {
    transition: 0.3s var(--base-transition) !important;
    transition-property: opacity, transform;
  }

  &__toolbar-tools {
    position: relative;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }

  &__toolbar-section {
    display: flex;
    align-items: center;
  }

  &__tools-delimiter {
    @apply h-4 w-px bg-gray-300 dark:bg-blueGray-700 mx-4;
  }

  &__tool {
    position: relative;
    color: var(--color-text);
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.6rem;
    cursor: pointer;
    border-radius: 8px;
    box-sizing: border-box;
    width: 35px;
    justify-content: center;
    z-index: 2;
    transition: background-color 0.3s var(--base-transition);
  }

  &__tool--active {
    @apply text-primary;
  }

  &__area /deep/ .ql-editor {
    min-height: 100px;
  }
}
</style>
