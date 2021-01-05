import { withKnobs, select, text, boolean, array } from '@storybook/addon-knobs'

export default {
  title: 'Input',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    type: {
      default: select('Type', [
        'text',
        'textarea'
      ])
    },
    placeholder: {
      default: text('Placeholder', 'Search')
    },
    name: {
      default: text('name', 'Search')
    },
    rules: {
      default: text('rules', false)
    },
    icon: {
      default: array('Icon', ['fas', 'search'], ':')
    }
  },
  template: `
    <v-app>
      <v-input
        :type="type"
        :placeholder="placeholder"
        :rules="rules"
        :icon="icon"
        :name="name"
      />
    </v-app>
  `
})
