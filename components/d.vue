<template>
  <v-dialog title="Авторизация">
    <p v-for="i in 10" :key="i">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
      optio quam sequi voluptates? Aspernatur at consequuntur dolorem doloremque
      fugit hic natus nemo, officia praesentium quaerat? Aut eos quis voluptas
      voluptate.
    </p>
    <template #controls>
      <div class="flex">
        <v-button type="muted" class="mr-2">cancel</v-button>
        <v-button type="success" is-outline class="mr-2">success</v-button>
      </div>
    </template>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    authURL() {
      return `${this.$config.API_BASE_URL}/oAuth/GitHub`
    },
  },
}
</script>
