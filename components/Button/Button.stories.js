import { withKnobs, text, select, array, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    label: {
      default: text('Label', 'Button')
    },
    type: {
      default: select('Type', {
        primary: 'primary',
        dark: 'dark',
        muted: 'muted',
        flat: 'flat'
      })
    },
    icon: {
      default: array('Icon', ['fas', 'plus'], ':')
    },
    loading: {
      default: boolean('Loading', false)
    },
    small: {
      default: boolean('Small', false)
    },
    rounded: {
      default: boolean('Rounded', false)
    },
    disabled: {
      default: boolean('Disabled', false)
    }
  },
  template: `
    <v-app>
      <v-button v-bind="$props">
        {{ label }}
      </v-button>
    </v-app>
  `
})
