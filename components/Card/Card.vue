<template>
  <div
    class="card"
    v-on="$listeners"
  >
    <div
      v-if="$slots.header"
      class="card__header"
    >
      <slot name="header" />
    </div>
    <div class="card__content">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="card__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-card',
}
</script>

<style lang="scss" scoped>
  .card {
    background-color: var(--color-background-contrast);
    padding: 1rem;
    border-radius: 4px;
    // box-shadow: var(--box-shadow);
    border: 1px solid var(--color-muted-accent);
    border-bottom: 1px solid var(--color-muted);
    box-shadow: 0 1px 1px 0 var(--color-muted);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__header {
      display: flex;
      align-items: center;
      margin: -1rem;
      margin-bottom: 1rem;
      padding: .5rem 1rem;
      border-bottom: 1px solid var(--color-muted-accent);
    }
    &__footer {
      display: flex;
      align-items: center;
      margin: -1rem;
      margin-top: 1rem;
      padding: .8rem 1rem;
      border-top: 1px solid var(--color-muted-accent);
    }
    &__content {
      height: 100%;
    }
  }
</style>
