<template>
  <v-card
    class="idea"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <client-only>
      <div slot="placeholder">
        <div class="idea__param w-100 mb-2">
          <div class="idea__param-name"> название </div>
          <div class="idea__param-value">
            <div class="d-flex align-items-center mb-3">
              <v-skeleton style="height: 20px; width: 200px;" />
            </div>
          </div>
        </div>

        <div class="idea__param w-100 mb-2">
          <div class="idea__param-name"> дата создания </div>
          <div class="idea__param-value">
            <v-skeleton style="width: 200px;" />
          </div>
        </div>

        <div class="idea__param w-100">
          <div class="idea__param-name"> описание </div>
          <div class="idea__param-value">
            <v-skeleton-paragraph :rows="4" />
          </div>
        </div>

        <div class="d-flex flex-wrap">
          <div class="idea__param mt-3">
            <div class="idea__param-name mb-1"> Специалисты </div>
            <div class="idea__param-value">
              <v-skeleton style="width: 50px;" />
            </div>
          </div>

          <div class="idea__param mt-3">
            <div class="idea__param-name mb-1"> Технологии </div>
            <div class="idea__param-value">
              <v-skeleton style="width: 50px;" />
            </div>
          </div>

          <div class="idea__param mt-3">
            <div class="idea__param-name mb-1"> Языки программирования </div>
            <div class="idea__param-value">
              <v-skeleton style="width: 50px;" />
            </div>
          </div>
        </div>
      </div>


      <div class="idea__param w-100 mb-2">
        <div class="idea__param-name"> название </div>
        <div class="idea__param-value">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center">
              <v-link
                :to="localePath({
                  name: 's-ideas-id',
                  params: { id }
                })"
                :class="['idea__link', hover && 'idea__link--hover']"
              >
                {{ title }}
              </v-link>
              <v-icon
                :icon="['fas', 'long-arrow-alt-right']"
                :class="['ml-2', 'idea__link-icon', hover && 'idea__link-icon--hover']"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="idea__param w-100 mb-2">
        <div class="idea__param-name"> дата создания </div>
        <div class="idea__param-value">
          {{ publishDate | toLocaleDateTime($i18n.locale) }}
        </div>
      </div>

      <div class="idea__param w-100">
        <div class="idea__param-name"> описание </div>
        <div class="idea__param-value idea__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>

      <div
        v-if="specialists.length || technologies.length || languages.length"
        class="d-flex flex-wrap"
      >
        <div v-if="specialists.length" class="idea__param mt-3">
          <div class="idea__param-name mb-1"> Специалисты </div>
          <div class="idea__param-value">
            <span
              v-for="(spec, key) in specialists"
              :key="spec.name + key"
              class="mr-2"
            >
              <v-chip :text="spec.name" />
            </span>
          </div>
        </div>

        <div v-if="technologies.length" class="idea__param mt-3">
          <div class="idea__param-name mb-1"> Технологии </div>
          <div class="idea__param-value">
            <span
              v-for="(tech, key) in technologies"
              :key="tech.name + key"
              class="mr-2"
            >
              <v-chip :text="tech" />
            </span>
          </div>
        </div>

        <div v-if="languages.length" class="idea__param mt-3">
          <div class="idea__param-name mb-1"> Языки программирования </div>
          <div class="idea__param-value">
            <span
              v-for="(lang, key) in languages"
              :key="lang.name + key"
              class="mr-2"
            >
              <v-chip
                :text="$t('languages.' + lang.name)"
                :type="hover ? 'auto' : null"
              />
            </span>
          </div>
        </div>
      </div>
    </client-only>
  </v-card>
</template>

<script>
export default {
  name: 'v-idea-card',

  props: {
    id: {
      type: [ String, Number ],
      required: true
    },
    publishDate: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    specialists: {
      type: Array,
      default: () => []
    },
  },

  data: () => ({
    hover: false
  }),

  computed: {
    languages() {
      return this.specialists.length
        ? this.specialists.reduce((acc, spec) => {
            spec.languages.forEach(lang => acc.push(lang))
            return acc
          }, [])
        : [];
    },
    technologies() {
      return this.languages.length
        ? this.languages.reduce((acc, lang) => lang.technologies.map(tech => tech.name), [])
        : [];
    }
  }
}
</script>

<style lang="scss" scoped>
.idea {
  position: relative;
  padding: 1rem 1rem 1.5rem;
  transition: box-shadow .3s var(--base-transition);

  &:hover {
    box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, .1);
  }

  &__description {
    font-size: 1rem !important;
    line-height: 1.1;
    font-weight: 300 !important;
  }

  &__param {
    min-width: 33%;
    width: max-content;
  }

  &__param-name {
    font-size: .7rem;
    font-weight: 400;
    opacity: .5;
    position: relative;
    z-index: 1;
  }

  &__param-value {
    font-size: .8rem;
    font-weight: 400;
  }

  &__link {
    text-decoration: none;
    color: var(--color-black);
    border-bottom: 1px solid var(--color-black-fade);
    font-size: 1.1rem;
    opacity: .5;
    transition: .3s var(--base-transition);
    transition-property: opacity, border-bottom-color, color;

    &:after, &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
    }
  }

  &__link--hover {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary-tint);
    opacity: 1;
  }

  &__link-icon {
    color: var(--color-black);
    opacity: .1;
    transition: .3s var(--base-transition);
    transition-property: transform, opacity, color;
  }

   &__link-icon--hover {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary-tint);
    transform: translateX(5px);
    opacity: .5;
  }

  &__languages {
    margin-top: 1rem;
    margin-right: -1rem;
    margin-left: -1rem;
    padding: 1rem;
    transition: background-color .3s var(--base-transition);
  }

  &:hover &__languages {
    background-color: var(--color-muted-fade);
  }
}
</style>
