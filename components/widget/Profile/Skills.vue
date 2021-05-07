<template>
  <div class="">
    <div class="">
      {{ skills }}
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
              :class="[
                'flex justify-between items-center group cursor-pointer',
              ]"
            >
              <label class="flex items-center w-full" @click.stop>
                <input
                  :id="'language' + skill.name"
                  v-model="skill.checked"
                  type="checkbox"
                  class="mr-2"
                />
                <div>{{ skill.name }}</div>
              </label>
              <div
                v-if="skill.specializations.length"
                :class="[
                  'px-4 py-1 transition-colors rounded',
                  'group-hover:bg-primary group-hover:bg-opacity-10 active:text-primary',
                ]"
                @click="nextSlide(null, skill.specializations)"
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
              :class="[
                'flex justify-between items-center group cursor-pointer',
              ]"
            >
              <label class="flex items-center w-full" @click.stop>
                <input
                  :id="'specialist' + specialist.name"
                  v-model="specialist.checked"
                  type="checkbox"
                  class="mr-2"
                />
                <div>{{ specialist.name }}</div>
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
              :class="[
                'flex justify-between items-center group cursor-pointer',
              ]"
            >
              <label class="flex items-center w-full" @click.stop>
                <input
                  :id="'specialist' + framework.name"
                  v-model="framework.checked"
                  type="checkbox"
                  class="mr-2"
                  @change="onChangeSkill(framework, specialists)"
                />
                <div>{{ framework.name }}</div>
              </label>
            </atomic-list-item>
          </atomic-list>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import {
  useStore,
  computed,
  defineComponent,
  ref,
  reactive,
} from '@nuxtjs/composition-api'
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
    const toSlide = (index) => swiper.value.slideTo(index)
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
        const indexUserSpecialization = findName(
          userSpecialization,
          specialization.name
        )
        if (indexUserSpecialization === -1) {
          continue
        }
        specialization.checked = true

        const userTechnologies =
          userSpecialization[indexUserSpecialization].frameworks

        for (const technology of specialization.frameworks) {
          const indexUserTechnology = findName(
            userTechnologies,
            technology.name
          )
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

    let context
    function nextSlide(rootData, currentData) {
      context = rootData
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
    }

    const skills = reactive(JSON.parse(JSON.stringify(allSkills)))

    function onChangeSkill(target, prevTarget) {
      console.log('Data: ')
      console.log(target.checked)
      console.log(prevTarget)
      console.log(context.checked)
      console.log('----')

      if (target.checked && !context.checked) {
        console.log('Chage')
        context.checked = true
        // onChangeSkill(prevTarget, undefined)
      }
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
      toSlide,
    }
  },
})
</script>
