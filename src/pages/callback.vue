<template></template>

<script setup>
import { defineComponent } from 'vue'
import { useMainRoute, useRouter } from '../core/router'
import { useAuth } from '../composes'

const { mainRoute, ...router } = useRouter()

const { auth } = useAuth()
const code = mainRoute.value.query.code
const provider = mainRoute.value.params.provider

useRouter().replace({ name: 'explore' })
auth({ code, provider })
</script>
