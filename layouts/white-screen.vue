<template>
  <div
    class="bg-gray-50 dark:bg-blueGray-900 h-screen w-full flex justify-center items-center"
  >
    <div class="white-screen__container">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.white-screen {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
