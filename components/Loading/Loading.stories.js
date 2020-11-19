export default {
  title: 'Loading'
};

export const Spinner = () => ({
  template: `
    <v-app>
      <v-loading />
    </v-app>
  `
})

export const Page = () => ({
  template: `
    <v-app>
      <v-progress />
    </v-app>
  `
})
