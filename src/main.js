import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { toastPlugin } from './composables/useToast.js'
import './variables.css'
import './index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(toastPlugin)
app.mount('#app')
