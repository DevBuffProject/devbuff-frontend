<template>
  <a v-if="href" :href="href" v-bind="attrs">
    <slot />
  </a>
  <RouterLink v-else :to="route" custom v-slot="bindings">
    <a
      :href="bindings.href"
      v-bind="attrs"
      @click="startLoading() || bindings.navigate($event, route)"
    >
      <slot v-bind="{ ...bindings, isLoading }" />
    </a>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed, defineProps, ref, useAttrs } from 'vue'
import { useRouter } from '../core/router'

const props = defineProps({
  ...RouterLink.props,
  href: { type: String, default: null },
  modal: { type: Boolean, default: false },
})

const attrs = useAttrs()
const route = computed(() => {
  if (props.href) return ''
  const route = useRouter().resolve(props.to)
  if (props.modal) route.params = { ...route.params, _isDialog: true }

  return route
})

const router = useRouter()
const loadingRoute = ref('')
const startLoading = () => (loadingRoute.value = route.value.fullpath)
router.afterEach(() => (loadingRoute.value = ''))

const isLoading = computed(() => route.value.fullpath === loadingRoute.value)
</script>
