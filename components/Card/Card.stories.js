import { withKnobs, text } from '@storybook/addon-knobs'

export default {
  title: 'Card',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    content: {
      default: text('content', `
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      `)
    },
    header: {
      default: text('Header', 'Card header')
    },
    footer: {
      default: text('footer', 'Card footer')
    },
  },
  template: `
    <v-app>
      <v-card style="width: 500px">
        <template #header>
          {{ header }}
        </template>

        <div v-html="content" />

        <template #footer>
          {{ footer }}
        </template>
      </v-card>
    </v-app>
  `
})
