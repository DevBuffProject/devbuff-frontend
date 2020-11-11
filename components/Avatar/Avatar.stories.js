import { withKnobs, text, number, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Avatar',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    avatar: {
      default: text('Avavar URL', 'https://images.unsplash.com/photo-1603998495505-bb6bf7502119?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max')
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
