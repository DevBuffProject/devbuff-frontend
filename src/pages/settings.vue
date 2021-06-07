<template>
  <div class="flex mb-12">
    <AtomicForm :data="data" @submit="test"> </AtomicForm>
  </div>
  <div class="flex">
    <WidgetProfileSkills class="w-full h-auto"> </WidgetProfileSkills>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import * as yup from 'yup'
export default defineComponent({
  setup() {
    const data = [
      {
        schema: yup.number().min(1).max(10),
        label: 'TestValue',
        name: 'test_value',
        value: 2,
      },
      {
        schema: yup.string().required().min(10).max(140),
        label: 'Test string',
        name: 'test_value_string',
        value: '2',
      },
    ]
    const test = (a) => {
      console.log(a)
    }

    return {
      yup,
      data,
      test,
    }
  },
})
</script>
