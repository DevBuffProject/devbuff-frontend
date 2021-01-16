<template>
  <v-card>
    <ul class="rounded-lg -m-2">
      <li v-for="field in fields" :key="field.name" class="mb-2">
        <div class="font-normal p-3 text-black dark:text-blueGray-50"> {{ field.name }} </div>
        <ul class="px-4 font-normal text-xs">
          <li
            v-for="param in field.params"
            :key="param"
            v-ripple.dark
            class="
              flex items-center cursor-pointer rounded p-1 px-2 mb-1
              text-gray-500 hover:bg-gray-100 dark:text-blueGray-300
              dark:text-blueGray-300 dark:hover:bg-blueGray-800
            "
            @click="select(field, param)"
          >
            <v-icon :icon="['fas', 'plus']" class="mr-2 opacity-30" />
            <div class="ml-1 group-active:text-white"> {{ param }} </div>
          </li>
        </ul>
      </li>
    </ul>
  </v-card>
</template>

<script>
export default {
  name: 'v-filter',

  props: {
    fields: {
      type: Array,
      required: true,
    }
  },

  data: () => ({
    selected: []
  }),

  methods: {
    select(field, param) {

    }
  }
}
</script>
