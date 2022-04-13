<template>
    <section class="section">
        <div class="row" >
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <router-link to="/itemlist" class="nav-link" id="home-tab">商品列表</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link to="/itemlist/edit" class="nav-link" id="profile-tab" >新增商品</router-link>
                            </li>
                            <li class="nav-item" role="presentation" v-if="ItemEditRecId.isShowTab">
                                <router-link :to="'/itemlist/edit/'+ItemEditRecId.RecId" :class="`nav-link`" id="profile-tab-edit" >編輯商品</router-link>
                            </li>
                        </ul>
                    </div>
                    <transition name="trans-content" mode="out-in">
                        <div id="loading_id" class="d-flex justify-content-center loading" v-if="isLoading">
                            <img src="@/assets/images/loaders/hearts.svg" style="width: 5rem;" alt="audio">
                        </div>
                        <div class="card-content" v-else>
                            <div class="card-body">
                                <router-view :ItemList="Items" @show-tab="showTab"></router-view>
                            </div>
                            <div class="div-pagination" v-if="this.$route.path=='/itemlist'">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination pagination-primary justify-content-end">
                                        <li class="page-item">
                                            <a class="page-link" href="#">
                                                <span aria-hidden="true"><i class="bi bi-chevron-left"></i></span>
                                            </a>
                                        </li>
                                        <li class="page-item" :class="{ active: pageItem==Page }" v-for="pageItem of TotalPage" :key="pageItem">
                                            <a class="page-link" href="#">
                                                {{ pageItem }}
                                            </a>
                                        </li>
                                        <li class="page-item" >
                                            <a class="page-link" href="#">
                                                <span aria-hidden="true"><i class="bi bi-chevron-right"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axiosInstance from "@/services/axios-instance";
import EventBus from "@/common/EventBus";

export default {
    name: "ItemList",
    data() {
        return {
            Items: [],
            Page: 1,
            TotalPage: 1,
            TotalRow: 0,
            isLoading: false,
            ItemEditRecId: {
                RecId: 0,
                isShowTab: false,
            },
        }
    },
    computed: {
        routePath() {
            return this.$route.path;
        }
    },
    methods: {
        getItems() {
            return axiosInstance
                .get(`/items?page=${this.Page}`)
                .then(
                    response=>{
                        return response.data;
                    },
                    error=>{
                        if (error.response && error.response.status===403) {
                            EventBus.dispatch("logout");
                        }
                    }
                );
        },
        initData(result) {
            if (result) {
                this.Items=result.data;
                this.TotalPage=result.totalPage;
                this.TotalRow=result.dataCount;
            }
        },
        showTab(I_RecId) {
            this.ItemEditRecId.isShowTab=I_RecId===0?false:true;
            this.ItemEditRecId.RecId=I_RecId;
        },
    },
    async created() {
        this.isLoading=true;
        let result=await this.getItems();
        this.isLoading=false;
        this.initData(result);
    },
    watch: {
        routePath: async function(to, from) {
            if (to==="/itemlist" && from.indexOf("/itemlist")>-1) {
                this.isLoading = true;
                this.showTab(0);
                let rs = await this.getItems();
                this.initData(rs);
                this.isLoading = false;
            }
        }
    },
    mounted() {
    },
    async beforeRouteUpdate(to) {
        if (to.hash!=="#" && to.path==="/itemlist") {   //不等於#，是為了避免第一層點了也觸發。
            //如果用這個來換頁的話，會導致我點了商品列表的頁籤，頁籤還沒上active，就開始reload，reload完才出現active，若要排除此狀況，可能要把取資料的function做在list。
            // this.isLoading=true;
            // let result=await this.getItems();
            // this.isLoading=false;
            // this.Items=result.data;
            // this.TotalPage=result.totalPage;
            // this.TotalRow=result.dataCount;
        }
    },
}
</script>

<style scoped>
/*因為看起來沒有用到，先註解掉*/
.router-link-exact-active {
    border: none;
    color: #435ebe;
    position: relative
}
.router-link-exact-active {
    background-color: #f2f7ff !important;
    border-color: #dee2e6 #dee2e6 #f2f7ff;
    color: #495057;
    position: relative;
}
.router-link-exact-active:after {
    background-color: #435ebe;
    bottom: 0;
    box-shadow: 0 2px 5px rgba(67, 94, 190, .5);
    content: "";
    height: 2px;
    left: 0;
    position: absolute;
    width: 100%
}
.div-pagination {
    padding: 0rem 1.5rem 0rem 1.5rem;
}
.loading {
    height: 70vh;
}
.card {
    height: auto;
}
.trans-content-enter-active, .v-leave-active {
    transition: opacity 0.7s;
}
.trans-content-enter-from, .v-leave-to {
    opacity: 0;
}
</style>