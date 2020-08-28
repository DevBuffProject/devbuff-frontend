<template>
  <div class="team-feedback-dialog">
    <h3 class="mt-0 mb-3"> Отправить ваш отклик? </h3>

    <div class="d-flex justify-content-end mt-3">
      <div>
        <v-button
          class="mr-3"
          type="flat"
          @click="$root.dialog.kill"
        >
          отменить
        </v-button>
        <v-button
          class="mr-3"
          type="primary"
          @click="$root.dialog.kill"
        >
          да
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
const SimpleDialog = () => import('~/components/Dialog/SimpleDialog')

export default {
  methods: {
    join() {
      this.$root.dialog.push(SimpleDialog, new Promise(resolve => {
        setTimeout(() => resolve({
          header: 'data'
        }), 2000)
      }))
    }
  }
}
</script>

<style lang="css" scoped>
</style>
