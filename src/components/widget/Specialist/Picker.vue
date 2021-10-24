<template>
  <div>
    <h5>{{ t('title') }}</h5>
    <AtomicTextError
      :key="errorMessage"
      v-show="errorMessage"
      :text="errorMessage"
    />
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="specialist of specializations"
        :key="specialist"
        class="border rounded-xl w-full p-4 transition-all"
        :class="
          isSpecialistSelected(specialist)
            ? 'border-primary-500 ring ring-primary-200 bg-light-900 dark:(ring-primary-900 bg-dark-700)'
            : 'border border-light-900 dark:border-dark-300'
        "
      >
        <div>{{ t(`commons.specialist.${specialist}`, true) }}</div>
        <button
          class="cursor-pointer"
          :class="
            isSpecialistSelected(specialist)
              ? 'text-danger-500'
              : 'text-primary-500'
          "
          @click="toggleSpecialist(specialist)"
        >
          {{ isSpecialistSelected(specialist) ? 'удалить' : 'добавить' }}
        </button>

        <div class="text-xs opacity-50">
          {{ t(`commons.specialistDescription.${specialist}`, true) }}
        </div>

        <transition name="fade">
          <div v-if="isSpecialistSelected(specialist)" class="mt-6">
            <div v-for="lang of languagesForSpecialist(specialist)" :key="lang">
              <div class="mb-1">
                <AtomicFormCheckbox
                  :label="tDefault('commons.languages.' + lang, lang, true)"
                  :model-value="isLanguageSelected(specialist, lang)"
                  @update:model-value="toggleLanguage(specialist, lang)"
                />
                <div
                  v-if="isLanguageSelected(specialist, lang)"
                  class="mt-1 ml-2"
                >
                  <div
                    v-for="technology of technologiesAtSpecialistAndLanguage(
                      specialist,
                      lang,
                    )"
                    :key="technology"
                  >
                    <AtomicFormCheckbox
                      :label="technology"
                      :model-value="
                        isTechnologySelected(specialist, lang, technology)
                      "
                      @update:model-value="
                        toggleTechnology(specialist, lang, technology)
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch } from 'vue'
import { useSkills, useI18n } from '../../../composes'
import { get, useVModel } from '@vueuse/core'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'SpecialistPicker',
  emits: ['update:modelValue'],
  props: {
    name: { type: String, default: 'skills' },
    modelValue: { type: Array, default: () => [] },
  },

  async setup(props, { emit }) {
    const { t, tDefault } = useI18n('components.widget.specialist.picker')
    const { skills, specializations, getSkills } = useSkills()
    const vModel = useVModel(props, 'modelValue', emit)
    const { errors, errorMessage, setValue } = useField(props.name)

    watch(vModel, (skills) => setValue(skills))

    const getSpecialistSelected = (sp) =>
      vModel.value.find((s) => s.name === sp)

    const isSpecialistSelected = (sp) => !!getSpecialistSelected(sp)

    const toggleSpecialist = (sp) => {
      vModel.value = isSpecialistSelected(sp)
        ? get(vModel)?.filter((s) => s.name !== sp)
        : [...get(vModel), { name: sp, count: 1, languages: [] }]
    }

    const languagesForSpecialist = (specialist) =>
      skills.value.reduce(
        (acc, skill) =>
          skill.specializations.find((s) => s.name === specialist)
            ? acc.push(skill.name) && acc
            : acc,
        [],
      )

    const technologiesAtSpecialistAndLanguage = (specialist, language) => {
      const languageValue = skills.value.find(
        (languageValue) => languageValue.name === language,
      )
      if (!languageValue) return []
      const specialistValue = languageValue.specializations.find(
        (specialistValue) => specialistValue.name === specialist,
      )
      return specialistValue === undefined
        ? []
        : specialistValue.frameworks.map(
            (frameworkValue) => frameworkValue.name,
          )
    }
    const getLanguageSelected = (sp, lang) =>
      getSpecialistSelected(sp).languages.find((l) => l.name === lang)

    const isLanguageSelected = (sp, lang) => !!getLanguageSelected(sp, lang)

    const isTechnologySelected = (specialist, language, technology) =>
      getLanguageSelected(specialist, language).frameworks.find(
        (frameworkValue) => frameworkValue.name === technology,
      ) !== undefined

    const toggleLanguage = (sp, lang) => {
      const specialist = getSpecialistSelected(sp)
      const languageIndex = specialist.languages.findIndex(
        (l) => l.name === lang,
      )
      if (languageIndex > -1) specialist.languages.splice(languageIndex, 1)
      else specialist.languages.push({ name: lang, frameworks: [] })
    }

    const toggleTechnology = (specialist, language, technology) => {
      const data = getLanguageSelected(specialist, language).frameworks
      const frameworkIndex = data.findIndex(
        (frameworkValue) => frameworkValue.name === technology,
      )

      if (frameworkIndex > -1) data.splice(frameworkIndex, 1)
      else data.push({ name: technology })
    }

    await getSkills()

    return {
      t,
      tDefault,
      isSpecialistSelected,
      languagesForSpecialist,
      isTechnologySelected,
      toggleTechnology,
      technologiesAtSpecialistAndLanguage,
      isLanguageSelected,
      toggleSpecialist,
      toggleLanguage,
      getSpecialistSelected,
      specializations,
      skills,
      errors,
      errorMessage,
    }
  },
})
</script>
