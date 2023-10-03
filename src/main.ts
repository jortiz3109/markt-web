import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/routes/web'
import '@/scss/styles.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
