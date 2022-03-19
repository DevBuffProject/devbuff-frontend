<template>
  <article class="relative">
    <AtomicCard class="relative">
      <div class="flex items-center mb-3">
        <AtomicAvatar
          class="mr-2"
          :size="20"
          :src="getUserProfileUrl(idea.ownerIdea.id)"
        />
        <div class="mt-px text-xs">
          {{ idea.ownerIdea.firstName }} {{ idea.ownerIdea.lastName }}
          <em class="opacity-30 ml-1">@{{ idea.ownerIdea.userName }}</em>
        </div>
      </div>

      <AppLink
        :to="{ name: 'idea-detail', params: { id: idea.id, _isDialog: true } }"
        custom
        v-slot="{ href, navigate, isLoading }"
      >
        <a
          :href="href"
          @click="navigate"
          v-ripple
          :class="{
            'font-semibold inline-flex items-center text-lg rounded px-2 -mx-2 py-1': true,
            'pointer-events-none opacity-50': isLoading,
          }"
        >
          {{ idea.name }}
          <AtomicLoadingSpinner
            class="ml-4"
            v-if="isLoading"
            v-motion
            :initial="{ scale: 0 }"
            :enter="{ scale: 1 }"
            :leave="{ scale: 0 }"
          />
        </a>
      </AppLink>

      <p class="mt-2 mb-8 text-md text-gray-500 leading-5">
        {{ idea.description }}
      </p>

      <AtomicLabel
        v-if="idea.requirements.length"
        :name="t('detail.specialist')"
        class="mt-4"
      >
        <div class="flex flex-wrap">
          <AtomicChip
            v-for="(spec, index) in idea.requirements"
            :key="'spec' + spec.name + index"
            :text="t(`commons.specialist.${spec.name}`, true)"
            class="mr-2 mb-2"
          />
        </div>
      </AtomicLabel>

      <AtomicLabel
        v-if="technologies.length"
        :name="t('detail.technologies')"
        class="mt-2"
      >
        <div class="flex flex-wrap">
          <AtomicChip
            v-for="(tech, index) in technologies"
            :key="'tech' + tech + index"
            :text="tech"
            class="mr-2 mb-2"
          />
        </div>
      </AtomicLabel>

      <AtomicLabel
        v-if="languages.length"
        :name="t('detail.languages')"
        class="mt-2"
      >
        <div class="flex flex-wrap">
          <AtomicChip
            v-for="(language, index) in languages"
            :key="'lang' + language + index"
            :text="tDefault(`commons.languages.${language}`, language, true)"
            type="auto"
            class="mr-2 mb-2"
          />
        </div>
      </AtomicLabel>
    </AtomicCard>
  </article>
</template>

<script setup>
import { defineProps, toRefs, useSlots } from 'vue'
import { useI18n, useUser } from '../../../composes'

const props = defineProps({
  idea: { type: Object, default: () => ({}) },
})
const { idea } = toRefs(props)

const slots = useSlots()
const { t, tDefault } = useI18n('components.widget.ideas.card')
const { getUserProfileUrl } = useUser()

const languages = props.idea.requirements
  .flatMap((specialist) =>
    specialist.languages.map((language) => language.name),
  )
  .filter((item, index, array) => array.indexOf(item) === index)
const technologies = props.idea.requirements
  .flatMap((specialist) =>
    specialist.languages.flatMap((languages) =>
      languages.technologies.map((technology) => technology.name),
    ),
  )
  .filter((item, index, array) => array.indexOf(item) === index)
</script>
:style="{ color: colors(skill.name).text }"
