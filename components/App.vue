<template>
  <div
    :class="[
      'app',
      'colors--light'
    ]"
  >
    <v-dialog />

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

  data() {
    return {
      overlay: false
    }
  },

  methods: {
    initOverlayControls() {
      this.$root.overlay = {
        show: () => this.overlay = true,
        hide: () => this.overlay = false
      }
    },
    initDialogControls() {
      this.$root.dialog = {
        push: (component, props = {}) => this.$root.$emit('dialog:push', { component, props }),
        close: () => this.$root.$emit('dialog:close'),
        kill: () => this.$root.$emit('dialog:kill'),
      }
    }
  },

  mounted() {
    this.initOverlayControls()
    this.initDialogControls()
  }
}
</script>

<style scoped>
.app {

}
</style>
