<template>
  <div
    v-if="dialogs.length"
    :class="[
      'absolute top-0 left-0 overflow-auto h-screen w-screen bg-black bg-opacity-75 z-50',
      'flex items-center justify-center',
    ]"
  >
    <div class="max-h-screen w-full" style="min-width: 320px; max-width: 600px">
      <div
        class="bg-white dark:bg-blueGray-800 rounded my-10 py-6 px-12 relative"
      >
        <component
          :is="dialog.component"
          v-if="dialog.component"
          v-bind="dialog.props"
        />

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
</template>

<script>
import bus from '~/app/event-bus'

export default {
  name: 'VDialogContainer',
  props: {
    preloadedDialog: {
      type: [Object, Function],
      default: null,
    },
  },
  data: () => ({ dialogs: [] }),
  computed: {
    dialog() {
      return this.dialogs[this.dialogs.length - 1]
    },
  },
  watch: {
    dialogs: {
      handler() {
        if (process.client)
          window.document.documentElement.style.overflow =
            this.dialogs.length > 0 ? 'hidden' : 'overlay'
      },
    },
  },
  created() {
    if (this.preloadedDialog)
      this.dialogs.push({ component: this.preloadedDialog })

    bus.on('dialog:push', (dialog) => this.dialogs.push(dialog))
    bus.on('dialog:close', () => this.dialogs.pop())
    bus.on('dialog:kill', () => (this.dialogs = []))
  },
  methods: {
    push(dialog) {
      bus.emit('dialog:push', dialog)
    },
    close() {
      bus.emit('dialog:close')
    },
    kill() {
      bus.emit('dialog:kill')
    },
  },
}
</script>
