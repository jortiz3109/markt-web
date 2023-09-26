import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/scss/styles.scss'
import pinia from '@/store'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
