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
                    <li><a v-on:click="currentTab.tabname = 'ownerform' " href="#ownerform" class="sticon ti-home "><span>New Form</span></a></li>
                    <li><a v-on:click="currentTab.tabname = 'UserInformation' " href="#UserInformation" class="sticon ti-trash"><span>User Info</span></a></li>
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
        </div>
        </div>
</template>

<script>
import AdminTopHeader from '../layoutComponents/adminTopHeader';
import AdminSideBar from '../layoutComponents/adminSideBar';
import ownerform from  '../ownerComponents/ownerform';
import UserInformation from '../layoutComponents/UserInformation';
import Vue from 'vue';

    export default {
        name: "OwnerDashBoard",
        data(){
            return{
                currentTab: {
                    tabname: ""
                }
            }
        },
         mounted(){
            this.opentab();
        },
        methods: {
            opentab(){
                var url = window.location.href.split("#");
                var ctab = url[1] ? url[1] : "ownerform";
                Vue.set(this.currentTab, "tabname", ctab);
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