<template>
  <div class="relative">
    <a
      v-if="Object.values(state).flat().length"
      :class="[
        'absolute right-4 top-5 pt-px pl-4 cursor-pointer',
        'text-xs text-primary font-medium hover:underline',
        'border-l border-gray-200 dark:border-blueGray-600',
      ]"
      @click="state = {}"
    >
      {{ $t('components.filter.clear') }}
    </a>
    <ul class="rounded-lg -m-2">
      <li v-for="field in fields" :key="field.name" class="mb-2">
        <div class="font-normal p-4 text-black dark:text-blueGray-50">
          {{ field.name }}
        </div>
        <ul class="px-4 font-normal text-xs">
          <li v-for="param in field.params" :key="param">
            <v-checkbox
              v-model="state[field.value]"
              :class="[
                'flex items-center cursor-pointer rounded p-1 px-2 mb-1 transition-all transform active:scale-95',
                {
                  'text-gray-500 hover:bg-gray-100 dark:text-blueGray-300':
                    !state[field.value] ||
                    !state[field.value].includes(
                      isObject(param) ? param.value : param
                    ),
                  'dark:text-blueGray-300 dark:hover:bg-blueGray-800':
                    !state[field.value] ||
                    !state[field.value].includes(
                      isObject(param) ? param.value : param
                    ),
                  'bg-primary text-white':
                    state[field.value] &&
                    state[field.value].includes(
                      isObject(param) ? param.value : param
                    ),
                },
              ]"
              :value="isObject(param) ? param.value : param"
            >
              <v-icon :icon="['fas', 'plus']" class="mr-2 opacity-30" />
              <div class="ml-1 group-active:text-white">
                <div v-if="isObject(param)">
                  {{ param.name }}
                </div>
                <div v-else>{{ param }}</div>
              </div>
            </v-checkbox>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VFilter',
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      default: () => ({}),
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
      },
    },
    selected: {
      deep: true,
      handler(newValue) {
        this.state = newValue
      },
    },
  },
  methods: {
    isObject(data) {
      return typeof data === 'object' && data !== null
    },
  },
}
</script>
