<template>
  <div>
    <div
      v-for="(contact, contactName) of contacts"
      :key="contactName"
      class="mb-2"
    >
      <div class="mb-2 flex items-center">
        <svg :name="contactName" />
        <span class="ml-2">
          <a
            v-if="hrefs[contactName]"
            :href="`${hrefs[contactName]}/${contact}`"
            class="text-primary-500 hover:underline"
          >
            {{ contact }}
          </a>
          <span v-else>{{ contact }}</span>
        </span>
        <span class="text-gray-400 dark:text-dark-500">
          <i class="mx-1" v-text="'—'" />
          {{ contactName }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { pick } from 'lodash'

export default {
  name: 'WidgetUserContacts',
  props: {
    vk: {
      type: String,
      default: '',
    },
    telegram: {
      type: String,
      default: '',
    },
    discord: {
      type: String,
      default: '',
    },
    skype: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    hrefs: {
      vk: 'https://vk.com/',
      telegram: 'https://t.me/',
      skype: 'skype:',
      discord: '',
    },
  }),
  computed: {
    contacts() {
      const { vk, telegram, skype, discord } = this
      const contacts = { vk, telegram, skype, discord }
      const nonEmptyContacts = Object.keys(contacts).filter(
        (key) => !!contacts[key],
      )
      return pick(contacts, nonEmptyContacts)
    },
  },
}
</script>
