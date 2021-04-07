<template>
  <div :class="$style.wrapper">
    <img :src="src" alt="logo" :class="$style.image" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style module>
.wrapper,
.image {
  width: 110px;
  height: inherit;
}
</style>
