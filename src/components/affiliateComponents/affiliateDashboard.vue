<template>
    <div>
        <TopHeader></TopHeader>
        <SideBar></SideBar>
        <div id="page-wrapper">
            <div class="container-fluid">
            <div class="col-lg">
                <div class="row bg-title">
             <h4 class="page-title">Affiliate Dashboard</h4>
             </div>
            </div>
             <div class="col-lg-6 col-sm-6 col-xs-12">
             <div class="white-box">
            </div>
            </div>
        </div>
        </div>
        </div>
</template>
<script>
import TopHeader from '../layoutComponents/TopHeader';
import SideBar from '../layoutComponents/SideBar';
    export default {
        name: "AffiliateDashboard",
                data(){
            return{
            }
        },
        components: {
            TopHeader,
            SideBar,
        }
    }
</script>
<style scoped>
</style>