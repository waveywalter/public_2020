<template>
<div class="navbar-default sidebar" role="navigation">
  <div class="sidebar-nav navbar-collapse slimscrollsidebar">
    <div class="user-profile">
          <div class="dropdown user-pro-body">
              <div><img v-bind:src=imagepath alt="user-img" class="img-circle"></div> <a href="#" class="dropdown-toggle u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.user.username}}<span class="caret"></span></a>
              <ul class="dropdown-menu animated flipInY">
                  <li><router-link v-bind:to="'/'+user.user.role+'/myprofile'"><i class="ti-user"></i> My Profile</router-link></li>
            <!--      <li><a href="#"><i class="ti-wallet"></i> My Balance</a></li>
                  <li><a href="#"><i class="ti-email"></i> Inbox</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#"><i class="ti-settings"></i> Account Setting</a></li> -->
                  <li role="separator" class="divider"></li>
                  <li><a href="login.html"><i class="fa fa-power-off"></i> Logout</a></li>
              </ul>
          </div>
      </div>
      <ul class="nav" id="side-menu">
          <li class="nav-small-cap m-t-10">--- HR Main Menu</li>
          <li>
            <router-link v-bind:to="'/'+user.user.role" class="waves-effect active">
              <i class="linea-icon linea-basic fa-fw" data-icon="E"></i>
              <span class="hide-menu">Dashboard</span>
            </router-link>
          </li>
          <li> <a href="javascript:void(0);" class="waves-effect"><i class="linea-icon linea-basic fa-fw " data-icon="7"></i> <span class="hide-menu "> Components <span class="fa arrow"></span></span></a>
              <ul class="nav nav-second-level">
                  <li> <a href="clients.php">Clients</a> </li>
                  <li> <a href="eliteadmin/eliteadmin-hospital/index.html">Responsibilities</a> </li>
                  <li> <a href="eliteadmin/eliteadmin-hospital/index.html">Training</a> </li>
                  <li> <a href="eliteadmin/eliteadmin-hospital/index.html">Account</a> </li>
              </ul>
          </li>
          
          
          <li>
            <a href="tables.html" class="waves-effect"><i data-icon="O" class="linea-icon linea-software fa-fw"></i>
              <span class="hide-menu">Tasks<span class="fa arrow"></span><span class="label label-rouded label-danger pull-right">7</span></span>
            </a>
          </li>
      </ul>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
let user = JSON.parse(localStorage.getItem('user'));
//console.log(user)

    export default {
        name: "HrSideBar",
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