<template>
  <div class="team-feedback-dialog">
    <h3 class="mt-0 mb-3"> Отправить ваш отклик? </h3>

    <div class="d-flex justify-content-end mt-3">
      <div>
        <v-button
          class="mr-3"
          type="flat"
          @click="$dialog.close"
        >
          назад
        </v-button>
        <v-button
          class="mr-3"
          type="primary"
          @click="$dialog.kill"
        >
          да
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
import WindowAbstract from '~/components/Dialog/WindowAbstract'

const SimpleDialog = () => import('~/components/Dialog/SimpleDialog')

export default {
  extends: WindowAbstract,
  
  methods: {
    join() {
      this.$dialog.push(SimpleDialog, new Promise(resolve => {
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
