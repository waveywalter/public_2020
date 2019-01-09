<style scoped>
.vtabs .tab-content{width:100%}
#Signed .nav-tabs > li,#Upload .nav-tabs > li {
     float: none; 
    margin-bottom: -1px;
}
img{max-width:100%}
.down{flex-direction:column}
.layout.wrap{justify-content:space-between}
.thumbs{padding:10px;}
iframe{
  border:none;
 min-width: 700px;
}
.contract_holder{
  padding:20px;
  background-color:white;
  text-align:center;
}
.contract_holder h3 {
    color: #303030;
    margin-bottom: 11px;
}
.marginb50{margin-bottom:50px;}
.margint30{margin-top:30px;}
.nametag{width:300px;flex:none;padding:0;}
.flexline{display:flex;}
.indent .v-text-field input {

     padding: 0 ; 
  padding-left:15px;

}
[d-none]{display:none}
.layout.display-1.row.wrap.text-md-left > div {
    padding: 0 16px;
}
.basic  .layout{
    padding: 31px 45px 0px;
}
.basic .layout > .flex.xs6 {
    padding: 0 70px;
}
.uploads .v-btn{
  margin: 0 8px;
}
.uploads  .container {
    padding: 8px;
}
.uploads  .flex {
    padding: 0px;
}
.uploads i.i.i--right.material-icons.theme--dark {
    margin-left: 16px;
}
.display-1{font-size:23px;}
.meter > div * {
    flex-basis: 0;
    flex-grow: 1;
}
.meter > div {
    display: flex;
}
/*.meter > div > span {
    flex-basis: 100px;;
}
.max50{min-width:50vw;max-width:60vw;}
.max6{flex-basis:1000px} */
.profile-details {
    margin: 0px 15px;
}
.profile-details > div {
    padding: 10px 0;
     display: flex;
}
.white{color:white;}
.profile-details > div > span {
    flex-basis: 100px;
}
.flexor {
    display: flex;
    width:60vw;
    
}
.flexor > div:first-child {
    width:80%;
    margin-right:20px
    
}
.flexor > div:nth-child(2) {
    width:20%;
    max-width:150px;
}
.meter > div {
    margin-bottom:15px;
}
.vtabs .tabs-vertical {
    width: 150px;
    border-bottom: 0px;
    border-right: 1px solid #4F5467;
    display: table-cell;
    vertical-align: top;
}
</style>

<template>

    <div class="white-box mt-5 ml-5 max50 flexor" >
       
               <div v-if="this.$root._route.params.id">
                   
                   <div class="thumbs"><h3> Application <span v-if="capproved==1">Approved <i class="ti-thumb-up"></i></span><span v-if="capproved==0">Not Approved <i class="ti-thumb-down"></i></span> 
                    <button  class="btn waves-effect waves-light btn-success" v-on:click="approveApp('1')" v-if="check()==1">Approve Application</button> 
                    <button class="btn waves-effect waves-light btn-danger" v-on:click="approveApp('0')" v-if="capproved==1">Dissapprove Application</button>
                        </h3>
                    </div>
                   
                <div>
                    
                    <ul class="nav nav-pills m-t-30 m-b-30" role="tablist">
 
                                    <li v-bind:class="{active:isActive(m)}" class="nav-item" v-for="(title,m) in sections"> <a :href="'#'+title.split(' ')[0].substring(0,6)" class="nav-link " data-toggle="tab" aria-expanded="true">{{title}}</a> </li>

                                    
                     </ul>

                        <div class="tab-content br-n pn">
                            <div id="Profil" class="tab-pane active">
                                        <div class="row">
                                            <div class="col-md-12">
                                                    <div class="">
                                                        <div class="profile-details">
                                                            <div><span class="white">Name?</span><span>{{cname}}</span></div>
                                                            <div><span class="white">Email</span><span>{{cemail}}</span></div>
                                                            <div><span class="white">Phone</span><span>{{cphone}}</span></div>
                                                            <div><span class="white">Type</span><span>{{ctherapist_type}}</span></div>
                                                            <div><span class="white">Practice Type</span><span>{{cpractice_type}}</span></div>
                                                            <div><span class="white">SSN</span><span>{{cssn}}</span></div>
                                                            <div>Need Additional Fields to Collect</div>
                                                            </div>
                                                        </div>
                                                 </div>
                                        </div>
                                    </div>
                            <div id="Signed" class="tab-pane">
                                <div class="vtabs">
                                    <ul class="nav nav-tabs tabs-vertical" role="tablist">
                                        <li class="nav-item"  v-for="(docs,n) in signature"> <a v-bind:class="{active:isActive(n)}" class="nav-link" data-toggle="tab" :href="'#'+docs[0].split(' ')[0]" 
                                        role="tab" aria-selected="true"><span class="hidden-sm-up">
                                            <i class="ti-home"></i></span> <span class="hidden-xs-down">{{docs[0].split(' ')[0].substring(0,14)}}</span> </a> </li>
                                    </ul>
                               
                                        <div class="tab-content">
                                                <div class="tab-pane" v-bind:class="{active:isActive(n)}" :id="''+docs[0].split(' ')[0]" role="tabpanel"  v-for="(docs,n) in signature">
                                            <div class="p-20">
                                               
                                            <div v-if="!waitingHide(n)">Waiting for document to be signed. Add resend email button.</div> 
                                           <iframe v-if="iframeShow(n)"  name="esignatures-io-iframe" width=100% height=600 :src="sign(n+1)"/>
                                           <button v-if="iframeShow(n)"  class="btn waves-effect waves-light btn-danger" v-on:click="rejectApp('Signed',n)">Reject {{docs[0]}}</button>
                                           <button v-if="sendShow(n)"  class="btn waves-effect waves-light btn-danger" v-on:click="sendDocs(n,'current')">Send {{docs[0]}}</button>
                                           <button v-if="iframeShowNext(n) && n<signature.length"  class="btn waves-effect waves-light btn-danger" v-on:click="sendDocs(n+1,'next')">Send {{signature[(n+1)][0]}}</button>
                                          
                                                                                      
                                           </div>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                            <div id="Upload" class="tab-pane">
                                 <div class="vtabs">
                                    <ul class="nav nav-tabs tabs-vertical" role="tablist">
                                        <li class="nav-item"  v-for="(docs,n) in upload"> <a v-bind:class="{active:isActive(n)}" class="nav-link" data-toggle="tab" :href="'#'+docs[0].split(' ')[0]" 
                                        role="tab" aria-selected="true"><span class="hidden-sm-up">
                                            <i class="ti-home"></i></span> <span class="hidden-xs-down">{{docs[0].split(' ')[0].substring(0,14)}}</span> </a> </li>
                                    </ul>
                               
                                        <div class="tab-content">
                                                <div class="tab-pane" v-bind:class="{active:isActive(n)}" :id="''+docs[0].split(' ')[0]" role="tabpanel"  v-for="(docs,n) in upload">
                                            <div class="p-20">
                                               <div>
                                                   <embed v-if="!uploadshow(n,docs[0].split(' ')[0])" :src="'/api/containers/'+cid+'/download/'+docs[0].split(' ')[0].toLowerCase()+'.pdf'" type="application/pdf" width="100%" height="600px" />
                                                   </div>
                                                    <button v-if="!uploadshow(n,docs[0].split(' ')[0])"  class="btn waves-effect waves-light btn-danger" v-on:click="rejectUpload(docs[0],n)">Reject {{docs[0]}}</button>
                                           <button v-if="uploadshow(n,docs[0].split(' ')[0])"  class="btn waves-effect waves-light btn-danger" v-on:click="openFileDialog(docs[0])">Upload {{docs[0]}}</button>
                                            <input type="file" :id="'upload-'+docs[0]" style="display:none" @change="onFileChange">
                                                                                      
                                           </div>
                                        </div>
                                        </div>
                                    </div>

                                    </div>
                            <div id="Emerge" class="tab-pane">
                                    <div v-for="contact in this.$store.state.apps.application.contacts">
                                        <div class="white">{{contact.name}} - {{contact.phone}}</div>
                                    </div>
                                    </div>                                                   
                        </div>
                    </div>
                </div>
    <div id="app-wrapper" v-if="!this.$root._route.params.id">
            <div >
            <div class="row" >
             <div class="col-xl-12">
              <div class="form-group">
                <label for="exampleInputEmail1">Filter Applications</label>
                <input type="text" v-model='appfilter' v-on:blur='filterApp(appfilter)' class="form-control" id="exampleInputEmail1" placeholder="Enter Email Address">
               </div>
              </div>
             </div>
                <div   v-for="apps in list">
                  
                <router-link tag="li" :to="'/salesdashboard/'+apps.id" @click.native="updateId(apps.id)">
                <a>{{apps.firstname}} {{apps.lastname}}</a>
                </router-link>
                </div>
            </div>
        </div>
    <div v-if="this.$root._route.params.id">
                    <div class="meter max6">
 
                     <div><span>Admission Agreement</span> <i class="ti-check" v-if="cs9==1"></i><br></div>       

                    </div>               
        </div> 

    </div>

</template>

<script>

import axiosApi from 'axios';
import  $ from 'jquery'
//import AffiliateRegView from '../salesComponents/jottComponents/v5/pages/AffiliateRegView.vue';


export default {
    components :{

    },
    data(){
        return {
          //  signature:[["Accident Reporting Procedure",1,1],['Authorization-Background Screening',1,0],['CDCFactSheet VaccineInfoSign Sheet',1,0],
          //      ['Confidentiality Statement-Contractor',1,0],['Part-Time-PerDiemStaffOrientationPacket',1,0],
          //      ['Profl Code of Ethics & Standards of Conduct',1,0],['Sexual Harrassment Policy- Contractors',1,0],['TB Status Review',1,0],['Admission Agreement',1,0]],
            signature:[['Admission Agreement',1,0]],
            list:[],
            appfilter:'',
            //sections:["Profile Details","Signed Documents","Uploaded Documents","Emergency Contacts"],
            //sections:["Profile Details","Signed Documents","Uploaded Documents"],
            sections:["Profile Details","Signed Documents"],
            upload:[['Resume',0,2],['License',0,0],['Liability',0,0],['CES',0,0]],
          //  test:'My Life'
        }
    },
computed:{
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
          },
      listlength:function(){
         if(this.appfilter!=""){
         let ar = this.list.filter(item=>{ return item.email==this.appfilter });
         return ar.length
         }
         return this.list.length
       },
      capproved:{
        get:function(e){
        console.log('get approved');
        console.log(e);
        console.log(this)
                  if(!this.$store.state.apps.application.approved){
              this.capproved='0';
          }
          else if(this.$store.state.apps.application.approved==1 || this.$store.state.apps.application.approved=='1'){
              this.capproved='1';
          }
          else{
              this.capproved='0';
          }
        return this.$store.state.apps.application.approved
        },
        set:function(e){
          console.log(e)
          if(!e){
              e='0';
          }
          else if(e==1 || e=='1'){
              e='1';
          }
          else{
              e='0';
          }
          console.log('set approved');
          this.$store.state.apps.application.approved = e;
          return 'Set Resume'
            }         
          },
        cs9:{
        get:function(e){
        console.log('get cs9');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s9
        },
        set:function(e){
          console.log(e)
          console.log('set cs9');
          this.$store.state.apps.application.s9= e;
          return 'Set Resume'
            }         
          },
        cs8:{
        get:function(e){
        console.log('get cs8');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s8
        },
        set:function(e){
          console.log(e)
          console.log('set cs8');
          this.$store.state.apps.application.s8 = e;
          return 'Set Resume'
            }         
          },
        cs7:{
        get:function(e){
        console.log('get cs7');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s7
        },
        set:function(e){
          console.log(e)
          console.log('set cs7');
          this.$store.state.apps.application.s7 = e;
          return 'Set Resume'
        }         
        },
              cs6:{
        get:function(e){
        console.log('get cs6');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s6
        },
        set:function(e){
          console.log(e)
          console.log('set cs6');
          this.$store.state.apps.application.s6 = e;
          return 'Set Resume'
        }         
       },
      cs5:{
        get:function(e){
        console.log('get cs5');
        //console.log(e);
        //console.log(this)
        console.log(this.$store.state)
        return this.$store.state.apps.application.s5
        },
        set:function(e){
          console.log(e)
          console.log('set cs5');
          this.$store.state.apps.application.s5 = e;
          return 'Set Resume'
        }         
       },
      cs4:{
        get:function(e){
        console.log('get cs4');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s4
        },
        set:function(e){
          console.log(e)
          console.log('set cs4');
          this.$store.state.apps.application.s4 = e;
          return 'Set Resume'
        }         
       },
      cs3:{
        get:function(e){
        console.log('get cs3');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s3
        },
        set:function(e){
          console.log(e)
          console.log('set cs3');
          this.$store.state.apps.application.s3 = e;
          return 'Set Resume'
        }         
       },       cs2:{
        get:function(e){
        console.log('get cs2');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s2
        },
        set:function(e){
          console.log(e)
          console.log('set cs2');
          this.$store.state.apps.application.s2 = e;
          return 'Set Resume'
        }         
       },
      cs1:{
        get:function(e){
        console.log('get cs1');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.s1
        },
        set:function(e){
          console.log(e)
          console.log('set cs1');
          this.$store.state.apps.application.s1 = e;
          return 'Set Resume'
        }         
       },
       capp:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.visible
        },
        set:function(e){
          console.log(e)
          console.log('set reusme');
          this.$store.state.apps.application.visible = e;
          return 'Set Resume'
        }
      },
      crole:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.role
        },
        set:function(e){
          console.log(e)
          console.log('set reusme');
          this.$store.state.apps.application.role = e;
          return 'Set Resume'
        }
      },
       cid:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.id
        },
        set:function(e){
          console.log(e)
          console.log('set id');
          this.$store.state.apps.application.id = e;
          return 'Set Resume'
        }
      },
      cresume:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.resume
        },
        set:function(e){
          console.log(e)
          console.log('set reusme');
          this.$store.state.apps.application.resume = e;
          return 'Set Resume'
        }
      },
      clicense:{
        get:function(e){
        console.log('clicense');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.license
        },
        set:function(e){
          console.log(e)
          console.log('set id');
          this.$store.state.apps.application.license = e;
          return 'Set License'
        }
      },  
      cliability:{
        get:function(e){
        console.log('cinsurance');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.liability
        },
        set:function(e){
          console.log(e)
          console.log('set insurance');
          this.$store.state.apps.application.liability = e;
          return 'Set Insuramce'
        }
      },      
      cces:{
        get:function(e){
        console.log('cces');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.ces
        },
        set:function(e){
          console.log(e)
          console.log('set ces');
          this.$store.state.apps.application.ces = e;
          return 'Set CES'
        }
      },
      csign9:{
        get:function(e){
        console.log('csign9');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign9
        },
        set:function(e){
          console.log(e)
          console.log('set sign9');
          this.$store.state.apps.application.sign9 = e;
          return 'Set Email'
        }
      }, 
      csign8:{
        get:function(e){
        console.log('csign8');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign8
        },
        set:function(e){
          console.log(e)
          console.log('set sign8');
          this.$store.state.apps.application.sign8 = e;
          return 'Set Email'
        }
      }, 
      csign7:{
        get:function(e){
        console.log('csign7');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign7
        },
        set:function(e){
          console.log(e)
          console.log('set sign7');
          this.$store.state.apps.application.sign7 = e;
          return 'Set Email'
        }
      }, 
      csign6:{
        get:function(e){
        console.log('csign6');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign6
        },
        set:function(e){
          console.log(e)
          console.log('set sign6');
          this.$store.state.apps.application.sign6 = e;
          return 'Set Email'
        }
      }, 
      csign5:{
        get:function(e){
        console.log('csign5');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign5
        },
        set:function(e){
          console.log(e)
          console.log('set sign5');
          this.$store.state.apps.application.sign5 = e;
          return 'Set Email'
        }
      }, 
        csign4:{
        get:function(e){
        console.log('csign4');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign4
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.apps.application.sign4 = e;
          return 'Set Email'
        }
      }, 
      csign3:{
        get:function(e){
        console.log('csign3');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign3
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.apps.application.sign3 = e;
          return 'Set Email'
        }
      },      csign1:{
        get:function(e){
        console.log('csign1');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign1
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.apps.application.sign1 = e;
          return 'Set Email'
        }
      },
      csign2:{
        get:function(e){
        console.log('csign2');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.sign2
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.apps.application.sign2 = e;
          return 'Set Email'
        }
      },
      cpractice_type:{
        get:function(e){
        console.log('ctherpay');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.practice_type
        },
        set:function(e){
          console.log(e)
          console.log('set ctherapist ype');
          this.$store.state.apps.application.practice_type = e;
          return 'Set Email'
        }
        },
       ctherapist_type:{
                  get:function(e){
        console.log('ctherpay');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.therapist_type
        },
        set:function(e){
          console.log(e)
          console.log('set ctherapist ype');
          this.$store.state.apps.application.therapist_type = e;
          return 'Set Email'
        }
        },
        cphone : {
        get:function(e){
        console.log('cphone');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.phone
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.apps.application.phone = e;
          return 'Set Email'
        },
        },
        cssn : {
        get:function(e){
        console.log('computed name');
        //console.log(text);
        return this.$store.state.apps.application.ssn
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.apps.application.ssn = e;
          return 'Set Email'
        },
        },
        caddress : {
        get:function(e){
        console.log('computed name');
        //console.log(text);
        return this.$store.state.apps.application.address
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.apps.application.address = e;
          return 'Set Email'
        },
        },
      cname : {
        get:function(e){
        console.log('computed name');
        //console.log(text);
        return this.$store.state.apps.application.firstname+' '+this.$store.state.apps.application.lastname
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.apps.application.name = e;
          return 'Set Email'
        }

      },
      cemail : {
        get:function(){
        console.log('computed');
        //console.log(text);
        return this.$store.state.apps.application.email
        },
        set:function(e){
          console.log(e)
          this.$store.state.apps.application.email = e;
          return 'Set Email'
        }

      },     
       caddress : {
        get:function(){
        console.log('computed');
        //console.log(text);
        return this.$store.state.apps.application.address
        },
        set:function(e){
          console.log(e)
          this.$store.state.apps.application.address = e;
          return 'Set Email'
        }

      },     
      ctype : {
        get:function(){
        console.log('computed');
        //console.log(text);
        return this.$store.state.apps.application.type
        },
        set:function(e){
          console.log(e)
          this.$store.state.apps.application.type = e;
          return 'Set Email'
        }

      },
      progress :  { 
        
                get:function(e){
        console.log('get progress');
        console.log(e);
        console.log(this)
        return this.$store.state.apps.application.progress
        },
        set:function(e){
          console.log(e)
          console.log('set progress');
          this.$store.state.apps.application.progress = e;
          return 'Set Resume'
            } 
        }
    },
  
methods:{
    check(){
        // if all things satisfied return true else tretun false
        if(
            this.cces==1 &&
            this.cliability==1 &&
            this.clicense==1 &&
            this.cresume==1 &&
            this.cs1==1 &&
            this.cs2==1 &&
            this.cs3==1 &&
            this.cs4==1 &&
            this.cs5==1 &&
            this.cs6==1 &&
            this.cs7==1 &&
            this.cs8==1 &&
            this.cs9==1 &&
            this.capproved==0
        ){
            return true
        }
        return false
     },
    documentUpload(doctitle,n){
            console.log("Upload Docs to Document API and Update Application",doctitle,n)
     },
    rejectUpload(doctitle,n){
        console.log("REJCT DOWNLAOD",doctitle,n)
        let flag = 'resume';
        switch(doctitle){
            case 'Resume':
            flag ='cresume';
            this.cresume = 0;
            break;
            case 'License':
            flag= 'clicense'
            this.clicense=0;
            break;            
            case 'Liability':
            flag = 'cliability'
            this.cliability=0;
            break;
            case 'CES':
            flag = 'cces'
            this.cces=0;
            break;
        }
        this[flag]='0';
        this.capproved ='0';
        this.update();
        console.log(this);
        let mm = this.cid;
        fetch('https://jott.thewaveint.com/api/containers/'+mm+'/files/'+doctitle.toLowerCase()+'.pdf',{
            method:"DELETE",}
        )
      
     },
    uploadshow(n,notch){
        console.log("show "+notch)
        let flag = 'resume';
        switch(notch){
            case 'Resume':
            flag ='resume'
            break;
            case 'License':
            flag= 'license'
            break;            
            case 'Liability':
            flag = 'liability'
            break;
            case 'CES':
            flag = 'ces'
            break;
        }
      
        if( this.$store.state.apps.application[flag]=='' || this.$store.state.apps.application[flag]==0){
        return true
        }
        else{
            return false
        }
     },
    sendShow(n){
        let m = n+1;
        let r = 'sign'+m;
        let s = 's'+m;
        let sprev = 's'+(m-1);
 
        if(m>1){
        if((this.$store.state.apps.application[r]=='' || this.$store.state.apps.application[r]==undefined) && this.$store.state.apps.application[s]==0 && this.$store.state.apps.application[sprev]==1){return true} 
        }
        else if(m==1){
            console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"+m)
            if((this.$store.state.apps.application[r]=='' || this.$store.state.apps.application[r]==undefined) && this.$store.state.apps.application[s]==0){return true} 
        }
        return false
     },
    waitingHide(n){
        let r = 's'+(n+1);
        let p  = 'sign'+(n+1)
        if(this.$store.state.apps.application[r]==0 && (this.$store.state.apps.application[p]!='' && this.$store.state.apps.application[p]!=undefined)){return false} 
        return true
        },
    sendHide(n){
        
            let r = 'sign'+n;
            if(this.$store.state.apps.application[r]=='' ){return true}   
            return false 
     },
    sendDocs(n){
        console.log('SENDOCSSSSSSSSSSSSSSS')
        console.log(n)
        if(parseInt(n)==0){
            
            let l  = 's1';
            console.log(l)
            console.log(this.$store.state.apps.application[l])
        if(this.$store.state.apps.application[l]==0){
            console.log("Empty .. Please create and send")
            let data  = this.$store.state.apps.application;
            // dont email link - create docs with send through emailas yes - may require new API route
          fetch('https://jott.thewaveint.com/api/sendandcreate/contracts/'+this.cid,{
              method:"POST",
              headers:{"Content-Type": "application/json; charset=utf-8","accept": "*/*"
              },
              body:JSON.stringify(data)}).then(response=>{

        })
        
       // this.$store.commit('increment')
       
        
        }
        }
        else{
            console.log("send next document for signing")
            //Send link through email 
            let req  = {};
            req.sender = 'webmaster@thewaveint.com';
            req.name =  this.cname;
            req.subject = 'Document Rejected Please Resign';
            //req.progress = (n+1);
            console.log(n)
            let l  = 's'+n;
            console.log(l)
            let data  = this.$store.state.apps.application;
            let d = Object.entries(data);
            let e = d.map((datar)=>{
            //console.log(datar)
            if(datar[1]==null){
                if(datar[0]=='links' || datar[0]=='contacts'){
                    this.$store.state.apps.application[datar[0]] = [];
                    return [] 
                }
                else{
                    this.$store.state.apps.application[datar[0]] ='';
                    return ''
                }
                
            }
            return datar[1] 
            })
            console.log(this.$store.state.apps.application)
            console.log(this.$store.state.apps.application[l])
            if(this.$store.state.apps.application[l]==1){
            console.log("Empty .. Please create and send")
            // dont email link - create docs with send through emailas yes - may require new API route
            fetch('https://jott.thewaveint.com/api/sendandcreate/contracts/'+this.cid,{
              method:"POST",
              headers:{"Content-Type": "application/json; charset=utf-8","accept": "*/*"
              },
              body:JSON.stringify(data)}).then(response=>{

            })
        
            // this.$store.commit('increment')
       
        
            }
            else{
            req.text = "So and so document was rjeccted. Please Resign "+this.$store.state.apps.application[l]
            req.recipient = 'walterj@thewaveint.com';
         fetch('https://jott.thewaveint.com/api/email/post',
                {
                    method:"POST",
                    headers:{"Content-Type": "application/json; charset=utf-8",},
                    body:JSON.stringify(req)
                    
                    }).then(response=>{})

        }

        }
     },
    iframeShow(n){
            let l = n+1;
            let r = 's'+l;
            if(this.$store.state.apps.application[r]==1){return true}
            return false
      },
    iframeShowNext(n){
            let l = n+2;
            let k = n+1;
            let r = 's'+l;
            let p = 's'+k;
            let signnext = 'sign'+l
            console.log('SENDNESXTTTTTTT'); 
            console.log(signnext)
            console.log(this.$store.state.apps.application[p],this.$store.state.apps.application[p],this.$store.state.apps.application[signnext])
            if(l<=this.signature.length && this.$store.state.apps.application[p]==1 && this.$store.state.apps.application[r]==0 &&  !this.$store.state.apps.application[signnext]){return true}
            return false
      },
    buttonHide(n){
        let r = n+1;
        let k = 's'+r;
        let j = 'sign'+r;
        
        console.log("BUTTTONNNNNNNNNNNNNNNNNNNNNNNNNNNNSSSSSSSSSSSSSSS")
        console.log(k)
        console.log(this.$store.state.apps.application[k]);
        console.log(this.$store.state.apps.application[j]);
        //if(this.$store.state.apps.application[k]==0 && this.$store.state.apps.application[j].length==0){return false}
        //if(this.$store.state.apps.application[k]==0 && this.$store.state.apps.application[j].length>0){return true}
        //if(this.$store.state.apps.application[k]==1 && this.$store.state.apps.application[j].length==0){return false}
        return true
      },
    testRejection(num){
        if(num==0){if (this.cresume==0){ return false }}
        if(num==1){if (this.clicense==0){ return false }}
        if(num==2){if (this.cliability==0){ return false }}
        if(num==3){if (this.cces==0){ return false }}
        return true
        },
    isActive(boo){
        if(boo<1){return true}
        return false
      },
    test(){return 'Chester'},
    changetoprofile(){
      this.$store.state.apps.application.progress=1
      clearInterval(this.clock)
      },
    changetosign(){
      this.$store.state.apps.application.progress = 2;
      clearInterval(this.clock)
      this.clock = setInterval(this.checkContractStatus,7000);
      },
    changetoupload(){
      this.$store.state.apps.application.progress = 10;
      clearInterval(this.clock)
      },
    goToProgress(){},
    update(){
      //update application with new profile details
      let data = Object.entries(this.$store.state.apps.application);
      data.forEach((key,value) => {
        console.log(key,value)
        if(key[0]=='type'){
            value= value.toString();
        }
        if(key[1]==null){
          this.$store.statea.apps.application[key[0]]='';
        }
      });
      console.log(JSON.stringify(this.$store.state.apps.application))
     fetch("/api/applications/"+this.$store.state.apps.application.id,{method:"PATCH",headers:{"Content-Type": "application/json; charset=utf-8",},body:JSON.stringify(this.$store.state.apps.application)}).then()
      
      },
    resumeApp(){
      if(this.progress==0){ 
          
          this.$store.state.apps.application.email = this.email;
          //this.$store
          fetch('https://jott.thewaveint.com/api/register',{method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},body:JSON.stringify({email:this.email,progress:this.progress})}).then(response=>{
        
          response.text().then(text=>{
                  let application = JSON.parse(text);
          console.log(application);
          //console.log(text)
          //var decoded = jwt.verify(text, 'shhhhhh');
          //console.log(decoded.foo)
          //generate code
          //send email with code
          //attach code to app
          window.sessionStorage.accessToken = text;
          window.sessionStorage.id = application.id;
          this.cid = application.id;
          if(application.progress<1){
          fetch('https://jott.thewaveint.com/api/containers',{
            method:"POST",headers:{"Content-Type": "application/json; charset=utf-8"},
            body:JSON.stringify({
              "provider": "filesystem",
              "root": "./server/storage",
              "nameConflict": "makeUnique",
              "name":this.$store.state.apps.application.id
            }) 
          }).then(response=>{console.log(response)})

          }
          else{
            let json = application;
                 this.$store.state.apps.application.email = json.email;
                  this.$store.state.apps.application.name = json.name;
                    this.$store.state.apps.application.phone = json.phone;
                  this.$store.state.apps.application.ssn = json.ssn;
                this.$store.state.apps.application.therapist_type = json.type;
                this.$store.state.apps.application.practice_type = json.practice_type;
                  this.$store.state.apps.application.address = json.address;
               this.$store.state.apps.application.sign1 = json.sign1;
                      this.$store.state.apps.application.sign2 = json.sign2;
               this.$store.state.apps.application.sign3 = json.sign3;
                this.$store.state.apps.application.sign4 = json.sign4;
                        this.$store.state.apps.application.sign5 = json.sign5;
                      this.$store.state.apps.application.sign6 = json.sign6;
                this.$store.state.apps.application.sign7 = json.sign7;
               this.$store.state.apps.application.sign8 = json.sign8;
               this.$store.state.apps.application.sign9 = json.sign9;
                        this.$store.state.apps.application.s1 = json.s1;
                  this.$store.state.apps.application.s2 = json.s2;
                      this.$store.state.apps.application.s3 = json.s3;
                      this.$store.state.apps.application.s4 = json.s4;
                    this.$store.state.apps.application.s5 = json.s5;
                    this.$store.state.apps.application.s6 = json.s6;
                   this.$store.state.apps.application.s7 = json.s7;
                  this.$store.state.apps.application.s8 = json.s8;
                                    this.$store.state.apps.application.s9 = json.s9;
               this.$store.state.apps.application.id = json.id;
                 this.$store.state.apps.application.resume = json.resume;
                  this.$store.state.apps.application.ces = json.ces;
               this.$store.state.apps.application.license = json.license;
                 this.$store.state.apps.application.liability = json.liability;
                       this.$store.state.apps.application.progress = 1;
                this.$store.state.apps.application.approved = json.approved;
                      window.sessionStorage.progress = 1;
          }

          })

         
          window.sessionStorage.progress = this.progress;
        
          }) 
        }
      else if(this.progress>0 && this.progress<=9){
        console.log(window)
        
        //window.sessionStorage.progress = this.progress; 
        //send to db
              let id=this.cid;
              let data ={};
              data.id = window.sessionStorage.id;
              data.email = this.cemail;
              data.phone = this.cphone;
              data.name =this.cname;
              data.ssn = this.cssn;
              data.address=this.caddress;
              data.type=this.ctherapist_type;
              data.practice_type =this.cpractice_type;
              data.jwt = this.cjwt;
              data.progress = this.progress;
             
          //data.sign1 = this.csign1;
          //data.links = this.clinks;
          fetch('https://jott.thewaveint.com/api/create/contracts/'+id,{method:"POST",
              headers:{"Content-Type": "application/json; charset=utf-8","accept": "*/*"},body:JSON.stringify(data)}).then(response=>{
              console.log(response);
              response.text().then(text=>{
              console.log(text)
              let app = JSON.parse(text);
            //console.log(app);
            //var decoded = jwt.verify(text, 'shhhhhh');
              //console.log(decoded.foo)
            //generate code
              //send email with code
            //attach code to app
              //window.sessionStorage.accessToken = text;
             //this.$store.commit('increment') 
            this.csign1 = app.sign1;
        this.csign2 = app.sign2;
        this.csign3 = app.sign3;
        this.csign4 = app.sign4;
        this.csign5 = app.sign5;
        this.csign6 = app.sign6;
        this.csign7 = app.sign7;
        this.csign8 = app.sign8;
        this.csign9 = app.sign9;
        this.progress = app.progress;
        })
        
       // this.$store.commit('increment')
        window.sessionStorage.progress = this.progress;
        
        })
        clearInterval(this.clock)
        if(this.progress<9){
        this.clock = setInterval(this.checkContractStatus,7000);
        }
      }
      else if(this.progress==10){
         this.$store.commit('increment')
         window.sessionStorage.progress = this.progress; 
         clearInterval(this.clock)
        }   
      else{
        //this.$store.commit('increment')
        window.sessionStorage.progress = this.progress; 
        } 
      },
    rejectApp(mode,n){
      let dt = this.$store.state.apps.application;
      dt.approved='0';
      console.log("REJECT APP")
      console.log(mode,n)
      if(mode=="Uploaded"){
          switch(n){
              case 0:
              console.log("0000000000000000000000000000000000000")
              dt.resume = '0';
              break;
              case 1:
              dt.license = '0';
              break;
              case 2:
              dt.liability = '0';
              break;
              case 3:
              dt.cces = '0';
          }
      }
      if(mode=="Signed"){
          let v= parseInt(n)+1
          let s = 's'+v;
          let sid = s+'id'
          let sign = 'sign'+v;
          console.log(s,sid,sign)
          dt[s]=0;
          dt[sid]='';
          dt[sign]='';
      }
      this.update();
      },
    approvalCheck(){
      if(this.checkbox13==true &&  this.checkbox12==true && this.checkbox11==true && this.checkbox10==true && this.checkbox9==true && this.checkbox2==true && this.checkbox3==true && this.checkbox4==true && this.checkbox5==true && this.checkbox6==true && this.checkbox7==true && this.checkbox8==true){
        return true
      }
      },
    filterApp(txt){
            console.log('filterApp2');
      
        fetch('https://jott.thewaveint.com/api/applications').then(response=>response.json()).then(json=>{console.log(json)
        
          this.list =[];
          this.list = json.map(item=>{ 
            console.log(item)
            if(item){
            let em = item.email;
            if(em==txt){console.log(txt,em);return{firstname:item.firstname,lastname:item.lastname,email:item.email,id:item.id}}
            
          }
          }
          )
          console.log(this.list)
        })
      },
    getApps(){
        fetch('https://jott.thewaveint.com/api/applications').then(response=>response.json()).then(json=>{console.log(json)
        
          this.list =[];
          this.list = json.map(item=>{ if(true)return{lastname:item.lastname,firstname:item.firstname,email:item.email,id:item.id}})

          }
          )
      },
    switchRole(){
      if(this.crole=='admin'){
        this.crole='affiliate'
      }
      else{
        this.crole='admin'
      }
      },
    sign(n){
      let link = 'csign'+n
      return this[link]
     },
    approveApp(boo){
      console.log('HIT API and APPROVE APPLICATION')
        let st = this.$store.state.apps.application
       st.approved=boo;
      if(this.cs1==true &&  this.cs2==true && this.cs3==true && this.cs4==true && this.cs5==true && this.cs6==true && this.cs7==true && this.cs8==true && this.cs9==true )
         {
         fetch('/api/applications/approve/'+this.$store.state.apps.application.id,{
          method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},
          body:JSON.stringify(st)})
         }
        else {
         fetch('/api/applications/approve/'+this.$store.state.apps.application.id,{
          method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},
          body:JSON.stringify(st)})
        }
      },
    updateId(id){
      console.log("UPATEEEEEEEEEEEEEE")
      this.cid = id;
      this.getrecord(id);
     },
    checkContractStatus(){
        console.log("Hit API - Get APP and check for signing");
        console.log(this);
        let i = this.$store.state.apps.application.id;
        fetch('/api/applications/'+i).then(response=>{
              console.log(response);
              response.text().then(text=>{
              console.log(text)

              let a = JSON.parse(text);
              if(this.progress>1){
                let s = 's'+(a.progress-1);
                let t = a[s];
                console.log("EQUALLLLLLLLLLLLLLLLLLLLLLLLL")
                console.log(s);
                console.log(this.$store.state[s])
                console.log(a[s]);
                
                if(this.progress==10){
                  //this.clock = setInterval(this.checkContractStatus,7000);
                  clearInterval(this.clock)
                }
                if(a[s]!=this.$store.state[s] ){
                  this.register();
                  clearInterval(this.clock)
                  console.log('CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
                  if(this.progress<=9){
                    console.log('INNDER PROGRESSSSSSSSSSSSSSS')
                    
                 this.clock = setInterval(this.checkContractStatus,7000);
                }
                }
                else{

                }

              }
              })
        })
      },
    log(){
      console.log("LOGGGGGGGG")
      },
    iframeloaded(e){
      console.log('IFRAME LOADED')
      console.log(this)
      console.log($('iframe')[0].attributes)
     // console.log($('iframe')[0].attributes.cname.nodeValue)
      console.log($('iframe')[0].attributes.csigned.nodeValue);
      },
    getState(){
      console.log('GET STATEEEEEEE')
      let id = this.cid;
     if(id!=undefined){
      fetch('https://jott.thewaveint.com/api/applications/'+id,{method:"GET",headers:{"Content-Type": "application/json; charset=utf-8",}}).then(response=>response.json()).then(json=>{console.log(json)
        this.$store.state = json;

      }
        )
      }
      },
    showProgress(){
      console.log(this.progress);
      if(this.progress<=10){return true}
      return false
      },
    visible(int){
      if(int==1){return true}
      return false},
    getrecord(id){
      console.log('RECORDSSSSSSSSSSSSSSSSSSSSSSS')
      window.sessionStorage.id = id;
      this.cid = id;
      if(id!=undefined){
       fetch('https://jott.thewaveint.com/api/applications/'+id,{method:"GET",headers:{"Content-Type": "application/json; charset=utf-8",}}).then(response=>response.json()).then(json=>{console.log(json)
        this.$store.state.apps.application.email = json.email;
        this.$store.state.apps.application.name = json.name;
          this.$store.state.apps.application.phone = json.phone;
        this.$store.state.apps.application.ssn = json.ssn;
        this.$store.state.apps.application.therapist_type = json.type;
        this.$store.state.apps.application.practice_type = json.practice_type;
        this.$store.state.apps.application.address = json.address;
          this.$store.state.apps.application.sign1 = json.sign1;
        this.$store.state.apps.application.sign2 = json.sign2;
        this.$store.state.apps.application.sign3 = json.sign3;
        this.$store.state.apps.application.sign4 = json.sign4;
        this.$store.state.apps.application.sign5 = json.sign5;
        this.$store.state.apps.application.sign6 = json.sign6;
        this.$store.state.apps.application.sign7 = json.sign7;
        this.$store.state.apps.application.sign8 = json.sign8;
        this.$store.state.apps.application.sign9 = json.sign9;
          this.$store.state.apps.application.s1 = json.s1;
        this.$store.state.apps.application.s2 = json.s2;
        this.$store.state.apps.application.s3 = json.s3;
        this.$store.state.apps.application.s4 = json.s4;
        this.$store.state.apps.application.s5 = json.s5;
        this.$store.state.apps.application.s6 = json.s6;
        this.$store.state.apps.application.s7 = json.s7;
        this.$store.state.apps.application.s8 = json.s8;
        this.$store.state.apps.application.s9 = json.s9;
        this.$store.state.apps.application.id = json.id;
        this.$store.state.apps.application.resume = json.resume;
        this.$store.state.apps.application.firstname = json.firstname;
        this.$store.state.apps.application.lastname = json.lastname;
        this.$store.state.apps.application.name = json.name;
        this.$store.state.apps.application.ces = json.ces;
        this.$store.state.apps.application.license = json.license;
        this.$store.state.apps.application.liability = json.liability;
        this.$store.state.apps.application.progress = json.progress;
        this.$store.state.apps.application.visible = this.visible(1);

      console.log(this)
      }
        )
        //this.getState();
      }

      },
    bcolor(){
      if(this.cresume==1 && this.cliability==1 && this.cces==1 && this.clicense==1){return "success"}
      return "error"
        },
    bon(){
          console.log('BONNNNNNNNNNNNNNNNNNNNNNNNNNNN')
          console.log(this.cresume,this.cliability,this.cces,this.clicense)
      if(this.cresume==1 && this.cliability==1 && this.cces==1 && this.clicense==1){return false}
      return true
          },
    upstatus(type){
        console.log(type.split(" ").last().toLowerCase())
        if(type==""){}
        return this.$store.state[type.split(" ").last().toLowerCase()]

          },
    ctype(text){
        console.log(text);

        },
    validate(){
       //send code to db and get back resposne
       this.$store.commit('increment')
        } ,
    register(e){

          console.log('register application and create contract, embed contract in view, Wyndal can ask for code from Applicant')

        },
     embed(){

        return 'https://esignatures.io/sign_contracts/bc65bf7f-9cf6-4c0d-a57e-b7d68399ef30?embedded=yes'

        },
    color(received){
            if(received==0){
              return 'blue-grey'
            }
            else{
              return 'green'
            }

        },
    openFileDialog(type) {
                console.log('FILE DIALOG')
                console.log(type);

            document.getElementById('upload-'+type).click();
        },
    openDownloadDialog(a,b,c) {
          console.log('DOWNLAOD DIALOG')
                let url = '/static/'+a[0].toLowerCase().replace(/ /g,'')+'.pdf';
                console.log(url)
     
              document.getElementById(url).click();
          },
    onFileChange(e) {
        console.log('FILE CHANGE')
            const formData = new FormData();
            var self = this;
            
            console.log(e.target.id.split(" "))
            
            let pre = e.target.id.split("-")[1].split('.').last().toLowerCase();
            console.log(pre)
            if(pre=="resume"){
                this.cresume = '1'
            }
            if(pre=="state"){
                this.clicense = '1'
            }
            if(pre=="proof"){
                this.cliability = '1'
            }
            if(pre=="ces"){
                this.cces = '1'
            }
            var files = e.target.files || e.dataTransfer.files;       
            if(files.length > 0){
                for(var i = 0; i< files.length; i++){
                  console.log(files[i])
                  let suf = files[i].name.split(".").last();
                  console.log(suf);
                    formData.append("file", files[i], pre+'.'+suf);
                }
            } 
            console.log(formData);  
            this.$store.state.apps.application[pre] = '1';
            console.log("CONTAINERSSSSSSSSSSSSSSSSSSS")
            fetch('https://jott.thewaveint.com/api/containers/'+this.cid+'/upload', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
 
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: formData, // body data type must match "Content-Type" header
                  })
            .then(response =>{console.log( response.json())
            //mark as uploaded
                                 let data ={};
        console.log(this.$store.state)
        data = this.$store.state.apps.application
        //data.sign1 = this.csign1;
        //data.links = this.clinks;
        console.log("UPDATE APPLICATIONNNNNNNNNNNNNNNNN")
        console.log(data);
        fetch('https://jott.thewaveint.com/api/applications/'+data.id,{method:"PATCH",
        headers:{"Content-Type": "application/json; charset=utf-8","accept": "*/*"},body:JSON.stringify(data)}).then(response=>{
        //update upload status
          })
        
        //this.$store.commit('increment')
        window.sessionStorage.progress = this.progress;
        
       
            
             } ); // parses response to JSON */
       
          },
    uploadFile() {
          console.log('FILE UPLOAD')
            var self = this; 
            axios.post('URL', self.formData).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
          },
    getType(type){
        console.log(this)
        return this[type] 
        },
    next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
        },
    frame(index){
        //console.log(index);
        let form = [];
        if(index==0){
        form = this.buildform(this["frame"+index])
        }        else{
        
         
        }
        //  let html = form.map(function(currentValue, index, arr){
        //  console.log(currentValue);
         let html = form.join('');
        console.log(html)
          return this['frame'+index]
        //  });
       
        },
    buildform(element){ 
        let that = this;
        let b = element.map(function(currentValue, index, arr){
        //  console.log(currentValue);
            if(currentValue[1]=='input'){
              let f = that.buildinput(currentValue)
              console.log(f);
              let r = 'What'
              return f
            }
        })
        //   console.log(b);
        return b 
        },
    buildinput([edata,...rest]){
          let html;
        //     console.log("Edata");
        //      console.log(edata);
        //    console.log(rest);
          if(rest[0]=='input'){
            html ='<input type="text" placeholder="'+edata.capitalize()+'"/>'
          }
          return html
        }
},
mounted :function(){
    console.log(this)
   // events.$on('filterApp',this.filterApp())
      $("iframe").on("load",function(){console.log('IFRAME LOADED')})
      console.log("MOUNTED bbbbbbbbbbbbbbbbbb IDDDDDDDDDDDDD")
      let id;
      console.log(this)
      console.log(this.$route)
      if(this.$route.params.id==undefined){
        console.log('UNDEFINEDDDDDDDDDD nnnnnnnnnnnnnnnnnn')
            id=window.sessionStorage.id;
      }
      else{
        console.log("DEFINEDDDDDD ..............")
         id=this.$route.params.id;
      }
     
      let vp = this;
      console.log(id)
      //if(this.$store.state.apps.application.role=="admin"){
        if(true){
          this.getApps();
      }


    if(id!=undefined){
      fetch('https://jott.thewaveint.com/api/applications/'+id,{method:"GET",headers:{"Content-Type": "application/json; charset=utf-8",}}).then(response=>response.json()).then(json=>{console.log(json)
        this.$store.state.apps.application = json ;

     if(json.progress>0 && json.progress<10 && this.$store.state.apps.application.role=='affiliate'){
       clearInterval(this.clock)
       this.clock = setInterval(this.checkContractStatus,7000);
     }
      //this.$state.store = json;
     // this.$store.replaceState(json)
    }
        )
      }

      if(window.sessionStorage.progress==undefined){
          //init to zero
      console.log("INIT PROGRESS")
     
      }
      else{
          // get session storage
          console.log("RESTORE PROGRESS")
     this.$store.commit('getProgress',window.sessionStorage.progress)
       //this.$store.state.apps.application.email = "WalterJohnson";
       //this.email = "SMALTERJohnosn"
      //  this.$store.commit('getProgress',window.sessionStorage.progress)
      }
      //this.$store.commit('getProgress',window.sessionStorage.progress)


      },
  

        name: "AffiliateRegistration",
        components: {
               
        }
    
    
    
    }


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

 Array.prototype.last = function(){
        return this[this.length - 1];
    };
</script>
<style scoped>
</style>