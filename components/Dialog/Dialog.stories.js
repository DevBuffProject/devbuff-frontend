import { withKnobs, text } from '@storybook/addon-knobs'
import WindowAbstract from '~/components/Dialog/WindowAbstract'

export default {
  title: 'Dialog',
  decorators: [withKnobs]
};

export const Default = () => {
  const SimleDialog = () => Promise.resolve({
    extends: WindowAbstract,

    props: {
      content: {
        default: ''
      }
    },

    template: `
      <div>
        <h3 class="mt-0 mb-3"> Lorem ipsum dolor sit amet </h3>

        <div>
          {{ content }}
        </div>

        <div class="d-flex justify-content-end mt-4">
          <v-button class="mr-2" type="muted" @click="$dialog.close"> Отмена </v-button>
          <v-button type="primary" @click="$dialog.close"> OK </v-button>
        </div>
      </div>
    `
  })

  return {
    props: {
      content: {
        default: text('Text', `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        `)
      }
    },
    methods: {
      open() {
        this.$dialog.push(SimleDialog, {
          content: this.content
        })
      }
    },
    template: `
      <v-app>
        <v-button @click="open"> Open </v-button>
      </v-app>
    `
  }
}
