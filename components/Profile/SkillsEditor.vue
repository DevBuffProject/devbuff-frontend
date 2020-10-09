<template>
  <div class="skills-editor">
    <swiper ref="mySwiper" :options="swiperOptions"
            :auto-update="true"
            style="height: auto">
      <swiper-slide style="height: auto">
        <ul class="list-group">
          <li class="list-group-item d-flex text-muted">
            <div class="mr-auto">{{ $t('components.skillEditor.header.language') }}</div>
            <div class="ml-auto text-lef text-right">
              {{ $t('components.skillEditor.header.specialization') }}
              <v-icon icon="arrow-right"></v-icon>
            </div>
          </li>
          <li class="list-group-item" v-for="(item, index) in diffSkills" v-bind:key="index">
            <div class="text-lef next-title">
              <input type="checkbox" :id="'lang'+ item.name" v-model="item.enabled"
                     v-on:change="skillModelChanged('language',undefined,item)">
              <label :for="'lang'+ item.name">
                {{ t('languages.' + item.name, item.name) }}
              </label>
            </div>
            <div class="text-right" v-on:click="slideNext(item.name,'specialization')">
              <v-icon icon="arrow-right"></v-icon>
            </div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide style="height: auto">
        <ul class="list-group">
          <li class="list-group-item text-muted"
              v-if="service.prevLanguage!== null && service.prevLanguage!==undefined">
            {{ $t('components.skillEditor.header.specialization') }}
            {{ t('languages.' + service.prevLanguage.name, service.prevLanguage.name) }}
          </li>
          <li class="list-group-item" v-on:click="slidePrev('specialization')">
            <v-icon icon="arrow-left"></v-icon>
            {{ $t('components.skillEditor.controls.back') }}
          </li>
          <li class="list-group-item" v-for="(item,index) in service.currentSpecialization" :key="index">
            <div class="text-lef next-title">
              <input type="checkbox" :id="'specialization'+ item.name" v-model="item.enabled"
                     v-on:change="skillModelChanged('specialization', service.prevLanguage, item)">
              <label :for="'specialization'+ item.name">
                {{ t('specializations.' + item.name + ".title", item.name) }}
              </label>
            </div>
            <div class="text-right"
                 v-if="item.frameworks.length > 0"
                 v-on:click="slideNext(item.name,'framework')">
              <v-icon icon="arrow-right"></v-icon>
            </div>
            <div v-else class="text-right">
              <i class="next-no-data"> </i>
            </div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide style="height: auto">
        <ul class="list-group" style="margin-left: 1px; margin-right: 1px">
          <li class="list-group-item text-muted"
              v-if="service.prevSpecialization !== null && service.prevSpecialization!== undefined">
            {{ $t('components.skillEditor.header.technology') }}
            {{ t('specializations.' + service.prevSpecialization.name + '.title', service.prevSpecialization.name) }}
          </li>
          <li class="list-group-item" v-on:click="slidePrev('framework')">
            <v-icon icon="arrow-left"></v-icon>
            {{ $t('components.skillEditor.controls.back') }}
          </li>
          <li class="list-group-item" v-for="(item, index) in service.currentFrameworks" :key="index">
            <div class="text-left">
              <input type="checkbox" :id="'framework'+ item.name" v-model="item.enabled"
                     v-on:change="skillModelChanged('framework',service.prevSpecialization, item)">
              <label :for="'framework'+ item.name">
                {{ t('technologies.' + item.name, item.name) }}
              </label>
            </div>
          </li>
        </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import WindowAbstract from '~/components/Dialog/WindowAbstract'
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'v-skills-editor',
  extends: WindowAbstract,
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    userSkills: {
      type: Array,
      default: null
    },
    skills: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      swiperOptions: {
        autoHeight: true,
        calculateHeight: true,
        lazy: true,
        simulateTouch: false
      },
      diffSkills: [],
      service: {
        currentSpecialization: null,
        currentFrameworks: null
      },

    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    processDiffSkills() {
      let storage = [];
      for (let value of this.skills) {
        let indexLanguage = this.userSkills.findIndex(function (val) {
          return val.name === value.name;
        });
        storage[storage.length] = {
          "name": value.name,
          "enabled": false,
          "levelKnowledge": "newbie",
          "specializations": []
        };
        if (indexLanguage !== -1) {
          storage[storage.length - 1].enabled = true;
          storage[storage.length - 1].levelKnowledge = this.userSkills[indexLanguage].levelKnowledge;
        }

        for (let specialization of value.specializations) {
          let storageSpecialization = storage[storage.length - 1].specializations;

          let indexSpecialization = this.userSkills[indexLanguage] !== undefined ? this.userSkills[indexLanguage].specializations.findIndex(function (val) {
            return val.name === specialization.name;
          }) : -1;


          storageSpecialization[storageSpecialization.length] = {
            "name": specialization.name,
            "enabled": false,
            "frameworks": []
          };

          if (indexSpecialization !== -1) {
            storageSpecialization[storageSpecialization.length - 1].enabled = true;
          }
          for (let framework of specialization.frameworks) {
            let storageFrameworks = storageSpecialization[storageSpecialization.length - 1].frameworks;

            let indexFramework = indexLanguage !== -1 && indexSpecialization !== -1 ? this.userSkills[indexLanguage].specializations[indexSpecialization].frameworks.findIndex(function (val) {
              return val.name === framework.name;
            }) : -1;


            storageFrameworks[storageFrameworks.length] = {
              "name": framework.name,
              "enabled": false,
              "levelKnowledge": "newbie",
            };

            if (indexFramework !== -1) {
              storageFrameworks[storageFrameworks.length - 1].enabled = true;
              storageFrameworks[storageFrameworks.length - 1].levelKnowledge = this.userSkills[indexLanguage].specializations[indexSpecialization].frameworks[indexFramework].levelKnowledge;
            }
          }
        }
      }

      this.diffSkills = storage;
    },
    skillModelChanged: function (type, prevObject, object) {
      //This is shit man alg....
      if (type === 'language') {
        if (object.enabled === false) {
          for (let specialization of object.specializations) {
            specialization.enabled = false;
            for (let framework of specialization.frameworks) {
              framework.enabled = false;
            }
          }
        }
      } else if (type === 'specialization') {
        if (object.enabled === false) {
          for (let framework of object.frameworks) {
            framework.enabled = false;
          }
        } else if (object.enabled === true) {
          prevObject.enabled = true;
        }
      } else if (type === 'framework') {
        if (object.enabled === true) {
          prevObject.enabled = true;
          this.service.prevLanguage.enabled = true;
        }
      }

      this.$emit('change', this.createUserSkills())
    },
    slideNext: function (value, type) {
      if (type === 'specialization') {
        let index = this.diffSkills.findIndex(function (val) {
          return val.name === value;
        });
        this.service.prevLanguage = this.diffSkills[index];
        this.service.currentSpecialization = this.diffSkills[index].specializations;
      } else if (type === 'framework') {
        let index = this.service.currentSpecialization.findIndex(function (val) {
          return val.name === value;
        });
        this.service.prevSpecialization = this.service.currentSpecialization[index];
        this.service.currentFrameworks = this.service.currentSpecialization[index].frameworks;
      }
      this.swiper.slideNext();
    },
    slidePrev: function (type) {
      if (type === 'specialization') {
        this.service.prevLanguage = null;
        this.service.currentSpecialization = null;
      } else if (type === 'framework') {
        this.service.prevSpecialization = null;
        this.service.currentFrameworks = null;
      }
      this.swiper.slidePrev();
    },
    createUserSkills() {
      let userSkills = [];


      for (let language of this.diffSkills) {
        if (!language.enabled) {
          continue;
        }
        userSkills[userSkills.length] = {
          name: language.name,
          levelKnowledge: "newbie",
          specializations: []
        };

        for (let specialization of language.specializations) {
          if (!specialization.enabled) {
            continue;
          }
          let currentSpecializationBlock = userSkills[userSkills.length - 1].specializations;
          currentSpecializationBlock[currentSpecializationBlock.length] = {
            name: specialization.name,
            frameworks: []
          }

          for (let technology of specialization.frameworks) {
            if (!technology.enabled) {
              continue;
            }
            let currentTechnologyBlock = currentSpecializationBlock[currentSpecializationBlock.length - 1].frameworks;
            currentTechnologyBlock[currentTechnologyBlock.length] = {
              name: technology.name,
              levelKnowledge: "newbie"
            }
          }
        }
      }

      return userSkills;
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
  mounted() {
    this.processDiffSkills()
  }
}
</script>

<style lang="scss" scoped>
.mr-auto,
.mx-auto {
  margin-right: auto !important;
}

.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}

.no-mode-translate-demo-wrapper {
  position: relative;
  height: 18px;
}

.no-mode-translate-demo-wrapper button {
  position: absolute;
}

.no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
  transition: all 1s;
}

.no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
  opacity: 0;
}

.no-mode-translate-fade-enter {
  transform: translateX(31px);
}

.no-mode-translate-fade-leave-active {
  transform: translateX(-31px);
}

.skills-editor {
  overflow: hidden;
  position: relative;

  &__skills {
    position: absolute
  }

  &__name {
    position: absolute
  }
}

.swiper-container {
  width: 600px;
  height: 300px;
}

.next-title {
  position: absolute;
}

.text-right {
  text-align: right !important;
}

/**
    Custom checkbox

 */

/* Checkmark style starts */
/*Checkboxes styles*/
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 20px;
  font: 14px/20px 'Open Sans', Arial, sans-serif;
  color: black;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

input[type="checkbox"] + label:last-child {
  margin-bottom: 0;
}

input[type="checkbox"] + label:before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  position: absolute;
  left: 0;
  top: 0;
  opacity: .6;
  -webkit-transition: all .12s, border-color .08s;
  transition: all .12s, border-color .08s;
}

input[type="checkbox"]:checked + label:before {
  width: 10px;
  top: -3px;
  left: 5px;
  color: #24d546;
  border-radius: 0;
  border: 2px solid;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

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

.next-no-data:before {
  display: inline-block;
  font-size: inherit;
  font-weight: 400;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: ' ';
}


</style>
