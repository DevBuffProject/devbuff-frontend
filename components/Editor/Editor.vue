<template>
  <div class="v-editor">
    <ValidationProvider
      rules="quillRequired"
      ref="validator"
      name="text"
      v-slot="{ errors }"
    >
      <div id="toolbar" class="v-editor__toolbar">
        <div class="v-editor__toolbar-hightlight" ref="highlight" />

        <div
          v-for="(section, index) in state.tools"
          :key="index"
          class="v-editor__toolbar-section"
        >
          <div
            v-for="tool in section"
            :key="tool.format"
            class="v-editor__tool"
            :class="state.formats[tool.format] && 'v-editor__tool--active'"
            @click="toggleInlineFormat(tool.format)"
            @mouseover="onToolMouseover"
          >
            <v-icon
              :icon="['fas', tool.icon]"
              class="v-editor__tool-icon"
            />
          </div>
          <div v-if="index + 1 < state.tools.length" class="v-editor__tools-delimiter" />
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
import hljs from 'highlight.js'
import { localize, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import 'highlight.js/styles/tomorrow-night.css'

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
      text: null,
      formats: {},
      tools: [
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
      ]
    },
  }),

  methods: {
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
    onSelectionChange(range) {
      if (!range) {
        this.quill.blur()
        this.validate()
      }
    },
    onEditorChange() {
      this.updateState()
    },
    onTextChange() {
      this.$emit('change', this.quill.container.firstChild.innerHTML)

      const text = this.quill.getText().trim()
      this.state.text = text
    },
    onToolMouseover(e) {
      const highlight = this.$refs.highlight
      const width = e.target.offsetWidth
      const left = e.target.offsetLeft > 0
        ? e.target.offsetLeft - 1
        : e.target.offsetLeft

      highlight.style.width = `${width}px`
      highlight.style.transform = `translateX(${left}px)`
    }
  },

  created() {
    const Codeblock = Quill.import('formats/code-block')
    const Quoteblock = Quill.import('formats/blockquote')
    const Header = Quill.import('formats/header')
    const List = Quill.import('formats/list')

    Codeblock.className = 'codeblock'
    Quoteblock.className = 'blockquote'
    Header.className = 'heading'
    List.className = 'list'

  },

  mounted() {
    const options = {
      modules: {
        toolbar: '#toolbar',
        syntax: { highlight: text => hljs.highlightAuto(text).value }
      }
    }

    const quill = new Quill('#editor', options)

    quill.on('editor-change', this.onEditorChange)
    quill.on('text-change', this.onTextChange)
    quill.on('selection-change', this.onSelectionChange)
    quill.root.addEventListener('blur', this.validate)

    this.quill = quill
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

  &__toolbar {
    position: relative;
    //background-color: var(--color-muted-accent);
    font-size: 1.2rem;
    border-radius: 4px;
    margin: -.25rem;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
  }

  &__toolbar:hover &__toolbar-hightlight {
    opacity: 1;
  }

  &__toolbar-hightlight {
    position: absolute;
    background-color: var(--color-muted-accent);
    height: 100%;
    top: 0;
    opacity: 0;
    border-radius: 5px;
    box-sizing: border-box;
    transition: .5s var(--base-transition);
    transition-property: transform, width, opacity;
    z-index: 1;
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
    padding: .5rem .5rem;
    cursor: pointer;
    border-radius: 8px;
    width: 1rem;
    justify-content: center;
    z-index: 2;
    transition: background-color .3s var(--base-transition);
  }

  &__tool:not(:last-of-type) {
    margin-right: .25rem;
  }

  &__tool--active {
    background-color: var(--color-muted-accent);
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
