<template>
  <div>
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
            <label class="flex items-center w-full" @click.stop>
              <input
                :id="'language' + skill.name"
                v-model="skill.checked"
                type="checkbox"
                class="mr-2"
                @change="onChangeSkill(skill)"
              />
              <div>
                {{
                  tDefault(`commons.languages.${skill.name}`, skill.name, true)
                }}
              </div>
            </label>
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
            <label class="flex items-center w-full" @click.stop>
              <input
                :id="'specialist' + specialist.name + Math.random() * 1000"
                v-model="specialist.checked"
                type="checkbox"
                class="mr-2"
                @change="onChangeSkill(specialist)"
              />
              <div>
                {{ t(`commons.specialist.${specialist.name}`, true) }}
              </div>
            </label>
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
          </AtomicListItem>
        </AtomicList>
      </swiper-slide>
    </swiper>
    <AtomicButton @click="save"> Save </AtomicButton>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, nextTick } from 'vue'
import { useSkills, useUser } from '../../../composes/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@iconicicons/vue3'
import 'swiper/swiper.scss'
import { useI18n } from '../../../composes/utils'

export default defineComponent({
  name: 'WidgetProfileSkills',
  components: {
    Swiper,
    SwiperSlide,
  },
  async setup() {
    const { t, tDefault } = useI18n('components.widget.profile.skills')
    const { user, saveUserSkills } = useUser()
    const { getSkills } = useSkills()
    const swiper = ref()
    const allSkills = await getSkills()

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
          specialization.name,
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
            technology.name,
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
      updateSwiper()
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
      updateSwiper()
    }

    const updateSwiper = () => {
      nextTick(() => {
        swiper.value.updateAutoHeight()
        swiper.value.update()
        swiper.value.updateSize()
      })
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

      saveUserSkills(skillsData)
    }

    const onSwiper = (swiperComponent) => (swiper.value = swiperComponent)

    return {
      ChevronRightIcon,
      ChevronLeftIcon,
      user,
      skills,
      onChangeSkill,
      specialists,
      frameworks,
      nextSlide,
      prevSlide,
      save,
      t,
      tDefault,
      onSwiper,
    }
  },
})
</script>
