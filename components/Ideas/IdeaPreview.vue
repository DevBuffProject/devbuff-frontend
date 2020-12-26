<template>
  <div class="v-idea-preview">
    <v-label v-if="name" name="название" class="v-idea-preview__section">
      <div class="d-flex align-items-center">
        <h3 class="m-0">{{ name }}</h3>
      </div>
    </v-label>

    <v-label v-if="description" name="краткое описание" class="v-idea-preview__section">
      {{ description }}
    </v-label>

    <v-label v-if="text" name="текст идеи" class="v-idea-preview__section">
      <v-article>
        <div v-html="text" />
      </v-article>
    </v-label>
  </div>
</template>

<script>
export default {
  name: 'v-idea-preview',

  props: {
    name: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.v-idea-preview {
  &__section {
    width: 100%;
    &:not(:last-of-type) {
      margin-bottom: 1.5rem
    }
  }
}
</style>
