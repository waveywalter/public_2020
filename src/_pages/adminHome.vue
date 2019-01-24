<template>
    <div>
        <TopHeader></TopHeader>
        <AdminSideBar></AdminSideBar>
        <router-view></router-view>
    </div>
</template>

<script>
import TopHeader from '../components/layoutComponents/TopHeader';
import AdminSideBar from '../components/adminComponents/adminSideBar';

import Vue from 'vue';

    export default {
        name: "adminHome",
        components: {
            TopHeader,
            AdminSideBar
        }
       
    }
</script>
<style scoped>
</style>