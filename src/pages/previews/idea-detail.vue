<template>
  <div>
    <h1>{{ idea.name }}</h1>
    <div class="flex flex-wrap items-start my-5">
      <RouterLink
        to="/"
        custom
        v-slot="{ navigate }"
      >
        <div class="mr-6 mb-4">
          <WidgetUser
            avatar-gradient-border
            :avatar="getUserProfileUrl(idea.ownerIdea.id)"
            :firstname="idea.ownerIdea.firstName"
            :lastname="idea.ownerIdea.lastName"
            :username="idea.ownerIdea.userName"
            @click="navigate"
            v-focusable
          />
        </div>
      </RouterLink>
      <AtomicLabel
        :name="t('info.date')"
        class="mt-0 mx-4 mb-4"
      >
        {{ publishedAgo }}
      </AtomicLabel>

      <AtomicLabel
        :name="t('info.status.title')"
        class="mt-0 mx-4 mb-4"
      >
        {{ t(`info.status.${idea.status}`) }}
      </AtomicLabel>

      <AtomicLabel
        v-if="isOwnerIdea"
        :name="t('info.moderationStatus.title')"
        class="mt-0 mx-4 mb-4"
      >
        {{
          idea.waitingValidation
            ? t('info.moderationStatus.waiting')
            : t('info.moderationStatus.approved')
        }}
      </AtomicLabel>
    </div>
    <div class="">
      <AtomicCard class="mb-3">
        <div
          v-html="idea.text"
          class="overflow-hidden"
        />
      </AtomicCard>

      <RouterLink
        :to="{ name: 'idea-detail', params: { id: idea.id } }"
        custom
        v-slot="{ href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
        >
          <AtomicButton
            is-depressed
            class="py-4 mt-6 w-full"
          >
            <div class="flex items-center">
              <span class="mr-2">{{ t(`more`) }}</span>
              <ArrowRightIcon />
            </div>
          </AtomicButton>
        </a>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { useIdea, useUser } from '../../composes/core'
import { useTimeAgo, useTitle } from '@vueuse/core'
import { useI18n } from '../../composes/utils'

export default defineComponent({
  name: 'IdeaDetailPreview',
  async setup() {
    const { dialog: route } = inject('route')
    const { t } = useI18n('pages.preview.idea')
    const { getUserProfileUrl, getUser } = useUser()
    const {
      idea,
      getIdea,
      changeStatusIdea,
      languagesForSpecialist,
      frameworksForSpecialist,
    } = useIdea(route.value.params.id)
    const publishedAgo = useTimeAgo(idea.value.lastUpdateDate)

    await getIdea()
    await getUser()

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
