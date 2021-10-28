<template>
  <div>
    <section
      class="
        flex flex-col
        items-center
        justify-center
        rounded-2xl
        py-6
        bg-hero-circuit-board-light-900
        dark:bg-hero-circuit-board-dark-100
      "
    >
      <AtomicAvatar :src="user.avatar" :size="150" />

      <div>
        <div class="text-gray-500">@{{ user.userName }}</div>
        <h3 class="!mt-0">{{ user.firstName }} {{ user.lastName }}</h3>
      </div>

      <AppLink :to="{ name: 'settings' }">
        <BaseButton class="text-primary-500">
          <EditIcon class="mr-2" />
          Редактировать
        </BaseButton>
      </AppLink>
    </section>

    <section v-if="isLoggedInUser" class="mt-10 grid grid-cols-2">
      <div class="col-1">
        <AtomicCard v-ripple>
          <div class="flex items-center">
            <span class="text-xl font-regular mr-4">Отклики</span>
            <AtomicTextMarker color="green">100</AtomicTextMarker>
          </div>
        </AtomicCard>
      </div>
    </section>

    <section class="mt-10 flex items-center">
      <h2 class="!m-0">Skills</h2>
      <AtomicTextMarker class="block ml-4 text-xl">
        {{ user.skills?.length }}
      </AtomicTextMarker>
    </section>

    <AtomicUserSkills :skills="user.skills" />

    <!--    <WidgetIdeaCard v-for="idea of userIdeas" :key="idea.id" :idea="idea" />-->
  </div>
</template>

<script setup>
import { computed, defineProps, toRefs, watch } from 'vue'
import { useAuth, useIdeas, useUser } from '../composes'
import BaseButton from '../components/base/Button.vue'

const props = defineProps({
  UUID: { type: String, required: true },
})

const { UUID } = toRefs(props)
const { user, getUser } = useUser()
const { user: profile } = useAuth()
const { userIdeas, getUserIdeas } = useIdeas()

getUser(UUID.value)
getUserIdeas(UUID.value)

watch(
  () => props.UUID,
  () => getUser(UUID.value),
)

const isLoggedInUser = computed(() => profile.value.id === user.value.id)
</script>

<style scoped></style>
