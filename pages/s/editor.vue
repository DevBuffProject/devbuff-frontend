<template>
  <div>
    <atomic-breadcrumbs :items="breadcrumbs" />
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { localePath, i18n } = useContext()

    const breadcrumbs = [
      {
        title: i18n.t`components.breadcrumb.main`,
        to: localePath({ name: 'index' }),
      },
      {
        title: i18n.t`components.breadcrumb.idea`,
        to: localePath({ name: 'ideas' }),
      },
    ]

    return { breadcrumbs }
  },
})
</script>
