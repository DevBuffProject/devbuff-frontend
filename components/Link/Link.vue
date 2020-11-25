<template>
    <component
      :is="props.is"
      v-bind="props"
      :class="[
        'link'
      ]"
      exact
      :activeClass="activeClass"
      :exactActiveClass="exactActiveClass"
    >
      <slot />
      <v-icon
        v-if="icon"
        :icon="icon"
        class="link__icon"
      />
    </component>
</template>

<script>
export default {
  name: 'v-link',

  props: {
    to: {
      type: [ String, Object ],
      default: null
    },
    href: {
      type: String,
      default: null
    },
    icon: {
      type: [ String, Array ],
      default: null
    },
    activeClass: {
      type: String,
      default: 'link--active'
    },
    exactActiveClass: {
      type: String,
      default: 'link--exact-active'
    }
  },
  computed: {
    iconDefinition() {
      return this.href ? ['fas', 'external-link-alt'] : this.icon
    },
    props() {
      const targetAttr = (this.to && {to: this.to}) || (this.href && {href: this.href})
      const props = {
        is: (this.to && 'NuxtLink') || (this.href && 'a') || 'a',
        ...targetAttr
      }

      return props
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  font-family: inherit;
  color: var(--color-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  &__icon {
    margin-left: 8px;
    transition: translateY(1px);
  }
}
</style>
