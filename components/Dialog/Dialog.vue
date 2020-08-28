<template>
  <transition name="fade">
    <div
      v-if="queue.length > 0"
      :class="[
        'dialog',
      ]"
    >
      <v-card
        class="dialog__window"
        ref="window"
      >
        <div
          class="dialog__content"
          ref="content"
        >
          <component
            v-if="dialog"
            :is="dialog.component"
            v-bind="dialog.data"
            class="dialog__component"
            ref="component"
          />
          <div v-else class="dialog__loader">
            <v-loading />
          </div>
        </div>
      </v-card>
    </div>
  </transition>
</template>

<script>
import loading from '~/components/Loading/Loading.vue'

export default {
  name: 'v-dialog',

  data() {
    return {
      dialog: null,
      queue: []
    }
  },

  computed: {
    lastDialog() {
      return this.queue[0]
    }
  },

  methods: {
    init() {
      this.$root.$on('dialog:push', this.push)
      this.$root.$on('dialog:close', this.close)
      this.$root.$on('dialog:kill', this.kill)
    },

    push(dialog) {
      this.dialog = null
      this.queue.unshift(dialog)
      this.resolveDialog()
    },

    close() {
      this.dialog = null
      this.queue.shift()
      this.resolveDialog()
    },

    kill() {
      this.dialog = null
      this.queue = []
    },

    resolveDialog() {
      if (!this.lastDialog) return

      const { component, props } = this.lastDialog

      Promise.all([
        Promise.resolve(props),
        Promise.resolve(component)
      ])
      .then(resolved => {
        const [ data, dialog ] = resolved

        this.dialog = {
          data,
          component: () => ({
            component: dialog.apply(),
            loading,
          })
        }
      })
    },

    observeContent() {
      if (this.$refs && this.$refs.content && this.$refs.component) {
        const children = this.$refs.content.children

        if (children.length > 0) {
          const { offsetHeight, offsetWidth } = children[0]

          this.$refs.content.style.height = offsetHeight + 'px'
          this.$refs.content.style.width = offsetWidth + 'px'

          this.$refs.component.$el.classList.add('dialog__component--show')
        }
      }
    }
  },

  updated() {
    this.observeContent()
  },

  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  background-color: rgba(0, 0, 0, .8);
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s var(--base-transition);

  &__window {;
    padding: 1.5rem;
    border-radius: 4px;
  }

  &__content {
    width: 30px;
    height: 30px;
    overflow: hidden;
    transition: .5s var(--base-transition);
    transition-property: width, height;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
  }

  &__component {
    position: fixed;
    opacity: 0;
    transition: opacity .3s var(--base-transition);
    transition-delay: .5s;
    &--show {
      position: static;
      opacity: 1;
    }
  }
}
</style>
