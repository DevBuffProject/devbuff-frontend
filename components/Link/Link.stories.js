import { withKnobs, text, array, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Link',
  decorators: [withKnobs]
};

export const External = () => ({
  props: {
    label: {
      default: text('Label', 'Navigate')
    },
    external: {
      default: boolean('External', false)
    },
    icon: {
      default: array('Icon', ['fas', 'plus'], ':')
    }
  },
  template: `
    <v-app>
      <v-link
        v-bind="external
          ? { href: '//google.com' }
          : { to: { name: 'index' } }
        "
        :icon="icon"
      >
        {{ label }}
      </v-link>
    </v-app>
  `
})
