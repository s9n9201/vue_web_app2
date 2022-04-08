import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupInterceptors from "./services/axios-interceptors"

import "@/assets/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@/assets/css/pages/auth.css"
import "@/assets/css/app.css"
import "bootstrap/dist/js/bootstrap.bundle"


setupInterceptors(store);
createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
