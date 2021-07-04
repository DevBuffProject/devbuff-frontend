<template>
  <div class="relative">
    <a
      v-if="somethingSelected"
      :class="[
        'absolute right-4 pt-px pl-4 cursor-pointer',
        'text-xs text-primary font-medium hover:underline',
        'border-l border-gray-200 dark:border-blueGray-600',
      ]"
      style="z-index: 99"
      @click="reset"
    >
      clear
    </a>
    <ul v-if="options.length" class="rounded-lg">
      <li
        v-for="(option, index) in options"
        :key="option.name"
        class="mb-8"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :delay="50 * index * 2"
      >
        <div class="text-black dark:text-blueGray-50 flex items-center mb-4">
          <component :is="option.icon" class="w-[20px] h-[20px]" />
          <span class="ml-2">{{ t(`param.${option.name}`) }}</span>
        </div>
        <ul v-if="option.params" class="font-normal text-xs">
          <li
            v-for="(param, paramIndex) in option.params"
            :key="param.value"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1 }"
            :delay="10 * paramIndex"
            class="mb-2"
          >
            <AtomicCheckbox
              v-model="state[option.value]"
              :value="param.value"
              v-slot="{ isChecked }"
              v-focusable
            >
              <div
                :class="[
                  'flex items-center -m-1 p-1 rounded cursor-pointer',
                  isChecked && 'bg-primary text-white',
                ]"
              >
                <PlusIcon class="mr-2 opacity-50 h-[15px]" />
                <div class="ml-1">
                  <div v-if="option.name === 'specialists'">
                    {{ t(`commons.specialist.${param.name}`, true) }}
                  </div>
                  <div v-if="option.name === 'languages'">
                    {{
                      tDefault(
                        `commons.languages.${param.name}`,
                        param.name,
                        true,
                      )
                    }}
                  </div>
                </div>
              </div>
            </AtomicCheckbox>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, watch, triggerRef } from 'vue'
import { useSkills } from '../../../composes/core'
import { useVModel } from '@vueuse/core'
import { CodeIcon, UserIcon } from '@iconicicons/vue3'
import { useI18n } from '../../../composes/utils'

const initialFilter = {
  specialists: [],
  languages: [],
}

export default defineComponent({
  name: 'WidgetIdeasFilter',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      default: () => initialFilter,
    },
  },
  setup(props, { emit }) {
    const { t, tDefault } = useI18n('components.widget.ideas.filter')
    const { specializations, skills, languages, getSkills } = useSkills()
    const state = useVModel(props, 'modelValue', emit)

    const specialistSelected = computed(
      () => state.value.specialists.length > 0,
    )
    const languageSelected = computed(() => state.value.languages.length > 0)
    const somethingSelected = computed(
      () => languageSelected.value || specialistSelected.value,
    )
    const options = computed(() =>
      [
        {
          name: 'specialists',
          value: 'specialists',
          icon: UserIcon,
          params: specializations.value.map((specialist) => ({
            value: specialist,
            name: specialist,
          })),
        },
        specialistSelected.value && {
          name: 'languages',
          value: 'languages',
          icon: CodeIcon,
          params: languages.value
            .filter((languageSearched) => {
              let data = skills.value.find((language) => {
                return (
                  language.name === languageSearched &&
                  language.specializations.find((specialist) => {
                    return state.value.specialists.includes(specialist.name)
                  })
                )
              })

              return data !== undefined
            })
            .map((language) => ({
              value: language,
              name: language,
            })),
        },
      ].filter((s) => !!s),
    )

    const reset = () => (state.value.specialists = [])

    watch(
      specialistSelected,
      () => !specialistSelected.value && (state.value.languages = []),
    )
    getSkills()

    return {
      t,
      tDefault,
      state,
      options,
      languageSelected,
      specialistSelected,
      somethingSelected,
      reset,
    }
  },
})
</script>
