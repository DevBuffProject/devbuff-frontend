<template>
  <div class="profile">
    <v-toolbar hide-backlink class="profile__toolbar">
      <div class="d-flex align-items-end pt-4 pl-4">
        <div class="profile__name">
          {{ profile.firstName }} {{ profile.lastName }}
        </div>
        <div class="ml-3 text-muted profile__username">
          @{{ profile.userName }}
        </div>
      </div>
      <div />
    </v-toolbar>
    <div class="container d-flex">
      <div class="profile__sidebar">
        <div class="profile__sidebar-content d-flex flex-column align-content-center">
          <v-avatar
            class="profile__avatar mb-3"
            :avatar="profile.id"
            size="6rem"
          />
          <v-button
            v-if="self"
            type="dark"
            :icon="['fas', 'edit']"
            rounded
            @click="edit"
          />
        </div>
      </div>
      <div class="container pt-3 pl-4">
        <div class="profile__container">

          <div class="d-flex mb-3">
            <v-label v-if="profile.birthday" name="дата рождения" class="mr-5">
              {{ profile.birthday | toLocaleDateTime($i18n.locale) }}
            </v-label>

            <v-label v-if="profile.city" name="город" class="mr-5">
              {{ profile.city }}
            </v-label>
          </div>

          <v-label v-if="profile.bio" name="о себе" class="mr-5 mb-4">
            {{ profile.bio }}
          </v-label>

          <div v-if="profile.socialNetworks" class="profile__socials">
            <div v-if="profile.socialNetworks.vk" class="profile__social-contact mb-2">
              <div class="mb-2 d-flex align-items-center profile__social-contact">
                <v-icon class="mr-2 profile__social-icon" :icon="['fab', 'vk']" />
                <span class="text-muted mr-1">{{ profile.socialNetworks.vk }}</span>
                <span class="mx-1">—</span>
                {{ $t('page.profile.vk') }}
              </div>
              <v-og-preview
                v-if="profile.socialNetworks.vk"
                class="mb-4"
                :url="urls.vk"
              />
            </div>

            <div v-if="profile.socialNetworks.telegram" class="profile__social-contact mb-2">
              <div class="mb-2 d-flex align-items-center profile__social-contact">
                <v-icon class="mr-2 profile__social-icon" :icon="['fab', 'telegram']" />
                <span class="text-muted">{{ profile.socialNetworks.telegram }}</span>
                <span class="mx-1">—</span>
                tetegram
              </div>
              <v-og-preview
                v-if="profile.socialNetworks.telegram"
                class="mb-4"
                :url="urls.telegram"
              />
            </div>

            <div v-if="profile.socialNetworks.skype" class="profile__social-contact mb-2">
              <div class="d-flex align-items-center profile__social-contact">
                <v-icon class="mr-2 profile__social-icon" :icon="['fab', 'skype']" />
                <span class="text-muted">{{ profile.socialNetworks.skype }}</span>
                <span class="mx-1">—</span>
                skype
              </div>
            </div>

            <div v-if="profile.socialNetworks.discord" class="profile__social-contact mb-4">
              <div class="d-flex align-items-center profile__social-contact">
                <v-icon class="mr-2 profile__social-icon" :icon="['fab', 'discord']" />
                <span class="text-muted">{{ profile.socialNetworks.discord }}</span>
                <span class="mx-1">—</span>
                discord
              </div>
            </div>
          </div>

          <div v-if="self" class="profile__skills">
            <v-skills-editor
              v-if="systemSkills"
              :userSkills="profile.skills"
              :skills="systemSkills"
              @change="changeSkills"
            />
            <div
              v-else
              class="d-flex justify-content-center align-items-center"
            >
              <span class="mr-3">{{ $t('page.profile.skillsLoading') }}</span>
              <v-loading />
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
              <div class="profile__skill-name"> {{ $t('languages.' + skill.name) }}</div>
              <div
                v-for="spec in skill.specializations"
                :key="spec.name"
                class="profile__skill-spec"
              >
                <span>
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

const ProfileEdit = () => import('~/components/Profile/ProfileEdit.vue')

export default {
  mounted() {
    const { act } = this.$route.query

    // show settings dialog
    if (act === 'edit') this.edit()
  },

  computed: {
    ...mapGetters({
      systemSkills: 'skills/skills'
    }),

    profile() {
      const { id } = this.$route.params

      return id
        ? this.$store.getters['user/user']
        : this.$store.getters['user/profile']
    },

    self() {
      return this.profile.id === this.$store.getters['user/profile'].id
    },

    urls() {
      if (!this.profile.socialNetworks) return false

      return {
        vk: this.profile.socialNetworks.vk && `https://vk.com/${this.profile.socialNetworks.vk}`,
        telegram: this.profile.socialNetworks.telegram && `https://t.me/${this.profile.socialNetworks.telegram}`,
      }
    }
  },

  methods: {
    edit() {
      this.$dialog
        .push(ProfileEdit, { dataProfile: JSON.parse(JSON.stringify(this.profile)) })
        .then(() => {
          this.$router.replace({ ...this.$route, query: {} })
        })
    },

    changeSkills(skills) {
      this.$store.dispatch('user/update', { skills })
    }
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

  &__sidebar-content {
    position: sticky;
    top: 5px;
  }

  &__name {
    margin-left: var(--sidebar-width);
  }

  &__username {
    font-size: .7rem;
    margin-top: -.5rem;
  }

  &__socials-edit {
    font-size: .75rem !important;
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
    transition: background-color .3s var(--base-transition);

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
    font-size: .85rem;
    border-bottom: 1px solid var(--color-muted);
    margin-bottom: .8rem;
    font-weight: 300;
  }

  /deep/ &__skill-technology {
    margin: 0 .5rem .3rem 0;
  }

}
</style>
