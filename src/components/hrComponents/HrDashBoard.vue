<template>
    <div>
        <div id="page-wrapper">
            <div class="container-fluid">
            <div class="col-lg">
                <div class="row bg-title">
             <h4 class="page-title">Human Resources DashBoard</h4>
             </div>
            </div>
             <div class="col-lg-6 col-sm-6 col-xs-12">
             <div class="white-box">
            <section>
        <div class="sttabs tabs-style-bar">
            <nav>
                <ul>
                    <li><a v-on:click="currentTab.tabname = 'hrcreateform' " href="#hrcreateform" class="sticon ti-home "><span>New Form</span></a></li>
                    <!-- <li><a v-on:click="currentTab.tabname = 'UserInformation' " href="#UserInformation" class="sticon ti-trash"><span>User Info</span></a></li> -->
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
import TopHeader from '../layoutComponents/TopHeader';
import SideBar from '../layoutComponents/SideBar';
import hrcreateform from '../hrComponents/hrcreateform';
import UserInformation from '../layoutComponents/UserInformation';
import Vue from 'vue';


    export default {
        name: "HrDashBoard",
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
                var ctab = url[1] ? url[1] : "hrcreateform";
                Vue.set(this.currentTab, "tabname", ctab);
            }
        },
        components: {
            TopHeader,
            SideBar,
            hrcreateform,
            UserInformation,
        }
    }
</script>
<style scoped>
</style>