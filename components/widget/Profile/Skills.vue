<template>
  <div class="">
    <div class="">
      <swiper
        ref="swiperComponent"
        :options="{
          autoHeight: true,
          calculateHeight: true,
          lazy: true,
          simulateTouch: true,
        }"
        :auto-update="true"
        style="height: auto; margin-left: 0"
      >
        <swiper-slide>
          <atomic-list class="divide-y divide-gray-200">
            <atomic-list-item
              v-for="skill of user.skills"
              :key="skill.name"
              :class="[
                'flex justify-between items-center group cursor-pointer',
              ]"
            >
              <label class="flex items-center w-full" @click.stop>
                <input type="checkbox" class="mr-2" />
                <div>{{ skill.name }}</div>
              </label>
              <div
                :class="[
                  'px-4 py-1 transition-colors rounded',
                  'group-hover:bg-primary group-hover:bg-opacity-10 active:text-primary',
                ]"
                @click="nextSlide"
              >
                <svg-icon name="outline/cheveron-right" />
              </div>
            </atomic-list-item>
          </atomic-list>
        </swiper-slide>

        <swiper-slide>
          <atomic-list-item
            class="flex items-center group cursor-pointer"
            @click="prevSlide"
          >
            <div
              class="px-2 py-1 mr-2 transition-colors rounded group-hover:bg-primary group-hover:bg-opacity-10"
            >
              <svg-icon name="outline/cheveron-left" />
            </div>
            <div>Назад</div>
          </atomic-list-item>
          <div class="p-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias
            aspernatur aut deserunt doloribus eaque eius excepturi fugiat, hic
            in iure, laudantium, magni nam non quod repellat repellendus ut
            veniam.
          </div>
        </swiper-slide>
        <swiper-slide>
          <atomic-list-item
            class="flex items-center group cursor-pointer"
            @click="toSlide(0)"
          >
            <div
              class="px-2 py-1 mr-2 transition-colors rounded group-hover:bg-primary group-hover:bg-opacity-10"
            >
              <svg-icon name="outline/cheveron-left" />
            </div>
            <div>Назад</div>
          </atomic-list-item>
          <div class="p-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias
            aspernatur aut deserunt doloribus eaque eius excepturi fugiat, hic
            in iure, laudantium, magni nam non quod repellat repellendus ut
            veniam.
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
// eslint-disable-next-line no-unused-vars
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
    const { user } = useUser()
    const swiperComponent = ref(null)
    const swiper = computed(() => swiperComponent.value?.$swiper)
    const nextSlide = () => swiper.value.slideNext()
    const prevSlide = () => swiper.value.slidePrev()
    const toSlide = (index) => swiper.value.slideTo(index)

    return {
      swiperComponent,
      user,
      nextSlide,
      prevSlide,
      toSlide,
    }
  },
})
</script>
