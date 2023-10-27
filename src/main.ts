import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/routes/web'
import '@/scss/styles.scss'
import pinia from '@/store'
import ToastPlugin from 'vue-toast-notification'

createApp(App).use(pinia).use(router).use(ToastPlugin).mount('#app')