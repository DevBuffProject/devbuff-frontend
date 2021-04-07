<template>
  <v-dialog style="max-width: 600px" class="v-admin-idea">
    <div v-if="idea">
      <v-label name="название" class="w-full mb-3">
        <div class="flex items-center">
          <h3 class="m-0">{{ idea.name }}</h3>
        </div>
      </v-label>

      <v-label name="краткое описание" class="w-full mb-3">
        {{ idea.description }}
      </v-label>

      <v-label name="текст идеи" class="w-full">
        <div v-html="idea.text" />
      </v-label>
    </div>

    <template #controls>
      <div>
        <v-button flat type="success" :loading="progress" @click="approveIdea">
          одобрить
        </v-button>
        <v-button flat type="danger" :loading="progress" @click="deleteIdea">
          удалить
        </v-button>
        <v-button class="ml-2" type="muted" @click="reject">
          {{ $t('common.cancel') }}
        </v-button>
      </div>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    idea: Object,
  },
  data: () => ({
    progress: false,
  }),
  methods: {
    async approveIdea() {
      this.loading = true

      const accept = confirm('Опубликовать идею?')

      if (accept) {
        try {
          await this.$store.dispatch('admin/approveIdea', this.idea.id)
          this.resolve()
        } catch (e) {
          this.loading = false
        } finally {
          this.loading = false
        }
      }
    },
    async deleteIdea() {
      this.loading = true
      const confirm = prompt('Введите DELETE для подтверждения удаления')
      if (confirm === 'DELETE') {
        try {
          await this.$store.dispatch('admin/deleteIdea', this.idea.id)
          this.resolve()
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style lang="scss">
.v-admin-idea {
  width: 100%;
  max-width: 600px;
}
</style>
