import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/routes/web'
import '@/scss/styles.scss'
import pinia from './store'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
