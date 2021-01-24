<template>
  <div>
    <h1 v-if="state === 'processing'">Подтверждение почты...</h1>
    <h1 v-else-if="state === 'success'">Успех!</h1>
    <h1 v-else>Ошибка, повторите еще раз.</h1>


    <v-link v-if="state!=='processing'" to="/">Главная страница</v-link>
  </div>
</template>

<script>
export default {
  layout: 'white-screen',
  data() {
    return {
      state: 'processing'
    }
  },
  created() {

    if (this.$route.query.token === undefined) {
      return;
    }

    let token = this.$route.query.token;
    let self = this;
    this.$store.dispatch('user/confirmEmail', token).then(response => {
      self.state = 'success';

    }, error => {
      self.state = 'error';
    });
  }
}
</script>
