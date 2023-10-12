<script setup lang="ts">
import { useLoginService } from '@/services/loginService'
import { reactive } from 'vue'
import { useErrorStore } from '@/store/errorStore'
import { useToast } from '@/composables/useToast'
import InputEmail from '@/components/forms/inputs/InputEmail.vue'
import InputPassword from '@/components/forms/inputs/InputPassword.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import DoorOpenIcon from '@/components/icons/DoorOpenIcon.vue'
import router from '@/routes/web'
import { useAuthStore } from '@/store/authStore'

const errorStore = useErrorStore()
const authStore = useAuthStore()
const loginService = useLoginService()

const initialState = (): { email: string, password: string } => ({
    email: '',
    password: ''
})

const formValues = reactive(initialState())
const reset = () => {
    Object.assign(formValues, initialState())
    errorStore.clear()
}

const login = async () => {
    const notification = useToast()
    notification.info('Authenticating')
    loginService.login(formValues)
        .then((response) => {
            const { token, expires_at } = response
            authStore.setToken({ token, expiresAt: expires_at })
            authStore.setUser(response.user)
            notification.clear()
            notification.success('Authenticated!')
            router.push({ name: 'home' })
        }).catch((error) => {
            notification.clear()
            notification.error(error.message)
        })

}

</script>
<template>
    <InputEmail :values="formValues" :errors="errorStore.getValidationErrorsFor('email')" id="emailInput" name="email"
        label="Email" autocomplete="off" />

    <InputPassword :values="formValues" :errors="errorStore.getValidationErrorsFor('password')" name="password"
        id="password" label="Password" />

    <hr>
    <div class="d-flex justify-content-between">
        <button class="btn btn-login w-100" :class="{ 'disabled': !formValues.email || !formValues.password }" type="button"
            @click="login">
            <DoorOpenIcon /> Login
        </button>
        <button class="btn btn-sm text-white" type="button" @click="reset">
            <TrashIcon />
        </button>
    </div>
</template>