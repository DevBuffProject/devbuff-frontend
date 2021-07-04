<template>
  <div v-if="idea.name">
    <h1>{{ idea.name }}</h1>
    <div class="flex flex-wrap items-start my-5">
      <RouterLink to="/" custom v-slot="{ navigate }">
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
      <AtomicLabel :name="t('info.date')" class="mt-0 mx-4 mb-4">
        {{ publishedAgo }}
      </AtomicLabel>

      <AtomicLabel :name="t('info.status.title')" class="mt-0 mx-4 mb-4">
        {{ t(`info.status.${idea.status}`) }}
      </AtomicLabel>
    </div>
    <div class="grid gap-2 grid-cols-12">
      <AtomicCard class="mb-3 col-span-12">
        <div v-html="idea.text" class="overflow-hidden" />
      </AtomicCard>
      <div class="col-start-10">
        <RouterLink
          :to="{ name: 'idea-detail', params: { id: idea.id } }"
          custom
          v-slot="{ href, navigate }"
        >
          <AtomicButton :href="href" @click="navigate">
            {{ t(`more`) }}
          </AtomicButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import { useIdea, useUser } from '../../composes/core'
import { useTimeAgo, useTitle } from '@vueuse/core'
import { useI18n } from '../../composes/utils'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'IdeaDetailPreview',
  async setup() {
    const route = useRoute()
    const publishedAgo = ref()
    watch(
      () => route.params,
      async () => {
        if (route.params?.id) {
          await loadIdea(route.params.id)
        }
      },
    )

    const { idea, getIdea } = useIdea()

    const { t } = useI18n('pages.preview.idea')

    const { getUserProfileUrl } = useUser()

    const loadIdea = async (uuid) => {
      await getIdea(uuid)
      publishedAgo.value = useTimeAgo(idea.value.lastUpdateDate).value
    }
    if (route.params?.id) {
      await loadIdea(route.params.id)
    }

    useTitle(`${idea.value.name} - DevBuff`)

    return {
      t,
      idea,
      publishedAgo,
      getUserProfileUrl,
    }
  },
})
</script>
