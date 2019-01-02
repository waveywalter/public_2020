<template>

    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <NewAffiliateform></NewAffiliateform>
            
            
        </div>
    </div>
    
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import NewAffiliateform from '../salesComponents/NewAffiliateform';



    export default {
        name: "adminDashBoard",
        components: {
            AdminTopHeader,
            AdminSideBar,
            NewAffiliateform
        }
    }
</script>
<style scoped>
</style>