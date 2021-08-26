<template>
  <div>
    <h1>{{ idea.name }}</h1>
    <div class="mb-4 px-2">
      <div class="flex flex-wrap items-start">
        <div class="mr-6">
          <WidgetUser :user="idea.ownerIdea" />
        </div>
        <AtomicLabel :name="t('info.date')" class="mb-4 mt-0 mx-4">
          {{ publishedAgo }}
        </AtomicLabel>
        <AtomicLabel :name="t('info.status.title')" class="mb-4 mt-0 mx-4">
          {{ t(`info.status.${idea.status}`) }}
        </AtomicLabel>
      </div>
    </div>
    <div class="">
      <AtomicCard class="">
        <div v-html="idea.text" class="overflow-hidden" />
      </AtomicCard>

      <RouterLink
        :to="{ name: 'idea-detail', params: { id: idea.id } }"
        custom
        v-slot="{ href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="
            flex
            items-center
            justify-end
            -mb-8
            py-6
            text-primary-500
            hover:underline
          "
        >
          <span class="mr-2">{{ t(`more`) }}</span>
          <ArrowRightIcon />
        </a>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useIdea, useUser } from '../../composes/core'
import { useTimeAgo, useTitle } from '@vueuse/core'
import { useI18n } from '../../composes/utils'
import { useDialogRoute } from '../../core/router'

export default defineComponent({
  name: 'IdeaDetailPreview',
  async setup() {
    const route = useDialogRoute()
    const { t } = useI18n('pages.preview.idea')
    const { getUserProfileUrl } = useUser()
    const {
      idea,
      getIdea,
      changeStatusIdea,
      languagesForSpecialist,
      frameworksForSpecialist,
    } = useIdea(route.value.params.id)
    await getIdea()

    const publishedAgo = useTimeAgo(idea.value.lastUpdateDate)

    useTitle(`${idea.value.name} - DevBuff`)

    return {
      idea,
      publishedAgo,
      t,
      changeStatusIdea,
      getUserProfileUrl,
      languagesForSpecialist,
      frameworksForSpecialist,
    }
  },
})
</script>
