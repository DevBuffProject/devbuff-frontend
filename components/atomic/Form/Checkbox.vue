<template>
  <div
    class="group"
    @click="updateInput"
    @touchend="updateInput"
    v-on="$listeners"
  >
    <div v-if="!$slots.default">
      <div class="text-2xl">
        <atomic-material-icon
          :name="icon"
          type="round"
          :class="[
            'transition-colors cursor-pointer',
            isChecked
              ? 'text-primary'
              : 'text-gray-300 dark:text-blueGray-500 group-hover:text-primary',
          ]"
        />
      </div>
      <span> {{ label }} </span>
    </div>
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
    isIntermedia: {
      type: Boolean,
      default: false,
    },
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
  },
  computed: {
    icon() {
      return this.isIntermedia
        ? 'indeterminate_check_box'
        : this.isChecked
        ? 'check_box'
        : 'check_box_outline_blank'
    },
    isChecked() {
      if (Array.isArray(this.checked)) return this.checked.includes(this.value)
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
