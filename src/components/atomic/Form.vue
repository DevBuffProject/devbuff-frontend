<template>
  <Form :validation-schema="schemas" class="grid grid-cols-2 gap-4 relative">
    <div
      v-for="(input, index) in data"
      :key="`key_form-${input.name + index}`"
      :class="[
        input.type === 'textarea' || input.type === 'editor'
          ? 'col-span-2'
          : 'col-span-1',
      ]"
    >
      <div v-if="input.type === 'editor'">
        <AtomicEditor
          :value="input.value"
          :label="input.label"
          :name="input.name"
          :placeholder="input.placeholder"
        />
      </div>
      <AtomicInput
        v-else-if="input.type != 'mixed'"
        v-model="input.value"
        :name="input.name"
        :type="input.type"
        :label="input.label"
        :placeholder="input.placeholder"
        :svg-icon-name="input.svgIconName"
      />
    </div>
    <slot name="externalForms" />
    <div><AtomicButton class=""> Save </AtomicButton></div>
  </Form>
</template>

<script>
import { Form } from 'vee-validate'
import { defineComponent } from 'vue'
import { NumberSchema, StringSchema, DateSchema, ArraySchema } from 'yup'
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
  setup: function (props) {
    let yupObject = {}

    const getMetaParam = (schema, nameOfParam) => {
      let meta = schema.describe()

      for (const test of meta.tests)
        if (test.name === nameOfParam) return test.params
      return undefined
    }

    for (const input of props.data) {
      input.type = 'text'

      if (input.schema instanceof StringSchema) {
        if (getMetaParam(input.schema, 'max')?.max >= 5000) {
          input.type = 'editor'
        } else if (getMetaParam(input.schema, 'max')?.max >= 150) {
          input.type = 'textarea'
        } else if (getMetaParam(input.schema, 'email') !== undefined) {
          input.type = 'email'
        }
      } else if (input.schema instanceof NumberSchema) {
        input.type = 'number'
      } else if (input.schema instanceof DateSchema) {
        input.type = 'date'
      } else if (input.schema instanceof ArraySchema) {
        input.type = 'mixed'
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
