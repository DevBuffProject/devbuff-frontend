import { withKnobs, text, select } from '@storybook/addon-knobs'

export default {
  title: 'Chip',
  decorators: [withKnobs],
}

export const Default = () => ({
  props: {
    text: {
      default: text('Text', 'chip'),
    },
    type: {
      default: select('Type', ['auto', 'primary'], 'auto'),
    },
  },
  template: `
    <v-app>
      <v-chip
        :text="text",
        :type="type"
      />
    </v-app>
  `,
})
