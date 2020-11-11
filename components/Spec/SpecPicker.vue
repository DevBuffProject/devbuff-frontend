<template>
  <div class="v-spec-picker">
    <v-spec-card
      v-for="(spec, index) in specialists"
      :key="randId + index"
      :specialist="spec"
      class="v-spec-picker___spec-card"
    />
  </div>
</template>

<script>
export default {
  name: 'v-spec-picker',

  props: {
    specialists: {
      type: Array,
      required: true
    }
  },

  computed: {
    randId() {
      return Math.round(Math.random() * 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-spec-picker {
  display: flex;
}
</style>
