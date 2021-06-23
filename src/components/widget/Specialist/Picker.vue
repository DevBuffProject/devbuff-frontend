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

  <div class="grid grid-cols-12">
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

  <transition-group name="bounce" tag="div" class="flex flex-wrap">
    <ul class="picker__list">
      <li
        v-for="(specialist, index) in selectedSpecialist"
        :key="specialist + index + '_selected'"
        class="picker__item"
      >
        <div class="picker__spec">
          <p>Специалист: {{ specialist.name }}</p>
        </div>
        <div
          class="picker__name"
          v-for="(language, indexLanguage) of specialist.languages"
          :key="specialist + index + '_selected' + indexLanguage + language"
        >
          <div class="ml-3">
            <a
              class="
                flex flex-wrap
                items-center
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
          <ul class="ul__technology">
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
                <!--                <span v-if="!technology.selected">&times;</span>-->
                <AtomicChip
                  :text="technology.name"
                  :type="technology.selected ? 'auto' : 'none'"
                  class="mr-2 mb-2 transition"
                />
              </div>
            </li>
          </ul>
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
* {
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;
}

.picker__list {
  display: flex;
  width: 400px;
  flex-shrink: 0;
  flex-grow: 0;
  height: 100%;
}

.picker__item {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;

  background-color: white;
  border-radius: 12px;
}

.picker__spec {
  margin-top: 5px;
}

.picker__name {
  margin-top: 15px;
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
