<template>
  <div class="shadow-input">
    <span class="shadow-input__hidden">
      <span
        class="shadow-input__hidden-text"
        ref="hiddenText"
      >{{ model }}</span>
    </span>
    <input
      v-if="type !== 'textarea'"
      class="shadow-input__field"
      v-model="model"
      @input="input"
      ref="field"
    />
    <textarea
      v-else
      class="shadow-input__field"
      v-model="model"
      @input="input"
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
      model: this.value
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
    }
  },

  mounted() {
    this.computeWidth()
  },

  methods: {
    input(event) {
      this.$emit('input', event)
      this.computeWidth()
    },
    computeWidth() {
      this.$nextTick(() => {
        if (!document.createRange) return

        const { field, hiddenText } = this.$refs
        const range = document.createRange();

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
}
</style>
