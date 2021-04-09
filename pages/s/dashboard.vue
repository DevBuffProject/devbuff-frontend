<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-12">
      <div class="col-span-4 gap-5">
        <v-card
          v-for="idea in ideas"
          :key="idea.id"
          class="mb-4"
          @click="getIdea(idea)"
        >
          <div class="group flex">
            <div class="flex justify-between items-center w-full">
              <div class="w-full">
                <div class="flex items-center justify-between text-base block">
                  <nuxt-link
                    :to="localePath({ name: 'ideas-id', params: idea })"
                    class="text-primary hover:underline"
                  >
                    {{ idea.name }}
                  </nuxt-link>
                  <span class="flex items-center ml-4 text-xs font-normal">
                    <i v-if="idea.waitingValidation" class="opacity-20 ml-2">
                      {{
                        $t('page.ideas.view.statusModeration.waitingValidation')
                      }}
                    </i>
                    <v-material-icon
                      :name="
                        !idea.waitingValidation ? 'done' : 'hourglass_empty'
                      "
                      :class="[
                        idea.waitingValidation
                          ? 'text-warning'
                          : 'text-success',
                        'text-xs',
                      ]"
                    />
                  </span>
                </div>
                <div class="mt-2 text-sm text-gray-500 leading-5">
                  {{ idea.description }}
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>
      <pre class="col-span-8">
        {{ idea }}
      </pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async middleware({ store }) {
    await store.dispatch('dashboard/getIdeas')
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters('dashboard', ['ideas']),
    ...mapGetters('ideas', ['idea']),
  },
  methods: {
    getIdea({ id }) {
      this.$store.dispatch('ideas/getIdea', id)
    },
  },
}
</script>
