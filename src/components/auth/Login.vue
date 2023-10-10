<script setup lang="ts">
import { useLoginService } from '@/services/loginService'
import { reactive } from 'vue'
import { useErrorStore } from '@/store/errorStore'
import InputEmail from '@/components/forms/inputs/InputEmail.vue'
import InputPassword from '@/components/forms/inputs/InputPassword.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import DoorOpen from '@/components/icons/DoorOpen.vue'

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
    <InputEmail :values="formValues" :errors="errorStore.getValidationErrorsFor('email')" id="emailInput" name="email"
        label="Email" autocomplete="off" />

    <InputPassword :values="formValues" :errors="errorStore.getValidationErrorsFor('password')" name="password"
        id="password" label="Password" @keyup.enter="login" />

    <hr>
    <div class="d-flex justify-content-between">
        <button class="btn btn-login w-100" :class="{'disabled': !formValues.email || !formValues.password}" type="button" @click="login">
            <DoorOpen /> Login
        </button>
        <button class="btn btn-sm text-danger" type="button" @click="reset">
            <TrashIcon />
        </button>
    </div>
</template>
<style scoped>
.btn-login {
    background-color: rgba(22, 24, 27, 1);
    color: white;
}
</style>