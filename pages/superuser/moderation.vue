<template>
  <div>
    <atomic-breadcrumbs :items="breadcrumbs" />
    <h1>Модерация</h1>
    <div v-if="pendingIdeas.length" style="width: 700px">
      <div class="flex items-center mb-6">
        <atomic-form-checkbox
          :checked="checked.length === pendingIdeas.length"
          :is-intermedia="
            checked.length > 0 && checked.length !== pendingIdeas.length
          "
          class="mr-6 ml-px pl-3"
          @click="toggleCheckAll"
        />

        <div
          :class="[
            'flex items-center transition-opacity mr-4 text-xs',
            checked.length < 1 && 'opacity-20',
          ]"
        >
          <button
            class="mr-2 inline-flex items-center"
            @click="applyActionDialog('accept')"
          >
            <atomic-material-icon
              name="done_all"
              class="text-xl text-success"
            />
            <span class="ml-2 font-semibold">Одобрить все</span>
          </button>
          <em class="mx-2 w-px h-6 bg-gray-300 dark:bg-blueGray-700 block" />
          <button
            class="mr-2 inline-flex items-center"
            @click="applyActionDialog('delete')"
          >
            <atomic-material-icon
              name="delete_forever"
              class="text-xl text-danger"
            />
            <span class="ml-2 font-semibold">Удалить все</span>
          </button>
        </div>
      </div>

      <atomic-card class="overflow-hidden">
        <div
          v-for="(idea, index) in pendingIdeas"
          :key="idea.id"
          :class="[
            checked.indexOf(idea.id) > -1 &&
              'bg-gray-100 bg-opacity-50 dark:bg-blueGray-800 dark:bg-opacity-50',
            '-mx-4 px-4 pt-4',
          ]"
        >
          <div class="group flex" @click="toggleCheck(idea)">
            <atomic-form-checkbox
              :checked="checked"
              :value="idea.id"
              class="mr-4"
            />
            <div class="flex flex-col w-full">
              <nuxt-link
                :to="localePath({ name: 'ideas-id', params: { id: idea.id } })"
                class="text-primary hover:underline w-min whitespace-nowrap"
              >
                {{ idea.name }}
              </nuxt-link>

              <div class="mt-1 text-sm text-gray-500 leading-5">
                {{ idea.description }}
              </div>
            </div>
          </div>
          <atomic-delimiter
            v-if="index < pendingIdeas.length - 1"
            class="mt-4"
          />
        </div>
      </atomic-card>
    </div>
    <div v-else class="flex flex-column items-center" style="width: 500px">
      <span class="text-muted"> 🤷 {{ $t('page.dashboard.noIdeas') }} </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('admin/getPendingIdeas')
  },
  data: () => ({
    checked: [],
    queue: {},
  }),
  computed: {
    ...mapGetters('admin', ['pendingIdeas']),
    breadcrumbs() {
      return [
        {
          title: 'Главная',
          to: this.localePath({ name: 'index' }),
        },
        {
          title: 'Superuser',
          to: this.localePath({ name: 'superuser' }),
        },
        { title: 'Модерация' },
      ]
    },
  },
  methods: {
    enQueue({ id, method }) {
      this.queue[id] = method
    },
    unQueue(id) {
      delete this.queue[id]
    },
    applyActionDialog(act) {
      const accept = confirm(
        `${act === 'accept' ? 'Одобрить' : 'Удалить'} выделенные?`
      )
      if (accept)
        this.$dialog.push(() => import('@/components/widget/Admin/Progress'), {
          act,
          ids: this.checked,
        })
    },
    toggleCheckAll() {
      this.checked =
        this.checked.length < this.pendingIdeas.length
          ? this.pendingIdeas.map((idea) => idea.id)
          : []
    },
    toggleCheck({ id }) {
      if (!this.checked.includes(id)) {
        this.checked.push(id)
      } else {
        this.checked.splice(this.checked.indexOf(id), 1)
      }
    },
    async refresh() {
      await this.$store.dispatch('admin/getPendingIdeas')
    },
  },
}
</script>
