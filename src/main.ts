import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/routes/web'
import pinia from '@/store'
import '@/scss/styles.scss'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
