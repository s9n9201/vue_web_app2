import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupInterceptors from "./services/axios-interceptors"
import swal from "sweetalert2"

import "@/assets/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@/assets/css/pages/auth.css"
import "@/assets/css/app.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "sweetalert2/dist/sweetalert2.min.css"

setupInterceptors(store);

swal.mixin({
    showCloseButton: true,
})

const app=createApp(App)
app.config.globalProperties.$Swal=swal
app.use(router)
    .use(store)
    .mount('#app')
