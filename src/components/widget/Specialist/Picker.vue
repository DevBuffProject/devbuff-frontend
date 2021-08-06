<template>
  <div>
    <h5>{{ t('title') }}</h5>
    <div class="flex">
      <!--      <pre>{{ model }}</pre>-->
      <!--      <pre>{{ skills }}</pre>-->
      <!--      <pre>-->
      <!--        {{ languagesForSpecialist('back-end') }}-->
      <!--      </pre>-->
    </div>
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
          role="button"
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
                  :label="lang"
                  :model-value="isLanguageSelected(specialist, lang)"
                  @update:model-value="toggleLanguage(specialist, lang)"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
// import { whenever } from ''
import { useSkills } from '../../../composes/core'
import { useI18n } from '../../../composes/utils'
import { set, whenever, get } from '@vueuse/core'

export default defineComponent({
  name: 'SpecialistPicker',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const { t, tDefault } = useI18n('components.widget.specialist.picker')
    const { skills, specializations, getSkills } = useSkills()
    const maxPersonPerPosition = 10
    const model = ref({})

    watch(
      () => props.modelValue,
      () => nextTick(() => set(model, props.modelValue)),
      { immediate: true, deep: true },
    )

    const getSpecialistSelected = (sp) => model.value.find((s) => s.name === sp)
    const isSpecialistSelected = (sp) => !!getSpecialistSelected(sp)

    const toggleSpecialist = (sp) => {
      model.value = isSpecialistSelected(sp)
        ? get(model)?.filter((s) => s.name !== sp)
        : [...get(model), { name: sp, count: 1, languages: [] }]
      emit('update:modelValue', model.value)
    }

    const languagesForSpecialist = (specialist) =>
      skills.value.reduce(
        (acc, skill) =>
          skill.specializations.find((s) => s.name === specialist)
            ? acc.push(skill.name) && acc
            : acc,
        [],
      )
    const getLanguageSelected = (sp, lang) =>
      getSpecialistSelected(sp).languages.find((l) => l.name === lang)
    const isLanguageSelected = (sp, lang) => !!getLanguageSelected(sp, lang)
    const toggleLanguage = (sp, lang) => {
      const specialist = getSpecialistSelected(sp)
      const languageIndex = specialist.languages.findIndex(
        (l) => l.name === lang,
      )
      if (languageIndex > -1) specialist.languages.splice(languageIndex, 1)
      else specialist.languages.push({ name: lang, frameworks: [] })
      emit('update:modelValue', model.value)
    }

    getSkills()

    return {
      t,
      tDefault,
      isSpecialistSelected,
      languagesForSpecialist,
      isLanguageSelected,
      toggleSpecialist,
      toggleLanguage,
      getSpecialistSelected,
      specializations,
      skills,
      model,
    }
  },
})
</script>
