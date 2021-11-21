<template>
  <AtomicUserSkills :skills="skills" />
  <div class="grid grid-cols-3">
    <div class="grid grid-cols-2">
      <AtomicInput
        v-model="input.language"
        name="name"
        type="text"
        placeholder="here..."
        label="Language"
        shadow
      >
      </AtomicInput>
      <br />
      <div class="grid grid-cols-1">
        <AtomicButton
          @click="updateLanguage(input.language, true) && updateSkills()"
          >Save language
        </AtomicButton>

        <AtomicButton
          @click="updateLanguage(input.language, false) && updateSkills()"
          >Delete language
        </AtomicButton>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <AtomicInput
        v-model="input.specialist"
        name="name"
        type="text"
        placeholder="here..."
        label="Specialists"
        shadow
      >
      </AtomicInput>
      <br />
      <div class="grid grid-cols-1">
        <AtomicButton @click="updateSpecialist(input.specialist, true)"
          >Save specialist
        </AtomicButton>

        <AtomicButton @click="updateSpecialist(input.specialist, false)"
          >Delete specialist
        </AtomicButton>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <AtomicInput
        v-model="input.framework"
        name="name"
        type="text"
        placeholder="here..."
        label="Framework"
        shadow
      >
      </AtomicInput>
      <br />
      <div class="grid grid-cols-1">
        <AtomicButton @click="updateFramework(input.framework, true)"
          >Save language
        </AtomicButton>

        <AtomicButton @click="updateFramework(input.framework, false)"
          >Delete framework
        </AtomicButton>
      </div>
    </div>
  </div>

  <select class="text-black" v-model="input.selectedLanguage">
    <option v-for="language in dataSkills.data.languages" :key="language">
      {{ language }}
    </option>
  </select>

  <select class="text-black" v-model="input.selectedSpecialist">
    <option v-for="specialist in dataSkills.data.specialists" :key="specialist">
      {{ specialist }}
    </option>
  </select>

  <AtomicButton
    @click="
      assignSpecialist(
        input.selectedLanguage,
        input.selectedSpecialist,
        true,
      ) && updateSkills()
    "
    >Assign Specialist to language
  </AtomicButton>

  <AtomicButton
    @click="
      assignSpecialist(
        input.selectedLanguage,
        input.selectedSpecialist,
        false,
      ) && updateSkills()
    "
    >Detach Specialist to language
  </AtomicButton>

  <hr />

  <select class="text-black" v-model="input.selectedLanguage">
    <option v-for="language in dataSkills.data.languages" :key="language">
      {{ language }}
    </option>
  </select>

  <select class="text-black" v-model="input.selectedSpecialist">
    <option v-for="specialist in dataSkills.data.specialists" :key="specialist">
      {{ specialist }}
    </option>
  </select>

  <select class="text-black" v-model="input.selectedFramework">
    <option v-for="framework in dataSkills.data.frameworks" :key="framework">
      {{ framework }}
    </option>
  </select>

  <AtomicButton
    @click="
      assignFramework(
        input.selectedLanguage,
        input.selectedSpecialist,
        input.selectedFramework,
        true,
      ) && updateSkills()
    "
    >Assign Framework to Specialist and language
  </AtomicButton>

  <AtomicButton
    @click="
      assignFramework(
        input.selectedLanguage,
        input.selectedSpecialist,
        input.selectedFramework,
        false,
      ) && updateSkills()
    "
    >Detach Framework from specialist
  </AtomicButton>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useSkillManager, useSkills } from '../../composes/services'

export default defineComponent({
  async setup() {
    const {
      updateLanguage,
      updateSpecialist,
      updateFramework,
      assignSpecialist,
      assignFramework,
      getData,
    } = useSkillManager()
    const { getSkills } = useSkills()

    const input = ref({
      language: undefined,
      specialist: undefined,
      framework: undefined,
      selectedLanguage: undefined,
      selectedSpecialist: undefined,
      selectedFramework: undefined,
    })

    const skills = ref(await getSkills())
    const dataSkills = ref(await getData())

    const updateSkills = () => {
      setTimeout(async () => {
        skills.value = await getSkills()
        dataSkills.value = await getData()
      }, 300)
    }

    return {
      updateLanguage,
      updateSpecialist,
      updateFramework,
      updateSkills,
      assignSpecialist,
      assignFramework,
      input,
      skills,
      dataSkills,
    }
  },
})
</script>
