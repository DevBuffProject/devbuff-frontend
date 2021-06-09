<template>
  <div>
    <label :class="['block', inlineLabel && 'flex items-center']">
      <div
        v-if="label"
        class="font-medium text-xs mt-2 mb-1 mr-6"
        style="min-width: 70px; max-width: 150px"
      >
        {{ label }}
      </div>
      <div
        :class="[
          'relative w-full inline-flex rounded-md overflow-hidden rounded box-border',
          'items-baseline cursor-pointer transition-all outline-none',
          'border-2 bg-white dark:bg-blueGray-700',
          errorMessage &&
            '!border-danger !ring-danger-200 dark:!ring-danger-900',
          isFocused
            ? 'ring ring-primary-200 dark:ring-primary-900 border-primary'
            : 'border-gray-300 dark:border-blueGray-700',
        ]"
        @mousedown="setFocus"
      >
        <textarea
          v-if="type === 'textarea'"
          ref="field"
          :class="[
            'w-full py-2 px-4 bg-transparent outline-none w-full',
            'resize-none min-h-[100px]',
          ]"
          :name="name"
          :id="name"
          :type="type"
          :value="inputValue"
          @input="handleChange"
          @blur="onBlur"
          @focus="onFocus"
        />

        <div v-else class="flex flex-wrap items-stretch relative">
          <div class="flex" v-if="svgIconName">
            <Svg
              class="
                flex
                items-center
                leading-normal
                border-1
                rounded-r-none
                px-3
                whitespace-no-wrap
                text-sm
                w-12
                h-10
                justify-center
                items-center
                text-xl
                rounded-lg
                text-black
                dark:text-white
              "
              :name="svgIconName"
            />
          </div>
          <input
            class="
              flex-shrink flex-grow flex-auto
              leading-normal
              flex-1
              relative
              w-full
              py-2
              px-4
              bg-transparent
              outline-none
              resize-none
            "
            :name="name"
            :id="name"
            :type="type"
            :value="inputValue"
            @input="handleChange"
            @blur="onBlur"
            @focus="onFocus"
          />
        </div>
      </div>
    </label>
    <div
      v-if="errorMessage"
      v-motion="'errorMessage'"
      :initial="{ marginTop: -10, opacity: 0 }"
      :enter="{ marginTop: 0, opacity: 1 }"
      class="flex items-center pt-1 text-xs text-danger"
    >
      <span class="mt-px">{{ errorMessage }}</span>
    </div>
  </div>
</template>


<script>
import { defineComponent, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
export default defineComponent({
  name: 'VInputNew',
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    inlineLabel: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      default: '',
    },
    svgIconName: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    })

    const isFocused = ref(false)
    const onFocus = () => (isFocused.value = true)

    const onBlur = () => (isFocused.value = false)
    return {
      inputValue,
      meta,
      errorMessage,
      handleChange,
      handleBlur,
      isFocused,
      onFocus,
      onBlur,
    }
  },
})
</script>
