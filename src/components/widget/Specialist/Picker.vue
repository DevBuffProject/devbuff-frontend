<template>
  <h5>Ваша команда</h5>

  <input type="hidden" :name="name" :id="name" :value="inputValue" />
  <div class="w-full flex justify-center pt-1 text-xs text-danger mb-2">
    <span class="mt-px">{{ errorMessage }}</span>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div
      :class="[
        'col-span-3 bg-white border border-gray-300 border-opacity-30 dark:border-blueGray-700 dark:bg-blueGray-900 p-4 rounded-xl relative',
        errorMessage && '!border-danger !ring-danger-200 dark:!ring-danger-900',
      ]"
      v-for="(specialist, index) of specializations"
      :key="specialist + index"
    >
      <div class="grid grid-cols-6">
        <div class="col-span-5">
          {{ specialist }}
        </div>
        <component
          v-if="selectedSpecialist.length < maxPerson"
          :is="PlusIcon"
          @click="addSpecialist(specialist)"
          class="col-span-1 specialist-plus"
        />
        <p class="flex items-center pt-1 text-xs text-gray-400 col-span-6">
          Description about specialist Lorem, Description about specialist
          Lorem, Description about specialist Lorem
        </p>
      </div>
    </div>
  </div>

  <hr class="mt-2 mb-2" />

  <div
    class="bg-gray-900 rounded h-6 mb-5"
    role="progressbar"
    :aria-valuenow="maxCountPercent"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      :class="[
        `
        rounded
        h-6
        text-center text-white text-sm
        transition`,
        (selectedSpecialist.length * 100) / maxPerson >= 0
          ? 'bg-primary-400'
          : '',
        (selectedSpecialist.length * 100) / maxPerson >= 40
          ? 'bg-warning-400'
          : '',
        (selectedSpecialist.length * 100) / maxPerson >= 71
          ? 'bg-danger-400'
          : '',
        (selectedSpecialist.length * 100) / maxPerson === 100
          ? 'bg-danger-700'
          : '',
      ]"
      :style="`width: ${
        (selectedSpecialist.length * 100) / maxPerson
      }%; transition: width 2s;`"
    >
      <span v-if="selectedSpecialist.length > 0">
        {{ selectedSpecialist.length }} / {{ maxPerson }}
      </span>
    </div>
  </div>

  <transition-group name="zoom" tag="div" class="masonory">
    <ul
      class="
        w-40%
        break-avoid
        bg-white
        border border-gray-300 border-opacity-30
        dark:border-blueGray-700
        dark:bg-blueGray-900
        rounded-xl
        relative
        mb-4
      "
      v-for="(specialist, index) in selectedSpecialist"
      :key="specialist + index + '_selected'"
    >
      <li class="flex flex-col flex-wrap rounded">
        <div
          class="
            p-2
            border-b-2 border-gray-300 border-opacity-30
            dark:border-blueGray-700
            mb-2
            flex
            justify-between
          "
        >
          <p>{{ specialist.name }}</p>
          <component
            class="specialist-plus"
            @click="selectedSpecialist.splice(index, 1)"
            :is="CloseIcon"
          />
        </div>
        <div
          class=""
          v-for="(language, indexLanguage) of specialist.languages"
          :key="specialist + index + '_selected' + indexLanguage + language"
        >
          <div class="ml-3">
            <a
              class="
                flex flex-wrap
                items-center
                transition
                duration-500
                ease-in-out
                dark:hover:bg-primary-800
                hover:bg-primary-400
                p-1
                cursor-pointer
                rounded
              "
              @click="language.selected = !language.selected"
            >
              <span>
                <component :is="language.selected ? MinusIcon : PlusIcon" />
              </span>
              <span>{{ language.name }}</span>
            </a>
          </div>
          <transition name="tech_activate">
            <ul
              v-if="language.selected && language.frameworks.length > 0"
              class="mt-0"
            >
              <li
                v-for="(technology, indexTechnology) of language.frameworks"
                :key="
                  specialist +
                  index +
                  '_selected' +
                  indexLanguage +
                  language +
                  technology +
                  indexTechnology
                "
                class="mb-1 ml-10"
              >
                <AtomicChip
                  :text="technology.name"
                  :type="technology.selected ? 'auto' : ''"
                  @click="technology.selected = !technology.selected"
                ></AtomicChip>
              </li>
            </ul>
          </transition>
        </div>
      </li>
    </ul>
  </transition-group>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useSkills } from '../../../composes/core'

import { PlusIcon, CloseIcon, MinusIcon } from '@iconicicons/vue3'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'SpecialistPicker',
  props: {
    name: {
      type: String,
      default: 'specialists',
    },
  },
  setup(props) {
    const { skills, specializations, getSkills } = useSkills()
    getSkills()
    const maxPerson = 10
    const maxCountPercent = ref(0)

    const addSpecialist = (specialistName) => {
      if (selectedSpecialist.value.length === maxPerson) {
        return
      }
      const specialistObject = {}

      specialistObject.name = specialistName
      specialistObject.count = 1
      specialistObject.languages = []

      for (const language of skills.value) {
        const foundedSpecialization = language.specializations.find(
          (specialist) => {
            return specialist.name === specialistName
          },
        )

        if (foundedSpecialization === undefined) {
          continue
        }
        const languageObject = {}

        languageObject.name = language.name
        languageObject.selected = false
        languageObject.frameworks = []

        for (const technology of foundedSpecialization.frameworks) {
          languageObject.frameworks.push({
            name: technology.name,
            selected: false,
          })
        }

        specialistObject.languages.push(languageObject)
      }

      selectedSpecialist.value.push(specialistObject)
    }

    const selectedSpecialist = ref([])

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: selectedSpecialist,
    })

    watch(
      () => selectedSpecialist,
      (state) => {
        const result = []

        for (const specialist of state.value) {
          const specialistValue = {
            name: specialist.name,
            count: specialist.count,
            languages: [],
          }

          for (const language of specialist.languages) {
            if (!language.selected) {
              continue
            }

            const languageValue = {
              name: language.name,
              frameworks: [],
            }
            for (const technology of language.frameworks) {
              if (technology.selected) {
                languageValue.frameworks.push({
                  name: technology.name,
                })
              }
            }
            specialistValue.languages.push(languageValue)
          }
          result.push(specialistValue)
        }

        inputValue.value = result
      },
      { deep: true },
    )
    return {
      inputValue,
      errorMessage,
      maxPerson,
      specializations,
      PlusIcon,
      MinusIcon,
      CloseIcon,
      addSpecialist,
      selectedSpecialist,
      maxCountPercent,
    }
  },
})
</script>

<style scoped>
ul {
  padding: 0;
}

.break-avoid {
  break-inside: avoid;
}

.masonory {
  column-count: 4;
}

.specialist-plus {
  transition: transform 0.2s ease-out;
}

.zoom-enter-active {
  animation: zoomIn 0.5s;
}

.zoom-leave-active {
  animation: zoomIn 0.5s reverse;
}

@-webkit-keyframes zoomIn {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

.specialist-plus:hover {
  transform: rotate(180deg);
}
</style>