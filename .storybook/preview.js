import { app } from '@storybook/vue3'
import Focusable from '../src/app/directives/focusable.js'

import '../src/styles.css'

app.directive(Focusable.name, Focusable)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
