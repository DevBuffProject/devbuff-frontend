<template>
  <transition name="top">
    <div
      v-if="queue.length > 0"
      class="dialog"
    >
      <div class="dialog__window">
        <div
          class="dialog__content"
          ref="content"
        >
          <component
            :is="component"
            v-bind="component.data"
            :class="dialog ? 'dialog__component' : 'dialog__loader'"
            ref="component"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Loader from '~/components/Loading/Loading.vue'
import Bus from './EventBus'

export default {
  name: 'v-dialog',

  data() {
    return {
      Loader,
      dialog: null,
      queue: [],
      opened: false
    }
  },

  computed: {
    component() {
      return this.dialog ? this.dialog.component : this.Loader
    },
    lastDialog() {
      return this.queue[0]
    }
  },

  methods: {
    init() {
      Bus.$on('dialog:push', this.push)
      Bus.$on('dialog:close', this.close)
      Bus.$on('dialog:kill', this.kill)

      Bus.$on('dialog:ready', this.setSize)
    },

    push(dialog) {
      this.dialog = null
      this.queue.unshift(dialog)
      this.resolveDialog()
    },

    close() {
      this.dialog = null
      this.queue.shift()

      if (this.queue.length > 0) {
        this.resolveDialog()
      } else this.opened = false
    },

    kill() {
      this.dialog = null
      this.opened = false
      this.queue = []
    },

    resolveDialog() {
      if (!this.lastDialog) return


      const _resolve = () => {
        const { component, props } = this.lastDialog

        Promise.all([
          Promise.resolve(props),
          Promise.resolve(component)
        ])
        .then(resolved => {
          const [ data, dialog ] = resolved

          this.dialog = {
            data,
            component: () => ({ component: dialog.apply(), loading: this.Loader })
          }
        })
        .then(() => this.opened = true)
      }

      // FIX window blink
      !this.opened
        ? setTimeout(_resolve, 100)
        : _resolve()
    },

    setSize({ offsetHeight, offsetWidth }) {
      this.$refs.content.style.height = offsetHeight + 'px'
      this.$refs.content.style.width = offsetWidth + 'px'

      this.$refs.component.$el.classList.add('dialog__component--show')
    }
  },

  created() {
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

  &__window {
    background-color: var(--color-background);
    padding: 1.5rem;
    border-radius: 4px;
  }

  &__content {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: .3s var(--base-transition);
    transition-property: width, height;
  }

  &__loader {
    width: 25px;
    height: 25px;
    font-size: .1rem;
  }

  &__component {
    position: fixed;
    opacity: 0;
    transition: opacity .3s var(--base-transition);
    transition-delay: .3s;
    &--show {
      position: static;
      opacity: 1;
    }
  }
}
</style>
