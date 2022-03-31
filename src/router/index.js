import { createRouter, createWebHistory } from "vue-router";
import ItemList from "../views/ItemList"

const routes=[
    {
        path: "/login",
        component: ()=>import("@/views/Login"),
        name: "Login"
    },
    {
        path: "/",
        component: ()=>import("@/views/Main"),
        name: "Main",
        children: [
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
        ]
    },
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
    const publicPage=["/login"];
    const loggedIn=localStorage.getItem("user");
    let metaTitle="";
    if (to.meta.title) {
        metaTitle=to.meta.title;
    }
    if (window.document.getElementById("headTitle")) {
        window.document.getElementById("headTitle").innerText=metaTitle;
    }
    //authentication
    if (!publicPage.includes(to.path) && !loggedIn) {
        return { name: "Login" };
    } else if (to.path=="/login" && loggedIn) {
        return { name: "Main" };
    } else {
        return true;
    }
});

export default router