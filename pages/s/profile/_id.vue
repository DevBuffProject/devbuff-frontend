<template>
  <div class="profile">
    <div v-if="profile !== undefined">
      <div class="mt-3">
        <div class="flex flex-wrap items-center justify-between mb-3">
          <div class="flex flex-wrap items-center my-5">
            <atomic-avatar
              class="profile__avatar mb-3"
              :avatar="profile.avatar"
              size="6rem"
            />
            <widget-user
              :firstname="profile.firstName"
              :lastname="profile.lastName"
              :username="profile.userName"
              class="ml-10"
            />
          </div>
          <div class="container mx-auto flex">
            <div class="profile__sidebar">
              <div
                class="profile__sidebar-content flex flex-column align-content-center"
              >
                <v-button
                  v-if="self"
                  rounded
                  type="contrast"
                  :icon="['fas', 'edit']"
                />
              </div>
            </div>
            <div class="container mx-auto pt-3 pl-4">
              <div class="profile__container">
                <div class="flex mb-3">
                  <atomic-label
                    v-if="profile.birthday"
                    name="дата рождения"
                    class="mr-5"
                  >
                    {{ profile.birthday | toLocaleDateTime($i18n.locale) }}
                  </atomic-label>

                  <atomic-label
                    v-if="profile.country"
                    name="страна"
                    class="mr-5"
                  >
                    {{ profile.country }}
                  </atomic-label>

                  <atomic-label v-if="profile.city" name="город" class="mr-5">
                    {{ profile.city }}
                  </atomic-label>
                </div>

                <atomic-label
                  v-if="profile.bio"
                  name="о себе"
                  class="mr-5 mb-4"
                >
                  {{ profile.bio }}
                </atomic-label>

                <div v-if="self" class="profile__skills">
                  <v-skills-editor
                    v-if="systemSkills"
                    :user-skills="profile.skills"
                    :skills="systemSkills"
                    @change="changeSkills"
                  />
                  <div v-else class="flex justify-center items-center">
                    <span class="mr-3">{{
                      $t('page.profile.skillsLoading')
                    }}</span>
                    <atomic-loading />
                  </div>
                </div>

                <div v-if="false" class="profile__skills">
                  <v-button
                    type="flat"
                    :icon="['fas', 'edit']"
                    class="profile__skills-edit"
                  >
                    изменить
                  </v-button>

                  <div
                    v-for="skill in profile.skills"
                    :key="skill.name"
                    class="profile__skill"
                  >
                    <div class="profile__skill-name">
                      {{ $t('languages.' + skill.name) }}
                    </div>
                    <div
                      v-for="spec in skill.specializations"
                      :key="spec.name"
                      class="profile__skill-spec"
                    >
                      <span>
                        <atomic-chip
                          v-for="framework in spec.frameworks"
                          :key="framework.name"
                          :text="framework.name"
                          type="auto"
                          mix-class=" profile__skill-technology"
                        />
                      </span>
                    </div>
                  </div>
                </div>
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
  computed: {
    ...mapGetters({
      systemSkills: 'skills/skills',
      profile: 'user/profile',
    }),

    self() {
      return true // TODO
    },

    urls() {
      if (!this.profile.socialNetworks) {
        return false
      }

      return {
        vk:
          this.profile.socialNetworks.vk &&
          `https://vk.com/${this.profile.socialNetworks.vk}`,
        telegram:
          this.profile.socialNetworks.telegram &&
          `https://t.me/${this.profile.socialNetworks.telegram}`,
      }
    },
  },

  methods: {
    changeSkills(skills) {
      this.$store.dispatch('user/update', { skills })
    },
  },
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

  &__sidebar-content {
    position: sticky;
    top: 5px;
  }

  &__name {
    margin-left: var(--sidebar-width);
  }

  &__username {
    font-size: 0.7rem;
    margin-top: -0.5rem;
  }

  &__socials-edit {
    font-size: 0.75rem !important;
    font-weight: 300 !important;
    padding: 0 !important;
    color: var(--color-muted-darken);

    &:hover {
      text-decoration: underline;
    }
  }

  &__social-icon {
    font-size: 1.2rem;
    color: var(--color-muted-darken);
  }

  &__skills {
    // display: flex;
    position: relative;
    padding: 1rem;
    margin: -1rem;
    border-radius: 4px;
    transition: background-color 0.3s var(--base-transition);

    &:hover {
      background-color: var(--color-muted-accent);
    }
  }

  &__skills-edit {
    position: absolute !important;
    top: 10px;
    right: 0;
  }

  &__skill {
    // flex: 0 0 180px;
    margin-bottom: 1.5rem;
  }

  &__skill-name {
    font-size: 0.85rem;
    border-bottom: 1px solid var(--color-muted);
    margin-bottom: 0.8rem;
    font-weight: 300;
  }

  /deep/ &__skill-technology {
    margin: 0 0.5rem 0.3rem 0;
  }
}
</style>
