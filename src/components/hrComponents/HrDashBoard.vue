<template>

    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <div class="sttabs tabs-style-linemove">
             <h4 class="page-title">HR DashBoard</h4>
             <nav>
                <ul>
                <li class="tab-current"><a href="#section-bar-1" class="sticon ti-home"><span>Hire</span></a></li>
                <li class=""><a href="#section-bar-2" class="sticon ti-trash"><span>Info</span></a></li>
                </ul>
            </nav>
            </div>
            <hrcreateform></hrcreateform>
            <!-- <UserInformation></UserInformation>          -->
            </div>
    </div>
    
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import hrcreateform from '../hrComponents/hrcreateform';
import UserInformation from '../layoutComponents/UserInformation';

    export default {
        name: "HrDashBoard",
        components: {
            AdminTopHeader,
            AdminSideBar,
            hrcreateform,
            UserInformation,
        }
    }
</script>
<style scoped>
</style>