import { createRouter, createWebHistory } from "vue-router";
import ItemList from "../views/ItemList"
//import ItemTypeList from "@/views/ItemTypeList";
import MainTest from "@/views/MainTest"
//import App from "@/App";

const routes=[
    {
        path: "/",
        component: MainTest,
        name: "MainTest"
    },
    {
        path: "/itemlist",
        name: "ItemList",
        component: ItemList,
        meta: {
            title: "商品管理",
        },
        children: [
            {
                path: "",
                name: "itemOfList",
                component: ()=>import("../components/item/List"),
            },
            {
                path: "edit",
                name: "itemOfEdit",
                component: ()=>import("../components/item/Edit"),
            },
            {
                path: "edit/:id",
                name: "itemOfEditById",
                component: ()=>import("../components/item/Edit"),
                props: route=>({
                    IRecId: route.params.id,
                }),
            },
        ]
    },
    {
        path: "/itemtypelist",
        name: "ItemTypeList",
        component: ()=>import("@/views/ItemTypeList"),
        meta: {
            title: "商品類別管理",
        },
    }
];

const router=createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        //console.log(to, from, savedPosition);
        // always scroll to top
        return { top: 0 }
    },
});

router.beforeEach((to)=>{
    let metaTitle="";
    if (to.meta.title) {
        metaTitle=to.meta.title;
    }
    window.document.getElementById("headTitle").innerText=metaTitle;
});

export default router