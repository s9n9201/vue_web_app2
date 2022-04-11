<template>
    <section id="basic-horizontal-layouts">
        <div class="row match-height justify-content-center">
            <div class="col-md-6 col-12">
                <form class="form form-horizontal" @submit.prevent="onSubmit">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-4">
                                <label>商品名稱 {{ IRecId }}</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Name" id="I_Name" ref="iname" class="form-control" v-model.trim="Item.iname" @keyup="ItemMsg.iname.val=''">
                                <div class="error-feedback">{{ ItemMsg.iname.val }}</div>
                            </div>
                            <div class="col-md-4">
                                <label>貨源</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Source" id="I_Source" ref="isource" class="form-control" v-model.trim="Item.isource" @keyup="ItemMsg.isource.val=''">
                                <div class="error-feedback">{{ ItemMsg.isource.val }}</div>
                            </div>
                            <div class="col-md-4">
                                <label>製造地</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Source" id="I_MadeIn" ref="imadeIn" class="form-control" v-model.trim="Item.imadeIn" @keyup="ItemMsg.imadeIn.val=''">
                                <div class="error-feedback">{{ ItemMsg.imadeIn.val }}</div>
                            </div>
                            <div class="col-md-4">
                                <label>數量</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Amount" id="I_Amount" class="form-control" v-model.trim="Item.iamount">
                            </div>
                            <div class="col-md-4">
                                <label>成本</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Cost" id="I_Cost" class="form-control" v-model.trim="Item.icost">
                            </div>
                            <div class="col-md-4">
                                <label>定價</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Price" id="I_Price" class="form-control" v-model.trim="Item.iprice">
                            </div>
                            <div class="col-md-4">
                                <label>總成本</label>
                            </div>
                            <div class="col-md-8 form-group">

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

export default {
    name: "EditComponent",
    data() {
        return {
            Item: {
                irecId: null,
                itrecId: null,
                iname: "",
                isource: "",
                imadeIn: "",
                iamount: 0,
                icost: 0,
                iprice: 0,
                itotal: 0,
            },
            ItemMsg: {
                iname: {
                    val: "",
                    default: "請輸入商品名稱！",
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
        }
    },
    methods: {
        addItem(item) {
            return axiosInstance
                .post("/item/insert", item)
                .then(
                    response=>{
                        return response.data;
                    },
                    error=>{
                        console.log(error.response);
                        return error.response;
                    }
                );
        },
        dataCheck() {
            return Object.keys(this.ItemMsg).some((key)=>{
                if (this.Item[key]=="") {
                    this.ItemMsg[key].val=this.ItemMsg[key].default;
                    this.$refs[key].focus();
                    return true;
                }
            });
        },
        buttonDisabled(type) {
            this.buttonData.disabled=type;
            this.buttonData.val=type?"<img src='../Spinner.svg' style='width: 32px; heigth: auto;'>":"確認送出";
        },
        async onSubmit() {
            this.buttonDisabled(true);
            if (this.dataCheck()) {
                this.buttonDisabled(false);
                return false;
            }
            const result=await this.addItem(this.Item);
            if (result.status=="200") {
                this.$Toast.fire({
                    icon: "success",
                    title: result.message,
                });
                this.buttonDisabled(true);
                this.$router.push("/itemlist");
            }
        },
    },
}
</script>

<style scoped>
.error-feedback {
    color: red;
    padding: 5px 0px 5px 0px;
}

.btt-loading {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
}
</style>