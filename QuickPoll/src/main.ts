import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
