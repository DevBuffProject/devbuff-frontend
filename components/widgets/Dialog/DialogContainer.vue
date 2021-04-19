<template>
  <div class="overflow-x-hidden">
    <transition name="fade">
      <div
        v-if="dialogs.length"
        :class="[
          'absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-75 z-40',
          'flex items-center justify-center',
        ]"
      />
    </transition>
    <transition name="scale">
      <div
        v-if="dialogs.length && dialog.component"
        ref="container"
        data-target-container
        :class="[
          'absolute top-0 left-0 overflow-y-auto overflow-x-hidden h-screen w-screen z-50',
          'flex items-center justify-center overflow-x-hidden',
        ]"
        style="overflow-y: overlay"
      >
        <div class="w-full m-auto" style="min-width: 320px; max-width: 600px">
          <div
            class="bg-white dark:bg-blueGray-800 rounded my-10 py-6 px-12 relative"
          >
            <component :is="dialog.component" v-bind="dialog.props" />
            <v-material-icon
              name="close"
              type="round"
              :class="[
                'absolute right-0 top-0 cursor-pointer mt-6 mr-6 p-4 text-lg rounded-full',
                'bg-gray-200 dark:bg-blueGray-900 cursor-pointer opacity-50',
                'transition-opacity hover:opacity-100',
              ]"
              @click="close"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import bus from '~/app/event-bus'
import { resolveWithContext } from '~/app/dialogs/utils'

export default {
  name: 'VDialogContainer',
  props: {
    preloadedDialog: {
      type: [Object, Function],
      default: null,
    },
  },
  data: () => ({
    dialogs: [],
  }),
  computed: {
    container() {
      return this.$refs.container
    },
    dialog() {
      return this.dialogs[this.dialogs.length - 1]
    },
  },
  watch: {
    dialogs: {
      handler() {
        if (process.client) {
          window.document.documentElement.style.overflowY =
            this.dialogs.length > 0
              ? 'hidden'
              : window.CSS && window.CSS.supports('overflow', 'overlay')
              ? 'overlay'
              : 'auto'
        }
      },
    },
  },
  created() {
    if (this.preloadedDialog)
      this.dialogs.push({ component: this.preloadedDialog })

    bus.on(
      'dialog:push',
      async (dialog) => await this.dialogs.push(resolveWithContext(dialog))
    )
    bus.on('dialog:close', () => this.dialogs.pop())
    bus.on('dialog:kill', () => (this.dialogs = []))
  },
  mounted() {
    bus.on('dialog:scrollTop', () => {
      setTimeout(
        () => this.container.scrollTo({ top: 0, behavior: 'smooth' }),
        100
      )
    })
  },
  methods: {
    close() {
      bus.emit('dialog:close')
    },
    kill() {
      bus.emit('dialog:kill')
    },
  },
}
</script>
