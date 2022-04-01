<template>
    <div id="auth">
        <div class="row h-100">
            <div id="auth-left">
                <div class="auth-logo">
                    <a href="index.html"><img src="@/assets/images/logo/logo.png" alt="Logo"></a>
                </div>
                <h1 class="auth-title">Log in.</h1>
                <Form @submit="handleLogin" :validation-schema="schema">
                    <div class="form-group position-relative has-icon-left ">
                        <Field type="text" class="form-control form-control-xl" name="orgName" placeholder="帳號"/>
                        <div class="form-control-icon">
                            <i class="bi bi-person"></i>
                        </div>
                    </div>
                    <ErrorMessage name="orgName" class="error-feedback"/>
                    <div class="mb-4"></div>
                    <div class="form-group position-relative has-icon-left ">
                        <Field type="password" class="form-control form-control-xl" name="password" placeholder="密碼" autocomplete="off"/>
                        <div class="form-control-icon">
                            <i class="bi bi-shield-lock"></i>
                        </div>
                    </div>
                    <ErrorMessage name="password" class="error-feedback"/>
                    <div class="mb-4"></div>
                    <div class="form-check form-check-lg d-flex align-items-end">
                        <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label text-gray-600" for="flexCheckDefault">
                            Keep me logged in
                        </label>
                    </div>
                    <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">Log in</button>
                    <div v-if="message" class="alert alert-danger mt-4">
                        {{ message }}
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"

export default {
    name: "LoginComponent",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema=yup.object().shape({
            orgName: yup.string().required("請輸入您的帳號！"),
            password: yup.string().required("請輸入您的密碼！"),
        });
        return {
            loading: false,
            message: "",
            schema,
        }
    },
    methods: {
        handleLogin(user) {
            this.loading=true;
            this.$store.dispatch("auth/login", user).then(
                ()=>{
                    this.$router.push("/");
                },
                (error)=>{
                    this.loading=false;
                    this.message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                }
            );
        },
    },
}
</script>

<style scoped>
#auth {
    font-family: var(--bs-body-font-family);
}
.error-feedback {
    color: red;
}
</style>