<template>
    <router-link v-for="(Main, index) of MainMenu" :to="Main.url==''?`#`:Main.url" custom v-slot="{ href, navigate, isActive }" :key="Main.name+`-`+Main.id">
        <li :class="[ Main.subMenu?`sidebar-item`:`submenu-item`, Main.subMenu?`has-sub`: ``, isActive && changeActive(index)?'active':'' ]"
            @click="Main.subMenu?$emit('add-menu-active', index):''">
            <a :href="href" @click="navigate" :class="Main.subMenu?'sidebar-link':''">
                <i v-if="Main.subMenu" class="bi bi-stack"></i>
                <span>{{ Main.name }}</span>
            </a>
            <ul v-if="Main.subMenu" @click="navigate" class="submenu">
                <router-link :to="subMenu.url" v-for="(subMenu) of Main.subMenu" :key="subMenu.name+`-`+subMenu.id" custom v-slot="{ href, navigate, isActive }" >
                    <li :class="[`submenu-item`, isActive && 'active' ]">
                        <a :href="href" @click="navigate">{{subMenu.name }}</a>
                    </li>
                </router-link>
            </ul>
        </li>
    </router-link>
</template>
<script>
export default {
    name: "MenuComponent",
    components: {
    },
    emits: {
        "add-menu-active": null,
    },
    props: {
        MainMenu: {
            type: Array,
        },
        ActiveMenu: {
            type: Array,
        },
    },
    methods: {
        changeActive(index) {
            return this.ActiveMenu[index].isActive;
        },
    },
}
</script>

<style scoped>
</style>