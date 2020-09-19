<template>
  <div class="profile">
    <v-toolbar class="profile__toolbar">
      <div class="container toolbar__grid">
        <div class="profile__name d-flex align-items-end pt-4 pl-4">
          <v-shadow-input
            label="enter чтобы сохранить"
            @keyup.enter="changeFirstName($event.target.value)"
            type="text" :value="profile.firstName"
          />
          <v-shadow-input
            label="enter чтобы сохранить"
            @keyup.enter="changeLastName($event.target.value)"
            type="text" :value="profile.lastName"
          />
          <span class="text-muted profile__username"> @{{ profile.userName }} </span>
        </div>

        <div>
        </div>
      </div>
    </v-toolbar>

    <div class="container d-flex">
      <div class="profile__sidebar">
        <div class="profile__sidebar-content d-flex flex-column align-content-center">
          <v-avatar
            class="profile__avatar mb-3"
            :avatar="profile.image"
            size="6rem"
          />
          <v-button
            type="black"
            :icon="['fas', 'edit']"
            rounded
          />
        </div>
      </div>
      <div class="container pt-3 pl-4">
        <div class="profile__container">
          <div class="mb-4 d-flex align-items-baseline">
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
            <v-button
              type="flat"
              :icon="['fas', 'edit']"
              class="profile__socials-edit ml-2"
              @click="openSkillsEditor"
            >
              изменить
            </v-button>
          </div>

          <div class="profile__bio mb-4">
            <v-shadow-input
              type="textarea"
              label="alt + shift чтобы сохранить"
              :value="profile.bio.replace(/^\s+|\s+$/g, '')"
              @keyup.alt.enter="changeBio($event.target.value)"
            />
          </div>

          <div class="profile__skills">
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
  },

  methods: {
    changeBio(bio) {
      this.$store.dispatch('user/update', { bio })
    },
    changeFirstName(firstName) {
      this.$store.dispatch('user/update', { firstName })
    },
    changeLastName(lastName) {
      this.$store.dispatch('user/update', { lastName })
    },
    async openSkillsEditor() {
      const editor = () => import('~/components/Profile/SkillsEditor.vue')
      const skills = await this.$store.dispatch('skills/getSkills')

      this.$dialog.push(
        editor,
        {
          skills,
          userSkills: this.profile.skills,
        },
        {
          updateSkills() {
            console.log('skill-update');
          }
        }
      )
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

  &__avatar {

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
