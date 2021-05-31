<template>
  <div>
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
      <AtomicLabel name="date" class="mt-0 mx-4 mb-4">
        {{ publishedAgo }}
      </AtomicLabel>

      <AtomicLabel name="status" class="mt-0 mx-4 mb-4">
        {{ idea.status }}
      </AtomicLabel>

      <AtomicLabel v-if="isOwner" name="moderation">
        {{ idea.waitingValidation ? 'waiting' : 'aproove' }}
      </AtomicLabel>
    </div>
    <div class="grid grid-cols-5">
      <div class="mb-3 col-span-5">
        <div
          v-html="idea.text"
          class="p-4 border border-gray-200 dark:border-blueGray-600 rounded-xl"
        />
      </div>

      <!--    <div class=""></div>-->
    </div>
    <fast-comments-vue-next
      v-if="dataFastComment.sso"
      :config="dataFastComment"
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useIdea, useUser, useSso } from '../composes/core'
import { useTimeAgo, useTitle } from '@vueuse/core'
import FastCommentsVueNext from 'fastcomments-vue-next'

export default defineComponent({
  name: 'IdeaDetail',
  components: {
    FastCommentsVueNext,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const { idea, getIdea } = useIdea(props.id)
    const { getUserProfileUrl } = useUser()
    const { getSsoData } = useSso()

    const dataFastComment = reactive({
      tenantId: 'lprwn3v7q',
      urlId: 'idea-' + props.id,
      customCSS: '   .logged-in-info {\ndisplay: none;\n}',
    })

    useTitle(`${idea.value.name} - Devbuff`)
    const publishedAgo = useTimeAgo(new Date(idea.value.lastUpdateDate))

    getSsoData().then((result) => {
      dataFastComment.sso = result
    })

    const isOwner = false // TODO process

    await getIdea()

    return {
      idea,
      isOwner,
      publishedAgo,
      getUserProfileUrl,
      dataFastComment,
    }
  },
})
</script>
