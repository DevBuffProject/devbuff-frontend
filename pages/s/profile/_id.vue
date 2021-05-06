<template>
  <div class="profile">
    <div v-if="profile !== undefined">
      <div class="">
        <div class="grid gap-5 grid-cols-10 mb-3">
          <div class="my-5 col-span-3">
            <atomic-avatar class="mb-3" :avatar="profile.avatar" size="200px" />
            <widget-user
              :firstname="profile.firstName"
              :lastname="profile.lastName"
              :username="profile.userName"
              class="text-lg"
            />
            <atomic-card triangle="top" class="-ml-4 my-4">
              <atomic-label v-if="profile.bio" name="о себе">
                {{ profile.bio }}
              </atomic-label>
            </atomic-card>
            <atomic-label
              v-if="profile.birthday"
              name="дата рождения"
              class="mb-3"
            >
              {{ profile.birthday | toLocaleDateTime($i18n.locale) }}
            </atomic-label>
            <atomic-label v-if="profile.country" name="страна" class="mb-3">
              {{ profile.country }}
            </atomic-label>
            <atomic-label v-if="profile.city" name="город" class="mb-3">
              {{ profile.city }}
            </atomic-label>
          </div>
          <div class="col-span-7">
            <h1>
              Открытые проекты
              <em class="text-primary">@{{ profile.userName }}</em>
            </h1>
            <widget-profile-skills class="mb-8" />
            <masonry :cols="2" :gutter="30">
              <div v-for="idea in profile.ideas" :key="idea.id">
                <div>
                  <widget-idea
                    :id="idea.id"
                    :title="idea.name"
                    :date="idea.datePublished | toLocaleDateTime($i18n.locale)"
                    :description="idea.description"
                    :specialists="idea.specialists"
                    class="mb-6"
                  >
                    <template #user>
                      <div class="flex items-center mt-3">
                        <atomic-avatar class="mr-3" size="24px" />
                        <div class="mt-px">User Name</div>
                      </div>
                    </template>
                  </widget-idea>
                </div>
              </div>
            </masonry>
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
      return this.profile.id === this.$store.getters['auth/user'].id
    },
  },

  methods: {
    changeSkills(skills) {
      this.$store.dispatch('user/update', { skills })
    },
  },
}
</script>
