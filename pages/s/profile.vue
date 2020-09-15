<template>
  <div class="profile">
    <v-toolbar class="profile__toolbar">
      <div class="container toolbar__grid">
        <div class="profile__name pt-4 pl-4">
          <span> {{ profile.firstName }} {{ profile.lastName }} </span>
          <span class="text-muted profile__username"> @{{ profile.userName }} </span>
        </div>

        <div>
          <v-button type="flat">
            редактировать
          </v-button>
        </div>
      </div>
    </v-toolbar>

    <div class="container d-flex">
      <div class="profile__sidebar d-flex flex-column align-content-center">
        <v-avatar
          class="profile__avatar mb-3"
          :avatar="profile.image"
          size="6rem"
        />

        <v-button
          type="muted"
          :icon="['fas', 'edit']"
          rounded
        >
          ред
        </v-button>
      </div>
      <div class="container pt-3 pl-4">
        <div class="profile__container">
          <div class="mb-4 pb-1">
            <v-link href="/">
              <v-icon
                :icon="['fab', 'vk']"
                class="profile__social-icon mr-2"
              />
            </v-link>
            <v-link href="/">
              <v-icon
                :icon="['fab', 'twitter']"
                class="profile__social-icon mr-2"
              />
            </v-link>
            <v-link href="/">
              <v-icon
                :icon="['fab', 'skype']"
                class="profile__social-icon mr-2"
              />
            </v-link>
            <v-link href="/">
              <v-icon
                :icon="['fab', 'discord']"
                class="profile__social-icon mr-2"
              />
            </v-link>
          </div>

          <div class="profile__bio mb-4">
            {{ profile.bio }}
          </div>

          <div class="profile__skills">
            <div
              v-for="skill in profile.skills"
              :key="skill.name"
              class="profile__skill"
            >
              <div class="profile__skill-name"> {{ skill.name }} </div>

              <div
                v-for="spec in skill.specializations"
                :key="spec.name"
                class="profile__skill-spec"
              >
                <span >
                  <v-chip
                    v-for="framework in spec.frameworks"
                    :key="framework.name"
                    :text="framework.name"
                    type="auto"
                    mixClass=" profile__skill-technology"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('user/getProfile')
  },

  computed: {
    ...mapGetters({
      profile: 'user/profile'
    })
  }
}
</script>

<style lang="scss" scoped>
.profile {
  --sidebar-width: 6rem;

  &__toolbar {
    height: min-content;
  }

  &__container {
    max-width: 550px;
    min-width: 350px;
    width: 100%;
  }

  &__sidebar {
    position: relative;
    z-index: 9991;
    margin-top: -3rem;
  }

  &__avatar {
    position: sticky;
    top: 5px;
  }

  &__name {
    margin-left: var(--sidebar-width);
  }

  &__username {
    font-size: .7rem;
    margin-left: .5rem;
  }

  &__socials {

  }

  &__social-icon {
    font-size: 1.2rem;
    color: var(--color-muted-darken);
  }

  &__skills {
    display: flex;
  }

  &__skill {
    flex: 0 0 200px;
    border-radius: 4px;
    margin: 0 1rem .5rem 0;
  }

  &__skill-name {
    font-size: 1rem;
    border-bottom: 1px solid var(--color-muted);
    margin-bottom: 1rem;
    font-weight: 300;
  }

  /deep/ &__skill-technology {
    font-size: .7rem !important;
    padding: 0 .5rem 0 1rem !important;
    height: 1.2rem !important;
    margin: 0 .5rem .5rem 0;
  }

}
</style>
