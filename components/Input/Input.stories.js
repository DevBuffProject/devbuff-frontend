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
    placeholderCentered: {
      default: boolean('Center placeholder', false)
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
        :placeholder-centered="placeholderCentered"
        :icon="icon"
      />
    </v-app>
  `
})
