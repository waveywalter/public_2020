<template>
    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
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
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
    export default {
        name: "AffiliateDashboard",
                data(){
            return{
                components:"hrcreateform"
            }
        },
        components: {
            AdminTopHeader,
            AdminSideBar,
        }
    }
</script>
<style scoped>
</style>