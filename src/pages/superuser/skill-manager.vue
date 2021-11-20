<template>
  <AtomicUserSkills :skills="skills" />

  <AtomicInput
    v-model="input.language"
    name="name"
    type="text"
    placeholder="here..."
    label="Language"
    shadow
  >
  </AtomicInput>

  <AtomicButton @click="appendLanguage(input.language)"
    >Save language
  </AtomicButton>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useSkillManager, useSkills } from '../../composes/services'

export default defineComponent({
  async setup() {
    const { addLanguage } = useSkillManager()
    const { getSkills } = useSkills()

    const input = ref({
      language: undefined,
    })

    const skills = ref(await getSkills())

    const appendLanguage = async (language) => {
      addLanguage(language)
      skills.value = await getSkills()
    }

    return {
      appendLanguage,
      input,
      skills,
    }
  },
})
</script>
