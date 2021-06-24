<template>
  <div
    class="bg-gray-900 rounded h-6 mt-5"
    role="progressbar"
    :aria-valuenow="maxCountPercent"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="
        bg-primary-800
        rounded
        h-6
        text-center text-white text-sm
        transition
      "
      :style="`width: ${maxCountPercent}%; transition: width 2s;`"
    >
      {{ maxCountPercent }} %
    </div>
  </div>

  <div class="grid grid-cols-12 gap-2">
    <div
      class="
        col-span-3
        bg-white
        border border-gray-300 border-opacity-30
        dark:border-blueGray-700
        dark:bg-blueGray-900
        p-4
        rounded-xl
        relative
      "
      v-for="(specialist, index) of specializations"
      :key="specialist + index"
    >
      <div class="grid grid-cols-6">
        <div class="col-span-5">
          {{ specialist }}
        </div>
        <component
          :is="PlusIcon"
          @click="addSpecialist(specialist)"
          class="col-span-1 specialist-plus"
        />
        <p class="flex items-center pt-1 text-xs text-gray-400 col-span-6">
          Description about specialist Lorem
        </p>
      </div>
    </div>
  </div>

  <hr class="mt-2 mb-2" />

  <transition-group
    name="bounce"
    tag="div"
    class="flex flex-row items-end flex-wrap"
  >
    <ul
      class="w-1/2 bg-white"
      v-for="(specialist, index) in selectedSpecialist"
      :key="specialist + index + '_selected'"
    >
      <li class="pl-2 pr-2 flex flex-col flex-wrap rounded">
        <div>
          <p>Специалист: {{ specialist.name }}</p>
        </div>
        <div
          class="mt-4"
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
                hover:bg-primary-100
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
            <ul v-if="language.selected" class="ul__technology">
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
                class="p-2 ml-10"
              >
                <div
                  @click="technology.selected = !technology.selected"
                  class="flex justify-around"
                >
                  <a
                    class="
                      p-1
                      bg-[rgb(192,192,192)]
                      text-xs
                      rounded
                      cursor-pointer
                    "
                    @click=""
                  >
                    {{ technology.name }}
                  </a>
                </div>
              </li>
            </ul>
          </transition>
        </div>
      </li>
    </ul>
  </transition-group>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useSkills } from '../../../composes/core'

import { PlusIcon, CloseIcon, MinusIcon } from '@iconicicons/vue3'

export default defineComponent({
  name: 'SpecialistPicker',

  async setup() {
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
      maxCountPercent.value = selectedSpecialist.value.length * 10
    }

    const selectedSpecialist = ref([])
    return {
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
  margin: 0;
}

@keyframes activation {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 100%;
    visibility: visible;
  }
}

.specialist-plus {
  transition: transform 0.2s ease-out;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.specialist-plus:hover {
  transform: rotate(180deg);
}
</style>
