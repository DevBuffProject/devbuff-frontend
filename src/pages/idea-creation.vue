<template>
  <div class="w-full grid grid-cols-12">
    <h3 class="col-span-12">Idea creation</h3>
    <AtomicForm :data="data" @submit="onSubmit" class="col-span-12">
      <template #externalForms>
        <div class="col-span-12">
          <WidgetSpecialistPicker name="specialists" - v-model="inputValue" />
        </div>
      </template>
    </AtomicForm>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import * as yup from 'yup'
import { useField } from 'vee-validate'

export default defineComponent({
  async setup() {
    const data = [
      {
        schema: yup
          .string()
          .matches(/^([A-zА-яЁё.,\-\s]{3,30})$/)
          .min(3)
          .max(30)
          .required(),
        label: 'Idea name',
        name: 'name',
        placeholder: 'Название вашей идеи/проекта',
        value: '',
      },
      {
        schema: yup
          .string()
          .matches(/^([A-zА-яЁё.,;:!?\-\s]{15,300})$/)
          .min(15)
          .max(300)
          .required(),
        label: 'Description',
        name: 'description',
        placeholder: 'Опишите кратко вашу идею',
        value: '',
      },
      {
        schema: yup.string().min(150).max(15000).required(),
        name: 'text',
        label: 'Текст вашей идеи',
        placeholder: 'Опишите кратко вашу идею',
        value: '',
      },
    ]

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField('specialists', undefined)

    const onSubmit = async (data) => {
      console.log(data)
    }
    return {
      inputValue,
      data,
      onSubmit,
    }
  },
})
</script>
