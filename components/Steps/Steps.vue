<template>
  <div class="v-steps">
    <div
      v-for="(step, i) in steps"
      :key="step"
      :class="[
        'v-steps__level',
        (i + 1 === completed) && 'v-steps__level--type-' + type
      ]"
    >
      <div class="v-steps__level-name"> {{ step }} </div>
      <div class="v-steps__level-num"> {{ i + 1 }} </div>
      <div class="v-steps__level-bar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-steps',

  props: {
    steps: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'primary'
    },
    completed: {
      type: Number,
      default: 0,
    }
  }
}
</script>

<style lang="scss" scoped>

.v-steps {
  display: flex;
  justify-content: space-around;

  &__level {
    --step-color: var(--color-muted);

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //
    //@each $name, $color in map-get($default-colors, 'scheme' ) {
    //  &--type-#{$name} {
    //    --step-color: var(--color-#{$name});
    //  }
    //}
  }

  .v-steps__level-num {
    --size: 25px;

    background-color: white;
    width: var(--size);
    height: var(--size);
    margin-bottom: calc(0px - var(--size) / 2 - 2px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 1px solid var(--step-color);
    color: var(--step-color);
    z-index: 9;
    font-size: .8rem;
  }

  .v-steps__level-name {
    margin-bottom: .5rem;
    opacity: .5;
    font-weight: 200;
  }

  .v-steps__level-bar {
    width: 100%;
    height: 2px;
    background-color: var(--step-color);
  }
}
</style>
