<template>
  <div>
    <div v-if="isLoading" class="mt-20 flex items-center justify-center">
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
import { defineComponent, ref, watch, nextTick, watchEffect } from 'vue'
import FastCommentsVueNext from 'fastcomments-vue-next'
import { useAppearance } from '../../../composes/utils'

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
  setup(props) {
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

    const dataFastComment = ref({
      tenantId: 'lprwn3v7q',
      urlId: props.id,
      customCSS: '.logged-in-info {\ndisplay: none !important;\n}',
      sso: props.sso,
      hasDarkBackground: isDark,
      onRender: () => {
        isLoading.value = false
      },
    })

    return { isLoading, reRenderKey, dataFastComment }
  },
})
</script>
