<template>
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
          Description about specialist
        </p>
      </div>
    </div>
  </div>

  <hr class="mt-2 mb-2" />

  <transition-group
    name="bounce"
    tag="div"
    class="grid grid-cols-12 gap-4 mt-2"
  >
    <div
      v-for="(specialist, index) in selectedSpecialist"
      :key="specialist + index + '_selected'"
      class="
        flex
        col-span-3
        bg-white
        border border-gray-300 border-opacity-30
        dark:border-blueGray-700
        dark:bg-blueGray-900
        p-4
        rounded-xl
        relative
      "
    >
      <div class="grid grid-cols-6">
        <div class="col-span-5">Специалист: {{ specialist.name }}</div>
        <div class="col-span-1">
          <component
            :is="CloseIcon"
            @click="selectedSpecialist.splice(index, 1)"
          />
        </div>

        <div class="col-span-6 flex-grow">
          <div
            v-for="(language, indexLanguage) of specialist.languages"
            :key="language + index + specialist.name + indexLanguage"
            class="flex cursor-pointer hover:bg-primary-100 rounded w-full"
            @click="language.selected = !language.selected"
          >
            <div>
              <div class="w-8 h-10 text-center py-1">
                <p class="text-3xl p-0 text-green-dark">&bull;</p>
              </div>
              <div class="w-4/5 h-10 py-3 px-1">
                <p class="hover:text-blue-dark">{{ language.name }}</p>
              </div>
            </div>
            <div
              class="
                flex
                cursor-pointer
                ml-10
                my-1
                hover:bg-primary-100
                rounded
              "
              v-if="language.selected"
            >
              <li
                v-for="(technology, indexTechnology) of language.frameworks"
                :key="
                  language +
                  index +
                  specialist.name +
                  indexLanguage +
                  indexTechnology
                "
              >
                {{ technology.name }}
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useSkills } from '../../../composes/core'

import { PlusIcon, CloseIcon } from '@iconicicons/vue3'

export default defineComponent({
  name: 'SpecialistPicker',

  async setup() {
    const { skills, specializations, getSkills } = useSkills()
    getSkills()

    const addSpecialist = (specialistName) => {
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
    return {
      specializations,
      PlusIcon,
      CloseIcon,
      addSpecialist,
      selectedSpecialist,
    }
  },
})
</script>

<style scoped>
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

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
