<template>
    <div>
        <TopHeader></TopHeader>
        <SalesSideBar></SalesSideBar>
        <router-view></router-view>
    </div>
</template>

<script>
import TopHeader from '../components/layoutComponents/TopHeader';
import SalesSideBar from '../components/salesComponents/salessidebar';

import Vue from 'vue';

    export default {
        name: "salesHome",
        components: {
            TopHeader,
            SalesSideBar
                    }
       
    }
</script>
<style scoped>
</style>