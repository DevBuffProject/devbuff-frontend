<template>
  <div class="max-w-[800px]">
    <AtomicAlert
      v-if="!user.statusEmailConfirm && isVerifyEmailSent"
      style="cursor: pointer"
      type="warning"
    >
      <strong>{{ t('warning.email.header') }}</strong>
      {{ t('warning.email.message') }} ({{ user.email }})

      <div class="mt-4 grid justify-items-end">
        <AtomicButton
          is-small
          type="success"
          @click="onResendEmail"
          class="mr-2"
        >
          {{ t('warning.email.resendButton') }}
        </AtomicButton>
      </div>
    </AtomicAlert>

    <div class="flex justify-center">
      <WidgetSettingsAvatar class="my-4" />
    </div>

    <AtomicAlert v-if="conflictMessage" type="danger">
      <strong>{{ t('error.conflict') }}</strong>
      {{ conflictMessage }}
    </AtomicAlert>
    <AtomicTabs>
      <AtomicTabsTab name="О себе">
        <AtomicForm :data="data" @submit="onSubmit">
          <template #externalForms>
            <div>
              <AtomicButton :disabled="saveProcessing">Сохранить</AtomicButton>
            </div>
          </template>
        </AtomicForm>
      </AtomicTabsTab>

      <AtomicTabsTab name="Скиллы">
        <WidgetSettingsSkills />
      </AtomicTabsTab>
    </AtomicTabs>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useAuth, useI18n } from '../composes'
import * as yup from 'yup'

export default defineComponent({
  async setup() {
    const { t } = useI18n('pages.settings')
    const { user, getUser, saveUserData, resendEmail } = useAuth()

    await getUser()

    const data = [
      {
        schema: yup.string().min(3).max(39),
        label: 'Имя пользователя',
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
        label: 'Имя',
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
        label: 'Фамилия',
        name: 'lastName',
        placeholder: t('fields.lastName'),
        value: user.value.lastName,
      },
      {
        schema: yup.date().default(() => new Date()),
        label: 'День рождение',
        name: 'birthday',
        placeholder: t('fields.birthday'),
        value: user.value.birthday,
      },
      {
        schema: yup.string().min(0).max(300),
        label: 'О вас',
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
    const saveProcessing = ref(false)
    const onSubmit = async (data) => {
      // TODO: !reduce
      for (const indexValue of Object.keys(data)) {
        if (indexValue.indexOf(':') > -1) {
          const split = indexValue.split(':')
          if (data[split[0]] === undefined) data[split[0]] = {}
          data[split[0]][split[1]] = data[indexValue]
          delete data[indexValue]
        }
      }
      try {
        saveProcessing.value = true
        conflictFields.value = []
        await saveUserData(data)
        isVerifyEmailSent.value = false
      } catch (err) {
        conflictFields.value = err.message.split(',')
      } finally {
        saveProcessing.value = false
      }
    }

    const onResendEmail = async () => {
      await resendEmail()
      isVerifyEmailSent.value = false
    }

    const conflictMessage = computed(() => {
      if (conflictFields.value.length === 0) return undefined

      return conflictFields.value
        .map((value) => t(`fields.${value}`))
        .join(', ')
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
      saveProcessing,
    }
  },
})
</script>
