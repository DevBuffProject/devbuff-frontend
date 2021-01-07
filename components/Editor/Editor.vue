<template>
  <div class="v-editor">
    <ValidationProvider
      rules="quillRequired"
      ref="validator"
      name="text"
      v-slot="{ errors }"
    >
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        style="display: none"
        ref="imagePicker"
        @change="_insertImage"
      />

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
              :icon="['fas', tool.icon]"
              class="v-editor__tool-icon"
            />
          </div>
          <div v-if="index + 1 < state.tools.list.inline.length" class="v-editor__tools-delimiter" />
        </div>

        <div class="v-editor__tools-delimiter" />

        <div class="v-editor__toolbar-section">
          <div
            v-for="tool in state.tools.list.embed"
            :key="tool.format"
            ref="tools"
            class="v-editor__tool"
            :class="state.formats[tool.type] && 'v-editor__tool--active'"
            :data-tool-name="tool.type"
            @click="insertEmbed(tool.type)"
            @mouseover.self="onToolMouseover"
            @mouseout.self="onToolMouseout"
          >
            <v-icon
              @mouseover.stop.prevent
              @mouseout.stop.prevent
              :icon="['fas', tool.icon]"
              class="v-editor__tool-icon"
            />
          </div>
        </div>
      </div>

      <div id="editor" />

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
import MagicUrl from 'quill-magic-url'
import BlotFormatter from 'quill-blot-formatter'
import ImageUploader from 'quill-image-uploader'
import hljs from 'highlight.js'
import { extend as veeExtend, localize as veeLocalize } from 'vee-validate'
import { required as veeRuleRequired } from 'vee-validate/dist/rules'
import 'highlight.js/styles/atom-one-dark.css'

let highlightTimeout = 0

veeExtend('quillRequired', { ...veeRuleRequired });
veeLocalize({
  en: { messages:{ quillRequired: 'Text can\'t be empty' } },
  ru: { messages: { quillRequired: 'Текст не может быть пустым' } }
})

Quill.register('modules/magicUrl', MagicUrl)
Quill.register('modules/blotFormatter', BlotFormatter)
Quill.register("modules/imageUploader", ImageUploader)

const Codeblock = Quill.import('formats/code-block')
const Quoteblock = Quill.import('formats/blockquote')
const Header = Quill.import('formats/header')
const List = Quill.import('formats/list')

Codeblock.className = 'codeblock'
Quoteblock.className = 'blockquote'
Header.className = 'heading'
List.className = 'list'

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
    }
  },

  data: () => ({
    quill: null,
    state: {
      toolHover: false,
      text: null,
      formats: {},
      tools: {
        positions: {},
        list: {
          inline: [
            [
              { format: 'bold', icon: 'bold' },
              { format: 'italic', icon: 'italic' },
              { format: 'underline', icon: 'underline' },
            ],
            [
              { format: 'header', icon: 'heading' },
            ],
            [
              { format: 'blockquote', icon: 'quote-right' },
              { format: 'code-block', icon: 'code' },
              { format: 'list', icon: 'list' },
            ]
          ],
          embed: [
            { type: 'image', icon: 'file-image' },
          ]
        }
      }
    },
  }),

  methods: {
    init() {
      const options = {
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
    computeToolsPositions() {
      const tools = this.$refs.tools

      tools.map(tool => {
        const toolName = tool.getAttribute('data-tool-name')
        const width = tool.offsetWidth
        const left = tool.offsetLeft > 0
          ? tool.offsetLeft - 1
          : tool.offsetLeft

        this.state.tools.positions[toolName] = { width, left }
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
    insertEmbed(type) {
      switch (type) {
        case 'image': this._insertImage()
      }
    },
    _insertImage(e) {
      this.quill.focus()
      this.quill.getModule('imageUploader').selectLocalImage()
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
      const { width, left } = this.state.tools.positions[toolName]

      highlight.style.width = `${width}px`
      highlight.style.transform = `translateX(${left}px)`
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
</style>

<style lang="scss" scoped>
.v-editor {
  margin: -1rem;
  padding: 1rem;
  border-radius: 8px;

  &--state-invalid {
    box-shadow: inset 0 0 0 1px var(--color-danger);
  }

  &__toolbar {
    position: relative;
    font-size: 1.2rem;
    border-radius: 4px;
    margin: -.25rem;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
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
    height: 100%;
    top: 0;
    opacity: 0;
    border-radius: 5px;
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
    //background-color: var(--color-muted-accent);
    color: var(--color-primary);
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
