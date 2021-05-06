<template>
  <div>
    <v-skeleton
      v-for="row in rows"
      :key="row"
      figure="line"
      :style="
        row === rows && {
          width: '75%',
          marginBottom: 0,
        }
      "
      class="skeleton-paragraph__line"
    />
  </div>
</template>
