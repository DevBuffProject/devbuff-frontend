<template>
  <div class="-mx-4">
    <h1 class="mx-4">{{ idea.name }}</h1>
    <div class="mb-4 px-4">
      <div class="flex flex-wrap items-start">
        <WidgetUser :user="idea.ownerIdea" class="mr-6" />
        <AtomicLabel :name="t('info.date')" class="mb-4 mt-0 mx-4">
          {{ publishedAgo }}
        </AtomicLabel>
        <AtomicLabel :name="t('info.status.title')" class="mb-4 mt-0 mx-4">
          {{ t(`info.status.${idea.status}`) }}
        </AtomicLabel>
      </div>
    </div>

    <div
      v-html="idea.text"
      class="
        pt-6
        px-6
        !max-w-full
        dark:from-dark-800
        border-t border-default
        rounded-3xl
        prose-sm prose-primary-500
      "
      style="word-break: break-all"
    />

    <RouterLink
      :to="{ name: 'idea-detail', params: { id: idea.id } }"
      v-slot="{ href, navigate }"
      custom
    >
      <a
        :href="href"
        @click="navigate"
        class="
          flex
          items-center
          justify-end
          -mb-4
          py-6
          px-4
          text-primary-500
          hover:underline
        "
      >
        <span class="mr-2">{{ t(`more`) }}</span>
        <ArrowRightIcon />
      </a>
    </RouterLink>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useIdea, useUser } from '../../composes/services'
import { useTitle } from '@vueuse/core'
import { useI18n, useTimeAgoUtils } from '../../composes/utils'
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

    const publishedAgo = useTimeAgoUtils(idea.value.lastUpdateDate)

    useTitle(`${idea.value.name} - DevBuff`)

    idea.value.ownerIdea.avatar = getUserProfileUrl(idea.value.ownerIdea.id)

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
