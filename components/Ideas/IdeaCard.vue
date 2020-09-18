<template>
  <v-card>
    <template #header>
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="d-flex align-items-center">
          <span class="d-block"> {{ title }} </span>
        </div>

        <v-button
          @click="join"
          rounded
          :icon="['fas', 'user-plus']"
          type="dark"
        >
        </v-button>
      </div>
    </template>

    <template #footer>
      <div class="d-flex justify-content-between w-100">
        <div>
          <v-chip
            v-for="(lang, key) in languages"
            :key="lang + key"
            :text="lang"
            class="mr-2"
            type="auto"
          />
        </div>

      </div>
    </template>

    <div class="d-flex">
      <div class="d-flex flex-column align-items-center mr-3">
        <v-avatar
          class="mb-3"
          size="60px"
          :avatar="avatar"
        />
      </div>
      <span>
        {{ description }}
      </span>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'v-idea-card',

  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    specialists: {
      type: Array,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },

  methods: {
    join() {
      this.$dialog.push(() => import('~/components/Dialog/SimpleDialog'))
    }
  },

  computed: {
    languages() {
      const { specialists } = this

      return specialists.reduce((acc, spec) => spec.languages.map(lang => lang.name), [])
    }
  },

  mounted() {
    this.$emit('idea:mounted')
  }
}
</script>

<style lang="scss" scoped>
</style>
