<script setup lang="ts">
import InputEmail from '@/components/forms/inputs/InputEmail.vue'
import InputPassword from '@/components/forms/inputs/InputPassword.vue'
import loginService from '@/services/loginService'
import router from '@/router'

import { reactive } from 'vue'
import { useErrorStore } from '@/store/errorStore'
import { useAuthStore } from '@/store/authStore'

const errorStore = useErrorStore()
const authStore = useAuthStore()

const login = () => loginService
    .login(formValues, authStore)
    .then(() => {
        authStore.setAuthenticated()
        router.push({ name: 'home' })
    })

const initialState = (): { email: string, password: string } => ({
    email: '',
    password: ''
})

const formValues = reactive(initialState())
const reset = () => {
    Object.assign(formValues, initialState())
    errorStore.clear()
}

</script>
<template>
    <div class="login">
        <div class="card w-100">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span>Login</span>
                <button class="btn btn-sm btn-danger" type="button" @click="reset"><img
                        src="@/assets/icons/trash.svg"></button>
            </div>
            <div class="card-body">
                <InputEmail :values="formValues" :errors="errorStore.getValidationErrorsFor('email')" name="email"
                    id="email" label="Email" />
                <InputPassword :values="formValues" :errors="errorStore.getValidationErrorsFor('password')" name="password"
                    id="password" label="Password" />
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-success w-75" type="button" @click="login">Login</button>
            </div>
        </div>
    </div>
</template>