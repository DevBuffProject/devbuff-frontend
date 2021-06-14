<template>
  <div class="grid grid-cols-4 gap-4">
    <WidgetIdeasCard
      v-for="(idea, index) of ideaForValidation"
      :key="idea.id"
      :id="idea.id"
      :title="idea.name"
      :description="idea.description"
      v-motion
      :initial="{ opacity: 0, y: -20, scale: 0.95 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :delay="100 * index"
      class="col-start-2 col-span-2"
    >
      <template #user>
        <div class="flex space-x-3">
          <AtomicButton
            :type="`primary`"
            class="flex items-center justify-center"
            @click="approveIdea(idea.id)"
          >
            Одобрить
          </AtomicButton>
          <AtomicButton
            type="danger"
            class="flex items-center justify-center"
            @click="deleteIdea(idea.id)"
          >
            Удалить
          </AtomicButton>
        </div>
      </template>
    </WidgetIdeasCard>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useModeration } from '../../composes/core'

export default defineComponent({
  setup() {
    const {
      ideaForValidation,
      loadForIdeasValidation,
      approveIdea,
      deleteIdea,
    } = useModeration()

    loadForIdeasValidation()

    return {
      ideaForValidation,
      approveIdea,
      deleteIdea,
    }
  },
})
</script>
