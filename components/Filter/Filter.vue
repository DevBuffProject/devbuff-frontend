<template>
  <v-card class="relative">
    <a
      v-if="Object.values(state).flat().length"
      class="
        absolute text-xs text-primary font-medium cursor-pointer hover:underline
        right-4 top-4 mt-0.5 pt-px pl-4 border-l border-gray-200 dark:border-blueGray-600
      "
      @click="state = {}"
    >
      сбросить
    </a>
    <ul class="rounded-lg -m-2">

      <li v-for="field in fields" :key="field.name" class="mb-2">
        <div class="font-normal p-3 text-black dark:text-blueGray-50"> {{ field.name }} </div>
        <ul class="px-4 font-normal text-xs">
          <li
            v-for="param in field.params"
            :key="param.value"
          >
            <v-checkbox
              v-ripple.dark
              :class="[
                'flex items-center cursor-pointer rounded p-1 px-2 mb-1 transition-colors',
                {
                  'text-gray-500 hover:bg-gray-100 dark:text-blueGray-300':
                    !state[field.value] || !state[field.value].includes(param.value),
                  'dark:text-blueGray-300 dark:hover:bg-blueGray-800':
                    !state[field.value] || !state[field.value].includes(param.value),
                  'bg-primary text-white':
                    state[field.value] && state[field.value].includes(param.value),
                }
              ]"
              v-model="state[field.value]"
              :value="param.value"
            >
              <v-icon :icon="['fas', 'plus']" class="mr-2 opacity-30" />
              <div class="ml-1 group-active:text-white"> {{ param.name }} </div>
            </v-checkbox>
          </li>
        </ul>
      </li>
    </ul>
  </v-card>
</template>

<script>
export default {
  name: 'v-filter',

  model: {
    prop: 'selected',
    event: 'change'
  },

  props: {
    fields: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return { state: this.selected }
  },

  watch: {
    state: {
      deep: true,
      handler() {
        this.$emit('change', this.state)
      }
    },
    selected: {
      deep: true,
      handler(newValue) {
        this.state = newValue
      }
    }
  }
}
</script>
