<template>
    <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse slimscrollsidebar">
              <div class="user-profile">
                    <div class="dropdown user-pro-body">
                        <div><img v-bind:src=imagepath alt="user-img" class="img-circle"></div> <a href="#" class="dropdown-toggle u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.user.username}}<span class="caret"></span></a>
                        <ul class="dropdown-menu animated flipInY">
                            <li><router-link to="/admin/myprofile"><i class="ti-user"></i> My Profile</router-link></li>
                            <li><a href="#"><i class="ti-wallet"></i> My Balance</a></li>
                            <li><a href="#"><i class="ti-email"></i> Inbox</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#"><i class="ti-settings"></i> Account Setting</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="login.html"><i class="fa fa-power-off"></i> Logout</a></li>
                        </ul>
                    </div>
                </div>
                <ul class="nav" id="side-menu">
                    <li class="nav-small-cap m-t-10">--- Affiliate Main Menu</li>
                    <li>
                      <router-link to="#" class="waves-effect active">
                        <i class="linea-icon linea-basic fa-fw" data-icon="E"></i>
                        <span class="hide-menu">Affiliate Dashboard</span>
                      </router-link>
                    </li>
                    <li> <a href="javascript:void(0);" class="waves-effect"><i class="linea-icon linea-basic fa-fw " data-icon="7"></i> <span class="hide-menu "> Components <span class="fa arrow"></span></span></a>
                        <ul class="nav nav-second-level">
                            <li> <router-link to="#">Create User </router-link> </li>
                            <li> <router-link to="#">Build Form</router-link> </li>
                            <li> <router-link to="#"> Assign Form</router-link> </li>
                            <li> <router-link to="#">Edit Form </router-link> </li>
                            <li> <a href="eliteadmin/eliteadmin-hospital/index.html">Account</a> </li>
                        </ul>
                    </li>
                    <li class="nav-small-cap">--- Support</li>
                    <li><a href="documentation.html" class="waves-effect"><i class="fa fa-circle-o text-danger"></i> <span class="hide-menu">Documentation</span></a></li>
                    <li><a href="gallery.html" class="waves-effect"><i class="fa fa-circle-o text-info"></i> <span class="hide-menu">IT team</span></a></li>
                    <li><a href="faq.html" class="waves-effect"><i class="fa fa-circle-o text-success"></i> <span class="hide-menu">Faqs</span></a></li>
                </ul>
            </div>
        </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
let user = JSON.parse(localStorage.getItem('user'));
    export default {
        name: "AffiliateSideBar",
        data(){
            return{
                imagepath: "/public/uploads/" + user.user.username +'/'+user.user.avatarName,
                user: user,
                role: user.user.role,
            }
        }
    }
</script>

<style scoped>
</style>