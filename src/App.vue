<template>
    <router-view />
</template>

<script>
import EventBus from "@/common/EventBus";

export default {
    name: "App",
    components: {
    },
    methods: {
        logOut() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
        }
    },
    mounted() {
        EventBus.on("logout", ()=>{
            this.logOut();
        });
    },
    beforeUnmount() {
        EventBus.remove("logout");
    }
}
</script>

<style>
</style>
