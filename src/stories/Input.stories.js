import AtomicInput from '../components/atomic/Input.vue'

export default {
  title: 'Input',
  component: AtomicInput,
}

const Template = (args) => ({
  components: { AtomicInput },
  setup() {
    return { args }
  },
  template: `
    <AtomicInput :model-value="args.value" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  value: '',
}
