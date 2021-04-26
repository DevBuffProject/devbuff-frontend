<template>
  <div>
    <atomic-button @click="$store.dispatch('session/authorize')"
      >log in</atomic-button
    >
    {{ $auth.user }}
  </div>
</template>
