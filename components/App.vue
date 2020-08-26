<template>
  <div
    :class="[
      'app',
      'colors--light'
    ]"
  >
    <transition name="scale">
      <div>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  name: 'v-app',
  mounted() {
    this.$bus = new Vue()
  }
}
</script>

<style scoped>
.app {
  
}
</style>
