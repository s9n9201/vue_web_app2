<template>
    <section class="section">
        <div class="row" >
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <router-link :to="'/itemlist?p='+Page" class="nav-link" id="home-tab">商品列表</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link to="/itemlist/edit" class="nav-link" id="profile-tab" >新增商品</router-link>
                            </li>
                            <li class="nav-item" role="presentation" v-if="ItemEditRecId.isShowTab">
                                <router-link :to="'/itemlist/edit/'+ItemEditRecId.RecId" :class="`nav-link`" id="profile-tab-edit" >編輯商品</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="content-top " v-if="this.$route.path=='/itemlist'">
                        <div>
                            <label>{{ TotalRow }}&nbsp;件商品庫存</label>
                        </div>
                        <div>
                            <input type="text" name="SearchText"
                                   id="SearchText"
                                   class="dataTable-input"
                                   placeholder="Search..."
                                   v-model="SearchText"
                                   @keydown.enter="setQuerySearchText">
                        </div>
                    </div>
                    <div class="card-content">
                        <transition name="trans-content" mode="out-in">
                            <div id="loading_id" class="d-flex justify-content-center loading" v-if="isLoading">
                                <img src="@/assets/images/loaders/hearts.svg" style="width: 5rem;" alt="audio">
                            </div>
                            <div class="card-body pt-0" v-else>
                                <router-view :ItemList="Items" @show-tab="showTab"></router-view>
                            </div>
                        </transition>
                    </div>
                    <div class="div-pagination" v-if="this.$route.path=='/itemlist'">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination pagination-primary justify-content-end">
                                <router-link :to="'itemlist?p=1'" custom v-slot="{ href, navigate}">
                                    <li class="page-item">
                                        <a class="page-link" :href="href" @click="navigate">
                                            <span aria-hidden="true"><i class="bi bi-chevron-left"></i><i class="bi bi-chevron-left"></i></span>
                                        </a>
                                    </li>
                                </router-link>
                                <router-link :to="'/itemlist?p='+pageItem" custom v-slot="{ href, navigate, isActive }" v-for="pageItem of TotalPage" :key="pageItem" >
                                    <li class="page-item" :class="{ active: isActive && pageItem==Page }" v-show="showPage(pageItem)">
                                        <a :href="href" class="page-link" @click="navigate">
                                            {{ pageItem }}
                                        </a>
                                    </li>
                                </router-link>
                                <router-link :to="'itemlist?p='+TotalPage" custom v-slot="{ href, navigate }">
                                    <li class="page-item">
                                        <a class="page-link" :href="href" @click="navigate">
                                            <span aria-hidden="true"><i class="bi bi-chevron-right"></i><i class="bi bi-chevron-right"></i></span>
                                        </a>
                                    </li>
                                </router-link>
                            </ul>
                        </nav>
                    </div>
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
            SearchText: "",
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
        watchObjet() {
            return {
                Path: this.$route.path,
                //Query: this.$route.query.p,
            }
        }
    },
    methods: {
        getItems() {
            return axiosInstance
                .get(`/items?page=${this.Page}&search=${this.SearchText}`)
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
        showPage(pageItem) {
            if (this.Page<3 && pageItem<6) {
                return true;
            }
            if (this.TotalPage-this.Page==1 && pageItem>this.Page-4) {
                return true;
            }
            if (this.TotalPage==this.Page && pageItem>this.Page-5) {
                return true;
            }
            if ((this.Page+2)>=pageItem && (this.Page-2)<=pageItem) {
                return true;
            }
            return false;
        },
        setQueryData() {
            if (!isNaN(parseInt(this.$route.query.p))) {
                this.Page=parseInt(this.$route.query.p);
            }
            if (this.$route.query.search!==undefined) {
                this.SearchText=this.$route.query.search;
            }
        },
        setQuerySearchText() {
            this.Page=1;
            this.$router.push(`/itemlist?p=${this.Page}&search=${this.SearchText}`);
        }
    },
    async created() {
        this.isLoading=true;
        this.setQueryData();
        let result=await this.getItems();
        this.isLoading=false;
        this.initData(result);
    },
    watch: {
        watchObjet: async function(newObject, oldObejct) {
            if (newObject.Path==="/itemlist" && oldObejct.Path.indexOf("/itemlist")>-1) {
                this.isLoading = true;
                this.setQueryData();
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
        console.log("Before Router");
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
.content-top {
    padding: 0rem 1.5rem 0rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>