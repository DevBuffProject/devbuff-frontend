<template>
  <div>
    <div
      v-if="isLoading"
      class="mt-20 flex items-center justify-center"
    >
      <AtomicLoadingLogo />
    </div>
    <fast-comments-vue-next
      :key="reRenderKey"
      :class="[isLoading && 'none']"
      :config="dataFastComment"
    />
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import FastCommentsVueNext from 'fastcomments-vue-next'
import { useAppearance } from '../../../composes/utils'
import * as baseStyle from '../../../assets/styles/fast-comments-base.css'
import * as darkStyle from '../../../assets/styles/fast-comments-dark-theme.css'

export default defineComponent({
  name: 'FastComments',
  components: {
    FastCommentsVueNext,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    sso: {
      type: Object,
      required: true,
    },
  },
  async setup(props) {
    const { isDark } = useAppearance()
    const isLoading = ref(true)
    const reRenderKey = ref(true)

    watch(
      () => isDark,
      () => {
        reRenderKey.value = !reRenderKey.value
      },
      { deep: true },
    )

    const style = computed(() => {
      return isDark.value ? darkStyle.default : baseStyle.default
    })

    const dataFastComment = ref({
      tenantId: 'lprwn3v7q',
      locale: 'ru_ru',
      urlId: props.id,
      customCSS: style,
      sso: props.sso,
      hasDarkBackground: isDark,
      showLiveRightAway: true,
      onInit: () => {
        isLoading.value = false
      },
    })
    return { isLoading, reRenderKey, dataFastComment }
  },
})
</script>
