<template>
  <div class="team-feedback-dialog">
    <h3 class="mt-0 mb-3"> Отклик </h3>

    <v-card style="width: 500px;">
      <template #header>
        <div class="d-flex align-items-center justify-content-between w-100">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <v-link to="/" class="text"> DevBuff </v-link>
              <v-icon
                class="mx-2"
                :icon="['fas', 'chevron-right']"
              />
              <span class="d-block"> Разработка платформы DevBuff </span>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="d-flex justify-content-between w-100">
          <div>
            <v-chip class="mr-2" text="frontend" type="auto" />
            <v-chip class="mr-2" text="backend" type="auto" />
            <v-chip class="mr-2" text="C++" type="auto" />
          </div>

        </div>
      </template>

      <div class="d-flex">
        <div class="d-flex flex-column align-items-center mr-3">
          <v-avatar
            class="mb-3"
            size="60px"
            avatar="//source.unsplash.com/random"
          />
        </div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas aliquam nulla, vel commodo est consectetur nec. Maecenas molestie libero urna, ut fermentum arcu interdum et. Proin ultricies ultricies diam sed iaculis. Vestibulum fermentum mi ac venenatis consectetur.
        </span>
      </div>
    </v-card>

    <div class="d-flex justify-content-end mt-3">
      <div>
        <v-button
          class="mr-3"
          type="flat"
          @click="$dialog.close"
        >
          отменить
        </v-button>
        <v-button
          class="mr-3"
          type="primary"
          @click="join"
        >
          откликнуться
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
import WindowAbstract from '~/components/Dialog/WindowAbstract'

const d2 = () => import('~/components/Dialog/d2')

export default {
  extends: WindowAbstract,

  methods: {
    join() {
      this.$dialog.push(d2)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
