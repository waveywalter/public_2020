<template>

    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <hrcreateform></hrcreateform>
            
            
        </div>
    </div>
    
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import hrcreateform from '../hrComponents/hrcreateform';



    export default {
        name: "adminDashBoard",
        components: {
            AdminTopHeader,
            AdminSideBar,
            hrcreateform
        }
    }
</script>
<style scoped>
</style>