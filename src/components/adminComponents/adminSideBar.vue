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
                    <li class="nav-small-cap m-t-10">--- Main Menu</li>
                    <li>
                      <router-link to="/admin" class="waves-effect active">
                        <i class="linea-icon linea-basic fa-fw" data-icon="E"></i>
                        <span class="hide-menu">Admin Dashboard</span>
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
                      <a href="inbox.html" class="waves-effect">
                        <i data-icon=")" class="linea-icon linea-basic fa-fw"></i>
                        <span class="hide-menu">Responsibilities<span class="fa arrow"></span></span>
                      </a>
                        <ul class="nav nav-second-level">
                            <li><a href="eliteadmin/eliteadmin-dark/chat.html">Today</a></li>
                            <li><a href="javascript:void(0)" class="waves-effect">Daily<span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">
                                    <li> <a href="eliteadmin/eliteadmin-dark/inbox.html">Mail box</a></li>
                                    <li> <a href="eliteadmin/eliteadmin-dark/inbox-detail.html">Inbox detail</a></li>
                                    <li> <a href="eliteadmin/eliteadmin-dark/compose.html">Compose mail</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0)" class="waves-effect">Monthley<span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">
                                    <li> <a href="eliteadmin/eliteadmin-dark/eliteadmin/eliteadmin-dark/eliteadmin/eliteadmin-dark/contact.html">Contact1</a></li>
                                    <li> <a href="eliteadmin/eliteadmin-dark/eliteadmin/eliteadmin-dark/contact2.html">Contact2</a></li>
                                    <li> <a href="eliteadmin/eliteadmin-dark/contact-detail.html">Contact Detail</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0)" class="waves-effect">Compliance<span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">
                                    <li> <a href="eliteadmin/eliteadmin-dark/eliteadmin/eliteadmin-dark/eliteadmin/eliteadmin-dark/contact.html">ACA</a></li>
                                    <li> <a href="eliteadmin/eliteadmin-dark/eliteadmin/eliteadmin-dark/contact2.html">Joint Comission</a></li>
                                    <li> <a href="eliteadmin/eliteadmin-dark/contact-detail.html">HEPPA</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                      <a href="#" class="waves-effect"><i data-icon="/" class="linea-icon linea-basic fa-fw"></i>
                        <span class="hide-menu">Learning<span class="fa arrow"></span> </span>
                      </a>
                        <ul class="nav nav-second-level">
                            <li><a href="eliteadmin/eliteadmin-dark/cards.html">Training Overview</a></li>
                            <li><a href="eliteadmin/eliteadmin-dark/cards.html">Online Training</a></li>
                            <li><a href="eliteadmin/eliteadmin-dark/cards.html">Hippa Training</a></li>
                            <li><a href="eliteadmin/eliteadmin-dark/cards.html">ACA Training</a></li>
                        </ul>
                    </li>
                    <li>
                      <a href="forms.html" class="waves-effect">
                        <i data-icon="b" class="linea-icon linea-basic fa-fw"></i>
                        <span class="hide-menu">Reports<span class="fa arrow"></span></span>
                      </a>
                        <ul class="nav nav-second-level">
                            <li><a href="form-basic.html">Basic Daily Report</a></li>
                            <li><a href="form-basic.html">Medical Incident report</a></li>
                            <li><a href="form-basic.html">Facilitie Incident report</a></li>
                        </ul>
                    </li>
                    <li class="nav-small-cap">--- Proffessional</li>
                    <li>
                      <a href="#" class="waves-effect"><i data-icon="" class="linea-icon linea-basic fa-fw"></i>
                        <span class="hide-menu">Asign Tasks<span class="fa arrow"></span></span>
                      </a>
                        <ul class="nav nav-second-level">
                          <li><a href="starter-page.html">Position 1</a></li>
                          <li><a href="blank.html">Name One</a></li>
                          <li><a href="lightbox.html">ER12354</a></li>
                        </ul>
                    </li>
                    <li>
                      <a href="tables.html" class="waves-effect"><i data-icon="O" class="linea-icon linea-software fa-fw"></i>
                        <span class="hide-menu">Tasks<span class="fa arrow"></span><span class="label label-rouded label-danger pull-right">7</span></span>
                      </a>
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
console.log(user)

    export default {
        name: "SideBar",
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