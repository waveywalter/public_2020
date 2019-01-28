<template>
    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <router-view></router-view>
    </div>
</template>

<script>
import AdminTopHeader from '../components/layoutComponents/adminTopHeader';
import AdminSideBar from '../components/adminComponents/adminSideBar';

import Vue from 'vue';

    export default {
        name: "adminHome",
        components: {
            AdminTopHeader,
            AdminSideBar
        }
       
    }
</script>
<style scoped>
</style>