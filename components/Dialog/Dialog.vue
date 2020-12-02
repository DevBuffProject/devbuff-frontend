<template>
  <transition name="top">
    <div
      v-if="queue.length > 0"
      class="dialog"
    >
      <div class="dialog__wrapper">
        <div class="dialog__window">
          <div
            class="dialog__content"
            ref="content"
          >
            <transition name="fade">
              <div
                v-if="resolvedDialog"
                class="dialog__close"
                @click="kill"
              >
                <v-icon :icon="['fas', 'times']" />
              </div>
            </transition>

            <component
              :is="dialog.component"
              v-bind="dialog.props"
              :class="resolvedDialog ? 'dialog__component' : 'dialog__loader'"
              ref="component"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import loading from '~/components/Loading/Loading.vue'
import bus from '~/components/Bus'

export default {
  name: 'v-dialog',

  data() {
    return {
      resolvedDialog: {},
      progress: false,
      queue: [],
      opened: false
    }
  },

  computed: {
    dialog() {
      const resolvedDialog = this.resolvedDialog

      if (!this.resolvedDialog) return {
        component: loading,
        props: {}
      }

      return {
        component: resolvedDialog.component,
        props: resolvedDialog.props
      }
    }
  },

  methods: {
    init() {
      bus.on('dialog:push', this.push)

      bus.on('dialog:resolve', this.close)
      bus.on('dialog:reject', this.close)
      bus.on('dialog:kill', this.kill)

      bus.on('dialog:ready', this.setSize)
    },

    push(dialog) {
      this.queue.unshift(dialog)
      this.resolveDialog()
    },

    close() {
      this.queue.shift()

      if (this.queue.length > 0) {
        this.resolveDialog()
      } else this.opened = false
    },

    kill() {
      this.resolvedDialog = null
      this.opened = false
      this.queue = []
    },

    resolveDialog() {
      const lastDialog = this.queue[0]

      if (!lastDialog) return

      // Reset last dialog for show loader
      this.resolvedDialog = null

      const _resolve = () => {
        const { component, props } = lastDialog

        this.progress = true

        Promise.all([
          Promise.resolve(props),
          Promise.resolve(component)
        ])
        .then(resolved => {
          const [ props, dialog ] = resolved

          this.resolvedDialog = {
            props,
            component: () => ({ component: dialog.apply(), loading })
          }

          this.opened = true
          this.progress = false
        })
      }

      // FIX window blink
      !this.opened
        ? setTimeout(_resolve, 500)
        : _resolve()

      // Close if dialog unavailable
      setTimeout(() => !this.resolvedDialog && this.close(), 5000)
    },

    async setSize({ offsetHeight, offsetWidth }) {
      if (!this.$refs.content) return
      // this.$refs.component.$el.classList.add('dialog__component--show')

      await this.$nextTick()
      // HOTFIX: 
      setTimeout(() => {
        this.$refs.component.$el.classList.add('dialog__component--show')
      }, 400)

      setTimeout(() => {
        this.$refs.content.style.height = this.$refs.component.$el.offsetHeight + 'px'
        this.$refs.content.style.width = this.$refs.component.$el.offsetWidth + 'px'
      }, 200)
    }
  },

  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  transition: opacity .3s var(--base-transition);
  box-sizing: border-box;
  overflow: auto;

  &__wrapper {
    margin: auto;
    padding: 3rem 0;
  }

  &__window {
    background-color: var(--color-background-contrast);
    padding: 1.5rem;
    border-radius: 4px;
    overflow: hidden;
    width: max-content;
  }

  &__content {
    position: relative;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s var(--base-transition);
    transition-property: width, height;
  }

  &__loader {
    width: 25px !important;
    height: 25px !important;
    font-size: .1rem;
  }

  &__component {
    position: fixed;
    opacity: 0;
    transition: opacity .5s var(--base-transition);
    transition-delay: .3s;
    &--show {
      position: static;
      opacity: 1;
    }
  }

  &__close {
    background-color: var(--color-muted);
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    font-size: .8rem;
    padding: .7rem;
    border-radius: 100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 99999999;
    transition-delay: 1s !important;
  }
}
</style>
