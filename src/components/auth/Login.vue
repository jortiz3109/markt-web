<script setup lang="ts">
import { useLoginService } from '@/services/loginService'
import { reactive } from 'vue'
import { useErrorStore } from '@/store/errorStore'
import InputEmail from '@/components/forms/inputs/InputEmail.vue'
import InputPassword from '@/components/forms/inputs/InputPassword.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import DoorOpen from '@/components/icons/DoorOpen.vue'
import Logo from '@/components/icons/Logo.vue'

const errorStore = useErrorStore()

const initialState = (): { email: string, password: string } => ({
    email: '',
    password: ''
})

const formValues = reactive(initialState())
const reset = () => {
    Object.assign(formValues, initialState())
    errorStore.clear()
}

const login = () => useLoginService().login(formValues)

</script>
<template>
    <div class="login">
        <picture class="rounded text-secondary p-2 d-flex justify-content-center">
            <Logo width="64" height="64"/>
        </picture>
        <div class="card border-0 w-100">
            <div class="card-body">
                <InputEmail :values="formValues" :errors="errorStore.getValidationErrorsFor('email')"
                    id="emailInput" name="email" label="Email" autocomplete="off" />
                <InputPassword :values="formValues" :errors="errorStore.getValidationErrorsFor('password')" name="password"
                    id="password" label="Password" @keyup.enter="login"/>
            </div>
            <div class="card-footer border-0 bg-transparent d-flex justify-content-between">
                <button class="btn btn-success w-100" type="button" @click="login">
                    <DoorOpen /> Login
                </button>
                <button class="btn btn-sm text-danger" type="button" @click="reset">
                    <TrashIcon />
                </button>
            </div>
        </div>
    </div>
</template>