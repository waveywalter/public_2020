<template>
    <div>
   
       <div class="hide">{{cuser}}</div>
        <form>
        <div class="white-box form-body form-material">
                    <div class="row float-right">

<toggle-button :value="false" color="green" :sync="true" :width="120" :labels="{checked: 'Approved!', unchecked: 'Click to Approve'}" />

</div>
   
                                        <h3 class="box-title">Person Info</h3>

                                       <div class="col-lg-2 col-sm-4 col-xs-12">


                                </div>

                                        <hr class="m-t-0 m-b-40">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">First Name</label>
                                                    <div class="col-md-9">
                                                    
                                                        <input type="text" class="form-control" placeholder="John Smoe" v-model="firstname">
                                                        <small class="form-control-feedback"> </small> </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group has-danger row">
                                                    <label class="control-label text-right col-md-3">Last Name</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control form-control-danger" v-model="lastname" placeholder="12n">
                                                        <small class="form-control-feedback">  </small> </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                                                                <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Phone</label>
                                                    <div class="col-md-9">
                                                    
                                                        <input type="phone" class="form-control" placeholder="John Smoe" v-model="phone">
                                                        <small class="form-control-feedback"> </small> </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            <div class="col-md-6">
                                                <div class="form-group has-danger row">
                                                    <label class="control-label text-right col-md-3">Email</label>
                                                    <div class="col-md-9">
                                                        <input type="email" class="form-control form-control-danger" v-model="email" placeholder="12n">
                                                        <small class="form-control-feedback">  </small> </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Gender</label>
                                                    <div class="col-md-9">
                                                        
                                                        <select class="form-control custom-select" v-model="sex">
                                                            <option value="" disabled>Choose One</option>
                                                            <option value="male" selected>Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                        <small class="form-control-feedback"> Select your gender. </small> </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Therapist Type</label>
                                                    <div class="col-md-9">
                                                        <select class="form-control custom-select" data-placeholder="Therapist Type" tabindex="1" v-model="ttype">
                                                            <option value="" disabled>SELECT ONE</option>
                                                            <option value="Category 1" selected>ASTN MF</option>
                                                            <option value="Category 2">QSWD TH</option>
                                                            <option value="Category 3">LKMN ID</option>
                                                            <option value="Category 4">SDC VGB</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/span-->
                                            
                                            <!--/span-->
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            
                                            <!--/span-->
       
                                            <!--/span-->
                                        </div>
 
                                    </div>

                </form>     
            </div>
        

</template>
<script>
import { mapState, mapActions } from "vuex";
    export default {
        name: "affiliateformfields",
        props :["afid",'user'],
         data(){
            return{
                complete:function(){
                    if(this.firstname!='' && this.lastname !='' && this.phone!='' && this.email !='' && this.sex!='' && this.ttype!=''){
                       console.log("COMPLETE 1")
                       console.log(this._self.$parent.$refs)
                        //this.$store.state.apps.currentStep=2;
                      //this.$parent.selected = 2
                     // this._self.$parent.$refs.second.click();
                        return true
                    }
                    return false
                },
                sex:'male',
           //     email:'',
                ttype:'Category 1',
           //     phone:'',
            //    firstname:'',
            //    lastname:'',
                
            }
        },
            created(){
                console.log("CURRENT USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
        if(this.$store.state.account.user.user.role=="sales"){        
        this.getAllUsers({role:"affiliate"})
        }
        this.$store.state.users.current = this.user
        // this.getUserForms(this.afid)
       
        },

        computed:{
            cuser : function(){
                return this.user
            },
        /*    user: function(){
                console.log(this.$store.state.users.all.items)
                console.log(this.afid)
                if( this.$store.state.users.all.items != undefined){
                if(this.$store.state.account.user.user.role=="sales") return this.$store.state.users.all.items.filter(aff=>{return aff.id===this.afid})

                return [this.$store.state.account.user.user]
                }
                return []
            }, */
            firstname:{
                    get: function () {
                        console.log("FIRDT")
                        console.log(this.user)
                        if(this.user[0]){
                        this.$store.state.users.current = this.user
                        return this.user[0].firstname
                        }
                        return ''
                    },
                    // setter
                    set: function (newValue) {
                    this.user[0].firstname= newValue
                }           
            },
             lastname:{
                    get: function () {
                        console.log("LAST")
                        console.log(this)
                        if(this.user[0])
                        return this.user[0].lastname

                        return ''
                    },
                    // setter
                    set: function (newValue) {
                    this.user[0].lastname= newValue
                }           
            },
            phone:{
                    get: function () {
                        console.log("FIRDT")
                        console.log(this.user)
                        if(this.user[0])
                        return this.user[0].phone

                        return ''
                    },
                    // setter
                    set: function (newValue) {
                    this.user[0].phone= newValue
                }           
            },
             email:{
                    get: function () {
                        console.log("LAST")
                        console.log(this)
                        if(this.user[0])
                        return this.user[0].email

                        return ''
                    },
                    // setter
                    set: function (newValue) {
                    this.user[0].email= newValue
                }           
            }

        },
            methods:{
            ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete"
    })},
    
        components: {

        }
    }
</script>
<style scoped>

</style>