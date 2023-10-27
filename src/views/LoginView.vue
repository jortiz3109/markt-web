<script setup lang="ts">
import Login from '@/components/auth/Login.vue'
import Logo from '@/components/icons/Logo.vue'
</script>
<template>
    <div class="login-container">
        <div class="card border-1 text-dark bg-light bg-opacity-10 shadow card-login">
            <div class="d-flex justify-content-center p-3">
                <picture>
                    <Logo width="64" height="64"/>
                </picture>
            </div>
            <div class="card-body">
                <Login />
            </div>
        </div>
    </div>
</template>
<style scoped>
.login-container {
    display: grid;
    height: 100vh;
    align-content: center;
    justify-content: center;
    background-image: url("/public/login-background.jpg");
    background-size: cover;

}

.card-login {
    backdrop-filter: blur(20px);
    min-width: 300px;
}

</style>