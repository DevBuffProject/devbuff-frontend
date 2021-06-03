<template>
  <AtomicCard class="relative">
    <template v-if="slots.user" #bottom>
      <slot name="user" />
    </template>
    <div>
      <!--      <atomic-image-->
      <!--        size="4rem"-->
      <!--        class="mb-2 inline-block"-->
      <!--        :src="'//source.unsplash.com/random?logo&key' + id"-->
      <!--      />-->

      <div v-if="!linked" class="text-primary text-lg block font-medium">
        {{ title }}
      </div>
      <RouterLink
        v-else
        :to="{ name: 'idea-detail', params: { id, _isDialog: true } }"
        custom
        v-slot="{ href, navigate }"
      >
        <a :href="href" @click="navigate" v-focusable class="font-semibold">
          {{ title }}
        </a>
      </RouterLink>
    </div>

    <div class="mt-2 text-sm text-gray-500 leading-5">
      {{ description }}
    </div>

    <AtomicLabel v-if="specialists.length" name="Specialists" class="mt-4">
      <div class="flex flex-wrap">
        <AtomicChip
          v-for="(spec, index) in specialists"
          :key="'spec' + spec.name + index"
          :text="spec.name"
          class="mr-2 mb-2"
        />
      </div>
    </AtomicLabel>

    <AtomicLabel v-if="technologies.length" name="technologies" class="mt-2">
      <div class="flex flex-wrap">
        <AtomicChip
          v-for="(tech, index) in technologies"
          :key="'tech' + tech + index"
          :text="tech"
          class="mr-2 mb-2"
        />
      </div>
    </AtomicLabel>

    <AtomicLabel v-if="languages.length" name="languages" class="mt-2">
      <div class="flex flex-wrap">
        <AtomicChip
          v-for="{ name } in languages"
          :key="name"
          :text="name"
          type="auto"
          class="mr-2 mb-2"
        />
      </div>
    </AtomicLabel>
  </AtomicCard>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'VIdea',
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
    const { slots } = context
    const languages = computed(() =>
      props.specialists
        ? props.specialists.reduce((acc, spec) => {
            spec.languages.forEach((lang) => acc.push(lang))
            return acc
          }, [])
        : [],
    )
    const technologies = computed(() =>
      props.languages
        ? props.languages.reduce(
            (acc, lang) => lang.technologies.map((tech) => tech.name),
            [],
          )
        : [],
    )

    return {
      slots,
      languages,
      technologies,
    }
  },
})
</script>
