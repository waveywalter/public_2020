<template>

    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <div class="white-box">            
             <h4 class="col-lg-3 col-md-4 col-sm-4 col-xs-12">Sales DashBoard</h4>
            <section>
        <div class="sttabs tabs-style-bar">
            <nav class="col-md-5">
                <ul>
                    <li><a v-on:click="components = 'NewAffiliateform' " href="#section-bar-1" class="sticon ti-home "><span>New Form</span></a></li>
                    <li><a v-on:click="components = 'Userinformation' " href="#section-bar-2" class="sticon ti-trash"><span>User Info</span></a></li>
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
import NewAffiliateform from '../salesComponents/NewAffiliateform';
import Userinformation from '../layoutComponents/UserInformation'



    export default {
        name: "adminDashBoard",
        data(){
            return{
                components:"NewAffiliateform"
            }
        },
        components: {
            AdminTopHeader,
            AdminSideBar,
            NewAffiliateform,
            Userinformation
        }
    }
</script>
<style scoped>
</style>