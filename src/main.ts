import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import naiveUI from 'naive-ui'
import 'virtual:svg-icons-register'
import Provider from './components/Provider.vue'

const app = createApp(Provider)

app.use(createPinia())
app.use(router)
app.use(naiveUI)
app.mount('#app')
