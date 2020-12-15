<template>
  <div class="shadow-input">
    <span class="shadow-input__hidden">
      <span
        class="shadow-input__hidden-text"
        ref="hiddenText"
        v-text="model"
      >
      </span>
    </span>
    <div
      v-if="label"
      v-show="isFocused"
      class="shadow-input__label"
    >
      {{ label }}
    </div>
    <input
      v-if="type !== 'textarea'"
      class="shadow-input__field"
      v-model="model"
      v-on="listeners"
      ref="field"
    />
    <textarea
      v-else
      class="shadow-input__field"
      v-model="model"
      v-on="listeners"
      ref="field"
      resize="none"
    />
  </div>
</template>

<script>
export default {
  name: 'v-shadow-input',

  data() {
    return {
      model: this.value,
      isFocused: false
    }
  },

  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      defalut: null
    }
  },

  mounted() {
    this.computeWidth()
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.input,
        focus: this.focus,
        blur: this.blur
      }
    }
  },

  methods: {
    input(event) {
      this.$emit('input', event)
      this.computeWidth()
    },
    focus() {
      this.isFocused = true
    },
    blur() {
      this.isFocused = false
    },
    computeWidth() {
      this.$nextTick(() => {
        if (!document.createRange) return

        const { field, hiddenText } = this.$refs

        field.style.height = 'auto'
        field.style.width = `${hiddenText.offsetWidth}px`
        field.style.height = `${field.scrollHeight}px`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shadow-input {
  position: relative;

  &__field {
    font: inherit;
    width: 0;
    height: auto;
    padding: 0;
    outline: none;
    border: 0;
    padding: 0 .3rem;
    border-radius: 4px;
    white-space: pre;
    resize: none;
    overflow: hidden;
    transition: background-color .15s var(--base-transition);
    &:hover, &:focus {
      background-color: var(--color-muted);
    }
  }

  &__hidden {
    visibility: hidden;
    position: absolute;
  }

  &__hidden-text {
    white-space: pre;
  }

  &__label {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    font-size: .7rem;
    font-weight: 300;
    color: var(--color-muted-darken);
    padding-left: .3rem;
    white-space: nowrap;
  }
}
</style>
