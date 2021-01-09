<template>
  <div class="v-editor">
    <ValidationProvider
      rules="quillRequired"
      ref="validator"
      name="text"
      v-slot="{ errors }"
      tag="div"
    >

      <div class="v-editor__header">
        <div class="v-editor__history v-editor__header-section">
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
              :class="state.formats[tool.format] && 'v-editor__tool--active'"
              :data-tool-name="tool.format"
              @click="toggleInlineFormat(tool.format)"
              @mouseover.self="onToolMouseover"
              @mouseout.self="onToolMouseout"
            >
              <v-icon
                @mouseover.stop.prevent
                @mouseout.stop.prevent
                :icon="tool.icon"
                class="v-editor__tool-icon"
              />
            </div>
            <div v-if="index + 1 < state.tools.list.inline.length" class="v-editor__tools-delimiter" />
          </div>

          <div class="v-editor__tools-delimiter" />

          <div class="v-editor__toolbar-section">
            <div
              v-for="tool in state.tools.list.line"
              :key="tool.format + tool.value"
              ref="tools"
              class="v-editor__tool"
              :class="state.formats[tool.format] === tool.value && 'v-editor__tool--active'"
              :data-tool-name="`${tool.format}-${tool.value}`"
              @click="lineFormat(tool.format, tool.value)"
              @mouseover.self="onToolMouseover"
              @mouseout.self="onToolMouseout"
            >
              <v-icon
                @mouseover.stop.prevent
                @mouseout.stop.prevent
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
              ref="tools"
              class="v-editor__tool"
              :class="state.formats[tool.type] && 'v-editor__tool--active'"
              :data-tool-name="tool.type"
              @click="insertMedia(tool.type)"
              @mouseover.self="onToolMouseover"
              @mouseout.self="onToolMouseout"
            >
              <v-icon
                @mouseover.stop.prevent
                @mouseout.stop.prevent
                :icon="tool.icon"
                class="v-editor__tool-icon"
              />
            </div>
          </div>

          <div class="v-editor__toolbar-section">
            <v-tooltip
              v-for="tool in state.tools.list.embed"
              :key="tool.format"
              ref="tools"
              :data-tool-name="tool.type"
              @mouseover.self="onToolMouseover"
              @mouseout.self="onToolMouseout"
              class="v-editor__tool"
              :class="state.formats[tool.type] && 'v-editor__tool--active'"
              activate-by-click
            >
              <v-icon
                @mouseover.stop.prevent
                @mouseout.stop.prevent
                :icon="tool.icon"
                class="v-editor__tool-icon"
              />

              <template v-slot:tip="{ hide }">
                <input
                  type="text"
                  placeholder="http://example.com"
                  @keydown.enter.prevent.stop="insertEmbed(tool.type, $event.target.value) || hide()"
                  class="v-editor__shadow-input"
                />
              </template>
            </v-tooltip>
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
        @keyup="state.historyMove = ''"
      />

      <input type="hidden" :value="state.text" @change="validate" />
      <div v-if="errors.length" class="v-editor__error">
        <v-icon :icon="['fas', 'exclamation']" class="v-editor__error-icon" />
        <span>{{ errors[0] }}</span>
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
import Quill from 'quill'
import hljs from 'highlight.js'
import MagicUrl from 'quill-magic-url'
import BlotFormatter from 'quill-blot-formatter'
import ImageUploader from 'quill-image-uploader'
import TwitterBlot from './assets/Blots/twitter-blot/index.js'
import { required as veeRuleRequired } from 'vee-validate/dist/rules'
import { extend as veeExtend, localize as veeLocalize } from 'vee-validate'
import 'highlight.js/styles/atom-one-dark.css'

let highlightTimeout = 0

veeExtend('quillRequired', { ...veeRuleRequired });
veeLocalize({
  en: { messages:{ quillRequired: 'Text can\'t be empty' } },
  ru: { messages: { quillRequired: 'Текст не может быть пустым' } }
})

Quill.register('formats/twitter', TwitterBlot)
Quill.register('modules/magicUrl', MagicUrl)
Quill.register('modules/blotFormatter', BlotFormatter)
Quill.register("modules/imageUploader", ImageUploader)

const Codeblock = Quill.import('formats/code-block')
const Quoteblock = Quill.import('formats/blockquote')
const Header = Quill.import('formats/header')
const List = Quill.import('formats/list')
const Align = Quill.import('attributors/style/align')

Codeblock.className = 'codeblock'
Codeblock.tags = 'pre code'
Quoteblock.className = 'blockquote'
Header.className = 'heading'
List.className = 'list'

Quill.register(Align, true)

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
      historyMove: '',
      toolHover: false,
      text: null,
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
          toolbar: '#toolbar',
          clipboard: true,
          history: true,
          magicUrl: true,
          blotFormatter: true,
          imageUploader: { upload: async file => await this.$store.dispatch('files/uploadImage', file) },
          syntax: { highlight: text => hljs.highlightAuto(text).value }
        }
      }

      const quill = new Quill('#editor', options)

      quill.on('editor-change', this.onEditorChange)
      quill.on('text-change', this.onTextChange)
      quill.on('selection-change', this.onSelectionChange)
      quill.root.addEventListener('blur', this.validate)

      this.quill = quill

      this.quill.pasteHTML(this.value)
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
      console.log(format, value)
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
    insertEmbed(type, option) {
      const quill = this.quill

      quill.focus()

      const range = quill.getSelection()

      switch (type) {
        case 'video': this._insertVideo(range)
              break;
        case 'twitter': this._insertHtml(range, 'twitter', { url: option })
      }
    },
    _insertVideo() {
      const range = this.quill.getSelection()
      this.quill.insertText(range.index,'insert an youtube video link', 'italic')
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
      this.state.toolHover = true
      const highlight = this.$refs.highlight
      const toolName = e.target.getAttribute('data-tool-name')
      const { width, height, left } = this.state.tools.positions[toolName]

      highlight.style.width = `${width}px`
      highlight.style.height = `${height}px`
      highlight.style.transform = `translate(calc(${left}px - .5rem))`
      this.$refs.toolbar.classList.add('v-editor__toolbar--hover')
      setTimeout(() => this.$refs.toolbar.classList.add('v-editor__toolbar--anim'), 30)
      clearTimeout(highlightTimeout)
    },
    onToolMouseout() {
      this.$refs.toolbar.classList.remove('v-editor__toolbar--hover')
      highlightTimeout = setTimeout(() => this.$refs.toolbar.classList.remove('v-editor__toolbar--anim'), 70)
    }
  },

  mounted() {
    this.init()
    this.computeToolsPositions()
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
.ql-editor.ql-blank::before {
  color: var(--color-muted-darken);
  content: attr(data-placeholder);
  pointer-events: none;
  position: absolute;
  right: 15px;
}
</style>

<style lang="scss" scoped>
.v-editor {
  background-color: var(--color-background-contrast);
  padding: 1rem;
  padding-top: 0;
  border-radius: 16px;
  border: 1px solid var(--color-muted-accent);
  border-bottom: 1px solid var(--color-muted);
  box-shadow: 0 1px 1px 0 var(--color-muted);

  &--state-invalid {
    box-shadow: inset 0 0 0 1px var(--color-danger);
  }

  &__shadow-input {
    font-size: inherit;
    background: transparent;
    color: #fff;
    border: none;
    outline: none;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
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
    border-radius: 8px;
    margin-left: -.85rem;
    overflow: hidden;
  }

  &__history-help {
    font-size: .5rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-muted-darken);
  }

  &__history-control {
    padding: .5rem .85rem;
    display: flex;
    color: var(--color-text);
    cursor: pointer;
  }

  &__history-control:active,
  &__history-control--active {
    color: var(--color-primary);
  }

  &__history-control:not(:last-of-type) {
    border-right: 1px solid var(--color-muted);
  }

  &__toolbar {
    position: relative;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    padding: .5rem;
    width: fit-content;
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-radius: 0 0 8px 8px;
    border-color: var(--color-muted);
    background-color: var(--color-background);
  }

  &__toolbar--hover &__toolbar-hightlight {
    opacity: 1 !important;
  }

  &__toolbar--anim &__toolbar-hightlight {
    transition: .3s var(--base-transition) !important;
    transition-property: opacity, transform;
  }

  &__toolbar-hightlight {
    position: absolute;
    background-color: var(--color-muted-accent);
    height: 1rem;
    top: .5rem;
    opacity: 0;
    border-radius: 8px;
    box-sizing: border-box;
    z-index: 1;
    transition: opacity .3s var(--base-transition);
  }

  &__toolbar-section {
    display: flex;
    align-items: center;
  }

  &__tools-delimiter {
    background-color: var(--color-muted-darken);
    margin: 0 1rem;
    height: 1rem;
    width: 1px;
  }

  &__tool {
    position: relative;
    color: var(--color-text-tint);
    display: inline-flex;
    align-items: center;
    padding: .5rem .6rem;
    cursor: pointer;
    border-radius: 8px;
    width: 1rem;
    justify-content: center;
    z-index: 2;
    transition: background-color .3s var(--base-transition);
  }

  &__tool::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
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
}
</style>
