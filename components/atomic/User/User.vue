<template>
  <div class="v-user">
    <nuxt-link
      :to="localePath({ name: 's-profile-id', params: { id: userId } })"
      class="v-user__link"
    >
      <v-avatar :avatar="userId" class="v-user__avatar" />
      <div>
        <div class="v-user__name">{{ firstname }} {{ lastname }}</div>
        <div class="v-user__username">@{{ username }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'VUser',

  props: {
    userId: {
      type: String,
      default: null,
    },
    firstname: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.v-user {
  &__link {
    display: flex;
  }

  &__avatar {
    margin-right: 0.5rem;
  }

  &__name {
    font-weight: 400;
  }

  &__username {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    font-weight: 400;
  }
}
</style>
