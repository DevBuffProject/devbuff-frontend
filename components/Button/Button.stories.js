import { withKnobs, text, select, array } from '@storybook/addon-knobs'

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    text: {
      default: text('Label', 'Button')
    },
    type: {
      default: select('Type', {
        'contrast': 'contrast',
        'primary flat': 'primary-flat',
        'warning flat': 'warning-flat',
        'danger flat': 'danger-flat',
        'primary': 'primary',
        'warning': 'warning',
        'danger': 'danger',
        'dark': 'dark',
        'muted': 'muted',
      })
    },
    icon: {
      default: array('Icon', ['fas', 'plus'], ':')
    },
  },
  template: `
    <v-app>
      <v-button
        :type="type"
        :icon="icon"
      >
        {{ text }}
      </v-button>
    </v-app>
  `
})
