<template>
  <div>
    <h3 class="!mt-0">{{ t('header') }}</h3>
    <Form
      @submit.prevent
      class="
        -mx-4
        px-4
        bg-light-500
        divide-y divide-light-800
        flex flex-col
        text-xl
        font-thin
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
      <WidgetEditor v-model="data.text" />
    </Form>

    <WidgetSpecialistPicker v-model="data.specialists" class="my-6" />
    <AtomicButton @click="onSubmit">{{ t('save') }}</AtomicButton>
  </div>
</template>

<script>
import { Form } from 'vee-validate'
import { defineComponent } from 'vue'
import { useIdea } from '../composes/core'
import { useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { useI18n } from '../composes/utils'
import * as yup from 'yup'

export default defineComponent({
  components: { Form },
  props: {
    id: { type: String, default: undefined },
  },
  async setup(props) {
    const { t } = useI18n('pages.ideaCreation')
    const { idea, publishIdea, getIdea, updateIdea } = useIdea()
    const router = useRouter()
    let isEditingMode = false
    let data = { text: '' }

    useTitle('Создание идеи')

    if (props.id) {
      await getIdea(props.id)
      useTitle('Редактирование идеи - ' + idea.value.name)

      isEditingMode = true
      data = {
        name: idea.value?.name,
        description: idea.value?.description,
        text: idea.value?.text ? idea.value.text : '',
        specialists: idea.value?.specialist,
      }
    }

    const onSubmit = async () => {
      if (isEditingMode) {
        await updateIdea(props.id, data)
        await router.push({
          name: `idea-detail`,
          params: { id: props.id },
        })
      } else {
        const { id } = await publishIdea(data)
        await router.push({
          name: `idea-detail`,
          params: { id },
        })
      }
    }

    const schemas = yup.object({
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
      text: yup.string().min(150).max(15000).required(),
      specialists: yup.array().min(1).max(10).required(),
    })

    return {
      t,
      onSubmit,
      data,
      schemas,
      isEditingMode,
    }
  },
})
</script>
