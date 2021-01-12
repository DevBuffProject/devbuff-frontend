<template>
  <div class="dashboard">
    <v-toolbar class="mb-4">
      <div class="container mx-auto toolbar__grid">
        <div class="flex">
          <h3 class="m-0"> {{ $t('page.dashboard.title') }} </h3>
        </div>
      </div>
    </v-toolbar>

    <div class="container mx-auto">
      <div style="width: 500px;">
        <v-input
          v-model="search"
          type="search"
          :placeholder="$t('page.dashboard.search')"
          :icon="['fas', 'search']"
          class="dashboard__search w-full"
        />
      </div>


      <div class="dashboard__grid">
        <div>
          <div
            v-if="ideas && ideas.length"
            class="dashboard__ideas"
            style="width: 500px;"
          >
            <div
              v-for="idea in ideas"
              :key="idea.id"
              @click="getIdeaStatus(idea.id)"
              :class="[
                'dashboard__idea',
                inspectedIdeaId === idea.id && 'dashboard__idea--inspected'
              ]"
            >
              <v-idea
                :title="idea.name"
                :publishDate="idea.publishDate || idea.datePublished"
                :description="idea.description"
                :specialists="idea.specialists"
                :id="idea.id"
                :linked="false"
              />
            </div>
          </div>
          <div
            v-else
            class="flex flex-column items-center"
            style="width: 500px;"
          >
            <span class="text-muted"> 🤷 {{ $t('page.dashboard.noIdeas') }} </span>
            <nuxt-link
              :to="localePath({ name: 's-ideas-editor' })"
              class="mt-3"
            >
              <v-button type="muted" :icon="['fas', 'plus']">
                {{ $t('page.ideas.explore.new') }}
              </v-button>
            </nuxt-link>
          </div>
        </div>


        <div class="dashboard__detail">
          <div class="flex align-baseline mb-3">
            <h3 class="my-0 mr-3">{{ $t('page.dashboard.respond.title') }}</h3>
            <v-link
              :to="localePath({ name: 'ideas-id', params: { id: inspectedIdeaId }})"
            >
              {{ $t('page.dashboard.respond.viewIdea') }}
            </v-link>
          </div>
          <div v-if="inspectedIdeaId && !loading && pendingUsers.length">
            <div>
              <v-card
                v-for="spec in pendingUsers"
                :key="spec.specialisationId"
                class="mb-4"
              >
                <template #header>
                  <div class="flex w-full">
                    <v-user
                      :user-id="spec.userEntity.id"
                      :firstname="spec.userEntity.firstName"
                      :lastname="spec.userEntity.lastName"
                      :username="spec.userEntity.userName"
                      class="dashboard__user-card"
                    />

                    <v-label :name="$t('page.dashboard.respond.specialization')" class="mr-4">
                      <div v-if="getPositionName(spec.specialisationId)">
                        {{
                          t('specializations.' + getPositionName(spec.specialisationId) + '.title', getPositionName(spec.specialisationId))
                        }}
                      </div>
                      <v-skeleton v-else figure="line"/>
                    </v-label>
                    <div>
                      <div v-if="spec.userEntity.vk" class="mb-2">
                        <div class="mb-2 flex items-center">
                          <v-icon class="mr-2" :icon="['fab', 'vk']"/>
                          <span class="text-muted mr-1">{{ spec.userEntity.vk }}</span>
                          <span class="mx-1">—</span>
                          {{ $t('page.dashboard.respond.contacts.vk') }}
                        </div>
                      </div>

                      <div v-if="spec.userEntity.telegram" class="mb-2">
                        <div class="mb-2 flex items-center">
                          <v-icon class="mr-2" :icon="['fab', 'telegram']"/>
                          <span class="text-muted">{{ spec.userEntity.telegram }}</span>
                          <span class="mx-1">—</span>
                          Tetegram
                        </div>
                      </div>

                      <div v-if="spec.userEntity.skype" class="mb-2">
                        <div class="flex items-center">
                          <v-icon class="mr-2" :icon="['fab', 'skype']"/>
                          <span class="text-muted">{{ spec.userEntity.skype }}</span>
                          <span class="mx-1">—</span>
                          skype
                        </div>
                      </div>

                      <div v-if="spec.userEntity.discord">
                        <div class="flex items-center">
                          <v-icon class="mr-2" :icon="['fab', 'discord']"/>
                          <span class="text-muted">{{ spec.userEntity.discord }}</span>
                          <span class="mx-1">—</span>
                          Discord
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template #footer>
                  <div class="w-full flex items-center justify-end">
                    <v-button> {{ $t('page.dashboard.respond.accept') }}</v-button>
                  </div>
                </template>

                <v-og-preview
                  v-if="spec.userEntity.vk"
                  class="mb-3"
                  :url="`https://vk.com/${spec.userEntity.vk}`"
                />

                <v-og-preview
                  v-if="spec.userEntity.telegram"
                  :url="`https://t.me/${spec.userEntity.telegram}`"
                />
              </v-card>
            </div>

            <v-card v-if="tab === 'preview-idea'">
              <v-idea-preview
                v-if="idea"
                :name="idea.name"
                :description="idea.description"
                :text="idea.text"
              />
            </v-card>
          </div>
          <v-skeleton-paragraph v-else-if="inspectedIdeaId && loading" />
          <div v-else class="muted mt-4">
            {{ $t('page.dashboard.respond.notFound') }}
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import VLink from "@/components/Link/Link";
import VSkeleton from "@/components/Skeleton/Skeleton";
import VSkeletonParagraph from "@/components/Skeleton/SkeletonParagraph";

export default {
  components: {VSkeletonParagraph, VSkeleton, VLink},
  async middleware({store}) {
    await store.dispatch('ideas/getOwnIdeas')
  },

  data: () => ({
    search: null,
    inspectedIdeaId: null,
    loading: false,
  }),

  computed: {
    pendingUsers() {
      return this.$store.getters['ideas/pendingUsers']
    },
    idea() {
      return this.$store.getters['ideas/idea']
    },
    ideas() {
      const ideas = this.$store.getters['ideas/own']
      const {search} = this

      if (!search) return ideas

      return ideas.filter(idea => {
        return idea.name.toLowerCase().startsWith(search.toLowerCase())
      })
    }
  },

  methods: {
    getPositionName(positionId) {
      const idea = this.$store.getters['ideas/idea']

      if (!idea) return false

      const spec = idea.specialist.find(s => s.id === positionId)

      return spec && spec.name
    },
    async getIdeaStatus(ideaId) {
      this.inspectedIdeaId = ideaId
      this.loading = true

      try {
        await this.$store.dispatch('ideas/getIdea', ideaId)
        await this.$store.dispatch('ideas/getPendingUsers', ideaId)
      } catch (e) {
        this.loading = false
      } finally {
        this.loading = false
      }
    },
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr
          ? fallbackStr
          : str
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &__grid {
    display: grid;
    grid-template-columns: 500px 1fr;
    grid-gap: 3rem;
  }

  &__detail {
    position: sticky;
    top: 5rem;
    height: min-content;
  }

  &__search {
    margin-bottom: 3rem;
    box-shadow: 0 15px 25px 5px rgba(211, 218, 230, 0.3) !important;
    border-radius: 20px !important;
  }

  &__ideas {
    height: 100%;
  }

  &__idea {
    margin-bottom: 1rem;
    cursor: pointer;
    position: relative;
  }

  &__idea::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    border-radius: 8px;
    transition: .5s var(--base-transition);
    transition-property: box-shadow, width, height, top, left;
    z-index: 1;
  }

  &__idea--inspected {
    box-shadow: 0px 10px 25px -5px rgba(0, 0, 0, .1);
  }

  &__idea--inspected::before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: inset 0px 0px 0px 2px var(--color-primary);
  }

  &__position-name {
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid var(--color-muted-accent);
  }

  &__user-card {
    padding-right: 1rem;
    margin-right: 1rem;
    border-right: 1px solid var(--color-muted);
  }
}
</style>
