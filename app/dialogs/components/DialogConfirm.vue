<template>
  <v-dialog v-bind="$attrs">
    <h3 class="text-center">{{ title }}</h3>
    <div v-if="text">{{ text }}</div>
    <template #controls>
      <div class="flex justify-center w-full">
        <atomic-button
          v-for="(
            { title: buttonTitle, action, ...bindings }, index
          ) in actionButtons"
          :key="index"
          v-bind="bindings"
          :class="index < actionButtons.length - 1 && 'mr-2'"
          @click="action ? action() : () => false"
        >
          {{ buttonTitle }}
        </atomic-button>
      </div>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'VDialogConfirm',
  components: {
    VDialog: () => import('./Dialog'),
  },
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
          title: 'cancel',
          type: 'muted',
          isOutline: true,
          action: this.$dialog.close,
        },
      ]
    },
  },
}
</script>
