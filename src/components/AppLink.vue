<template>
  <a :href="href" v-bind="attrs" @click="go">
    <slot v-bind="{ isActive, isExactActive, isLoading }" />
  </a>
</template>

<script setup>
import { RouterLink, useLink } from 'vue-router'
import { computed, defineProps, ref, useAttrs } from 'vue'
import { useRouter } from '../core/router'

const props = defineProps({
  ...RouterLink.props,
  modal: { type: Boolean, default: false },
})

const attrs = useAttrs()
const { href, isActive, isExactActive, navigate } = useLink(props)

const route = computed(() => {
  const route = useRouter().resolve(props.to)
  if (props.modal) route.params = { ...route.params, _isDialog: true }
  return route
})

const router = useRouter()
const loadingRoute = ref('')
const startLoading = () => (loadingRoute.value = route.value.fullpath)
router.afterEach(() => {
  loadingRoute.value = ''
})

const isLoading = computed(() => route.value.fullpath === loadingRoute.value)

const go = (e) => {
  startLoading()
  navigate(e)
}
</script>
