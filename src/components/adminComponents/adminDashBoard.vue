<template>

    <div>

        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <CreateAdmin></CreateAdmin>
            
            
        </div>
    </div>
    
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import CreateAdmin from '../adminComponents/createAdmin';



    export default {
        name: "adminDashBoard",
        components: {
            AdminTopHeader,
            AdminSideBar,
            CreateAdmin
        }
    }
</script>
<style scoped>
</style>