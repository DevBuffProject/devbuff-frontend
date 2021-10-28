<template>
  <div>
    <div
      class="overflow-hidden transition-all"
      :style="{
        height: !isExpand ? '150px' : `${containerHeight}px`,
      }"
    >
      <div ref="skillsContainer" class="overflow-hidden -mx-4" v-masonry>
        <div
          v-for="(skill, index) of skills"
          :key="index"
          class="p-4 w-1/4 overflow-hidden"
          v-motion
          :initial="{ opacity: 0, scale: 0 }"
          :enter="{ opacity: 1, scale: 1 }"
          :delay="50 * index"
          :duration="1000"
        >
          <div :style="cardColor(skill.name)" class="p-4 rounded-2xl" v-ripple>
            <h4 :style="headerColor(skill.name)" class="!m-0">
              {{ tD(`commons.languages.${skill.name}`, skill.name, true) }}
            </h4>

            <div
              v-for="(spec, specIndex) of skill.specializations"
              :key="specIndex + spec.name"
            >
              <h5 class="!mb-1 !mt-4 !text-sm">
                {{ tD(`commons.specialist.${spec.name}`, spec.name, true) }}
              </h5>

              <div
                v-for="(framework, frameworkIndex) of spec.frameworks"
                :key="frameworkIndex + framework.name"
                class="
                  border-l-2 border-black
                  dark:border-white dark:border-opacity-20
                  border-opacity-20
                  pl-2
                  py-1
                  mr-4
                  pb-px
                  text-xs
                "
              >
                {{
                  tD(
                    `commons.framework.${framework.name}`,
                    framework.name,
                    true,
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="
        transition-all
        relative
        leading-10
        block
        w-full
        rounded-xl
        font-regular
        tracking-widest
        flex
        items-center
        justify-center
      "
      :class="{
        '-mt-10 bg-gradient-to-b from-[transparent] to-white dark:to-dark-900':
          !isExpand,
        'bg-light-700 dark:bg-dark-700': isExpand,
      }"
      @click="toggle"
      v-ripple
    >
      <ChevronDownIcon
        class="transition-transform"
        :class="{ 'transform rotate-180': isExpand }"
      />
      Развернуть
    </button>
  </div>
</template>

<script setup>
import { useColor, useI18n } from '../../composes'
import { defineProps, ref } from 'vue'
import { templateRef, useElementSize, useToggle } from '@vueuse/core'

const props = defineProps({
  skills: { type: Array, default: () => [] },
})

const colors = (text) => {
  const { color } = useColor(text)
  return { bg: color.fade(0.8), text: color.darken(0.1) }
}
const { t, tDefault: tD } = useI18n('components.widget.ideas.card')
const cardColor = (skill) => ({
  'background-color': colors(tD(`commons.languages.${skill}`, skill, true)).bg,
})
const headerColor = (skill) => ({
  color: colors(tD(`commons.languages.${skill}`, skill, true)).text,
})
const isExpand = ref(false)
const toggle = useToggle(isExpand)
const containerHeight = useElementSize(templateRef('skillsContainer')).height
</script>
