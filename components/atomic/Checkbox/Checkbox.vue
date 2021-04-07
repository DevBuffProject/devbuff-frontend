<template>
  <div @click="updateInput" @touchdown="updateInput">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VCheckbox',
  model: {
    event: 'change',
    prop: 'checked',
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    checked: {
      type: [Boolean, String, Number, Array],
      default: false,
    },
    trueValue: {
      type: [Boolean, Number, String],
      default: true,
    },
    falseValue: {
      type: [Boolean, Number, String],
      default: false,
    },
    value: {
      type: [Boolean, String, Number],
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    isChecked() {
      if (Array.isArray(this.checked)) {
        return this.checked.includes(this.value)
      }
      return this.checked === this.trueValue
    },
  },
  methods: {
    updateInput() {
      if (Array.isArray(this.checked) || this.value) {
        const newValue = this.checked?.length ? [...this.checked] : []
        const includes = this.checked?.length
          ? this.checked?.includes(this.value)
          : false

        if (!includes) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit(
          'change',
          this.checked === this.trueValue ? this.falseValue : this.trueValue
        )
      }
    },
  },
}
</script>
