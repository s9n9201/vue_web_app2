<template>
<!--    <router-view name="sideBar"></router-view>-->
<!--    <router-view name="main"></router-view>-->
    <Sidebar/>
    <Main/>
</template>

<script>
import Sidebar from "./views/Sidebar"
import Main from "./views/Main"
export default {
    name: "App",
    components: {
        Sidebar,
        Main,
    },
    methods: {
    },
}
</script>

<style>
</style>
