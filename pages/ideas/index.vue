<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" />
    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-3">
        <h1>{{ $t('page.ideas.explore.header') }}</h1>
        <div class="mb-4 flex items-center justify-between">
          <v-switcher
            v-model="filter.sort"
            :values="[
              {
                title: $t('page.ideas.explore.filter.datePublish'),
                value: 'date',
              },
              {
                title: $t('page.ideas.explore.filter.lastUpdate'),
                value: 'lastUpdate',
              },
            ]"
          />
          <div>
            <div
              :class="[
                'text-3xl cursor-pointer h-10 w-10 p-2 rounded-full flex items-center justify-center',
                'transition-all hover:bg-primary hover:text-primary hover:bg-opacity-10',
                'transform active:scale-90',
              ]"
              @click="toggleInlineView"
            >
              <svg-icon :name="grid.inlineView ? 'edit/layout' : 'menu/menu'" />
            </div>
          </div>
        </div>
        <div v-if="ideas.length" ref="ideas" class="ideas">
          <v-idea
            v-for="idea in ideas"
            :id="idea.id"
            :key="idea.id"
            :title="idea.name"
            :publish-date="idea.publishDate || idea.datePublished"
            :description="idea.description"
            :specialists="idea.specialists"
            class="idea mb-6"
            :style="{ width: grid.inlineView ? '100%' : 'calc(50% - 8px)' }"
          >
            <template #user>
              <div class="flex items-center mt-3">
                <v-avatar
                  :avatar="$store.getters['user/profile'].id"
                  class="mr-3"
                  size="24px"
                />
                <div class="mt-px">User Name</div>
              </div>
            </template>
          </v-idea>
        </div>
        <div v-else class="p-5">
          🤷
          <span class="text-muted">
            {{ $t('page.ideas.explore.notFound') }}
          </span>
        </div>
      </div>
      <div class="col-span-1">
        <v-filter
          v-model="filter.params"
          :fields="filterOptions"
          class="sticky top-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import qs from '~/app/utils/url'

export default {
  async middleware({ store, route }) {
    await store.dispatch('ideas/getIdeas', route.query)
    await store.dispatch('skills/getSkills')
  },
  data() {
    const query = Object.entries(
      qs.parse(this.$route.fullPath.split('?')[1])
    ).reduce((acc, [key, params]) => {
      acc[key] = !Array.isArray(params) ? [params] : params
      return acc
    }, {})

    return {
      grid: {
        inlineView: false,
        masonryGrid: null,
        isRepaint: false,
      },
      loading: false,
      filter: {
        page: 1,
        sort: 'date',
        params: query,
      },
    }
  },
  head() {
    return {
      title: 'Devbuff - Проекты',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Список открытых проектов',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      ideas: 'ideas/list',
      langs: 'skills/languages',
      skills: 'skills/skills',
      specs: 'skills/specializations',
    }),
    breadcrumbs() {
      return [
        {
          title: this.$t('components.breadcrumb.main'),
          to: this.localePath({ name: 'index' }),
        },
        {
          title: this.$t('components.breadcrumb.idea'),
          to: this.localePath({ name: 'ideas' }),
        },
      ]
    },
    filterOptions() {
      return [
        {
          name: this.t('common.specializations'),
          value: 'specialists',
          params: this.specs.map((currentValue) => {
            return {
              value: currentValue,
              name: this.t(
                'specializations.' + currentValue + '.title',
                currentValue
              ),
            }
          }),
        },
        {
          name: this.t('components.ideaCard.languages'),
          value: 'languages',
          params: this.langs.map((currentValue) => {
            return {
              value: currentValue,
              name: this.t('languages.' + currentValue, currentValue),
            }
          }),
        },
      ]
    },
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.applyFilter()
      },
    },
  },
  async mounted() {
    await this.initMasonryGrid()
  },
  methods: {
    async initMasonryGrid() {
      if (process.server) return false
      await this.$nextTick()

      const MasonryLayout = require('masonry-layout')
      const Masonry = new MasonryLayout('.ideas', { gutter: 16, stagger: 20 })
      Masonry.on('layoutComplete', () => (this.grid.isRepaint = false))
      this.grid.masonryGrid = Masonry
    },
    async reloadMasonryGrid() {
      this.grid.isRepaint = true
      await this.$nextTick()

      this.grid.masonryGrid.reloadItems()
      this.gridHide()
      await this.$nextTick()
      this.grid.masonryGrid.layout()
      setTimeout(this.gridShow, 200)
    },
    gridHide() {
      const ideasGrid = this.$refs.ideas
      ideasGrid.style.transition = 'none'
      ideasGrid.style.transform = 'scale(0.97)'
      ideasGrid.style.opacity = 0
    },
    gridShow() {
      const ideasGrid = this.$refs.ideas
      ideasGrid.style.transition = 'all 150ms ease'
      ideasGrid.style.transform = 'scale(1)'
      ideasGrid.style.opacity = 1
    },
    async toggleInlineView() {
      if (this.grid.isRepaint) return
      this.grid.inlineView = !this.grid.inlineView
      await this.reloadMasonryGrid()
    },
    async applyFilter() {
      const filter = {
        sortBy: this.filter.sort,
        page: this.filter.page,
        ...this.filter.params,
      }
      const query = qs.stringify(filter)
      history.replaceState(
        null,
        null,
        `${window.location.origin + window.location.pathname}?${query}`
      )
      await this.$store.dispatch('ideas/getIdeas', filter)
      await this.reloadMasonryGrid()
    },
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr || str
    },
  },
}
</script>
