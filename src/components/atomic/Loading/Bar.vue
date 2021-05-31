<template>
  <div class="w-[40px] h-[40px] flex justify-center items-center">
    <div :class="styles.Loading" />
  </div>
</template>

<script>
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'AtomicLoadingBar',
  setup() {
    const styles = useCssModule()
    return { styles }
  },
})
</script>

<style module>
.Loading {
  position: relative;
  width: 6px;
  height: 24px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  animation: pulse 750ms infinite;
  animation-delay: 250ms;
}
.Loading:before,
.Loading:after {
  content: '';
  position: absolute;
  display: block;
  height: 16px;
  width: 6px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  top: 50%;
  transform: translateY(-50%);
  animation: pulse 750ms infinite;
}
.Loading:before {
  left: -12px;
}
.Loading:after {
  left: 12px;
  animation-delay: 500ms;
}

@keyframes pulse {
  50% {
    background: white;
  }
}
</style>
