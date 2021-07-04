<template>
  <div class="w-full grid grid-cols-12">
    <h3 class="col-span-12">{{ t('header') }}</h3>
    <Form
      :validation-schema="schemas"
      @submit="onSubmit"
      class="
        col-span-12
        gap-4
        bg-white
        border border-gray-300 border-opacity-30
        dark:border-blueGray-700
        dark:bg-blueGray-900
        p-4
        rounded-xl
        relative
      "
    >
      <div class="grid grid-cols-12">
        <div class="col-span-6">
          <AtomicInputNew
            :value="data.name"
            name="name"
            type="text"
            :label="t('name.title')"
            :placeholder="t('name.placeholder')"
          />
        </div>

        <div class="col-span-12">
          <AtomicInputNew
            :value="data.description"
            name="description"
            type="textarea"
            :label="t('description.title')"
            :placeholder="t('description.placeholder')"
          />
        </div>
        <div class="col-span-12">
          <AtomicEditor
            :value="data.text"
            name="text"
            :label="t('text.title')"
            :placeholder="t('text.placeholder')"
          />
        </div>
        <div class="col-span-12">
          <WidgetSpecialistPicker :data="data.specialists" />
        </div>
        <AtomicButton class="col-start-11 col-span-2"
          >{{ t('save') }}
        </AtomicButton>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form } from 'vee-validate'
import { defineComponent } from 'vue'
import * as yup from 'yup'
import { useIdea } from '../composes/core'
import { useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { useI18n } from '../composes/utils'

export default defineComponent({
  components: {
    Form,
  },
  props: {
    id: { type: String, default: undefined },
  },
  async setup(props) {
    const { t } = useI18n('pages.ideaCreation')
    const { idea, publishIdea, getIdea, updateIdea } = useIdea()
    const router = useRouter()
    let isEditingMode = false
    let data = {}

    useTitle('Создание идеи')

    if (props.id) {
      await getIdea(props.id)
      useTitle('Редактирование идеи - ' + idea.value.name)
      isEditingMode = true
      data = {
        name: idea.value?.name,
        description: idea.value?.description,
        text: idea.value?.text ? idea.value.text : '',
        specialists: idea.value.specialist,
      }
    }

    let yupObject = {
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
    }

    const onSubmit = async (data) => {
      if (isEditingMode) {
        updateIdea(props.id, data).then(() =>
          router.replace({
            name: `idea-detail`,
            params: {
              id: props.id,
            },
          }),
        )
      } else {
        publishIdea(data).then((result) =>
          router.replace({
            name: `idea-detail`,
            params: {
              id: result.id,
            },
          }),
        )
      }
    }

    const schemas = yup.object(yupObject)
    return {
      t,
      data,
      schemas,
      onSubmit,
      isEditingMode,
    }
  },
})
</script>
