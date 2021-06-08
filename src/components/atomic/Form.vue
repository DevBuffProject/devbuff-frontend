<template>
  <Form
    :validation-schema="schemas"
    class="
      grid grid-cols-12
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
    <div
      v-for="(input, index) in data"
      :key="`key_form` + input.name + index"
      :class="[
        input.type !== 'textarea' && 'col-span-6',
        input.type === 'textarea' && 'col-span-12',
      ]"
    >
      <AtomicInputNew
        :value="input.value"
        :name="input.name"
        :type="input.type"
        :label="input.label"
        :svg-icon-name="input.svgIconName"
      >
      </AtomicInputNew>
    </div>
    <AtomicButton class="flex items-center justify-center"> Save </AtomicButton>
  </Form>
</template>

<script>
import { Form } from 'vee-validate'
import { defineComponent } from 'vue'
import { NumberSchema, StringSchema, DateSchema } from 'yup'
import * as yup from 'yup'

export default defineComponent({
  name: 'VForm',
  components: {
    Form,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    let yupObject = {}

    const getMetaParam = (schema, nameOfParam) => {
      let meta = schema.describe()

      for (const test of meta.tests) {
        if (test.name === nameOfParam) {
          return test.params
        }
      }
      return undefined
    }

    for (const input of props.data) {
      input.type = 'text'

      if (input.schema instanceof StringSchema) {
        if (getMetaParam(input.schema, 'max')?.max >= 150) {
          input.type = 'textarea'
        } else if (getMetaParam(input.schema, 'email') !== undefined) {
          input.type = 'email'
        }
      } else if (input.schema instanceof NumberSchema) {
        input.type = 'number'
      } else if (input.schema instanceof DateSchema) {
        input.type = 'date'
      }
      yupObject[input.name] = input.schema
    }

    const schemas = yup.object(yupObject)
    return {
      schemas,
    }
  },
})
</script>
