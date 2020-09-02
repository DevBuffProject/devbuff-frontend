import { withKnobs, text, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Image',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    src: {
      default: text('src', '//source.unsplash.com/random')
    },
    tile: {
      default: boolean('Tile', false)
    }
  },
  template: `
    <v-app>
      <v-image
        :src="src"
        :tile="tile"
      />
    </v-app>
  `
})
