<template>
  <div class="dashboard">
    <div class="container mx-auto">
      <div v-if="pendingIdeas.length" style="width: 700px">
        <div class="flex items-center mb-10">
          <v-checkbox
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
              <v-material-icon name="done_all" class="text-xl text-success" />
              <span class="ml-2 font-semibold">Одобрить все</span>
            </button>
            <em class="mx-2 w-px h-6 bg-gray-300 dark:bg-blueGray-700 block" />
            <button
              class="mr-2 inline-flex items-center"
              @click="applyActionDialog('delete')"
            >
              <v-material-icon
                name="delete_forever"
                class="text-xl text-danger"
              />
              <span class="ml-2 font-semibold">Удалить все</span>
            </button>
          </div>
        </div>

        <v-card
          v-for="idea in pendingIdeas"
          :key="idea.id"
          class="mb-4"
          :class="
            checked.indexOf(idea.id) > -1 &&
            'border-primary dark:border-primary border-opacity-100'
          "
        >
          <div class="group flex" @click="toggleCheck(idea)">
            <v-checkbox :checked="checked" :value="idea.id" class="mr-4" />
            <div class="flex justify-between items-center w-full">
              <div class="w-full">
                <div
                  :to="
                    localePath({ name: 'ideas-id', params: { id: idea.id } })
                  "
                  class="text-base block font-semibold"
                >
                  {{ idea.name }}
                </div>

                <div class="mt-2 text-sm text-gray-500 leading-5">
                  {{ idea.description }}
                </div>
              </div>
              <div
                class="text-xs w-full flex justify-end items-center"
                @click.stop.prevent
              >
                <div
                  class="flex items-center transition-opacity opacity-0 group-hover:opacity-100 mr-4"
                >
                  <button class="mr-2 inline-flex items-center text-success">
                    <v-material-icon name="done" class="text-xl" />
                    <span class="ml-1">одобрить</span>
                  </button>
                  <em
                    class="mx-2 w-px h-4 bg-gray-200 dark:bg-blueGray-600 block"
                  />
                  <button class="mr-2 inline-flex items-center text-danger">
                    <v-material-icon name="clear" class="text-xl" />
                    <span class="ml-1">Удалить</span>
                  </button>
                </div>
                <v-button type="muted">посмотреть</v-button>
              </div>
            </div>
          </div>
        </v-card>
      </div>
      <div v-else class="flex flex-column items-center" style="width: 500px">
        <span class="text-muted"> 🤷 {{ $t('page.dashboard.noIdeas') }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('admin/getPendingIdeas')
  },
  data: () => ({ checked: [] }),
  computed: {
    ...mapGetters('admin', ['pendingIdeas']),
  },
  methods: {
    applyActionDialog(act) {
      const accept = confirm(
        `${act === 'accept' ? 'Одобрить' : 'Удалить'} выделенные?`
      )
      if (accept)
        this.$dialog.push(() => import('@/components/widgets/Admin/Progress'), {
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
