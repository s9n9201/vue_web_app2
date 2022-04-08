<template>
    <div id="error">
        <div class="error-page container">
            <div class="col-md-8 col-12 offset-md-2">
                <img class="img-error" src="@/assets/images/samples/error-404.png" alt="Not Found">
                <div class="text-center">
                    <h1 class="error-title">PAGE NOT FOUND</h1>
<!--                    <p class='fs-5 text-gray-600'>The page you are looking not found.</p>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Page404Component"
}
</script>

<style scoped>
#error {
    height: 80vh;
}
.img-error {
    width: 100%;
}
.error-title {
    font-size: 4rem;
}
</style>