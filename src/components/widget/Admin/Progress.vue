<template>
  <v-dialog>
    <atomic-loading-progress-bar :progress="progress" />
    <div class="mt-4 opacity-50">
      {{ `${ids.length}/${done}` }}
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    act: {
      type: String,
      default: '',
      required: true,
    },
    ids: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data: () => ({ done: 0 }),
  computed: {
    progress() {
      return (this.done / this.ids.length) * 100
    },
  },
  mounted() {
    this.ids.map(async (id) => {
      try {
        await this.$store.dispatch(
          `admin/${this.act === 'accept' ? 'approveIdea' : 'deleteIdea'}`,
          id
        )
        this.done++

        if (this.done === this.ids.length) {
          await this.$store.dispatch('admin/getPendingIdeas')
          this.$dialog.close()
        }
      } catch (e) {}
    })
  },
}
</script>
