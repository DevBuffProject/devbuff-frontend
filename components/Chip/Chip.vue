<template>
  <span
    class="v-chip"
    :class="{ [`v-chip--type_${type}`]: type }"
    :style="type === 'auto' && {
      backgroundColor: colors.bg,
      color: colors.text
    }"
  >
    {{ text }}
  </span>
</template>

<script>
import Color from '~/helpers/colors.js'

const cachedColors = {}
const getTextBasedColors = text => {
  if (cachedColors[text])
    return cachedColors[text]

  const colorInstance = Color(Color.generateFromString(text))
  const colors = {
    text: colorInstance.luminate(.15),
    bg: colorInstance.luminate(.85)
  }

  return cachedColors[text] = colors
}

export default {
  name: 'v-chip',

  props: {
    text: String,
    type: String,
    class: [ String, Array, Object ]
  },

  computed: {
    colors() {
      return getTextBasedColors(this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .v-chip {
    @apply bg-muted text-xs px-4 py-0.5 font-normal rounded;

    color: rgba(0, 0, 0, .5);
    transition: background-color .3s var(--base-transition);

    &--type-muted {
      @apply bg-muted;
    }
  }
}
</style>
