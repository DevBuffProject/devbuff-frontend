<template>
  <a
    v-if="isExternal"
    :href="to"
    target="_blank"
  >
    <slot />
  </a>
  <RouterLink
    v-else
    :to="{ ...to, params: { _isDialog: true } }"
  >
    <slot />
  </RouterLink>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useLink } from 'vue-router'

export default defineComponent({
  name: 'Link',
  props: {
    to: Object,
    allowDialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isExternal = computed(
      () =>
        typeof props.to === 'string' &&
        (props.to.startsWith('http') || props.to.startsWith('//')),
    )

    const { navigate } = useLink(props)

    return {
      isExternal,
      navigate,
    }
  },
})
</script>
