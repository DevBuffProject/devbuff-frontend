<template>
  <div>
    <transition name="fade">
      <div
        v-if="notifications.length"
        class="fixed bottom-0 right-0 flex flex-col-reverse z-50 p-8"
      >
        <notification
          v-for="(notification, index) of notifications"
          :key="index"
          v-motion="index"
          :initial="{ opacity: 0, scaleY: 0, scaleX: 2, y: 0 }"
          :enter="{ opacity: 1, scaleY: 1, scaleX: 1, y: 0 }"
          :delay="200"
          v-bind="notification"
          class="mt-8"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import bus from '../event-bus'
import Notification from './Notification'

export default {
  name: 'VNotificationView',
  components: { Notification },
  data: () => ({
    notifications: [],
  }),
  created() {
    this.initListeners()
  },
  methods: {
    initListeners() {
      bus.on('notification:push', this.push)
    },
    push(notification) {
      this.notifications.push(notification)
      setTimeout(() => this.notifications.shift(), 5000)
    },
  },
}
</script>
