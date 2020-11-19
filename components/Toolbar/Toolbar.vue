<template>
  <div class="toolbar">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'v-toolbar'
}
</script>

<style lang="scss" scoped>
.toolbar {
  background-color: var(--color-background);
  position: sticky;
  top: 0;
  z-index: 999;
  min-height: 55px;
  padding: .5rem 0rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid var(--color-muted);

  @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .8);
  }

  &__grid {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
