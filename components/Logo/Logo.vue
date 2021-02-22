<template>
  <kinesis-container>
    <kinesis-element :strength="8" type="depth" :class="$style.wrapper" >
      <img :src="src" alt="logo" :class="$style.image" />
    </kinesis-element>
  </kinesis-container>
</template>

<script>

export default {
  props: {
    'beta-label': Boolean,
    'alpha-label': Boolean,
    src: String
  }
}
</script>

<style module>
.wrapper, .image {
  width: inherit;
  height: inherit;
}
</style>
