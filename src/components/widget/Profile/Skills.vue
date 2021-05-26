<template>
  <div class="">
    <div class="">
      <swiper
        ref="swiperComponent"
        :options="{
          autoHeight: true,
          calculateHeight: true,
          lazy: true,
          simulateTouch: false,
        }"
        :auto-update="true"
        style="height: auto; margin-left: 0"
      >
        <swiper-slide>
          <atomic-list class="divide-y divide-gray-200">
            <atomic-list-item
              v-for="skill of skills"
              :key="skill.name"
              :class="['flex justify-between items-center group cursor-pointer']"
            >
              <label class="flex items-center w-full" @click.stop>
                <input
                  :id="'language' + skill.name"
                  v-model="skill.checked"
                  type="checkbox"
                  class="mr-2"
                  @change="onChangeSkill(skill)"
                />
                <div>{{ t(`languages.${skill.name}`, skill.name) }}</div>
              </label>
              <div
                v-if="skill.specializations.length"
                :class="[
                  'px-4 py-1 transition-colors rounded',
                  'group-hover:bg-primary group-hover:bg-opacity-10 active:text-primary',
                ]"
                @click="nextSlide(skill, skill.specializations)"
              >
                <svg-icon name="outline/cheveron-right" />
              </div>
            </atomic-list-item>
          </atomic-list>
        </swiper-slide>

        <swiper-slide>
          <atomic-list class="divide-y divide-gray-200">
            <div
              :class="[
                'px-4 py-1 transition-colors rounded',
                'group-hover:bg-primary group-hover:bg-opacity-10 active:text-primary',
              ]"
              @click="prevSlide()"
            >
              <svg-icon name="outline/cheveron-left" />
            </div>
            <atomic-list-item
              v-for="specialist of specialists"
              :key="specialist.name"
              :class="['flex justify-between items-center group cursor-pointer']"
            >
              <label class="flex items-center w-full" @click.stop>
                <input
                  :id="'specialist' + specialist.name + Math.random() * 1000"
                  v-model="specialist.checked"
                  type="checkbox"
                  class="mr-2"
                  @change="onChangeSkill(specialist)"
                />
                <div>
                  {{ t(`specializations.${specialist.name}.title`, specialist.name) }}
                </div>
              </label>
              <div
                v-if="specialist.frameworks.length"
                :class="[
                  'px-4 py-1 transition-colors rounded',
                  'group-hover:bg-primary group-hover:bg-opacity-10 active:text-primary',
                ]"
                @click="nextSlide(specialist, specialist.frameworks)"
              >
                <svg-icon name="outline/cheveron-right" />
              </div>
            </atomic-list-item>
          </atomic-list>
        </swiper-slide>
        <swiper-slide>
          <atomic-list class="divide-y divide-gray-200">
            <div
              :class="[
                'px-4 py-1 transition-colors rounded',
                'group-hover:bg-primary group-hover:bg-opacity-10 active:text-primary',
              ]"
              @click="prevSlide()"
            >
              <svg-icon name="outline/cheveron-left" />
            </div>
            <atomic-list-item
              v-for="framework of frameworks"
              :key="framework.name"
              :class="['flex justify-between items-center group cursor-pointer']"
            >
              <label class="flex items-center w-full" @click.stop>
                <input
                  :id="'framework' + framework.name"
                  v-model="framework.checked"
                  type="checkbox"
                  class="mr-2"
                  @change="onChangeSkill(framework)"
                />
                <div>{{ framework.name }}</div>
              </label>
            </atomic-list-item>
          </atomic-list>
        </swiper-slide>
      </swiper>
      <atomic-button @click="save"> Save </atomic-button>
    </div>
  </div>
</template>

<script>
import { useStore, computed, defineComponent, ref, reactive } from '@nuxtjs/composition-api'
import { useUser } from '@/composes'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/swiper.scss'

export default defineComponent({
  name: 'WidgetProfileSkills',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore()
    const { user } = useUser()
    const swiperComponent = ref(null)
    const swiper = computed(() => swiperComponent.value?.$swiper)
    const allSkills = store.getters['skills/skills']

    const userSkill = user.value.skills

    for (const language of allSkills) {
      const indexUserLanguage = findName(userSkill, language.name)

      if (indexUserLanguage === -1) {
        continue
      }
      language.checked = true

      const userSpecialization = userSkill[indexUserLanguage].specializations

      for (const specialization of language.specializations) {
        const indexUserSpecialization = findName(userSpecialization, specialization.name)
        if (indexUserSpecialization === -1) {
          continue
        }
        specialization.checked = true

        const userTechnologies = userSpecialization[indexUserSpecialization].frameworks

        for (const technology of specialization.frameworks) {
          const indexUserTechnology = findName(userTechnologies, technology.name)
          if (indexUserTechnology === -1) {
            continue
          }
          technology.checked = true
        }
      }
    }

    function findName(array, value) {
      return array.findIndex((data) => {
        return data.name === value
      })
    }

    const specialists = ref([])

    const frameworks = ref([])
    const context = []

    function nextSlide(rootData, currentData) {
      context.push(rootData)
      if (specialists.value.length === 0) {
        // Current language slide
        specialists.value = currentData
        swiper.value.slideNext()
      } else if (frameworks.value.length === 0) {
        // Current specialist slide
        frameworks.value = currentData
        swiper.value.slideNext()
      }
    }

    function prevSlide() {
      if (frameworks.value.length !== 0) {
        frameworks.value = []
        swiper.value.slidePrev()
      } else if (specialists.value.length !== 0) {
        specialists.value = []
        swiper.value.slidePrev()
      }
      context.pop()
    }

    function onChangeSkill(target) {
      if (target.checked) {
        for (const contextItem of context) {
          contextItem.checked = true
        }
      } else if (!target.checked) {
        unCheckTargets(target)
      }
    }

    function unCheckTargets(target) {
      if (Array.isArray(target)) {
        for (const value of target) {
          unCheckTargets(value)
        }
      } else {
        target.checked = false
        if (target.specializations !== undefined) {
          unCheckTargets(target.specializations)
        } else if (target.frameworks !== undefined) {
          unCheckTargets(target.frameworks)
        }
      }
    }

    const skills = reactive(JSON.parse(JSON.stringify(allSkills)))

    function save() {
      prevSlide()
      prevSlide()
      const skillsData = []

      for (const language of skills) {
        if (!language.checked) {
          continue
        }
        const languageObj = {
          name: language.name,
          levelKnowledge: 'newbie',
          specializations: [],
        }
        skillsData.push(languageObj)
        for (const specialization of language.specializations) {
          if (!specialization.checked) {
            continue
          }
          const specializationObj = {
            name: specialization.name,
            frameworks: [],
          }

          languageObj.specializations.push(specializationObj)
          for (const technology of specialization.frameworks) {
            if (!technology.checked) {
              continue
            }
            specializationObj.frameworks.push({
              name: technology.name,
              levelKnowledge: 'newbie',
            })
          }
        }
      }
      store.dispatch('skills/saveUserSkills', skillsData)
    }

    function t(str, fallbackStr) {
      return this.$t && this.$te ? (this.$te(str) ? this.$t(str) : fallbackStr) : fallbackStr || str
    }

    return {
      swiperComponent,
      user,
      skills,
      onChangeSkill,
      specialists,
      frameworks,
      nextSlide,
      prevSlide,
      save,
      t,
    }
  },
})
</script>
