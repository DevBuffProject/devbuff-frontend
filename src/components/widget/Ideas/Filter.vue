<template>
  <div>
    <AtomicSwitcher
      class="mb-4"
      v-model:value="state.sort"
      :values="[
        {
          title: t('commons.date', true),
          value: 'date',
        },
        {
          title: t('commons.lastUpdate', true),
          value: 'lastUpdate',
        },
      ]"
    />
    <div class="relative">
      <a
        v-if="somethingSelected"
        :class="[
          'absolute right-4 pt-px pl-4 cursor-pointer',
          'text-xs text-primary-500 font-medium hover:underline',
          'border-l border-gray-200 dark:border-blueGray-600 z-50',
        ]"
        @click="reset"
      >
        clear
      </a>

      <div class="text-black dark:text-blueGray-50 flex items-center mb-4">
        <UserIcon class="w-[20px] h-[20px]" />
        <span class="ml-2">{{ t(`param.specialists`) }}</span>
      </div>

      <div v-if="!specialistsOptions.length">
        <AtomicSkeleton class="mb-2 w-2/4" />
        <AtomicSkeleton class="mb-2 w-1/4" />
        <AtomicSkeleton class="mb-2 w-2/3" />
      </div>

      <div
        v-for="(param, paramIndex) in specialistsOptions"
        :key="param.value"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :delay="10 * paramIndex"
        class="mb-2 font-normal text-xs"
      >
        <AtomicCheckbox
          v-model="state.specialists"
          :value="param.value"
          v-slot="{ isChecked }"
          v-focusable
        >
          <div
            class="flex items-center -m-1 p-1 rounded cursor-pointer"
            :class="isChecked && 'bg-primary-500 text-white'"
          >
            <PlusIcon class="mr-2 opacity-50 h-[15px]" />
            <div class="ml-1">
              {{ t(`commons.specialist.${param.name}`, true) }}
            </div>
          </div>
        </AtomicCheckbox>
      </div>

      <div
        v-if="languagesOptions.length"
        class="text-black dark:text-blueGray-50 flex items-center mb-4 mt-6"
      >
        <CodeIcon class="w-[20px] h-[20px]" />
        <span class="ml-2">{{ t(`param.languages`) }}</span>
      </div>

      <div
        v-for="(param, paramIndex) in languagesOptions"
        :key="param.value"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :delay="10 * paramIndex"
        class="mb-2 font-normal text-xs"
      >
        <AtomicCheckbox
          v-model="state.languages"
          :value="param.value"
          v-slot="{ isChecked }"
          v-focusable
        >
          <div
            class="flex items-center -m-1 p-1 rounded cursor-pointer"
            :class="isChecked && 'bg-primary-500 text-white'"
          >
            <PlusIcon class="mr-2 opacity-50 h-[15px]" />
            <div class="ml-1">
              {{
                tDefault(`commons.languages.${param.name}`, param.name, true)
              }}
            </div>
          </div>
        </AtomicCheckbox>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch } from 'vue'
import { not, useVModel, whenever } from '@vueuse/core'
import { useSkills } from '../../../composes/core'
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
    const specialistsOptions = computed(() =>
      specializations.value.map((specialist) => ({
        value: specialist,
        name: specialist,
      })),
    )
    const languagesOptions = computed(() =>
      languages.value
        .filter((languageSearched) =>
          skills.value.find(
            (language) =>
              language.name === languageSearched &&
              language.specializations.find((specialist) =>
                state.value.specialists.includes(specialist.name),
              ),
          ),
        )
        .map((language) => ({
          value: language,
          name: language,
        })),
    )

    const reset = () => (state.value.specialists = [])

    whenever(not(specialistSelected), () => (state.value.languages = []))
    getSkills()

    return {
      t,
      reset,
      tDefault,
      state,
      languageSelected,
      specialistSelected,
      somethingSelected,
      specialistsOptions,
      languagesOptions,
    }
  },
})
</script>
