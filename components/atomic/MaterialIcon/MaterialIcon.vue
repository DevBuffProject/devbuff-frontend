<template>
  <span
    :class="[
      $style.icon,
      type ? `material-icons-${type}` : 'material-icons',
      'flex items-center justify-center',
    ]"
    v-on="$listeners"
    v-text="name"
  />
</template>

<script>
import 'material-design-icons'

export default {
  name: 'VMaterialIcon',
  props: {
    type: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style module>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.icon {
  font-family: 'Material Icons', sans-serif;
  width: 1.5rem;
  height: 1.5rem;
  flex: 0 0 1.5rem;
}
</style>
