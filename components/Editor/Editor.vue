<template>
  <ValidationProvider
    :rules="['quillRequired', 'max:15000', rules].join('|')"
    ref="validator"
    name="text"
    v-slot="{ errors }"
    tag="div"
  >
    <div
      class="v-editor"
      :class="errors.length && 'v-editor--state-invalid'"
    >

      <div class="v-editor__header">
        <div
          class="v-editor__history v-editor__header-section"
          :class="state.historyMove && 'v-editor__history--move-active'"
        >
          <div
            v-for="historyAction in ['undo', 'redo']"
            :key="historyAction"
            @click="historyAction === 'undo' ? undo : redo"
            class="v-editor__history-control"
            :class="state.historyMove === historyAction && 'v-editor__history-control--active'"
          >
            <v-icon :icon="['fas', `${historyAction}-alt`]" />
          </div>
          <span class="v-editor__history-help">ctrl + shift + z</span>
        </div>

        <div
          id="toolbar"
          ref="toolbar"
          class="v-editor__toolbar"
          :class="state.toolHover && 'v-editor__toolbar--hover'"
        >
          <div class="v-editor__toolbar-tools">
            <div class="v-editor__toolbar-hightlight" ref="highlight" />

            <div
              v-for="(section, index) in state.tools.list.inline"
              :key="index"
              class="v-editor__toolbar-section"
            >
              <div
                v-for="tool in section"
                :key="tool.format"
                ref="tools"
                class="v-editor__tool"
                v-ripple="'rgba(0, 0, 0, .05)'"
                :class="state.formats[tool.format] && 'v-editor__tool--active'"
                :data-tool-name="tool.format"
                @click.stop.prevent="toggleInlineFormat(tool.format)"
                @mouseover="onToolMouseover"
                @mouseout="onToolMouseout"
              >
                <v-icon :icon="tool.icon" class="v-editor__tool-icon" />
              </div>
              <div v-if="index + 1 < state.tools.list.inline.length" class="v-editor__tools-delimiter" />
            </div>

            <div class="v-editor__tools-delimiter" />

            <div class="v-editor__toolbar-section">
              <div
                v-for="tool in state.tools.list.line"
                :key="tool.format + tool.value"
                ref="tools"
                v-ripple="'rgba(0, 0, 0, .05)'"
                class="v-editor__tool"
                :class="state.formats[tool.format] === tool.value && 'v-editor__tool--active'"
                :data-tool-name="`${tool.format}-${tool.value}`"
                @click="lineFormat(tool.format, tool.value)"
                @mouseover.self="onToolMouseover"
                @mouseout.self="onToolMouseout"
              >
                <v-icon :icon="tool.icon" class="v-editor__tool-icon" />
              </div>
            </div>

            <div class="v-editor__tools-delimiter" />

            <div class="v-editor__toolbar-section">
              <div
                v-for="tool in state.tools.list.media"
                :key="tool.format"
                ref="tools"
                v-ripple
                class="v-editor__tool"
                :class="state.formats[tool.type] && 'v-editor__tool--active'"
                :data-tool-name="tool.type"
                @click="insertMedia(tool.type)"
                @mouseover="onToolMouseover"
                @mouseout.self="onToolMouseout"
              >
                <v-icon :icon="tool.icon" class="v-editor__tool-icon" />
              </div>
            </div>

            <div class="v-editor__toolbar-section">
              <v-tooltip
                v-for="tool in state.tools.list.embed"
                :key="tool.format"
                ref="tools"
                v-ripple="'rgba(0, 0, 0, .05)'"
                :data-tool-name="tool.type"
                @mouseover.self="onToolMouseover"
                @mouseout.self="onToolMouseout"
                class="v-editor__tool"
                :class="state.formats[tool.type] && 'v-editor__tool--active'"
                activate-by-click
              >
                <v-icon :icon="tool.icon" class="v-editor__tool-icon" />

                <template v-slot:tip="{ hide }">
                  <input
                    type="text"
                    :placeholder="tool.placeholder"
                    @keydown.enter.prevent.stop="insertEmbed(tool.type, $event.target.value) || hide()"
                    class="v-editor__shadow-input"
                  />
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
        @keydown.ctrl.90.exact="state.historyMove = 'undo'"
        @keydown.ctrl.shift.90="state.historyMove = 'redo'"
        @keyup="state.historyMove = false"
      />

      <input type="hidden" name="Текст" :value="state.text" @change="validate" />
      <div v-if="errors.length" class="v-editor__error">
        <v-icon :icon="['fas', 'exclamation']" class="v-editor__error-icon" />
        <span>{{ errors[0] }}</span>
      </div>

      <div class="v-editor__statusline">
        {{ state.text.length }}/15000
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
import createQuill from '~/assets/js/quill'
import { required as veeRuleRequired } from 'vee-validate/dist/rules'
import { extend as veeExtend, localize as veeLocalize } from 'vee-validate'
import 'highlight.js/styles/atom-one-dark.css'

console.log('created')

let highlightTimeout = 0

veeExtend('quillRequired', { ...veeRuleRequired });
veeLocalize({
  en: { messages:{ quillRequired: 'Text can\'t be empty' } },
  ru: { messages: { quillRequired: 'Текст не может быть пустым' } }
})

export default {
  name: 'v-editor',

  model: {
    event: 'change',
    prop: 'value'
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
      `
    }
  },

  data: () => ({
    quill: null,
    state: {
      historyMove: false,
      toolHover: false,
      text: '',
      formats: {},
      tools: {
        positions: {},
        list: {
          inline: [
            [
              { format: 'bold', icon: ['fas', 'bold'] },
              { format: 'italic', icon: ['fas', 'italic'] },
              { format: 'underline', icon: ['fas', 'underline'] },
            ],
            [
              { format: 'header', icon: ['fas', 'heading'] },
            ],
            [
              { format: 'blockquote', icon: ['fas', 'quote-right'] },
              { format: 'code-block', icon: ['fas', 'code'] },
              { format: 'list', icon: ['fas', 'list'] },
            ]
          ],
          line: [
            { format: 'align', value: false, icon: 'align-left' },
            { format: 'align', value: 'center', icon: 'align-center' },
            { format: 'align', value: 'right', icon: 'align-right' },
          ],
          media: [
            { type: 'image', icon: ['fas', 'file-image'] },
          ],
          embed: [
            { type: 'video', icon: ['fab', 'youtube'], placeholder: 'ссылка на youtube или vimeo' },
            { type: 'twitter', icon: ['fab', 'twitter'], placeholder: 'ссылка на твит' },
          ]
        }
      }
    },
  }),

  methods: {
    init() {
      const options = {
        placeholder: this.placeholder,
        modules: {
          imageUploader: { upload: async file => await this.$store.dispatch('files/uploadImage', file) },
        }
      }

      const quill = createQuill('#editor', options)

      quill.on('editor-change', this.onEditorChange)
      quill.on('text-change', this.onTextChange)
      quill.on('selection-change', this.onSelectionChange)
      quill.root.addEventListener('blur', this.validate)

      this.quill = quill

      if (this.value?.length) this.quill.pasteHTML(this.value)

      this.quill.blur()
      this.computeToolsPositions()
    },
    undo() {
      this.quill.history.undo()
    },
    redo() {
      this.quill.history.redo()
    },
    computeToolsPositions() {
      const tools = this.$refs.tools

      tools.map(t => {
        const tool = t.$el || t
        const toolName = tool.getAttribute('data-tool-name')
        const width = tool.offsetWidth
        const height = tool.offsetHeight
        const left = tool.offsetLeft > 0
          ? tool.offsetLeft - 1
          : tool.offsetLeft

        this.state.tools.positions[toolName] = { width, height, left }
      })
    },
    validate() {
      this.$refs.validator.validate()
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
        case 'image': this._insertImage(range)
              break;
        // this architecture for future features
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
        case 'video': quill.insertEmbed(range, 'video', option)
              break;
        case 'twitter': quill.insertEmbed(range, 'twitter', { url: option })
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
    onToolMouseover(e) {
      console.log('mouseover')
      this.state.toolHover = true
      const highlight = this.$refs.highlight
      const toolName = e.target.getAttribute('data-tool-name')

      if (!toolName) return

      const { width, height, left } = this.state.tools.positions[toolName]

      highlight.style.width = `${width}px`
      highlight.style.height = `${height}px`
      highlight.style.transform = `translate(${left}px)`
      this.$refs.toolbar.classList.add('v-editor__toolbar--hover')
      setTimeout(() => this.$refs.toolbar.classList.add('v-editor__toolbar--anim'), 30)
      clearTimeout(highlightTimeout)
    },
    onToolMouseout(e) {
      this.$refs.toolbar.classList.remove('v-editor__toolbar--hover')
      highlightTimeout = setTimeout(() => this.$refs.toolbar.classList.remove('v-editor__toolbar--anim'), 70)
    }
  },

  mounted() {
    this.init()
  }
}
</script>

<style>
.image-uploading::before {
  border-color: transparent !important;
  border-top-color: var(--color-primary) !important;
  animation: spinner 5s linear infinite !important;
}
.ql-clipboard { display: none }
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
  top: 1rem;
  width: 100%;
  word-break: break-all;
}
</style>

<style lang="scss" scoped>
#editor::after {
  content: "";
  clear: both;
  overflow: hidden;
}
.v-editor {
  background-color: var(--color-background-accent);
  padding: 1rem;
  padding-top: 0;
  border-radius: 16px;
  border: 1px solid var(--color-muted);

  &--state-invalid {
    border-color: var(--color-danger);
  }

  &__shadow-input {
    background-color: transparent;
    font-size: inherit;
    font-size: .9rem;
    min-width: 300px;
    color: #fff;
    border: none;
    outline: none;
    margin: -.5rem -1.5rem;
    padding: .5rem 1.5rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }

  &__header-section {
    width: 100%;
    display: flex;
  }

  &__header-section:last-of-type {
    justify-content: flex-end;
  }

  &__history {
    display: flex;
    align-items: flex-end;
    height: fit-content;
    margin-left: -.85rem;
    overflow: hidden;
  }

  &__history-help {
    font-size: .65rem;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--color-muted-darken);
  }

  &__history-control {
    padding: .5rem .85rem;
    display: flex;
    color: var(--color-text);
    cursor: pointer;
    transition: .3s var(--base-transition);
  }

  &__history-control:active,
  &__history-control--active {
    background-color: var(--color-primary-fade);
    color: var(--color-primary);
    border-radius: 8px;
  }

  &__history--move-active &__history-control {
    border-color: transparent !important;
  }

  &__history-control:not(:last-of-type) {
    border-right: 1px solid var(--color-muted);
  }


  &__toolbar {
    padding: .5rem;
    margin-top: -1px;
    width: fit-content;
    border-radius: 0 0 8px 8px;
    border: 1px solid var(--color-muted);
    border-top-color: var(--color-background);
    background-color: var(--color-background);
  }

  &--state-invalid &__toolbar {
    border-color: var(--color-danger);
    border-top: 1px solid var(--color-background);
  }

  &__toolbar--hover &__toolbar-hightlight {
    opacity: 1 !important;
  }

  &__toolbar--anim &__toolbar-hightlight {
    transition: .3s var(--base-transition) !important;
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

  &__toolbar-hightlight {
    background-color: var(--color-muted);
    position: absolute;
    height: 1rem;
    opacity: 0;
    border-radius: 8px;
    box-sizing: border-box;
    transform: translate(calc(8px - 0.5rem));
    transition: opacity .3s var(--base-transition);
    z-index: 1;
  }

  &__tools-delimiter {
    background-color: var(--color-muted-darken);
    margin: 0 1rem;
    height: 1rem;
    width: 1px;
  }

  &__tool {
    position: relative;
    color: var(--color-text);
    display: inline-flex;
    align-items: center;
    padding: .5rem .6rem;
    cursor: pointer;
    border-radius: 8px;
    box-sizing: border-box;
    width: 35px;
    justify-content: center;
    z-index: 2;
    transition: background-color .3s var(--base-transition);
  }

  &__tool--active {
    background-color: var(--color-primary-fade);
    border-radius: 8px;
    color: var(--color-primary);
  }

  &__area /deep/ .ql-editor {
    min-height: 100px;
  }

  &__error {
    display: flex;
    align-items: center;
    font-size: .85rem;
    color: var(--color-danger);
  }

  &__error-icon {
    font-size: .7rem;
    margin-right: .5rem;
    transform: translateY(-1px);
  }

  &__statusline {
    background-color: var(--color-muted);
    position: relative;
    font-size: .8rem;
    font-weight: 500;
    margin: -1rem;
    margin-top: 0;
    padding: .2rem 1.5rem;
    padding-top: 1.2rem;
    border-radius: 16px;
    overflow: hidden;
    color: var(--color-text);
  }

  &__statusline::before {
    $border-size: 2px;

    content: "";
    background: #fff;
    border-radius: 0 0 20px 20px;
    border: $border-size solid var(--color-muted);
    position: absolute;
    width: calc(100% + #{$border-size * 2});
    height: 20px;
    top: 0;
    box-sizing: border-box;
    border-top: 0;
    left: -$border-size;
  }
}
</style>
