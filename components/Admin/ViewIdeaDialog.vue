<template>
  <v-dialog-viewport style="max-width: 600px;" class="v-admin-idea">
    <div v-if="idea">
      <v-label name="название" class="w-100 mb-3">
        <div class="d-flex align-items-center">
          <h3 class="m-0">{{ idea.name }}</h3>
        </div>
      </v-label>

      <v-label name="краткое описание" class="w-100 mb-3">
        {{ idea.description }}
      </v-label>

      <v-label name="текст идеи" class="w-100">
        <v-article>
          <div v-html="idea.text" />
        </v-article>
      </v-label>
    </div>

    <template #controls>
      <div>
        <v-button class="mr-2" type="muted" @click="reject"> {{ $t('common.cancel') }} </v-button>
        <v-button type="success" :loading="progress" @click="aprooveIdea"> одобрить </v-button>
        <v-button type="danger" :loading="progress" @click="deleteIdea"> удалить </v-button>
      </div>
    </template>
  </v-dialog-viewport>
</template>

<script>
import WindowAbstract from '~/components/Dialog/Window'

export default {
  extends: WindowAbstract,

  props: {
    idea: Object
  },

  data: () => ({
    progress: false,
  }),

  methods: {
    async aprooveIdea() {
      try {
        this.loading = true
        await this.$store.dispatch('admin/aprooveIdea', this.idea.id)
        this.resolve()
      } catch (e) {
        this.loading = false
      } finally {
        this.loading = false
      }
    },

    async deleteIdea() {
      try {
        this.loading = true
        await this.$store.dispatch('admin/deleteIdea', this.idea.id)
      } catch (e) {
        this.resolve()
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.v-admin-idea {
  width: 100%;
  max-width: 600px;
}
</style>
