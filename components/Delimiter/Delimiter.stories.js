import { withKnobs, text } from '@storybook/addon-knobs'

export default {
  title: 'Delimiter',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    text: {
      default: text('Text', 'or')
    }
  },
  template: `
    <v-app>
      <v-delimiter
        style="width: 500px"
        :text="text"
      />
    </v-app>
  `
})
