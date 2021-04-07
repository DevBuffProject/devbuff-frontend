import { withKnobs, text, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Image',
  decorators: [withKnobs],
}

export const Default = () => ({
  props: {
    src: {
      default: text(
        'src',
        'https://images.unsplash.com/photo-1603998495505-bb6bf7502119?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
      ),
    },
    tile: {
      default: boolean('Tile', false),
    },
  },
  template: `
    <v-app>
      <v-image
        :src="src"
        :tile="tile"
      />
    </v-app>
  `,
})
