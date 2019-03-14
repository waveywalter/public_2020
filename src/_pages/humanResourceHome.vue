<template>
    <div>
        <TopHeader></TopHeader>
        <HrSideBar></HrSideBar>
        <router-view></router-view>
    </div>
</template>

<script>
import TopHeader from '../components/layoutComponents/TopHeader';
import HrSideBar from '../components/layoutComponents/hrSideBar';

import Vue from 'vue';

    export default {
        name: "humanresourceHome",
        components: {
            TopHeader,
          HrSideBar,
        }
       
    }
</script>
<style scoped>
</style>