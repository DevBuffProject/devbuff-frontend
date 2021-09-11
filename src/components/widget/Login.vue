<template>
  <div class="p-5 mb-5 bg-primary-500 bg-opacity-10 rounded-xl">
    <h4 class="!mt-0">
      {{ t('loginVia') }}
    </h4>

    <AtomicButton
      class="w-full flex items-center justify-center"
      @click="initAuth(AuthProviders.GitHub)"
    >
      <div class="text-white dark:text-dark-50 flex items-center">
        <Svg class="dark:text-black" name="Github" />
        <span class="ml-2">GitHub</span>
      </div>
    </AtomicButton>

    <AtomicButton
      class="w-full flex items-center justify-center my-2"
      @click="initAuth(AuthProviders.GitLab)"
    >
      <div class="text-white dark:text-dark-50 flex items-center">
        <Svg name="Gitlab" />
        <span class="ml-2">GitLab</span>
      </div>
    </AtomicButton>
    <div class="mt-0">
      {{ t('loginReason') }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuth, useI18n } from '../../composes'

export default defineComponent({
  setup() {
    const { t } = useI18n('components.layout.sidebar')
    const { initAuth, PROVIDERS: AuthProviders } = useAuth()

    return {
      t,
      initAuth,
      AuthProviders,
    }
  },
})
</script>

<style scoped></style>
