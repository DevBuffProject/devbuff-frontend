<template>
  <div class="v-toolbar">
    <div class="container v-toolbar__inner">
      <div
        v-show="!hideBacklink"
        v-ripple="'var(--color-muted)'"
        @click="$router.go(-1)" class="v-toolbar__back-link">
        <v-icon :icon="['fas', 'long-arrow-alt-left']" class="v-toolbar__back-link-icon"/>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-toolbar',

  props: {
    hideBacklink: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar {
  background-color: var(--color-background-accent);
  position: sticky;
  top: 0;
  z-index: 999;
  min-height: 55px;
  padding: .5rem 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-muted);

  @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .8);
  }

  &__inner {
    display: flex;
    align-items: center;
    padding: 0;
  }

  &__back-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.2rem;
    height: 1.2rem;
    font-size: .8rem;
    font-weight: 600;
    margin-right: 1rem;
    cursor: pointer;
    padding: .5rem;
    border-radius: 100px;
    transition: opacity .3s var(--base-transition);
  }

  &__back-link-icon {
    font-size: 1rem;
    transition: background-color .3s var(--base-transition);
  }

  &__back-link:hover &__back-link-icon {
    //background-color: var(--color-muted);
  }

  &__grid {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
