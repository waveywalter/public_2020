<template>
    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <div id="page-wrapper">
            <div class="container-fluid">
            <div class="col-lg">
                <div class="row bg-title">
             <h4 class="page-title">Owner DashBoard</h4>
             </div>
            </div>
             <div class="col-lg-6 col-sm-6 col-xs-12">
             <div class="white-box">
            <section>
        <div class="sttabs tabs-style-bar">
            <nav>
                <ul>
                    <li><a v-on:click="components = 'ownerform' " href="#section-bar-1" class="sticon ti-home "><span>New Form</span></a></li>
                    <li><a v-on:click="components = 'UserInformation' " href="#section-bar-2" class="sticon ti-trash"><span>User Info</span></a></li>
                    <!-- <button v-on:click="components = 'NewAffiliateform' ">Show Form</button>
                    <button v-on:click="components = 'Userinformation' ">Show Info</button> -->
                </ul>
            </nav>
            <!-- /content -->
        </div>
        <!-- /tabs -->
    </section>
    <div class="tab-content">
            <keep-alive>
            <component v-bind:is="components"></component>
            </keep-alive>
            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import ownerform from  '../ownerComponents/ownerform'
import UserInformation from '../layoutComponents/UserInformation'


    export default {
        name: "OwnerDashBoard",
                data(){
            return{
                components:"ownerform"
            }
        },
        components: {
            AdminTopHeader,
            AdminSideBar,
            ownerform,
            UserInformation,
        }
    }
</script>
<style scoped>
</style>