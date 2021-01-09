<template>
  <div>
    <div v-if="progress" class="og-preview">
      <v-skeleton class="og-preview__image" />
      <div class="og-preview__info">
        <v-skeleton-paragraph class="og-preview__desc" />
      </div>

    </div>
    <div v-else class="og-preview">
      <v-image
        v-if="preview.image"
        :src="preview.image"
        class="og-preview__image"
      />
      <div class="og-preview__info">
        <v-link class="og-preview__link" :href="preview.url">
          {{ preview.title }}
        </v-link>
        <div class="og-preview__desc">
          {{ preview.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-og-preview',

  props: {
    url: {
      type: String,
      require: true,
    },
  },

  data() {
    return {
      og: {},
      progress: false,

    }
  },

  computed: {
    preview() {
      const og = this.og

      return {
        title: og.ogTitle || og.ogSiteName || this.url,
        description: og.ogDescription || this.url,
        url: og.requestUrl || this.url,
        image: og.ogImage && (og.ogImage.url || og.ogImage[0].url)
      }
    }
  },

  watch: {
    url() {
      this.updatePreview()
    },
  },

  methods: {
    // TODO: Refactor
    updatePreview() {
      const url = this.url

      if (!url) return false

      this.progress = true
      this.$axios
        .get(`/_api/help/og?url=${url}`, { progress: true })
        .then(({ data }) => {
          setTimeout(() => this.progress = false, 200)
          this.og = data
        })
        .catch(() => {
          setTimeout(() => this.progress = false, 200)
          this.og = {}
        })

      this.$emit('done')
    },
  },

  mounted() {
    this.updatePreview()
  }
}
</script>

<style lang="scss" scoped>
.og-preview {
  --size: 60px;

  display: flex;
  height: 100%;
  overflow: hidden;

  &__skeleton {
    display: flex;
  }

  &__skeleton-image {
    width: var(--size);
    flex: 0 0 var(--size) !important;
  }

  &__skeleton-link {
    margin-bottom: .5rem;
  }

  &__info {
    width: 100%;
  }

  &__image {
    width: var(--size) !important;
    height: var(--size) !important;
    flex: 0 0 var(--size) !important;
    margin-right: .5rem;
  }

  &__link {
    font-size: .9rem;
    font-weight: 500;
  }

  &__desc {
    font-size: .8rem;
    color: var(--color-text);
    line-height: 1.1;
    font-weight: 300;
  }
}
</style>
