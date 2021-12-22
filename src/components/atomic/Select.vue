<template>
  <div class="relative">
    <input type="hidden" :value="selectedValue" />
    <atomic-form-input
      v-model="searchValue"
      :placeholder="selectedValue || placeholder"
      v-bind="$attrs"
      :class="selectedValue && $style.Input"
      @keydown.down="onKeydownDown"
      @keydown.up="onKeydownUp"
      @input="onInput"
    >
      <template #dropdown="{ hideDropdown }">
        <v-scroll class="w-full" style="max-height: 200px">
          <div class="divide-y divide-gray-200 dark:divide-dark-700">
            <div
              :class="[
                'px-4 py-2 cursor-pointer flex items-center',
                'animation-colors hover:bg-gray-100',
              ]"
              @mousedown="$emit('change', '')"
            >
              <atomic-material-icon name="backspace" />
              <span class="ml-2">Очистить</span>
            </div>
            <div
              v-for="(option, index) in finalOptions"
              :key="index"
              :class="[
                'px-4 py-2 cursor-pointer flex items-center',
                'animation-colors hover:bg-gray-100',
              ]"
              @mousedown="selectOption(option) || hideDropdown()"
            >
              {{ option.label }}
            </div>
          </div>
        </v-scroll>
      </template>
    </atomic-form-input>
  </div>
</template>

<script>
export default {
  name: 'VSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    noSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchValue: '',
      focusListIndex: 0,
    }
  },
  computed: {
    selectedValue() {
      return this.relatedOption?.label
    },
    relatedOption() {
      return this.options.find(
        ({ value }) =>
          String(value).toLowerCase() === String(this.value).toLowerCase(),
      )
    },
    finalOptions() {
      return this.noSearch
        ? this.options
        : this.options.filter(({ label }) =>
            String(label)
              .toLowerCase()
              .startsWith(this.searchValue.toLowerCase()),
          )
    },
  },
  methods: {
    selectOption(option) {
      this.searchValue = ''
      this.$emit('change', option.value)
      this.$emit('selected', option.value)
    },
    onInput(event) {
      this.$emit('input', event)
      this.$emit('search', event)
    },
    onKeydownDown(event) {
      if (this.focusListIndex < this.options.length - 1) this.focusListIndex++
      this.$emit('keydown', event)
    },
    onKeydownUp(event) {
      this.$emit('keydown', event)
    },
  },
}
</script>

<style module>
.Input input::placeholder {
  color: black !important;
  opacity: 1;
}
.Input input:focus::placeholder {
  opacity: 0.7;
}
</style>
