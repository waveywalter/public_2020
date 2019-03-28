<template>
    <nav class="navbar navbar-default navbar-static-top m-b-0">
    <div class="navbar-header">
      <a class="navbar-toggle hidden-sm hidden-md hidden-lg " href="javascript:void(0)" data-toggle="collapse" data-target=".navbar-collapse">
          <i class="ti-menu"></i>
      </a>
<!--This is left top logo -->
      <div class="top-left-part">
          <a class="logo" href="/index.html"><b>
              <!--This is dark logo icon-->
              <img src="/public/assets/plugins/images/2020iLogoSmall.png" alt="home" class="dark-logo" />
              <!--This is light logo icon-->
              <img src="/public/assets/plugins/images/2020iLogoText.png" alt="home" class="light-logo" /></b>
              <span class="hidden-xs"><!--This is dark logo text-->
                  <img src="/public/assets/plugins/images/2020iLogoTextSmall.png" alt="home" class="dark-logo" />
              </span>
          </a>
      </div>
      <ul class="nav navbar-top-links navbar-left hidden-xs">
          <li>
            <a href="javascript:void(0)" class="open-close hidden-xs waves-effect waves-light">
              <i class="icon-arrow-left-circle ti-menu"></i>
            </a>
          </li>
      </ul>

<!--END This is left top logo -->
<ul class="nav navbar-top-links navbar-right pull-right">
  <li class="dropdown">
    <a class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#" v-on:click="alltasklist=true" > <i class=" icon-list"></i> {{taskcount}} Open Task
    <div data-v-0f0d4343="" class="notify" v-if="taskcount>0"><span data-v-0f0d4343="" class="heartbit"></span><span data-v-0f0d4343="" class="point"></span></div></a>

<div class="modal fade bs-example-modal-sm show" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: block; padding-right: 17px;" aria-modal="true" v-if="alltasklist">
                                    <div class="modal-dialog modal-sm">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title" id="mySmallModalLabel">Open Task List</h4>
                                                <button type="button" class="close" data-dismiss="modal" @click="alltasklist=false" aria-hidden="true">×</button>
                                            </div>
                                            <div class="modal-body">
                                                <div>
                                                    <ul class="list-group">
                                                        <li class="list-item" v-for="task in $store.state.leads.alltask.filter(task=>{return task.status=='new'})">
                                                           <router-link class="newtask view " :key="task.id"  tag="li" :to="'/sales/crm/'+task.leadId" @click.native="loadLead(task)">
                  {{task.title}}
                </router-link> 
                                                        </li>
                                                    </ul>
                                                </div>
                                                 </div>
                                        </div>
                                        <!-- /.modal-content -->
                                    </div>
                                    <!-- /.modal-dialog -->
                                </div>
  </li>    
  <li class="dropdown">
    <a class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#" @click.prevent="logout()"> <i class=" icon-logout"></i> Logout</a>
  </li>
  <li class="dropdown">
    <a class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#"><i class="icon-user-following"></i>
      <span>ACCOUNT</span>
      <div class="notify"><span class="heartbit"></span><span class="point"></span></div>
    </a>
    <ul class="dropdown-menu mailbox animated bounceInDown">
        <li>
          <div class="drop-title">You have 4 new messages</div>
        </li>
        <li>
          <div class="message-center">
            <a href="#">
                
              <div class="user-img"> <img src="/public/assets/plugins/images/users/pawandeep.jpg" alt="user" class="img-circle"> <span class="profile-status online pull-right"></span> </div>
              <div class="mail-contnet">
                  plugins/images/users/pawandeep.jpg
                  <h5>Pavan kumar</h5> <span class="mail-desc">Just see the my admin!</span> <span class="time">9:30 AM</span> </div>
            </a>
            <a href="#">
                <div class="user-img"> <img src="/public/assets/plugins/images/users/sonu.jpg" alt="user" class="img-circle"> <span class="profile-status busy pull-right"></span> </div>
                <div class="mail-contnet">
                    <h5>Sonu Nigam</h5> <span class="mail-desc">I've sung a song! See you at</span> <span class="time">9:10 AM</span> </div>
            </a>
            <a href="#">
                <div class="user-img"> <img src="/public/assets/plugins/images/users/arijit.jpg" alt="user" class="img-circle"> <span class="profile-status away pull-right"></span> </div>
                <div class="mail-contnet">
                    <h5>Arijit Sinh</h5> <span class="mail-desc">I am a singer!</span> <span class="time">9:08 AM</span> </div>
            </a>
            <a href="#">
                <div class="user-img"> <img src="/public/assets/plugins/images/users/pawandeep.jpg" alt="user" class="img-circle"> <span class="profile-status offline pull-right"></span> </div>
                <div class="mail-contnet">
                    <h5>Pavan kumar</h5> <span class="mail-desc">Just see the my admin!</span> <span class="time">9:02 AM</span> </div>
            </a>
          </div>
        </li>
        </ul>
        <li>
            <a class="text-center" href="https://thewaveint.com"> <strong>See all notifications</strong> <i class="fa fa-angle-right"></i> </a>
        </li>
    </ul>
</div>
</nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
    import { userService } from '../../_services';
    export default {
        name: "TopHeader",
        created(){
             this.getAllTask();
        },
        data (){
            return {
                alltasklist:false
            }
        },
        methods: {
            loadLead(task){
                /*$refs.crm.changeLead($store.state.leads.leads.filter(lead=>{return lead.id==task.leadId})[0]) */
                console.log(this)
                this.alltasklist=false
                this.$parent.$children[2].changeLead(this.$store.state.leads.leads.filter(lead=>{return lead.id==task.leadId})[0])
                    

            },
            opentaskmodal(){},
          logout() {
            userService.logout();
          },
              ...mapActions("leads", {

      getAllTask:"getAllTask"
     }),
        },  
        computed:{...mapState({

      alltask:state=>state.leads.alltask
          }),
          taskcount(){
              return this.alltask.filter(task=>{return task.status=="new"}).length
          },

        }
    }
</script>

<style scoped>
.newtask.view{
    float:none;
    cursor:pointer;
}
</style>