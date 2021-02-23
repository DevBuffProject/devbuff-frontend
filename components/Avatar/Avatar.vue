<template>
  <div
    :class="[
      'avatar',
      square && 'avatar--square'
    ]"
    :style="{
      backgroundImage: 'url(' + avatarUrl + ')',
      width: size,
      height: size,
      backgroundColor: 'white',
      flex: `0 0 ${size}`
    }"
  >
    <v-icon
      v-if="!avatar"
      class="avatar__icon"
      :icon="['fas', 'user']"
    />
  </div>
</template>

<script>
export default {
  name: 'v-avatar',

  props: {
    avatar: {
      type: String,
      default: null
    },
    square: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '40px'
    }
  },

  computed: {
    avatarUrl() {
      return `${this.$config.API_BASE_URL}/photo/profile/${this.avatar}`
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-muted);
  border-radius: 100px;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 0 1px var(--color-muted);

  &--square {
    border-radius: 4px;
  }

  &__icon {
    font-size: 1rem;
    opacity: .15;
    color: #000;
    opacity: .1;
  }
}
</style>
