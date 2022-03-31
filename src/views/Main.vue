<template>
    <Sidebar/>
    <div id="main">
        <header class="mb-0">
            <a href="#" class="burger-btn d-block d-xl-none">
                <i class="bi bi-justify fs-3"></i>
            </a>
        </header>
        <div class="page-heading">
            <h3 id="headTitle"></h3>
        </div>
        <div class="page-content">
            <router-view></router-view>
        </div>

<!--        <footer>-->
<!--            <div class="footer clearfix mb-0 text-muted">-->
<!--                <div class="float-start">-->
<!--                    <p>2021 &copy; Mazer</p>-->
<!--                </div>-->
<!--                <div class="float-end">-->
<!--                    <p>Crafted with <span class="text-danger"><i class="bi bi-heart"></i></span> by <a href="http://ahmadsaugi.com">A. Saugi</a></p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </footer>-->
    </div>
</template>

<script>
//import TheLoader from "@/components/TheLoader";
import Sidebar from "@/views/Sidebar";

export default {
    name: "MainComponent",
    components: {
        Sidebar,
    },
}
</script>

<style scoped>
.page-content {
    height: 80vh;
}
</style>