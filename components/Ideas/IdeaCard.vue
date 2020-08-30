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
          <v-chip class="mr-2" text="frontend" type="auto" />
          <v-chip class="mr-2" text="backend" type="auto" />
          <v-chip class="mr-2" text="C++" type="auto" />
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
      required: false
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

  mounted() {
    this.$emit('idea:mounted')
  }
}
</script>

<style lang="scss" scoped>
</style>
