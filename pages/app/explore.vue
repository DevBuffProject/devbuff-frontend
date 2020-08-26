<template>
  <section>
    <v-card style="width: 500px;">
      <template #header>
        <div class="d-flex align-items-center w-100">
          <v-skeleton
            class="mr-3"
            figure="circle"
          />
          <v-skeleton
            class="w-50"
            figure="line"
          />
        </div>
      </template>

      <v-skeleton-paragraph />

      <template #footer>
        <div class="d-flex justify-content-end w-100">
          <v-skeleton
            class="w-25"
            figure="line"
          />
        </div>
      </template>
    </v-card>

    <v-card style="width: 500px;">
      <template #header>
        <div class="d-flex align-items-center justify-content-between w-100">
          <div class="d-flex align-items-center">
            <v-avatar
              class="mr-3"
              avatar="//source.unsplash.com/random"
            />
            <div class="d-flex flex-column">
              <span class="d-block"> Разработка платформы DevBuff </span>
              <v-link to="/" class="text text-muted"> DevBuff Team </v-link>
            </div>
          </div>
          <v-button
            to="/"
            rounded
            :icon="['fas', 'user-plus']"
            type="dark"
          >
          </v-button>
        </div>
      </template>

      <template #footer>
        <v-chip class="mr-2" text="frontend" type="auto" />
        <v-chip class="mr-2" text="backend" type="auto" />
        <v-chip class="mr-2" text="C++" type="auto" />
      </template>

      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas aliquam nulla, vel commodo est consectetur nec. Maecenas molestie libero urna, ut fermentum arcu interdum et. Proin ultricies ultricies diam sed iaculis. Vestibulum fermentum mi ac venenatis consectetur. Sed lorem tortor, iaculis ac luctus ut, rhoncus ut risus. Nunc sed ante finibus, finibus turpis nec, semper augue. Ut elementum urna ac ex pretium consequat ac nec risus.
      </span>
    </v-card>
  </section>
</template>

<script>
export default {
  async middleware({ store }) {
    return new Promise(resolve => {
      setTimeout(() => resolve() || store.commit('setPageName', 'Идеи'), 1000)
    })
  },
}
</script>

<style lang="scss" scoped>
</style>
