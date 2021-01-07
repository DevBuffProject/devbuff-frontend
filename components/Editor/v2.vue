<template>
  <div class="example">
    <client-only>
      <quill-editor
        class="editor"
        ref="editor"
        v-model="content"
        :options="options"
        @focus="updateState"
        @change="updateState"
      >
        <div id="toolbar" class="v-editor__toolbar" slot="toolbar">
          <div
            v-for="tool in state.tools.inline"
            :key="tool"
            class="v-editor__tool v-editor__tool--inline"
            @click="toggleInlineFormat(tool)"
          >
            <v-icon :icon="['fas', tool]" />
          </div>

          <div class="v-editor__tools-delimiter" />

          <div
            v-for="tool in state.tools.block"
            :key="tool.format"
            :class="state.formats[tool.format]  && 'v-editor__tool--active'"
            @click="toggleInlineFormat(tool.format)"
          >
            {{ state.formats[tool.format] }}
          </div>
        </div>
      </quill-editor>
    </client-only>
  </div>
</template>

<script>
import dedent from 'dedent'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow.css'

export default {
  name: 'v-editor',

  data: () => ({
    state: {
      formats: {},
      tools: {
        inline: ['bold', 'italic', 'underline'],
        block: [
          { format: 'blockquote', icon: 'quote-right' },
          { format: 'code-block', icon: 'code' },
        ]
      }
    },
    options: {
      modules: {
        toolbar: '#toolbar',
        syntax: { highlight: text => hljs.highlightAuto(text).value }
      }
    },
    content: dedent`
        <h1 class="ql-align-center"><span class="ql-font-serif">Custom toolbar example!</span></h1><p><br></p><p><strong class="ql-font-serif">Whenever you play the game of thrones, you either win or die. There is no middle ground.</strong></p><p><br></p><p><u class="ql-font-serif">Some war against sword and spear to win, and the others the crow and the paper to win.</u></p><p><br></p><p><em class="ql-font-serif">Dead history is write in ink, the living sort in blood.</em></p><p><br></p><p><strong style="color: rgb(0, 102, 204);">Blog site: </strong><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255);"><strong>https://surmon.me</strong></a></p><p><br></p><p><span class="ql-font-serif" style="color: rgb(0, 102, 204);">They're only numbers. Numbers on paper. Once you understand that, it's easy to make them behave.</span></p><p><br></p><p><strong class="ql-font-monospace">When the snows fall and the white winds blow, the lone wolf dies, but the pack survives.</strong></p>
      `,
  }),
  methods: {
    updateState() {
      this.state.formats = this.$refs.editor?.quill.getFormat() || {}
    },
    toggleInlineFormat(format) {
      this.$refs.editor?.quill.format(format, !this.state.formats[format])
    }
  }
}
</script>

<style lang="scss" scoped>
.ql-editor {
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  overflow-y: auto;
  padding: 12px 15px;
  -o-tab-size: 4;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
}

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
    //background-color: var(--color-muted-accent);
    font-size: 1.2rem;
    padding: .25rem 0;
    border-radius: 4px;
    margin: -.25rem;
    margin-bottom: 1.25rem;
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
    color: var(--color-text-tint);
    display: inline-flex;
    align-items: center;
    padding: .5rem .5rem;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color .3s var(--base-transition);
  }

  &__tool:not(:last-of-type) {
    margin-right: .25rem;
  }

  &__tool:hover {
    background-color: var(--color-muted-accent);
  }

  &__tool--inline {
    width: 1rem;
    justify-content: center;
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
