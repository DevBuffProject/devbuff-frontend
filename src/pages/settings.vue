<template>
  <div class="flex">
    <div
      class="
        flex
        justify-center
        items-center
        m-1
        font-medium
        py-1
        px-2
        bg-white
        rounded-md
        text-yellow-700
        bg-yellow-100
        border border-yellow-300
      "
    >
      <div v-if="!user.statusEmailConfirm">
        <component :is="InformationIcon" />
      </div>
      <div class="text-xl font-normal max-w-full flex-initial">
        <div class="py-2">
          Your email not confirmed
          <div class="text-sm font-base">
            Resend
            <a href="/#">TODO</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full grid grid-cols-12">
    <h3 class="col-span-12">User data</h3>
    <AtomicForm :data="data" @submit="onSubmit" class="col-span-12">
    </AtomicForm>
  </div>
  <div class="grid grid-cols-12">
    <h3 class="col-span-12">Skills settings</h3>
    <WidgetProfileSkills class="col-span-12 w-full h-auto">
    </WidgetProfileSkills>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import * as yup from 'yup'
import { useUser } from '../composes/core'

import { InformationIcon, AirplayToTvIcon } from '@iconicicons/vue3'

export default defineComponent({
  async setup() {
    const { user, getUser, saveUserData } = useUser()

    const data = [
      {
        schema: yup.string().min(4).max(10),
        label: 'User name',
        name: 'userName',
        value: user.value.userName,
      },
      {
        schema: yup.string().email(),
        label: 'Email',
        name: 'email',
        value: user.value.email,
      },

      {
        schema: yup
          .string()
          .matches(/^[A-Za-zА-яа-я]*$/)
          .min(3)
          .max(30)
          .required(),
        label: 'First name',
        name: 'firstName',
        value: user.value.firstName,
      },
      {
        schema: yup
          .string()
          .matches(/^[A-Za-zА-яа-я]*$/)
          .min(3)
          .max(30)
          .required(),
        label: 'Last name',
        name: 'lastName',
        value: user.value.lastName,
      },
      {
        schema: yup.date().default(() => new Date()),
        label: 'Birthday',
        name: 'birthday',
        value: user.value.birthday,
      },
      {
        schema: yup.string().min(0).max(300),
        label: 'Bio',
        name: 'bio',
        value: user.value.bio,
      },
      {
        schema: yup
          .string()
          .min(3)
          .max(15)
          .matches(/^[A-z0-9]*$/),
        label: 'Telegram',
        name: 'socialNetworks:telegram',
        value: user.value.socialNetworks.telegram,
        svgIconName: 'Telegram',
      },
      {
        schema: yup.string().matches(/^([A-z0-9]{4,})(#)(\d{4})$/),
        label: 'Discord',
        name: 'socialNetworks:discord',
        value: user.value.socialNetworks.discord,
        svgIconName: 'Discord',
      },
      {
        schema: yup.string().matches(/^([A-z0-9_:]{3,15})$/),
        label: 'Skype',
        name: 'socialNetworks:skype',
        value: user.value.socialNetworks.skype,
        svgIconName: 'Skype',
      },
      {
        schema: yup.string().matches(/^([A-z0-9_]{3,15})$/),
        label: 'Vk',
        name: 'socialNetworks:vk',
        value: user.value.socialNetworks.vk,
        svgIconName: 'Vk',
      },
    ]

    const onSubmit = (data) => {
      for (const indexValue of Object.keys(data)) {
        if (indexValue.indexOf(':') > -1) {
          const split = indexValue.split(':')
          if (data[split[0]] === undefined) {
            data[split[0]] = {}
          }
          data[split[0]][split[1]] = data[indexValue]
          delete data[indexValue]
        }
      }
      saveUserData(data)
    }

    await getUser()

    return {
      yup,
      data,
      onSubmit,
      InformationIcon,
      user,
    }
  },
})
</script>
