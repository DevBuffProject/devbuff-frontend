<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(value, index) in specialistsMap" :key="index">

        {{ t('specializations.' + index + ".title", index) }}

        <v-icon
          style="position: relative; float: right; color: #297eff"
          :icon="`plus`"
          class="link__icon"
          @click="addSpecialist(index)"
        />
      </li>
    </ul>
    <div class="idea__positions">
      <v-card
        v-for="(position,index) in userSpecialists"
        :key="position.name+index"
        class="mr-2"
      >
        <template #header>
          <h4 class="m-0">
            {{ t('specializations.' + position.name + ".title", position.name) }}</h4>
        </template>

        <v-label
          :name="$t('page.ideas.view.team.languages')"
          class="mb-3"
        >
          <span v-for="language in position.languages" :key="language.name"
                @click="language.selected = !language.selected"
                style="cursor: pointer">
            <v-chip
              :text="t('languages.' + language.name, language.name)"
              :type="language.selected?'auto':'mutted'"
            />
          </span>
        </v-label>

        <v-label :name="$t('page.ideas.view.team.technologies')">


         <span v-for="language in position.languages" :key="language.name">
            <span v-if="language.selected">
              <span v-for="technology of language.technologies"
                    :key="technology.name"
                    @click="submitTechnology(position,technology)"
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

      </v-card>
    </div>
  </div>
</template>

<script>
import languages from "../../lang/common/languages";

export default {
  name: 'v-specialist-picker',
  props: {
    specialists: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      userSpecialists: []
    }
  },
  computed: {
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
      console.log("DATA");
      console.log(specialistsMap);
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


      this.userSpecialists.push({
        name: specialistCodeName,
        languages: userLanguages
      });
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
  }
}
</script>

<style scoped>
.list-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.list-group-item:last-child {
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
}

.list-group-item.disabled, .list-group-item:disabled {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
}

.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.list-group-item + .list-group-item {
  border-top-width: 0;
}

.list-group-item + .list-group-item.active {
  margin-top: -1px;
  border-top-width: 1px;
}
</style>
