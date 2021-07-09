<template>
  <div class="flex">
    <AtomicNotification
      v-if="!user.statusEmailConfirm && isVerifyEmailSent"
      @click="onResendEmail"
      style="cursor: pointer"
      type="warning"
      :message="`Your email not confirmed`"
      :description="`Для того чтобы вы могли получать уведомления о ваших идеях, необходимо подтвердить Email. Переотправить письмо на адрес ${user.email}`"
    />
  </div>
  <div class="flex">
    <AtomicNotification
      v-if="conflictMessage"
      type="danger"
      :message="t('error.confict')"
      :description="conflictMessage"
    />
  </div>
  <div class="w-full grid grid-cols-12">
    <h3 class="col-span-12">
      {{ t('form.user') }}
    </h3>
    <AtomicForm
      :data="data"
      @submit="onSubmit"
      class="col-span-12"
    />
  </div>
  <div class="grid grid-cols-12">
    <h3 class="col-span-12">
      {{ t('form.skills') }}
    </h3>
    <WidgetProfileSkills class="col-span-12 w-full h-auto" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useUser } from '../composes/core'
import * as yup from 'yup'
import { useI18n } from '../composes/utils'

export default defineComponent({
  async setup() {
    const { t } = useI18n('pages.settings')
    const { user, getUser, saveUserData, resendEmail } = useUser()

    const data = [
      {
        schema: yup.string().min(4).max(10),
        label: 'User name',
        name: 'userName',
        placeholder: t('fields.userName'),
        value: user.value.userName,
      },
      {
        schema: yup.string().email(),
        label: 'Email',
        name: 'email',
        placeholder: t('fields.email'),
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
        placeholder: t('fields.firstName'),
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
        placeholder: t('fields.lastName'),
        value: user.value.lastName,
      },
      {
        schema: yup.date().default(() => new Date()),
        label: 'Birthday',
        name: 'birthday',
        placeholder: t('fields.birthday'),
        value: user.value.birthday,
      },
      {
        schema: yup.string().min(0).max(300),
        label: 'Bio',
        name: 'bio',
        placeholder: t('fields.bio'),
        value: user.value.bio,
      },
      {
        schema: yup
          .string()
          .min(3)
          .max(15)
          .matches(/^[A-z0-9]*$/)
          .nullable(),
        label: 'Telegram',
        name: 'socialNetworks:telegram',
        value: user.value.socialNetworks.telegram,
        placeholder: 'username',
        svgIconName: 'Telegram',
      },
      {
        schema: yup
          .string()
          .matches(/^([A-z0-9]{4,})(#)(\d{4})$/)
          .nullable(),
        label: 'Discord',
        name: 'socialNetworks:discord',
        value: user.value.socialNetworks.discord,
        placeholder: 'DevBuffUser#1234',
        svgIconName: 'Discord',
      },
      {
        schema: yup
          .string()
          .matches(/^([A-z0-9_:]{3,15})$/)
          .nullable(),
        label: 'Skype',
        name: 'socialNetworks:skype',
        value: user.value.socialNetworks.skype,
        placeholder: 'username',
        svgIconName: 'Skype',
      },
      {
        schema: yup
          .string()
          .matches(/^([A-z0-9_]{3,15})$/)
          .nullable(),
        label: 'Vk',
        name: 'socialNetworks:vk',
        value: user.value.socialNetworks.vk,
        svgIconName: 'Vk',
        placeholder: 'username',
      },
    ]
    const isVerifyEmailSent = ref(true)
    const conflictFields = ref([])

    const onSubmit = async (data) => {
      // TODO
      // !reduce
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
      try {
        conflictFields.value = []
        await saveUserData(data)
        isVerifyEmailSent.value = false
      } catch (err) {
        conflictFields.value = err.message.split(',')
      }
    }

    const onResendEmail = async () => {
      await resendEmail()
      isVerifyEmailSent.value = false
    }

    await getUser()

    const conflictMessage = computed(() => {
      if (conflictFields.value.length === 0) return undefined

      return conflictFields.value.map(value => {
        return t(`fields.${value}`)
      }).join(', ')
    })

    return {
      t,
      yup,
      data,
      isVerifyEmailSent,
      conflictMessage,
      user,
      onSubmit,
      onResendEmail,
    }
  },
})
</script>
