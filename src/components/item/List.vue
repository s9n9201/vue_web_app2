<template>
    <div class="table-responsive">
        <table class="table table-lg table-hover">
            <thead>
                <tr>
                    <th>商品名稱</th>
                    <th>貨源</th>
                    <th>數量</th>
                    <th>成本</th>
                    <th>訂價</th>
                    <th>總計</th>
                    <th>功能</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="Item of ItemList" :key="Item.irecId">
                    <td class="text-bold-500">{{ Item.iname }}</td>
                    <td >{{ Item.isource }}</td>
                    <td class="text-bold-500">{{ Item.iamount }}</td>
                    <td>{{ Item.icost }}</td>
                    <td>{{ Item.iprice }}</td>
                    <td>{{ Item.itotal }}</td>
                    <td>
                        <router-link :to="'/itemlist/edit/'+Item.irecId+UrlParameter" @click="$emit('show-tab', Item.irecId)">編輯</router-link>
                    </td>
<!--                    <td><a href="#"><i class="badge-circle badge-circle-light-secondary font-medium-1" data-feather="mail"></i></a></td>-->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "ListComponent",
    props: {
        ItemList: {
            type: Array,
        },
        UrlParameter: { //因為這個function return 一個String
            type: String,
        },
    },
    mounted() {
        //console.log(this.$route.path);
    },
}
</script>

<style scoped>
thead tr th {
    text-align: center;
}
</style>