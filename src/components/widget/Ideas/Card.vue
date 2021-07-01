<template>
  <div class="relative">
    <AtomicCard class="relative">
      <div v-if="!linked" class="text-primary text-lg block font-medium">
        {{ title }}
      </div>
      <RouterLink
        v-else
        :to="{ name: 'idea-detail', params: { id, _isDialog: true } }"
        custom
        v-slot="{ href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          v-focusable
          class="font-semibold inline-block"
        >
          {{ title }}
        </a>
      </RouterLink>

      <div class="mt-2 text-sm text-gray-500 leading-5">
        {{ description }}
      </div>

      <AtomicLabel
        v-if="specialists.length"
        :name="t('detail.specialist')"
        class="mt-4"
      >
        <div class="flex flex-wrap">
          <AtomicChip
            v-for="(spec, index) in specialists"
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

    <div class="ml-4">
      <div class="-mt-1">
        <AtomicTriangle direction="bottom" />
      </div>
      <slot name="user" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from '../../../composes/utils'

export default defineComponent({
  name: 'WidgetIdeasCard',
  props: {
    date: {
      type: String,
      default: '',
    },
    linked: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specialists: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const { t, tDefault } = useI18n('components.widget.ideas.card')
    const { slots } = context

    const languages = props.specialists
      .flatMap((specialist) => {
        return specialist.languages.map((language) => {
          return language.name
        })
      })
      .filter((item, index, array) => {
        return array.indexOf(item) === index
      })
    const technologies = props.specialists
      .flatMap((specialist) => {
        return specialist.languages.flatMap((languages) => {
          return languages.technologies.map((technology) => {
            return technology.name
          })
        })
      })
      .filter((item, index, array) => {
        return array.indexOf(item) === index
      })

    return {
      t,
      tDefault,
      slots,
      languages,
      technologies,
    }
  },
})
</script>
