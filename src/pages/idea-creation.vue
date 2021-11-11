<template>
  <div>
    <h3 class="!mt-0">{{ t('header') }}</h3>
    <Form
      :validation-schema="schema"
      ref="form"
      @submit="onSubmit"
      v-slot="{ meta }"
    >
      <div
        :class="'-mx-4 p-4 pb-0 bg-light-500 dark:bg-dark-700 dark:divide-dark-300 flex flex-col'"
      >
        <AtomicInput
          v-model="data.name"
          name="name"
          type="text"
          :label="t('name.title')"
          :placeholder="t('name.placeholder')"
          shadow
        />
        <AtomicInput
          v-model="data.description"
          name="description"
          type="textarea"
          :label="t('description.title')"
          :placeholder="t('description.placeholder')"
          shadow
        />
        <WidgetEditor name="text" v-model="data.text" />
      </div>

      <WidgetSpecialistPicker
        v-model="data.specialists"
        name="skills"
        class="my-6"
      />

      <AtomicButton :disabled="!meta.valid">
        {{ t('save') }}
      </AtomicButton>
    </Form>

    <AtomicSnackbar v-model="isUpdating">
      <AtomicLoadingSpinner class="mr-2" />
      <span class="mt-0.5">Обновление</span>
    </AtomicSnackbar>
    <AtomicSnackbar v-model="isPublishing">
      <AtomicLoadingSpinner class="mr-2" />
      <span class="mt-0.5">Публикация</span>
    </AtomicSnackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useIdea, useI18n } from '../composes'
import { useRouter } from 'vue-router'
import { useStorage, useTitle } from '@vueuse/core'
import * as yup from 'yup'

const props = defineProps({
  id: { type: String, default: undefined },
})
const { t } = useI18n('pages.ideaCreation')
const { idea, publishIdea, getIdea, updateIdea, isLoading } = useIdea()
const router = useRouter()
const isEditingMode = !!props.id

const initial = {
  name: '',
  description: '',
  text: '',
  specialists: [],
}

const data = isEditingMode ? ref(initial) : useStorage('editor-draft', initial)

useTitle('Создание идеи')

if (props.id) {
  await getIdea(props.id)
  useTitle(`Редактирование идеи - ${idea.value.name}`)
  data.value = {
    name: idea.value.name || '',
    description: idea.value?.description || '',
    text: idea.value.text || '',
    specialists: idea.value.specialist || '',
  }
}

const isUpdating = ref(false)
const isPublishing = ref(false)
const error = ref(null)
const onSubmit = async () => {
  if (isEditingMode) {
    try {
      isUpdating.value = true
      await updateIdea(props.id, data.value)
      await router.push({ name: `idea-detail`, params: { id: props.id } })
    } catch (e) {
      error.value = e
    } finally {
      isUpdating.value = false
    }
  } else {
    try {
      const { id } = await publishIdea(data.value)
      await router.push({ name: `idea-detail`, params: { id } })
    } catch (e) {
      error.value = e
    } finally {
      isPublishing.value = false
    }
  }
  data.value = initial
}

const schema = yup.object({
  name: yup
    .string()
    .matches(/^([A-zА-яЁё.,\-\s]{3,30})$/)
    .min(3)
    .max(30)
    .required(),
  description: yup
    .string()
    .matches(/^([A-zА-яЁё.,;:!?\-\s]{15,300})$/)
    .min(15)
    .max(300)
    .required(),
  skills: yup.array().min(1).max(10).required(),
  text: yup.string().min(100).max(5000).required(),
})
</script>
