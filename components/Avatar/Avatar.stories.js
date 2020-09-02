import { withKnobs, text, number, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Avatar',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    avatar: {
      default: text('Avavar URL', '//source.unsplash.com/random')
    },
    square: {
      default: boolean('Square', false)
    },
    size: {
      default: number('Size (px)', 50, {
        range: true,
        min: 50,
        max: 120,
        step: 1,
      })
    }
  },
  template: `
    <v-app>
      <v-avatar
        :avatar="avatar"
        :square="square"
        :size="size + 'px'"
      />
    </v-app>
  `
})
