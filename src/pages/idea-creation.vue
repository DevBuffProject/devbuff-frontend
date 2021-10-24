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
        class="
          -mx-4
          px-4
          bg-light-500
          dark:bg-dark-700
          divide-y divide-light-800
          dark:divide-dark-300
          flex flex-col
        "
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
        name="skills"
        v-model="data.specialists"
        class="my-6"
      />

      <AtomicButton :disabled="!meta.valid">
        {{ t('save') }}
      </AtomicButton>
    </Form>
  </div>
</template>

<script>
import { Form } from 'vee-validate'
import { defineComponent, ref } from 'vue'
import { useIdea, useI18n } from '../composes'
import { useRouter } from 'vue-router'
import { set, useStorage, useTitle } from '@vueuse/core'
import * as yup from 'yup'
import { htmlToText } from 'html-to-text'

export default defineComponent({
  components: { Form },
  props: {
    id: { type: String, default: undefined },
  },
  async setup(props) {
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

    const data = isEditingMode
      ? ref(initial)
      : useStorage('editor-draft', initial)

    useTitle('Создание идеи')

    if (props.id) {
      await getIdea(props.id)
      useTitle(`Редактирование идеи - ${idea.value.name}`)
      set(data, {
        name: idea.value.name || '',
        description: idea.value?.description || '',
        text: idea.value.text || '',
        specialists: idea.value.specialist || '',
      })
    }

    const onSubmit = async () => {
      console.log(data)
      if (isEditingMode) {
        await updateIdea(props.id, data.value)
        await router.push({
          name: `idea-detail`,
          params: { id: props.id },
        })
      } else {
        const { id } = await publishIdea(data.value)
        await router.push({
          name: `idea-detail`,
          params: { id },
        })
      }
      set(data, initial)
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

    return {
      t,
      onSubmit,
      data,
      schema,
      isLoading,
      isEditingMode,
    }
  },
})
</script>
