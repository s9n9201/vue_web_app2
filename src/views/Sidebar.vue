<template>
    <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
            <div class="sidebar-header">
                <div class="d-flex justify-content-between">
                    <div class="logo">
                        <a href="/"><img src="../assets/images/logo/logo.png" alt="Logo" srcset=""></a>
                    </div>
                    <div class="toggler">
                        <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
            </div>
            <div class="sidebar-menu">
                <ul class="menu">
                    <Menu :MainMenu="MainMenu" :ActiveMenu="ActiveMenu" @add-menu-active="addMenuActive" @add-submenu-active="addSubMenuActive"/>
                </ul>
            </div>
            <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
    </div>
</template>

<script>
import Menu from "../components/Menu"
import { Sidebar } from "../assets/js/sidebar"

export default {
    name: "Sidebar",
    data() {
        return {
            MainMenu: [],
            ActiveMenu: [],
        }
    },
    components: {
        Menu,
    },
    methods: {
        addMenuActive(MenuIndex) {
            //console.log("addMenuActive > "+MenuIndex);
            this.ActiveMenu=this.ActiveMenu.map( (menu, index)=> {
                return MenuIndex===index ? {...menu, isActive: true} : {...menu, isActive: false};
            });
        },
        addSubMenuActive(MenuIndex, SubIndex) {
            //console.log("addSubMenuActive > "+MenuIndex+" > "+SubIndex+"");
            console.log("TEST");
            this.ActiveMenu=this.ActiveMenu.map( (menuObj, index)=> {
                menuObj.subArr=menuObj.subArr.map( (subObj, i) => {
                    return MenuIndex===index && SubIndex===i ? {...subObj, isActive: true} : {...subObj, isActive: false};
                });
                return {...menuObj, subArr: menuObj.subArr};
            });
        },
    },
    created() {
        this.MainMenu=[
            {
                id: 1,
                name: "訂單管理",
                url: "",
                subMenu: [
                    {
                        parentid: 1,
                        id: 1,
                        name: "列表 1",
                        url: "test1",
                    },
                    {
                        parentid: 1,
                        id: 2,
                        name: "列表 2",
                        url: "test2",
                    },
                    {
                        parentid: 1,
                        id: 3,
                        name: "列表 3",
                        url: "test3",
                    },
                ],
            },
            {
                id: 2,
                name: "商品管理",
                url: "",
                subMenu: [
                    {
                        parentid: 2,
                        id: 4,
                        name: "列表 11",
                        url: "test4",
                    },
                    {
                        parentid: 2,
                        id: 5,
                        name: "列表 22",
                        url: "/itemlist",
                    },
                    {
                        parentid: 2,
                        id: 6,
                        name: "列表 33",
                        url: "/itemTypeList",
                    },
                ]
            },
        ];
        //將Active class做初始化
        let arr=[], subArr=[], mainMenu=this.MainMenu;
        for (let i=0; i<mainMenu.length; i++) {
            subArr=[];
            for (let x=0; x<mainMenu[i].subMenu.length; x++) {
                subArr.push({
                    isActive: false
                });
            }
            arr.push({
                isActive: false,
                subArr
            });
        }
        this.ActiveMenu=arr;
    },
    mounted() {
        //產生Sidebar
        let sidebarEl = document.getElementById("sidebar");
        if (sidebarEl) {
            window.sidebar = new Sidebar(sidebarEl);
        }
    }

}
</script>

<style scoped>

</style>