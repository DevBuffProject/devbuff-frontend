<template>
  <label class="dropdown">
    <v-icon v-if="icon" :icon="icon" class="dropdown__icon" />
    <select
      ref="field"
      :class="['dropdown__field', icon && 'dropdown__field--icon']"
      @change="$emit('change', $event.target.value)"
    >
      <option v-if="!value && placeholder" selected>{{ placeholder }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.code"
        :selected="value === option.code"
      >
        {{ option.title }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'v-dropdown',

  model: {
    event: 'change',
    prop: 'value'
  },

  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: [ String, Array ],
      default: null
    },
    icon: {
      type: [ String, Array ],
      default: null
    }
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  background-color: var(--color-background-contrast);
  position: relative;
  width: fit-content;
  display: inline-flex;
  border: 1px solid var(--color-muted);
  padding: .3rem 1rem;
  border-radius: 4px;
  box-sizing: border-box;
  align-items: center;
  cursor: text;
  transition: border-color .3s var(--base-transition);


  &__icon {
    display: flex;
    margin-right: 1rem;
    align-items: center;
    color: var(--color-muted);
    width: 1.2rem;
    font-size: 1.2rem;
    transition: .2s var(--base-transition);
    transition-property: transform, left;
  }

  &__field {
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    border: 0;
    outline: 0;
    width: 100%;
    min-width: 0;
    resize: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    &::-ms-expand {
      display: none;
    }
  }
}
</style>
