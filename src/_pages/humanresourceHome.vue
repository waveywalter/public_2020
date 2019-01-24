<template>
    <div>
        <TopHeader></TopHeader>
        <SideBar></SideBar>
        <router-view></router-view>
    </div>
</template>

<script>
import TopHeader from '../components/layoutComponents/TopHeader';
import SideBar from '../components/layoutComponents/SideBar';

import Vue from 'vue';

    export default {
        name: "humanresourceHome",
        components: {
            TopHeader,
            SideBar
        }
       
    }
</script>
<style scoped>
</style>