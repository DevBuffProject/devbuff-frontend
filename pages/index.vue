<template>
  <section>
    <div class="slide present pt-5">
      <h1 class="present__heading">
        Место где собирают команды
      </h1>
      <p class="present__app-desc my-5">
        <span class="present__app-name">DevBuff</span> — это площадка для разработчиков, которые хотят привлечь единомышленников для совместной реализации своих идей.
        <v-link to="/about">подробнее</v-link>
      </p>
      <div class="present__controls">
        <v-button
          type="dark"
          :icon="['fab', 'github']"
          rounded
        >
          Войти через Github
        </v-button>

        <v-delimiter />

        <nuxt-link to="/app/explore">
          <v-button
            type="muted"
            :icon="['fas', 'long-arrow-alt-right']"
            rounded
          >
            Посмотреть проекты
          </v-button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  transition: 'top',
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');

.slide {
  height: calc(100vh - var(--header-height));
}

.present {
  max-width: 500px;
  margin: 0 auto;

  &__controls {
    width: fit-content;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__heading {
    font-family: 'Rubik Mono One', sans-serif;
    font-size: 4rem;
    line-height: 1;
    color: #000;
    text-align: center;
  }

  &__app-name {
    font-size: 1.5rem;
    font-weight: bold;
    transform: translateY(3px);
    display: inline-block;
    color: #000;
  }

  &__app-desc {
    position: relative;
    padding-left: 1rem;

    &:before,
    &:after {
      font-weight: bold;
      font-size: 1.5rem;
      transform: translateY(3px);
      color: #000;
      display: inline-block;
    }
    &:before {
      content: "<"
    }
    &:after {
      content: "/>";
      margin-left: 5px;
    }
  }
}
</style>
