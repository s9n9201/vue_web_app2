<template>
    <section id="basic-horizontal-layouts">
        <div class="row match-height justify-content-center">
            <div class="col-md-6 col-12">
                <form class="form form-horizontal" @submit="onSubmit">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-4">
                                <label>商品名稱 {{ IRecId }}</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Name" id="I_Name" class="form-control" v-model="Item.iname">
                            </div>
                            <div class="col-md-4">
                                <label>貨源</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Source" id="I_Source" class="form-control" v-model="Item.isource">
                            </div>
                            <div class="col-md-4">
                                <label>製造地</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Source" id="I_MadeIn" class="form-control" v-model="Item.imadeIn">
                            </div>
                            <div class="col-md-4">
                                <label>數量</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Amount" id="I_Amount" class="form-control" v-model="Item.iamount">
                            </div>
                            <div class="col-md-4">
                                <label>成本</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Cost" id="I_Cost" class="form-control" v-model="Item.icost">
                            </div>
                            <div class="col-md-4">
                                <label>定價</label>
                            </div>
                            <div class="col-md-8 form-group">
                                <input type="text" name="I_Price" id="I_Price" class="form-control" v-model="Item.iprice">
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
                                <button type="submit" class="btn btn-primary me-1 mb-1">Submit</button>
<!--                                <button type="reset" class="btn btn-light-secondary me-1 mb-1">Reset</button>-->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

let url="http://localhost:1015/";

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
        }
    },
    props: {
        IRecId: {
            type: String,
        }
    },
    methods: {
        async addItem(item) {
            await fetch(url+"item/insert", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(item),
            });
        },
        onSubmit(e) {
            e.preventDefault();
            this.Item.itrecId=2;
            console.log("TEST commit");
            this.addItem(this.Item);
            console.log("TEST");
        },
    },
}
</script>

<style scoped>

</style>