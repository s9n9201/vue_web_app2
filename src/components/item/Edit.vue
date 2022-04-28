<template>
    <section id="basic-horizontal-layouts">
        <div class="row match-height justify-content-center">
            <div class="col-md-6 col-12">
                <form class="form form-horizontal" @submit.prevent="onSubmit">
                    <div class="form-body">
                        <div class="row align-items-center">
                            <UploadFile />
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">商品名稱</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Name" id="I_Name" ref="iname" class="form-control" v-model.trim="Item.iname" @keyup="ItemMsg.iname.val=''">
                                <div class="error-feedback">{{ ItemMsg.iname.val }}</div>
                            </div>
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">商品類型</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <select class="form-select" name="I_TRecId" id="I_TRecId" ref="itrecId" v-model="Item.itrecId" @mousedown="ItemMsg.itrecId.val=''">
                                    <option v-for="type of ItemType" :value="type.trecId" :key="type.trecId">{{ type.tname }}</option>
                                </select>
                                <div class="error-feedback">{{ ItemMsg.itrecId.val }}</div>
                            </div>
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">貨源</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Source" id="I_Source" ref="isource" class="form-control" v-model.trim="Item.isource" @keyup="ItemMsg.isource.val=''">
                                <div class="error-feedback">{{ ItemMsg.isource.val }}</div>
                            </div>
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">製造地</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Source" id="I_MadeIn" ref="imadeIn" class="form-control" v-model.trim="Item.imadeIn" @keyup="ItemMsg.imadeIn.val=''">
                                <div class="error-feedback">{{ ItemMsg.imadeIn.val }}</div>
                            </div>
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">數量</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Amount" id="I_Amount" class="form-control" v-model.trim="Item.iamount">
                            </div>
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">成本</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Cost" id="I_Cost" class="form-control" v-model.trim="Item.icost">
                            </div>
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">定價</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Price" id="I_Price" class="form-control" v-model.trim="Item.iprice">
                            </div>
                            <div class="col-md-4 text-md-center">
                                <label class="form-group">總成本</label>
                            </div>
                            <div class="col-md-8 form-group">
                                {{ Item.itotal }}
                            </div>
<!--                            <div class="col-12 col-md-8 offset-md-4 form-group">-->
<!--                                <div class='form-check'>-->
<!--                                    <div class="checkbox">-->
<!--                                        <input type="checkbox" id="checkbox1" class='form-check-input'-->
<!--                                               checked>-->
<!--                                        <label for="checkbox1">Remember Me</label>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
                            <div class="col-sm-12 d-flex justify-content-end">
                                <button type="submit"
                                        class="btn btn-primary me-1 mb-1"
                                        :class="[buttonData.disabled && `btt-loading`]"
                                        style="width: 90px;"
                                        :disabled="buttonData.disabled"
                                        v-html="buttonData.val">
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import axiosInstance from "@/services/axios-instance";
import UploadFile from "@/components/UploadFile";

export default {
    name: "EditComponent",
    data() {
        return {
            Item: {
                irecId: null,
                itrecId: 0,
                iname: "",
                isource: "",
                imadeIn: "",
                iamount: 0,
                icost: 0,
                iprice: 0,
                itotal: 0,
            },
            ItemType: [{tname: "請選擇..", tsubName: "", trecId: 0},],
            ItemMsg: {
                iname: {
                    val: "",
                    default: "請輸入商品名稱！",
                },
                itrecId: {
                    val: "",
                    default: "請選擇商品類型！",
                },
                isource: {
                    val: "",
                    default: "請輸入貨源！"
                },
                imadeIn: {
                    val: "",
                    default: "請輸入製造地！",
                },
            },
            buttonData: {
                disabled: false,
                val: "確定送出",
            },
        }
    },
    props: {
        IRecId: {
            type: String,
        },
        Page: {
            type: Number,
        },
        SearchText: {
            type: String,
        },
    },
    components: {
        UploadFile,
    },
    computed: {
        routerPath() {
            return this.$route.path;
        }
    },
    methods: {
        saveItem(item) {
            let url="/insert";
            if (this.Item.irecId!==null) {
                url="/update";
            }
            return axiosInstance
                .post("/item"+url, item)
                .then(
                    response=>{
                        return response.data;
                    },
                    error=>{
                        return error.response;
                    }
                );
        },
        getItem(I_RecId) {
            return axiosInstance
                .get("/items/"+I_RecId)
                .then(
                    response=>{
                        return response.data;
                    },
                    error=>{
                        return error.response;
                    }
                );
        },
        getItemType() {
            return axiosInstance
                .get("/itemtypes")
                .then(
                    response=>{
                        return response.data;
                    },
                    error=>{
                        return error.response;
                    }
                );
        },
        dataCheck() {
            return Object.keys(this.ItemMsg).some((key)=>{
                let NoData=false;
                if (this.Item[key]=="") {
                    NoData=true;
                } else if (key=="itrecId" && this.Item[key]===0) {
                    NoData=true;
                }
                if (NoData) {
                    this.ItemMsg[key].val=this.ItemMsg[key].default;
                    this.$refs[key].focus();
                    return true;
                }
            });
        },
        buttonDisabled(type) {
            this.buttonData.disabled=type;
            this.buttonData.val=type?"<img src='../../Spinner.svg' style='width: 32px; heigth: auto;'>":"確認送出";
        },
        initData(result) {
            Object.keys(this.Item).forEach((key)=>{
                let tmpValue;
                if (key=="irecId") {
                    tmpValue=null;
                } else if (key=="iname" || key=="isource" || key=="imadeIn") {
                    tmpValue="";
                } else {
                    tmpValue=0;
                }
                this.Item[key]=result?.[key]==undefined?tmpValue:result[key];
            });
        },
        getUrlParameter() {
            if (this.Item.irecId!=null) {
                return "?p="+this.Page+(this.SearchText!=undefined?"&search="+this.SearchText:"");
            }
            return "";
        },
        async onSubmit() {
            this.buttonDisabled(true);
            if (this.dataCheck()) {
                this.buttonDisabled(false);
                return false;
            }
            const result=await this.saveItem(this.Item);
            if (result?.status=="200") {
                this.$Toast.fire({
                    icon: "success",
                    title: result.message,
                });
                this.$router.push( "/itemlist"+this.getUrlParameter() );
            } else if (result.status==500){
                this.$Toast.fire({
                    icon: "error",
                    title: "新增失敗，請重新操作",
                });
            }
            this.buttonDisabled(false);
        },
    },
    async created() {
        if (this.IRecId) {
            let result=await this.getItem(this.IRecId);
            console.log(result);
            if (result?.irecId) {
                this.initData(result);
            }
        }
        let ItemTypeResult=await this.getItemType();
        if (ItemTypeResult.length>0) {
            Array.prototype.push.apply(this.ItemType, ItemTypeResult);
        }
    },
    watch: {
        routerPath: async function(to) {
            let tmpIRecId=this.$route.params.id;
            if (to==="/itemlist/edit" || to==="/itemlist/edit/"+tmpIRecId) {
                let result={};
                if (to==="/itemlist/edit/"+tmpIRecId) {
                    result=await this.getItem(tmpIRecId);
                }
                this.initData(result);
            }
        },
    }
}
</script>

<style scoped>
.error-feedback {
    color: red;
    //padding: 5px 0px 5px 0px;
}

.btt-loading {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
}
</style>