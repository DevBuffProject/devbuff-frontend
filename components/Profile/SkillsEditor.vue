<template>
  <div class="skills-editor">
    <transition name="slide" mode="in-out">
      <div
        v-if="openSkill"
        class="skills-editor__skills"
      >
        <v-button @click="upd">upd</v-button>

        <div
          v-for="skill in skills"
          :key="skill.name"
          class="skills-editor__skill"
        >
          <label
            class="skills-editor__skill-name d-flex align-items-center"
          >
            <input
              type="checkbox"
              class="mr-3"
            >
            {{ skill.name }}
          </label>
        </div>
      </div>

      <label
        v-else
        class="skills-editor__skill-name d-flex align-items-center"
      >
        <v-button @click="upd">upd</v-button>

        <input
          type="checkbox"
          class="mr-3"
        >
        new skill
      </label>
    </transition>
  </div>
</template>

<script>
import WindowAbstract from '~/components/Dialog/WindowAbstract'

export default {
  extends: WindowAbstract,

  data: () => ({
    openSkill: false
  }),

  props: {
    skills: {
      type: Array,
      default: null
    }
  },

  methods: {
    upd() {
      this.openSkill = !this.openSkill
      setTimeout(this.postSizes, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

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
</style>
