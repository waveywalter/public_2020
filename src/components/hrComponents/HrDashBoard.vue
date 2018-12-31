<template>

    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <div class="white-box">            
             <h4 class="col-lg-3 col-md-4 col-sm-4 col-xs-12">Human Resource DashBoard</h4>
            <section>
        <div class="sttabs tabs-style-bar">
            <nav class="col-md-5">
                <ul>
                    <li><a v-on:click="components = 'hrcreateform' " href="#section-bar-1" class="sticon ti-home "><span>New Form</span></a></li>
                    <li><a v-on:click="components = 'UserInformation' " href="#section-bar-2" class="sticon ti-trash"><span>User Info</span></a></li>
                    <!-- <button v-on:click="components = 'NewAffiliateform' ">Show Form</button>
                    <button v-on:click="components = 'Userinformation' ">Show Info</button> -->
                </ul>
            </nav>
            <!-- /content -->
        </div>
        <!-- /tabs -->
    </section>
            <keep-alive>
            <component v-bind:is="components"></component>
            </keep-alive>
            </div>
        </div>

    </div>
    
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import hrcreateform from '../hrComponents/hrcreateform';
import UserInformation from '../layoutComponents/UserInformation'


    export default {
        name: "HrDashBoard",
                data(){
            return{
                components:"hrcreateform"
            }
        },
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