import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@/assets/css/app.css"
import "bootstrap/dist/js/bootstrap.bundle"


createApp(App)
    .use(router)
    .ues(store)
    .mount('#app')
