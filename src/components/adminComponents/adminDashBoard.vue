<template>

    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <div class="sttabs tabs-style-linemove">
             <h4 class="page-title">Admin DashBoard</h4>
             <nav>
                <ul>
                <li class="tab-current"><a href="#section-bar-1" class="sticon ti-home"><span>Create User</span></a></li>
                <li class=""><a href="#section-bar-2" class="sticon ti-trash"><span>Your Info</span></a></li>
                </ul>
            </nav>
            </div>
            <CreateAdmin></CreateAdmin>

            
            
        </div>
    </div>
    
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import CreateAdmin from '../adminComponents/createAdmin';
import UserInformation from '../layoutComponents/UserInformation';




    export default {
        name: "adminDashBoard",
        components: {
            AdminTopHeader,
            AdminSideBar,
            CreateAdmin,
            UserInformation,
        }
    }
</script>
<style scoped>
</style>