<template>
  <div
    :class="[
      'fixed z-50 top-0 left-0 w-screen h-screen',
      'flex items-center justify-center',
    ]"
  >
    <div
      :class="[
        'py-3 px-7 rounded-xl shadow-md backdrop-filter backdrop-blur-[5px]',
        'bg-black bg-opacity-80 dark:bg-blueGray-700 dark:bg-opacity-50',
      ]"
    >
      <AtomicLoadingBar />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overlay',
}
</script>
