<template>
  <span :class="$style.Icon" v-on="$listeners" v-text="name" />
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
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
.Icon {
  font-family: 'Material Icons Outlined', sans-serif;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 1.5rem;
}
</style>
