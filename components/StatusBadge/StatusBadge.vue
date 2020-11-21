<template>
  <span class="v-status-badge">
    <span :class="[
      'v-status-badge__indicator',
      'v-status-badge__indicator--' + indicator
    ]" />
    <span class="v-status-badge__description"> {{ description }}. </span>
    <v-link v-if="href" :href="href" :icon="['fas', 'external-link-alt']"> statuspage </v-link>
  </span>
</template>

<script>
export default {
  name: 'v-status-badge',
  props: {
    indicator: {
      type: String,
      reduired: true,
      validate: v => ['none', 'minor', 'major'].includes(v)
    },
    description: {
      type: String,
      required: true
    },
    href: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.v-status-badge {
  display: flex;
  align-items: center;
  font-size: .8rem;

  &__description {
    margin-right: .8rem;
  }

  &__indicator {
    --size: 8px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    margin-right: 1rem;
  }

  &__indicator--none {
    background-color: var(--color-success);
  }
  &__indicator--minor {
    background-color: var(--color-warning);
  }
  &__indicator--major {
    background-color: var(--color-danger);
  }
}

</style>
