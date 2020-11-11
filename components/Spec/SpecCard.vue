<template>
  <div class="v-spec-picker___spec-card">
    <div class="v-spec-picker___spec-name">
      {{ specialist.name }}
    </div>

    <div
      v-for="(lang, langIndex) in specialist.languages"
      :key="langIndex"
      class="v-spec-picker___spec-languages"
    >
      <input type="checkbox" v-model="langs" :value="lang" />
      {{ lang.name }}

      <div
        v-if="langs.find(l => l.name === lang.name)"
        v-for="framework in lang.frameworks"
        :key="framework.name"
        class="v-spec-picker___spec-frameworks"
      >
        <input type="checkbox" v-model="langs[langIndex].frameworks" />
        {{ framework.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-spec-card',

  props: {
    specialist: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      langs: [],
    }
  }
}
</script>

<style lang="scss" scoped>
.v-spec-picker {
  &___spec-name {
    font-size: 1.2rem;
    margin-left: .5rem;
    margin-bottom: 1rem;
  }

  &___spec-card {
    min-width: 200px;
    cursor: pointer;
    padding: .5rem;
    border-radius: 4px;
    border: 1px solid var(--color-muted);
    transition: border-color .3s ease;
    &:not(:last-of-type) {
      margin-right: 1rem;
    }

    &:hover {
      border-color: var(--color-primary);
    }
  }
}
</style>
