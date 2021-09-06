<template>
  <div class="w-1/2">
    <div class="flex items-center mb-6">
      <AtomicFormCheckbox
        :model-value="checked.length === pendingIdeas.length"
        class="mr-6 ml-px pl-3"
        @update:modelValue="toggleAll"
      />

      <div
        :class="[
          'flex items-center transition-opacity mr-4 text-xs',
          checked.length < 1 && 'opacity-20',
        ]"
      >
        <button class="mr-2 inline-flex items-center" @click="apply('approve')">
          <CheckCircleIcon class="text-success-500" />
          <span class="ml-2 font-medium">Одобрить все</span>
        </button>
        <em class="mx-2 w-px h-6 bg-gray-300 dark:bg-dark-700 block" />
        <button class="mr-2 inline-flex items-center" @click="apply('decline')">
          <TrashIcon class="text-danger-500" />
          <span class="ml-2 font-medium">Удалить все</span>
        </button>
      </div>
    </div>

    <AtomicCard class="overflow-hidden">
      <div class="divide-y">
        <div
          v-for="idea of pendingIdeas"
          :key="idea.id"
          :class="[
            // 'bg-gray-100 bg-opacity-50 dark:bg-dark-800 dark:bg-opacity-50',
            '-mx-4 px-4 py-4',
          ]"
        >
          <div class="group flex">
            <AtomicFormCheckbox
              v-model="checked"
              :value="idea.id"
              class="mr-4"
            />
            <div class="flex flex-col w-full">
              <RouterLink
                :to="{
                  name: 'idea-detail',
                  params: { id: idea.id, _isDialog: true },
                }"
                class="text-primary-500 hover:underline w-min whitespace-nowrap"
              >
                {{ idea.name }}
              </RouterLink>

              <div class="mt-1 text-sm text-gray-500 leading-5">
                {{ idea.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AtomicCard>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useModeration } from '../../composes'
import NProgress from 'nprogress'

export default defineComponent({
  async setup() {
    const { pendingIdeas, getPendingIdeas, approveIdea, deleteIdea } =
      useModeration()
    const checked = ref([])
    const done = ref(0)

    const apply = async (action) => {
      if (!checked.value.length) return false
      NProgress.start()

      checked.value.map(async (id) => {
        if (action === 'approve') await approveIdea(id)
        else await deleteIdea(id)

        NProgress.set((done.value / checked.value.length) * 100)
        done.value++

        if (done.value.length === checked.value.length) {
          await getPendingIdeas()
          done.value = 0
          NProgress.done()
        }
      })
    }
    const toggleAll = () => {
      checked.value =
        checked.value.length < pendingIdeas.value.length
          ? pendingIdeas.value.map((idea) => idea.id)
          : []
    }

    await getPendingIdeas()

    return {
      pendingIdeas,
      checked,
      done,
      toggleAll,
      apply,
    }
  },
})
</script>
