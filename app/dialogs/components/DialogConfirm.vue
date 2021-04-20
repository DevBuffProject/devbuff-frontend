<template>
  <v-dialog v-bind="$attrs">
    <h3 class="text-center">{{ title }}</h3>
    <div v-if="text">{{ text }}</div>
    <template #controls>
      <div class="flex justify-center w-full">
        <v-button
          v-for="({ text, action, ...bindings }, index) in actionButtons"
          :key="index"
          v-bind="bindings"
          :class="index < actionButtons.length - 1 && 'mr-2'"
          @click="action ? action() : () => false"
        >
          {{ text }}
        </v-button>
      </div>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'VDialogConfirm',
  props: {
    componentPortalName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    actionButtons() {
      return [
        ...this.actions,
        {
          text: 'cancel',
          type: 'muted',
          isOutline: true,
          action: this.$dialog.close,
        },
      ]
    },
  },
}
</script>
