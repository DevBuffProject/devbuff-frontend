import { withKnobs, select, text, boolean, array } from '@storybook/addon-knobs'

export default {
  title: 'Input',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    type: {
      default: text('Type', 'text')
    },
    textarea: {
      default: boolean('textarea', false)
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
        :textarea="textarea"
        :type="type"
        :placeholder="placeholder"
        :placeholder-centered="placeholderCentered"
        :icon="icon"
      />
    </v-app>
  `
})
