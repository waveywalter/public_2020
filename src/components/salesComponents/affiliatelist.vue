<template>
<div class="list-group">

                <div v-for="user in users.items" :key="user.id" > 
              
                 <router-link class="list-group-item " :key="user.id"  tag="li" :to="'/sales/affiliate/'+user.id" @click.native="updateId(user.id)">
                <div class="mr15 minw125"><a> {{user.firstname}} {{user.lastname}}</a></div>
                <span class="ti-close" v-on:click="openmodal(user.id)"></span>
                </router-link>
        
                </div>
                        <div v-if="modalopen" class="modal fade bs-example-modal-sm show" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: block; padding-right: 17px;" aria-modal="true">
                                    <div class="modal-dialog modal-sm">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title" id="mySmallModalLabel">Are You Sure?</h4>
                                                <button type="button" class="close" v-on:click="openmodal('')" data-dismiss="modal" aria-hidden="true">×</button>
                                            </div>
                                            <div class="modal-body"> <button v-on:click="deleteApp(modalid)" type="button" class="btn waves-effect waves-light btn-danger">Delete</button>
                                            <button type="button" class="btn waves-effect waves-light btn-info " v-on:click="openmodal()"  data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                        <!-- /.modal-content -->
                                    </div>
                                    <!-- /.modal-dialog -->
                                </div>                                         
                            </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VeeValidate from "vee-validate";
export default {
    data(){
        return {
            modalid:"",
            modalopen:false,
        }
    },
  created(){
   this.getAllUsers({role: "affiliate"});
   
  },
methods:{
    updateId(id){
      this.cid = id;
      this.getrecord(id);
        },
    getrecord(id){

      this.cid = id;
      if(id!=undefined){
       fetch('https://2020i.site/api/applications/'+id,{method:"GET",headers:{"Content-Type": "application/json; charset=utf-8",}})
       .then(response=>response.json())
       .then(json=>{
            this.$store.state.apps.application = json;
            if(json.s1==0){
                this.clock = setInterval(this.checkContractStatus,7000);

                }
            else{
                clearInterval(this.clock)
                }
            }     
        )
      }

      },
 ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
},
computed:{

      ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })


},





    }



</script>
<style >

.minw125{
min-width:125px;
display:inline-block
}
.mr15{
  margin-right:15px;
}
.list-group-item, .list-group-item:first-child, .list-group-item:last-child {
    border-radius: 19px;
    border-color: rgba(120,130,140,.28);
    margin-bottom: 14px;
    background-color: #ffffff1c;
}
.ti-close{cursor:pointer;
float:right;
}
</style>