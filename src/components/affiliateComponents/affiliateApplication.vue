<style>
.card{
    background-color:transparent;
    border:none;
}
.tab-content{width:90%}
.list {
    display: grid;
}
</style>
<template>

                                <!-- Nav tabs -->
                              <div class="vtabs">
                       
                                    <ul class="nav nav-tabs tabs-vertical" role="tablist">
                                        <li class="nav-item"> <a class="nav-link active show" data-toggle="tab" href="#home4" role="tab" aria-selected="true"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">Profile Details</span> </a> </li>
                                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#practice4" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">Practice Details</span> </a> </li>
                                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#profile4" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-user"></i></span> <span class="hidden-xs-down">Forms</span></a> </li>
                                        <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#messages4" role="tab" aria-selected="false"><span class="hidden-sm-up"><i class="ti-email"></i></span> <span class="hidden-xs-down">Uploads</span></a> </li>
                                    </ul>
                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="home4" role="tabpanel">

                                                <affiliateformfields :afid='afid'></affiliateformfields>
                                        </div>
                                        <div class="tab-pane" id="practice4" role="tabpanel">
                                        <practicefields></practicefields>
                                        </div>
                                        <div class="tab-pane p-20 " id="profile4" role="tabpanel">
                                            <div>
                                               
                                                <div v-if="role=='sales'">
                                            <router-link :to="'/sales/affiliate/forms/'+form.id" v-for="(form,index) in forms_list" :key="'fskl'+index" v-if="form.status!='signed' ">
                                      
                                            <a style="margin-right:10px" v-on:click="formloader(form.id)" :value="form.id">{{form.FormTitle}}</a>
                                            
                                            </router-link>
                                            </div> 
                                            <div v-if="role=='affiliate'">
                                            <div>
                                            <h3>    
                                            <router-link :to="'/affiliates/forms/'+form.id" v-for="(form,index) in forms_list" :key="index" v-if="form.status!='signed' ">
                                      
                                            <a style="margin-right:10px" v-on:click="formloader(form.id)" :value="form.id">{{form.FormTitle}}</a>
                                            
                                            </router-link>
                                            </h3>
                                            <div>
                                                Form Description/Details/Usage
                                            </div>
                                            </div>
                                         </div>
                                                
                                                <viewer :fid="fid" :phtml="thtml" ></viewer>
          
                                            </div>
                                        </div>
                                        <div class="tab-pane p-20  " id="messages4" role="tabpanel">

            <uploader :afid='afid'></uploader>
        </div>
    </div>
</div>
</template>
<script>
import viewer from '../formViewerComponents/formViewer'
import affiliateformfields from './affiliateformfields';
import practicefields from './practicefields';
import forms from './forms.vue';
import uploader from './uploads';
import { authHeader } from '../../_helpers';
import { mapState, mapActions } from "vuex";
export default{
    name:"affiliateApplication",
  //  props:["afid"],
    mounted(){

        if(this.$root._route.params.id){
            console.log("LOAD DATA")
        }
            this.getFormsHtml()
        },
    created(){
        this.getAllUsers({role:"affiliate"})
         this.getUserForms(this.afid)
       
        },
    methods:{
            ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete"
    }),
           ...mapActions("form", ["getformbyid", "updateform","getforms", "deleteform","attachUserToForm","getUserForms"]),
           formloader(e){
               console.log(e)
                this.$store.state.account.formid = e
                let rootform = this.$store.state.form.userForms//.filter(form=>{return form.formId==e})
                this.$store.state.form.current_signed_form = rootform[0].id;
               this.getFormHtml(e)
                },
           getFormHtml(id){
 
                    let currentf = this.html.filter(form=>{return form.id==id })
                    this.formDisplay=true
                    this.thtml = currentf
                    return currentf
                },
           async getFormsHtml(){
               console.log("AFFFDASHHHHHHHHHHHHH")
                   let sfs = this.$store.state.account.user.user.signedforms
                        let ssfs = await fetch('https://2020i.site/api/wsers/'+this.afid+'/signedforms?',{
                            method:"GET",
                            headers: { ...authHeader(), 'Content-Type': 'application/json' },   
                        })
                        .then(res=>res.json()).then(json=>{return json})
                    this.$store.state.form.sfs = ssfs                       
                    let fs = await   fetch('https://2020i.site/api/Forms?filter[where][FormType]=affiliate').then(res=>res.json()).then(json=>{return json})
                            let userforms = fs.filter(form=>{
                            return ssfs.filter(signedform=>{return form.id===signedform.formId})[0]
                        })
                        this.html = userforms
                        
             },
            openFileDialog(type) {
                console.log('FILE DIALOG')
                console.log(type);

            document.getElementById(type).click();
            },

  
            
        
        },
    computed:{
            ...mapState({
      account: state => state.account,
      users: state => state.users.all
    }),
        afid:{
                           get:function(){ return this.$root._route.params.id },
                set:function(value){
                    this.afid = value
                }
        },
        role:function(){
            return this.$store.state.account.user.user.role
        },
         forms_list :{
                get:function(){ return this.html },
                set:function(value){
                    this.forms_list = value
                }
            }
         },
    data(){
             return{
                formDisplay:false,
                whattodo:'',
                fid:"",
                html:"",
                FormTitle:"",
                thtml:'',
                forms:''
                    }   
                },
    components: {
                affiliateformfields,practicefields,forms,viewer,uploader
         }
}
</script>