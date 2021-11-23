<template>
  <div class="efsda">
    <swiper
      :simulate-touch="false"
      :lazy="true"
      :auto-height="true"
      :auto-update="true"
      @swiper="onSwiper"
    >
      <swiper-slide>
        <AtomicList class="divide-y divide-gray-200">
          <AtomicListItem
            v-for="skill of skills"
            :key="skill.name"
            class="flex justify-between items-center group cursor-pointer"
          >
            <AtomicCheckbox
              :id="'language' + skill.name"
              :label="
                tDefault(`commons.languages.${skill.name}`, skill.name, true)
              "
              v-model="skill.checked"
              type="checkbox"
              class="mr-2"
              @update:modelValue="onChangeSkill(skill)"
            />
            <div
              v-if="skill.specializations.length"
              :class="[
                'px-4 py-1 transition-colors rounded',
                'group-hover:bg-primary-500 group-hover:bg-opacity-10 active:text-primary-500',
              ]"
              @click="nextSlide(skill, skill.specializations)"
            >
              <component :is="ChevronRightIcon" />
            </div>
          </AtomicListItem>
        </AtomicList>
      </swiper-slide>

      <swiper-slide>
        <AtomicList class="divide-y divide-gray-200">
          <div
            :class="[
              'px-4 py-1 transition-colors rounded',
              'group-hover:bg-primary-500 group-hover:bg-opacity-10 active:text-primary-500',
            ]"
            @click="prevSlide()"
          >
            <component :is="ChevronLeftIcon" />
          </div>
          <AtomicListItem
            v-for="specialist of specialists"
            :key="specialist.name"
            :class="['flex justify-between items-center group cursor-pointer']"
          >
            <AtomicCheckbox
              :id="'specialist' + specialist.name + Math.random() * 1000"
              :label="t(`commons.specialist.${specialist.name}`, true)"
              v-model="specialist.checked"
              type="checkbox"
              class="mr-2"
              @update:modelValue="onChangeSkill(specialist)"
            />
            <div
              v-if="specialist.frameworks.length"
              :class="[
                'px-4 py-1 transition-colors rounded',
                'group-hover:bg-primary-500 group-hover:bg-opacity-10 active:text-primary-500',
              ]"
              @click="nextSlide(specialist, specialist.frameworks)"
            >
              <component :is="ChevronRightIcon" />
            </div>
          </AtomicListItem>
        </AtomicList>
      </swiper-slide>

      <swiper-slide>
        <AtomicList class="divide-y divide-gray-200">
          <div
            :class="[
              'px-4 py-1 transition-colors rounded',
              'group-hover:bg-primary-500 group-hover:bg-opacity-10 active:text-primary-500',
            ]"
            @click="prevSlide()"
          >
            <component :is="ChevronLeftIcon" />
          </div>
          <AtomicListItem
            v-for="framework of frameworks"
            :key="framework.name"
            :class="['flex justify-between items-center group cursor-pointer']"
          >
            <AtomicCheckbox
              :id="'framework' + framework.name"
              :label="framework.name"
              v-model="framework.checked"
              type="checkbox"
              class="mr-2"
              @update:modelValue="onChangeSkill(framework)"
            />
          </AtomicListItem>
        </AtomicList>
      </swiper-slide>
    </swiper>
    <AtomicButton @click="save" :disbled="saveProcessing" class="mt-2"
      >Сохранить
    </AtomicButton>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, nextTick } from 'vue'
import { useAuth, useSkills, useI18n } from '../../../composes'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@iconicicons/vue3'
import 'swiper/swiper.scss'

export default defineComponent({
  name: 'WidgetProfileSkills',
  components: {
    Swiper,
    SwiperSlide,
  },
  async setup() {
    const { t, tDefault } = useI18n('components.widget.profile.skills')
    const { user, saveUserSkills } = useAuth()
    const { getSkills } = useSkills()
    const swiper = ref()
    const allSkills = await getSkills()
    const userSkill = user.value.skills
    const saveProcessing = ref(false)

    const findName = (array, value) =>
      array.findIndex((data) => data.name === value)

    for (const language of allSkills) {
      const indexUserLanguage = findName(userSkill, language.name)

      if (indexUserLanguage === -1) continue

      language.checked = true
      const userSpecialization = userSkill[indexUserLanguage].specializations

      for (const specialization of language.specializations) {
        const indexUserSpecialization = findName(
          userSpecialization,
          specialization.name,
        )
        if (indexUserSpecialization === -1) continue

        specialization.checked = true
        const userTechnologies =
          userSpecialization[indexUserSpecialization].frameworks

        for (const technology of specialization.frameworks) {
          const indexUserTechnology = findName(
            userTechnologies,
            technology.name,
          )
          if (indexUserTechnology === -1) continue
          technology.checked = true
        }
      }
    }

    const specialists = ref([])
    const frameworks = ref([])
    const context = []

    const nextSlide = (rootData, currentData) => {
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
      updateSwiper()
    }

    const prevSlide = () => {
      if (frameworks.value.length !== 0) {
        frameworks.value = []
        swiper.value.slidePrev()
      } else if (specialists.value.length !== 0) {
        specialists.value = []
        swiper.value.slidePrev()
      }
      context.pop()
      updateSwiper()
    }

    const updateSwiper = () => {
      nextTick(() => {
        swiper.value.updateAutoHeight()
        swiper.value.update()
        swiper.value.updateSize()
      })
    }

    const onChangeSkill = (target) => {
      if (target.checked) {
        for (const contextItem of context) contextItem.checked = true
      } else if (!target.checked) {
        unCheckTargets(target)
      }
    }

    const unCheckTargets = (target) => {
      if (Array.isArray(target)) {
        for (const value of target) unCheckTargets(value)
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

    const save = () => {
      prevSlide()
      prevSlide()
      const skillsData = []

      for (const language of skills) {
        if (!language.checked) continue
        const languageObj = {
          name: language.name,
          levelKnowledge: 'newbie',
          specializations: [],
        }
        skillsData.push(languageObj)
        for (const specialization of language.specializations) {
          if (!specialization.checked) continue
          const specializationObj = {
            name: specialization.name,
            frameworks: [],
          }

          languageObj.specializations.push(specializationObj)
          for (const technology of specialization.frameworks) {
            if (!technology.checked) continue
            specializationObj.frameworks.push({
              name: technology.name,
              levelKnowledge: 'newbie',
            })
          }
        }
      }
      try {
        saveProcessing.value = false
        saveUserSkills({ skills: skillsData })
      } finally {
        saveProcessing.value = false
      }
    }

    const onSwiper = (swiperComponent) => (swiper.value = swiperComponent)

    return {
      ChevronRightIcon,
      ChevronLeftIcon,
      user,
      skills,
      specialists,
      frameworks,
      t,
      save,
      onSwiper,
      tDefault,
      prevSlide,
      nextSlide,
      onChangeSkill,
      saveProcessing,
    }
  },
})
</script>
