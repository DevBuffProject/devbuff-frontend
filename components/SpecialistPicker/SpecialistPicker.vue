<template>
  <ValidationProvider
    rules="min_specialists:1"
    v-slot="{ errors, validate }"
  >
    <input type="hidden" :value="pickedSpecialists.length" @input="validate"/>
    <div class="v-specialist">
      <ul class="v-specialist__list" v-if="maxCountSpecialists > userSpecialists.length">
        <li
          v-for="(value, index) in specialistsMap"
          :key="index"
          @click="addSpecialist(index)"
          class="v-specialist__spec"
        >
          {{ t(`specializations.${index}.title`, index) }}
          <v-icon
            icon="plus"
            v-if="maxCountSpecialists > userSpecialists.length"
            class="v-specialist__icon"
          />
        </li>
      </ul>
      <div class="v-specialist__list">
        <v-card
          v-for="(position, index) in userSpecialists"
          :key="position.name + index"
          class="v-specialist__card"
        >
          <template #header>
            <div class="v-specialist__card-header">
              <h4 class="m-0">
                {{ t(`specializations.${position.name}.title`, position.name) }}
              </h4>
              <v-icon
                icon="trash-alt"
                @click="userSpecialists.splice(index,1)"
                class="v-specialist__card-remove-icon"
              />
            </div>
          </template>

          <v-label :name="$t('page.ideas.view.team.languages')">
          <span
            v-for="language in position.languages"
            :key="language.name"
            @click="language.selected = !language.selected"
            class="v-specialist__chip"
          >
            <v-chip
              :text="t(`languages.${language.name}`, language.name)"
              :type="language.selected?'auto':'muted'"
            />
          </span>
          </v-label>
          <v-label
            v-if="hasSelectedLanguage(position)"
            :name="$t('page.ideas.view.team.technologies')"
            class="v-specialist__label"
          >
         <span
           v-for="language in position.languages"
           :key="language.name"
         >
            <span v-if="language.selected">
              <span
                v-for="technology of language.technologies"
                :key="technology.name"
                @click="submitTechnology(position,technology)"
                class="v-specialist__chip"
              >
                <v-chip
                  v-if="!alreadyHas(position, language, technology)"
                  :text="technology.name"
                  :type="technology.selected?'auto':'mutted'"
                />
              </span>
            </span>
          </span>
          </v-label>
          <template #footer>
            <v-label name="Количество">
              <div>
                <v-icon
                  icon="minus"
                  @click="position.count <= 1 ? position.count = 1 : position.count--"
                />
                {{ position.count }}
                <v-icon
                  icon="plus"
                  @click="position.count >= maxCountSpecialist ? position.count = maxCountSpecialist: position.count++"
                />
              </div>
            </v-label>
          </template>
        </v-card>
      </div>
    </div>

    <transition name="fade">
      <div v-if="errors.length" class="v-specialist__error">
        <v-icon :icon="['fas', 'exclamation']" class="v-specialist__error-icon"/>
        <span>{{ errors[0] }}</span>
      </div>
    </transition>
  </ValidationProvider>
</template>

<script>
import {extend, localize} from 'vee-validate'
import {min_value} from 'vee-validate/dist/rules'

extend('min_specialists', {...min_value});

localize({
  en: {
    messages: {
      min_specialists: 'Select one or more specializations'
    }
  },
  ru: {
    messages: {
      min_specialists: 'Выберите одного или несколько специальностей'
    }
  }
})

export default {
  name: 'v-specialist-picker',
  props: {
    specialists: {
      type: Array,
      default: null
    },
    userData: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      maxCountSpecialists: 10,
      maxCountSpecialist: 5,
      userSpecialists: []
    }
  },
  watch: {
    userSpecialists: {
      deep: true,
      handler() {
        console.log(this.userSpecialists)
        const specialists = this.buildUserSpecialists()
        this.$emit('change', specialists)
      }
    },
  },
  computed: {
    pickedSpecialists() {
      return this.buildUserSpecialists()
    },
    specialistsMap: function () {
      let specialistsMap = {};

      for (let language of this.specialists) {
        for (let specialization of language.specializations) {
          let specialist = specialistsMap[specialization.name];
          if (specialist === undefined) {
            specialistsMap[specialization.name] = [];
            specialist = specialistsMap[specialization.name];
          }
          specialist.push({
            name: language.name,
            technologies: []
          });
          let technologies = [];
          for (let technology of specialization.frameworks) {
            technologies.push({
              name: technology.name
            });
          }
          specialist[specialist.length - 1].technologies = technologies;

        }

      }
      return specialistsMap;
    },
  },
  methods: {
    alreadyHas(position, language, technology) {
      let buffer = new Set();

      for (let languageOfPosition of position.languages) {
        if (languageOfPosition.selected) {
          for (let technologyOfPosition of languageOfPosition.technologies) {
            if (buffer.has(technology.name) && language.name !== languageOfPosition.name && technology.name === technologyOfPosition.name) {
              return true;
            }
            buffer.add(technologyOfPosition.name);
          }
        }
      }
      return false;
    },
    hasSelectedLanguage(position) {
      for (let language of position.languages) {
        if (language.selected && language.technologies.length > 0) {
          return true;
        }
      }
      return false;
    },
    submitTechnology(positionContext, technologyContext) {
      let currentStatus = !technologyContext.selected;
      for (let languages of positionContext.languages) {
        for (let technology of languages.technologies) {
          if (technology.name === technologyContext.name) {
            technology.selected = currentStatus;
          }
        }
      }
    },
    addSpecialist: function (specialistCodeName) {
      let languages = this.specialistsMap[specialistCodeName];
      let userLanguages = [];
      if (languages === undefined || languages === null) {
        return;
      }
      for (let language of languages) {

        let technologies = [];
        for (let technology of language.technologies) {
          technologies.push({
            name: technology.name,
            selected: false
          });
        }

        userLanguages.push({
          name: language.name,
          selected: false,
          technologies: technologies
        });
      }

      const result = {
        name: specialistCodeName,
        languages: userLanguages,
        count: 1
      };
      this.userSpecialists.push(result);
      return result;
    },
    buildUserSpecialists() {
      let result = [];
      for (let specialistRaw of this.userSpecialists) {

        let languages = [];
        for (let languageRaw of specialistRaw.languages) {
          if (!languageRaw.selected) {
            continue;
          }
          let technologies = [];
          for (let technologyRaw of languageRaw.technologies) {
            if (technologyRaw.selected) {
              technologies.push({
                name: technologyRaw.name
              });
            }
          }
          languages.push({
            name: languageRaw.name,
            frameworks: technologies
          })
        }
        result.push({
          name: specialistRaw.name,
          count: specialistRaw.count,
          languages: languages
        })
      }
      return result;
    },
    t(str, fallbackStr) {
      return this.$t && this.$te
        ? this.$te(str)
          ? this.$t(str)
          : fallbackStr
        : fallbackStr
          ? fallbackStr
          : str
    },
  },
  created() {
    if (!Array.isArray(this.userData)) {
      return;
    }

    this.userData.forEach((userSpecialist => {
      let data = this.addSpecialist(userSpecialist.name);
      if (data !== undefined) {
        if (Array.isArray(userSpecialist.languages)) {
          for (let language of data.languages) {

            for (let userLanguage of userSpecialist.languages) {
              if (userLanguage.name === language.name) {
                language.selected = true;

                for (let technology of language.technologies) {
                  for (let userTechnologies of userLanguage.frameworks) {
                    if (technology.name === userTechnologies.name) {
                      technology.selected = true;
                    }
                  }
                }
              }
            }
          }
        }
        data.count = userSpecialist.count < 0 ? 1 : userSpecialist.count > this.maxCountSpecialist ? this.maxCountSpecialist : userSpecialist.count;
      }
    }));


  }
}
</script>

<style lang="scss" scoped>
.v-specialist {
  &__list {
    display: flex;
    flex-wrap: wrap;
    word-break: keep-all;
    padding: 0;
    margin: .5rem 0 0;
  }

  &__spec {
    position: relative;
    padding: .1rem 1rem;
    margin-bottom: .5rem;
    background-color: var(--color-muted);
    border-radius: 100px;
    display: flex;
    align-items: center;
    margin-right: .5rem;
    font-weight: 500;
    font-size: .85rem;
    cursor: pointer;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  &__error {
    display: flex;
    align-items: center;
    margin-top: .25rem;
    font-size: .85rem;
    color: var(--color-danger);
  }

  &__error-icon {
    font-size: .7rem;
    margin-right: .5rem;
    transform: translateY(-1px);
  }

  &__icon {
    color: var(--color-muted-darken);
    margin-left: .5rem;
    transform: translateY(-1px);
  }

  &__chip {
    margin-right: .25rem;
    cursor: pointer;
  }

  &__label {
    margin-top: 1rem;
  }

  &__card {
    max-width: 300px;
    width: 100%;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  &__card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__card-remove-icon {
    color: var(--color-danger);
    cursor: pointer;
  }
}
</style>
