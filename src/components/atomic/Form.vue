<template>
  <Form
    :validation-schema="schemas"
    class="
      grid grid-cols-2
      gap-4
      bg-white
      border border-gray-300 border-opacity-30
      dark:border-blueGray-700
      dark:bg-blueGray-900
      grid
      p-4
      rounded-xl
      relative
    "
  >
    <div v-for="(input, index) in data" :key="`key_form` + input.name + index">
      <AtomicInputNew
        :value="input.value"
        :name="input.name"
        :type="input.type"
        :label="input.label"
      >
      </AtomicInputNew>
    </div>
    <AtomicButton> Submit </AtomicButton>
  </Form>
</template>

<script>
import { Form } from 'vee-validate'
import { defineComponent } from 'vue'
import { NumberSchema, StringSchema } from 'yup'
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

    const getMaxValue = (schema) => {
      let meta = schema.describe()

      for (const test of meta.tests) {
        if (test.name === 'max') {
          return test.params.max
        }
      }
      return undefined
    }

    for (const input of props.data) {
      input.type = 'text'
      if (
        input.schema instanceof StringSchema &&
        getMaxValue(input.schema) >= 150
      ) {
        input.type = 'textarea'
      } else if (input.schema instanceof NumberSchema) {
        input.type = 'number'
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
