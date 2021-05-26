<template>
  <div
    :class="[
      styles.Skeleton,
      'min-h-[14px] my-[10px] min-w-[20px] relative overflow-hidden rounded-full',
      'bg-gray-200 dark:bg-blueGray-800',
    ]"
  />
</template>

<style module>
.Skeleton::after {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.1),
    rgba(255, 255, 255, 0)
  );
  content: '';
  height: 100%;
  min-width: 200px;
  width: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(-100%);
  z-index: 1;
  animation: loading 1.5s infinite;
}
@keyframes loading {
  to {
    transform: translateX(100%);
  }
}
</style>

<script>
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'AtomicSkeleton',
  props: {
    figure: {
      type: String,
      default: '',
      validate: (v) => ['square', 'circle'].includes(v),
    },
  },
  setup() {
    const styles = useCssModule()

    return { styles }
  },
})
</script>
