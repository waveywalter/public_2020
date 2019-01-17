<style scoped>
.col-md-6.col-lg-4.col-sm-12 {
    flex: 1  1 100%;
}
#flexor{display:flex;}
</style>
<template>
    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        <!-- <div id="page-wrapper">
            <div id="flexor">
            <NewAffiliateform></NewAffiliateform>
            <AffiliateRegistration></AffiliateRegistration>
            </div>
        </div> -->

        <div id="page-wrapper">
            <div class="container-fluid">
            <div class="col-lg">
                <div class="row bg-title">
             <h4 class="page-title">Owner DashBoard</h4>
             </div>
            </div>
             <div class="col-lg-3 col-sm-3 col-xs-12">
             <div class="white-box">
            <section>
        <div class="sttabs tabs-style-bar">
            <nav>
                <ul>
                    <li><a v-on:click="currentTab.tabname = 'NewAffiliateform' " href="#ownerform" class="sticon ti-home "><span>New Form</span></a></li>
                    <li><a v-on:click="currentTab.tabname = 'UserInformation' " href="#UserInformation" class="sticon ti-trash"><span>User Info</span></a></li>
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
            <component v-bind:is="currentTab.tabname"></component>
            </keep-alive>
            </div>
            </div>
            </div>
        </div>
        <AffiliateRegistration></AffiliateRegistration>
        </div>

    
    </div>
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import NewAffiliateform from '../salesComponents/NewAffiliateform';
import AffiliateRegistration from '../salesComponents/AffiliateRegistration';
import UserInformation from '../layoutComponents/UserInformation';
import Vue from 'vue';



    export default {
        name: "SalesDashBoard",
        data(){
            return{
                components:"NewAffiliateform",
                currentTab: {
                    tabname: ""
                }
            }
        },
        mounted(){
            this.opentab();
        },
        components: {
            AdminTopHeader,
            AdminSideBar,
            NewAffiliateform,
            AffiliateRegistration,
            UserInformation
        },
        methods:{
         filterApp(){
            console.log('filterApp');
            },
            opentab(){
                var url = window.location.href.split("#");
                var ctab = url[1] ? url[1] : "NewAffiliateform";
                Vue.set(this.currentTab, "tabname", ctab);
            }
        },
    }
</script>
<style scoped>
</style>