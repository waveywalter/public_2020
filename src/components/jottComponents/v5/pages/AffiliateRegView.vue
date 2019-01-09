

<style scoped>
img{max-width:100%}
.down{flex-direction:column}
.layout.wrap{justify-content:space-between}
.thumbs{padding:10px;}
iframe{
  border:none;
 
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
.uploads i.v-icon.v-icon--right.material-icons.theme--dark {
    margin-left: 16px;
}
.display-1{font-size:23px;}
</style>

<template>
  <v-container fluid class="pa-0" >
     <v-btn   v-on:click="switchRole()">Switch Role</v-btn> 
    <v-layout row wrap>
        <v-container v-if="crole=='admin' && !$route.params.id">
         
            <div  >
              <v-layout row wrap>
                <v-flex xs6>
                <div>
                  <v-text-field
                    v-model="appfilter"
                    v-on:change="filterApp"
                    label="Search By Email"
                    required
                    ></v-text-field>
                </div>
                {{listlength}}--------
                Affiliate Program Application Review and Approval
                <div v-if="listlength>0" >
                
                <div   v-for="apps in list">
                  {{apps.name}}
                <router-link tag="li" :to="'/affiliate-registration/'+apps.id" @click.native="updateId(apps.id)">
                <a>Link to Application</a>
                </router-link>
                </div>
                </div>
                </v-flex>

              </v-layout>
            </div>
        </v-container>
        <v-container v-if="crole=='admin' && $route.params.id">
            
            <v-layout row wrap>
                <v-flex xs1>
                     Visual Progess
                    <div >
                      Details <v-icon right dark v-if="progress>1">done</v-icon><br>
                      Sign 1   <v-icon right dark v-if="cs1==1">done</v-icon><br>
                      Sign 2  <v-icon right dark v-if="cs2==1">done</v-icon><br>
                      Sign 3  <v-icon right dark v-if="cs3==1">done</v-icon><br>
                      Sign 4  <v-icon right dark v-if="cs4==1">done</v-icon><br>
                      Sign 5 <v-icon right dark v-if="cs5==1">done</v-icon><br>
                      Sign 6 <v-icon right dark v-if="cs6==1">done</v-icon><br>
                      Sign 7 <v-icon right dark v-if="cs7==1">done</v-icon><br>
                      Sign 8 <v-icon right dark v-if="cs8==1">done</v-icon><br>
                      Upload 1 <v-icon right dark v-if="cresume==1">done</v-icon><br>
                      Upload 2 <v-icon right dark v-if="clicense==1">done</v-icon><br>
                      Upload 3 <v-icon right dark v-if="cliability==1">done</v-icon><br>
                      Upload 4 <v-icon right dark v-if="cces==1">done</v-icon><br>
                    </div>
                </v-flex>
                <v-flex xs6>
                
                  <v-card v-if="capproved==1">
                   <div class="thumbs"><h3> Application Approved <v-icon>thumb_up</v-icon> ! (Account will be created in 2020i) </h3></div>
                   </v-card>
                   <div>
                    <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
                      <v-tab v-for="n in adminViews" :key="n" ripple>
                       {{ n }}
                      </v-tab>
                      <v-tab-item v-for="n in adminViews" :key="n">
                      <v-card flat v-if="n=='Profile Details'">
                          <v-container>
                            <v-layout>
                              <v-flex xs3>
                                Name
                                </v-flex>
                                <v-flex>
                                  {{cname}}
                                  </v-flex>
                            </v-layout>
                             <v-layout>
                              <v-flex xs3>
                                Email
                                </v-flex>
                                <v-flex>
                                  {{cemail}}
                                  </v-flex>
                            </v-layout>
                             <v-layout>
                              <v-flex xs3>
                                Phone
                                </v-flex>
                                <v-flex>
                                  {{cphone}}
                                  </v-flex>
                            </v-layout>                           
                            </v-container>
                      </v-card>
                      <v-card flat v-if="n=='Signed Docs'">
                          <v-container class="signed">
                          <v-tabs v-model="activate" color="cyan" dark slider-color="yellow">
                          <v-tab v-for="n in 8" :key="n+'pets'" ripple>
                          Signed Docs Tabs
                          </v-tab>
                          <v-tab-item v-for="n in 8" :key="n+'pets'">
                          <v-card flat >
                          <v-container>
                            <v-layout class="down">

                              <v-flex  xs12>
                                <iframe name="esignatures-io-iframe" width=100% height=auto :src="sign(n)"/>
                                </v-flex>                                                             
                                 <v-flex>
                                <v-btn color="success" v-on:click="rejectApp(n)" v-if="crole=='admin'" >Reject</v-btn>
                                </v-flex>

                            </v-layout>                           
                            </v-container>
                          </v-card>
                    
                          </v-tab-item>
                        </v-tabs>
                        
                            </v-container>
                      </v-card> 
                      <v-card flat v-if="n=='Uploads'">
                        <div>Upload Files - More Tabs + PDf Viewer</div>
 
                          <v-container class="uploaded">
                          <v-tabs v-model="uploaded" color="cyan" dark slider-color="yellow">
                          <v-tab v-for="n in 4" :key="n+'ups'" ripple>
                          Uploaded Docs Tabs
                          </v-tab>
                          <v-tab-item  key="1ups">
                          <v-card flat >
                          <v-container>
                            <v-layout class="down">

                              <v-flex  xs12>
                                <img src="/api/containers/5c1bedf8198a0f5e82cb082a/download/resume.jpg" />


                                </v-flex>                                                             
                                 <v-flex>
                                <v-btn color="success" v-on:click="rejectApp(n)" v-if="crole=='admin'" >Reject</v-btn>
                                </v-flex>

                            </v-layout>                           
                            </v-container>
                          </v-card>
                    
                          </v-tab-item>
                          <v-tab-item  key="2ups">
                          <v-card flat >
                          <v-container>
                            <v-layout class="down">

                              <v-flex  xs12>
                          
                                <img src="/api/containers/5c1bedf8198a0f5e82cb082a/download/license.jpg" />
  

                                </v-flex>                                                             
                                 <v-flex>
                                <v-btn color="success" v-on:click="rejectApp(n)" v-if="crole=='admin'" >Reject</v-btn>
                                </v-flex>

                            </v-layout>                           
                            </v-container>
                          </v-card>
                    
                          </v-tab-item>
                          <v-tab-item  key="3ups">
                          <v-card flat >
                          <v-container>
                            <v-layout class="down">

                              <v-flex  xs12>

                                <img src="/api/containers/5c1bedf8198a0f5e82cb082a/download/liability.jpg" />
              

                                </v-flex>                                                             
                                 <v-flex>
                                <v-btn color="success" v-on:click="rejectApp(n)" v-if="crole=='admin'" >Reject</v-btn>
                                </v-flex>

                            </v-layout>                           
                            </v-container>
                          </v-card>
                    
                          </v-tab-item>
                          <v-tab-item  key="4ups">
                          <v-card flat >
                          <v-container>
                            <v-layout class="down">

                              <v-flex  xs12>
      
                            <img src="/api/containers/5c1bedf8198a0f5e82cb082a/download/ces.jpg" />

                                </v-flex>                                                             
                                 <v-flex>
                                <v-btn color="success" v-on:click="rejectApp(n)" v-if="crole=='admin'" >Reject</v-btn>
                                </v-flex>

                            </v-layout>                           
                            </v-container>
                          </v-card>
                    
                          </v-tab-item>
                        </v-tabs>
                        
                            </v-container>  
 

                      </v-card>                    
                        </v-tab-item>
                      </v-tabs>
                    </div>

                
                </v-flex>
                <v-flex xs2>

             
            

                 
                    <v-checkbox label="Document 1 Signed Approved" v-model="checkbox2"></v-checkbox>
                    <v-checkbox label="Document 2 Signed Approved" v-model="checkbox3"></v-checkbox>
                    <v-checkbox label="Document 3 Signed Approved" v-model="checkbox4"></v-checkbox>
                    <v-checkbox label="Document 4 Signed Approved" v-model="checkbox5"></v-checkbox>
                    <v-checkbox label="Document 5 Signed Approved" v-model="checkbox6"></v-checkbox>
                    <v-checkbox label="Document 6 Signed Approved" v-model="checkbox7"></v-checkbox>

                    <div>
                    <v-btn  v-on:click="approveApp()" v-if="progress==10 && capproved==0">Approve Application</v-btn> 
                    <v-btn  v-on:click="approveApp()" v-if="progress==10 && capproved==1">Dissapprove Application</v-btn>
                    </div>
                  

     
        
                  </v-flex >
                  <v-flex xs2>
                    <v-checkbox label="Document 7 Signed Approved" v-model="checkbox8"></v-checkbox>
                    <v-checkbox label="Document 8 Signed Approved" v-model="checkbox9"></v-checkbox>
                    <v-checkbox label="Document 9 Uploaded Approved" v-model="checkbox10"></v-checkbox>
                    <v-checkbox label="Document 10 Uploaded Approved" v-model="checkbox11"></v-checkbox>
                    <v-checkbox label="Document 11 Uploaded Approved" v-model="checkbox12"></v-checkbox>
                    <v-checkbox label="Document 12 Uploaded Approved" v-model="checkbox13"></v-checkbox>
                    </v-flex>
                
                </v-layout>
         </v-container>
        <v-container  v-if="crole=='affiliate'">
          <v-layout row wrap>
            
            <v-flex >
              <div v-for="(n,index) in p" >
                <!--    <div v-for="(n,index) in p" > -->
                <h3>{{steps[progress]}}</h3>
                <v-form v-if="index==0 && progress==0" v-on:submit.prevent="register">
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field :rules="emailRules" v-model="email" placeholder="Affiliate Email Address">
                                </v-text-field>
                            </v-flex>
                          
                         </v-layout>
                    </v-container>
                    <v-btn color="success" v-on:click="register" >Start Application</v-btn>
                    <v-btn color="success" v-if="progress==0"v-on:click="resumeApp" >Resume Application</v-btn>
                </v-form>
                <v-form v-if="index==0 && progress==-1" v-on:submit.prevent="">
                  <v-container>
                     <v-layout row wrap>
                        <v-flex xs3>
                            <v-text-field  v-model="code" placeholder="One time code">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                  </v-container>
                  <v-btn color="success" v-on:click="validate" >Validate</v-btn>
                </v-form>
                <v-form v-if="index==0 && progress==1" v-on:submit.prevent="register()">
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field flat v-for="(t,index2) in frame(index)" v-if="t[1]=='input' && t[0]=='name' && index2<1" v-model="cname" :key2="t" :placeholder="t[0].capitalize()">
                                </v-text-field>
                                <v-text-field flat v-for="(t,index2) in frame(index)" v-if="t[1]=='input' && t[0]=='email'" v-model="cemail" :key2="t" :placeholder="t[0].capitalize()">
                                </v-text-field>
                                <v-text-field flat v-for="(t,index2) in frame(index)" v-if="t[1]=='input' && t[0]=='phone' && index2>1" v-model="cphone"  :key2="t" :placeholder="t[0].capitalize()">
                                </v-text-field>
                                <v-text-field flat v-for="(t,index2) in frame(index)" v-if="t[1]=='input' && t[0]=='SSN' && index2>1" v-model="cssn"  :key2="t" :placeholder="t[0].capitalize()">
                                </v-text-field>
                                <v-text-field flat v-for="(t,index2) in frame(index)" v-if="t[1]=='input' && t[0]=='address' && index2>1" v-model="caddress"  :key2="t" :placeholder="t[0].capitalize()">
                                </v-text-field>
                                <v-select label="Practice Type" :items="practice_types"  v-model="cpractice_type" ></v-select>
                                <v-select label="Therapist Type" :items="therapist_types" v-model="ctherapist_type"></v-select>
                            </v-flex>
          
                            <v-flex xs6>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-btn color="success" v-on:click="register" v-if="crole=='affiliate' && csign1==undefined">Create Profile</v-btn>
                    <v-btn color="success" v-on:click="update" v-if="crole=='affiliate' && csign1!=undefined" >Update Profile</v-btn>
                    <v-btn color="success" v-on:click="changetosign" v-if="crole=='affiliate'" >View Signed Docs</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                    <v-btn color="success" v-on:click="register" v-if="crole=='admin'" >Next</v-btn>
                </v-form>
                <v-form v-if="index==0 && progress==2" v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                   
                    <iframe :src="csign1" name="esignatures-io-iframe" :csigned="cs1" cname="Accident Reporting Procedure" width=800 height=1000 v-on:load="iframeloaded()">
                    </iframe>

                   </div>
                                       <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                  </v-container>
                  <v-container>
                  <v-btn color="success" v-on:click="register" v-if="cs1==1" >Next Form</v-btn>
                  </v-container>
                </v-form>
                <v-form v-if="index==0 && progress==3" v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                    
                    <iframe :src="csign2" :csigned="cs1" cname="Authorization For Criminal Background Screening"  name="esignatures-io-iframe"  width=800 height=600>
                    </iframe>
                   </div>
                  </v-container>
                  <v-container>
                    <v-btn color="success" v-on:click="register" >Next Form</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                  </v-container>
                </v-form>
                <v-form v-if="index==0 && progress==4" v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                    
                    <iframe :src="csign3" :csigned="cs1" cname="CDC Fact Sheet For Stopping Germs At Home, Work and School"  name="esignatures-io-iframe" width=800 height=600>
                    </iframe>
                   </div>
                  </v-container>
                  <v-container>
                    <v-btn color="success" v-on:click="register" >Next Form</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>

                  </v-container>
                </v-form>                 
                <v-form v-if="index==0 && progress==5" v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                    
                    <iframe :src="csign4" :csigned="cs4" cname="Client Confidentiality" width=800 height=600>
                    </iframe>
                   </div>
                  </v-container>
                  <v-container>
                  
                    <v-btn color="success" v-on:click="register" v-if="cs4==1">Next Form{{this.cs4}}</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                  </v-container>
                </v-form>  
                <v-form v-if="index==0 && progress==6"  v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                    
                    <iframe :src="csign5"  :csigned="cs5" cname="Part-Time & Per Diem Independent Contractor Packet" name="esignatures-io-iframe" width=800 height=600 v-on:load="iframeloaded">
                    </iframe>
                   </div>
                  </v-container>
                  <v-container>
                    <v-btn color="success" v-on:click="register" v-if="cs5==1" >Next Form</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                  </v-container>
                </v-form>
                <v-form v-if="index==0 && progress==7" v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                    
                    <iframe :src="csign6" name="esignatures-io-iframe" width=800 height=600>
                    </iframe>
                   </div>
                  </v-container>
                  <v-container>
                    <v-btn color="success" v-on:click="register" v-if="cs6==1" >Next Form</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                  </v-container>
                </v-form>    
                <v-form v-if="index==0 && progress==8" v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                    
                    <iframe :src="csign7"  :csigned="cs7"  name="esignatures-io-iframe" width=800 height=600>
                    </iframe>
                   </div>
                  </v-container>
                  <v-container>
                    <v-btn color="success" v-on:click="register"v-if="cs7==1"  >Next Form</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                  </v-container>
                </v-form>  
                <v-form v-if="index==0 && progress==9" v-on:submit.prevent="register()">
                  <v-container>
                   <div class="contract_holder">
                    
                    <iframe :src="csign8" :csigned="cs8" cname="Status Review of Known Tuberculin Reactors" name="esignatures-io-iframe" width=800 height=600 v-on:load="iframeloaded">
                    </iframe>
                   </div>
                  </v-container>
                  <v-container>
                    <v-btn color="success" v-on:click="register" v-if="cs8==1" >Next Form</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetoupload" v-if="crole=='affiliate'" >View Uploaded Docs</v-btn>
                  </v-container>
                </v-form>
                <v-form v-if="index==0 && progress==10" >
                  <v-layout row wrap text-md-left class="display-1 uploads">
                    <v-flex xs6>
                      Uploads
                    </v-flex>
                  
                  </v-layout>
                  <v-container grid-list-md v-for="type in upload" class="uploads">
                    <v-layout row wrap >
                      <v-flex xs6>
                        <v-btn color="blue-grey" class="black--text" loaders @click.native="openFileDialog(type[0])">
                          {{type[0]}}
                          <v-icon right dark> cloud_upload</v-icon>
                          <input type="file" :id="type[0]" style="display:none" @change="onFileChange">
                        </v-btn>
                      </v-flex>
      

                    </v-layout>
                  </v-container>
                  <v-container>
                      <v-btn :color="bcolor()" v-on:click="register" :disabled="bon()" >Files Uploaded</v-btn>
                    <v-btn color="success" v-on:click="changetoprofile" v-if="crole=='affiliate'" >View Profile</v-btn>
                    <v-btn color="success" v-on:click="changetosign" v-if="crole=='affiliate'" >View Sign Docs</v-btn>
                  </v-container>
                </v-form>  
                <v-card v-if="index==0 && progress==11">
                  <v-container grid-list-md >
                    <v-layout row wrap >
                      <v-flex xs12>                  
                        <v-card-title primary-title>
                          <div>
                            <h3 class="headline mb-0">Application Complete</h3>
                            <div>Your application is being processed. Our affiliate coordinator will contact you shortly.
                               A copy of this information and links to download signed documents is being emailed to the email on file.</div>
                          </div>
                        </v-card-title>
                    <!--------    <v-card-actions>
                          <v-btn flat color="orange">Print Application</v-btn>
                          <v-btn flat color="orange">Email Application</v-btn>
                        </v-card-actions> ---->
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>

              </div>
            </v-flex>
            <v-flex>
                     
                    <div  v-if="showProgress()">
                      
                      <div><h3>Visual Progess</h3></div>
                      Registered {{progress}}<v-icon right dark v-if="progress>0">done</v-icon><br>
                      Details <v-icon right dark v-if="progress>1">done</v-icon><br>
                     <div v-on:click="goToProgress"> Sign 1   <v-icon right dark v-if="progress>2">done</v-icon><br></div>
                      Sign 2  <v-icon right dark v-if="progress>3">done</v-icon><br>
                      Sign 3  <v-icon right dark v-if="progress>4">done</v-icon><br>
                      Sign 4  <v-icon right dark v-if="progress>5">done</v-icon><br>
                      Sign 5 <v-icon right dark v-if="progress>6">done</v-icon><br>
                      Sign 6 <v-icon right dark v-if="progress>7">done</v-icon><br>
                      Sign 7 <v-icon right dark v-if="progress>8">done</v-icon><br>
                      Sign 8 <v-icon right dark v-if="progress>9">done</v-icon><br>
                      Upload 1 <v-icon right dark v-if="cresume==1">done</v-icon><br>
                      Upload 2 <v-icon right dark v-if="clicense==1">done</v-icon><br>
                      Upload 3 <v-icon right dark v-if="cliability==1">done</v-icon><br>
                      Upload 4 <v-icon right dark v-if="cces==1">done</v-icon><br>
                    </div>             
            </v-flex>
          </v-layout>  
        </v-container>
    </v-layout>
  </v-container>
  
</template>

<script>
import axiosApi from 'axios';
import jwt from 'jsonwebtoken';
import  $ from 'jquery'
//import VueTimers from 'vue-timers/mixin'
const axios = axiosApi.create();

export default {
  //mixins:[VueTimers],
  name:"AffiliateRegView",
  timers:{
    log:{time:1000,autostart:true}
  },
  beforeCreate : function(){
      console.log('BEFORE')
      console.log(this);
    

    },
  created : ()=>{
      console.log("CREATED")


       // console.log(this.progr)
      // console.log(window.sessionStorage.progress)
      //  this.$store.state.progress = window.sessionStorage.progress;
      //  console.log(this.$store.state.progress)
     // this.default.methods.init();

    },
  mounted :function(){
      $("iframe").on("load",function(){console.log('IFRAME LOADED')})
      console.log("MOUNTED IDDDDDDDDDDDDD")
      let id;
      console.log(this.$route)
      if(this.$route.params.id==undefined){
        console.log('UNDEFINEDDDDDDDDDD')
            id=window.sessionStorage.id;
      }
      else{
        console.log("DEFINEDDDDDD")
         id=this.$route.params.id;
      }
     
      let vp = this;
      console.log(id)
      //if(this.$store.state.role=="admin"){
        if(true){
          this.getApps();
      }


    if(id!=undefined){
      fetch('https://jott.thewaveint.com/api/applications/'+id,{method:"GET",headers:{"Content-Type": "application/json; charset=utf-8",}}).then(response=>response.json()).then(json=>{console.log(json)
     this.$store.state.email = json.email;
     this.$store.state.name = json.name;
     this.$store.state.phone = json.phone;
     this.$store.state.ssn = json.ssn;
     this.$store.state.therapist_type = json.type;
     this.$store.state.practice_type = json.practice_type;
     this.$store.state.address = json.address;
     this.$store.state.sign1 = json.sign1;
     this.$store.state.sign2 = json.sign2;
     this.$store.state.sign3 = json.sign3;
     this.$store.state.sign4 = json.sign4;
     this.$store.state.sign5 = json.sign5;
     this.$store.state.sign6 = json.sign6;
     this.$store.state.sign7 = json.sign7;
     this.$store.state.sign8 = json.sign8;
     this.$store.state.s1 = json.s1;
     this.$store.state.s2 = json.s2;
     this.$store.state.s3 = json.s3;
     this.$store.state.s4 = json.s4;
     this.$store.state.s5 = json.s5;
     this.$store.state.s6 = json.s6;
     this.$store.state.s7 = json.s7;
     this.$store.state.s8 = json.s8;
     this.$store.state.id = json.id;
     this.$store.state.resume = json.resume;
     this.$store.state.ces = json.ces;
     this.$store.state.license = json.license;
     this.$store.state.liability = json.liability;
     this.$store.state.progress = json.progress;
     this.$store.state.approved = json.approved;
     window.sessionStorage.progress = json.progress;
     if(json.progress>0 && json.progress<10 && this.$store.state.role=='affiliate'){
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
       //this.$store.state.email = "WalterJohnson";
       //this.email = "SMALTERJohnosn"
      //  this.$store.commit('getProgress',window.sessionStorage.progress)
      }
      //this.$store.commit('getProgress',window.sessionStorage.progress)


      },
  data: () => ({
      //  progress:progress(),
      //progress:0,
      checkbox:false,
      checkbox2:false,
      checkbox3:false,
      checkbox4:false,
      checkbox5:false,
      checkbox6:false,
      checkbox7:false,
      checkbox8:false,
      checkbox9:false,
      checkbox10:false,
      checkbox11:false,
      checkbox12:false,
      checkbox13:false,
      appfilter:'',
      adminViews:["Profile Details","Signed Docs","Uploads"],
      clock:'',
      list:[{name:"ZZZ",email:"ww@mm.com",phone:"111111111111"},{name:"AAA",email:"aa@mm.com",phone:"5555551111111"}],
      code:'',
      landscape:false,
      picker: new Date().toISOString().substr(0, 10),
      p:[["Affiliate Application",1]],
      steps:["Register","Profile Details","Sign Forms","Upload Documents"],
      frame0:[["name","input"],["email","input"],["phone","input"],["SSN","input"],["address","input"],["therapist_type","dropdown"],["practice_type","dropdown"],["address","address"]],
      upload:[['Resume',0,2],['State License',0,0],['Proof of Liability',0,0],['CES',0,0]],
      signature:[["Accident Reporting Procedure",1,1],['Applicant Interview Summary Form',1,2],['Authorization-Background Screening',1,0],['CDCFactSheet-VaccineInfoSign Sheet',1,0],
      ['Confidentiality Statement-Contractor',1,0],['Emergency Contact Form-Independent Contractor',1,0],['Health Screen Form',1,0],['IndependentContractAgree',1,0],['Part-Time-PerDiemStaffOrientationPacket',1,0],
      ['Profl Code of Ethics & Standards of Conduct',1,0],['Sexual Harrassment Policy- Contractors',1,0],['TB Status Review',1,0]],
      frame2:[["Notify Clinical Director and/or available clinical office staff who will administer First Aid or call 911.","text"],
      ["Clinical office staff will follow the call order and advise of incident immediately.  Post accident drug/alcohol testing is required.  All injuries are required to be reported immediately.","text"],
      ['Clinical office staff will complete an Incident Report Form and submit to Administration.','text'],
      [' Safety Consultant will be contacting injured person(s) for specifics.','text']
      ],
      therapist_types:["A","B","C"],
      practice_types:['1a','2a','3a'],
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
        uploaded:null,
       active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      
    }),
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
        return this.$store.state.approved
        },
        set:function(e){
          console.log(e)
          console.log('set approved');
          this.$store.state.approved = e;
          return 'Set Resume'
            }         
          },
                 cs8:{
        get:function(e){
        console.log('get cs8');
        console.log(e);
        console.log(this)
        return this.$store.state.s8
        },
        set:function(e){
          console.log(e)
          console.log('set cs8');
          this.$store.state.s8 = e;
          return 'Set Resume'
            }         
          },
        cs7:{
        get:function(e){
        console.log('get cs7');
        console.log(e);
        console.log(this)
        return this.$store.state.s7
        },
        set:function(e){
          console.log(e)
          console.log('set cs7');
          this.$store.state.s7 = e;
          return 'Set Resume'
        }         
        },
              cs6:{
        get:function(e){
        console.log('get cs6');
        console.log(e);
        console.log(this)
        return this.$store.state.s6
        },
        set:function(e){
          console.log(e)
          console.log('set cs6');
          this.$store.state.s6 = e;
          return 'Set Resume'
        }         
       },
      cs5:{
        get:function(e){
        console.log('get cs5');
        //console.log(e);
        //console.log(this)
        console.log(this.$store.state)
        return this.$store.state.s5
        },
        set:function(e){
          console.log(e)
          console.log('set cs5');
          this.$store.state.s5 = e;
          return 'Set Resume'
        }         
       },
      cs4:{
        get:function(e){
        console.log('get cs4');
        console.log(e);
        console.log(this)
        return this.$store.state.s4
        },
        set:function(e){
          console.log(e)
          console.log('set cs4');
          this.$store.state.s4 = e;
          return 'Set Resume'
        }         
       },
      cs3:{
        get:function(e){
        console.log('get cs3');
        console.log(e);
        console.log(this)
        return this.$store.state.s3
        },
        set:function(e){
          console.log(e)
          console.log('set cs3');
          this.$store.state.s3 = e;
          return 'Set Resume'
        }         
       },       cs2:{
        get:function(e){
        console.log('get cs2');
        console.log(e);
        console.log(this)
        return this.$store.state.s2
        },
        set:function(e){
          console.log(e)
          console.log('set cs2');
          this.$store.state.s2 = e;
          return 'Set Resume'
        }         
       },
      cs1:{
        get:function(e){
        console.log('get cs1');
        console.log(e);
        console.log(this)
        return this.$store.state.s1
        },
        set:function(e){
          console.log(e)
          console.log('set cs1');
          this.$store.state.s1 = e;
          return 'Set Resume'
        }         
       },
       capp:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.visible
        },
        set:function(e){
          console.log(e)
          console.log('set reusme');
          this.$store.state.visible = e;
          return 'Set Resume'
        }
      },
      crole:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.role
        },
        set:function(e){
          console.log(e)
          console.log('set reusme');
          this.$store.state.role = e;
          return 'Set Resume'
        }
      },
       cid:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.id
        },
        set:function(e){
          console.log(e)
          console.log('set id');
          this.$store.state.id = e;
          return 'Set Resume'
        }
      },
      cresume:{
        get:function(e){
        console.log('cresume');
        console.log(e);
        console.log(this)
        return this.$store.state.resume
        },
        set:function(e){
          console.log(e)
          console.log('set reusme');
          this.$store.state.resume = e;
          return 'Set Resume'
        }
      },
      clicense:{
        get:function(e){
        console.log('clicense');
        console.log(e);
        console.log(this)
        return this.$store.state.license
        },
        set:function(e){
          console.log(e)
          console.log('set id');
          this.$store.state.license = e;
          return 'Set License'
        }
      },  
      cliability:{
        get:function(e){
        console.log('cinsurance');
        console.log(e);
        console.log(this)
        return this.$store.state.liability
        },
        set:function(e){
          console.log(e)
          console.log('set insurance');
          this.$store.state.liability = e;
          return 'Set Insuramce'
        }
      },      
      cces:{
        get:function(e){
        console.log('cces');
        console.log(e);
        console.log(this)
        return this.$store.state.ces
        },
        set:function(e){
          console.log(e)
          console.log('set ces');
          this.$store.state.ces = e;
          return 'Set CES'
        }
      }, 
      csign8:{
        get:function(e){
        console.log('csign8');
        console.log(e);
        console.log(this)
        return this.$store.state.sign8
        },
        set:function(e){
          console.log(e)
          console.log('set sign8');
          this.$store.state.sign8 = e;
          return 'Set Email'
        }
      }, 
      csign7:{
        get:function(e){
        console.log('csign7');
        console.log(e);
        console.log(this)
        return this.$store.state.sign7
        },
        set:function(e){
          console.log(e)
          console.log('set sign7');
          this.$store.state.sign7 = e;
          return 'Set Email'
        }
      }, 
      csign6:{
        get:function(e){
        console.log('csign6');
        console.log(e);
        console.log(this)
        return this.$store.state.sign6
        },
        set:function(e){
          console.log(e)
          console.log('set sign6');
          this.$store.state.sign6 = e;
          return 'Set Email'
        }
      }, 
      csign5:{
        get:function(e){
        console.log('csign5');
        console.log(e);
        console.log(this)
        return this.$store.state.sign5
        },
        set:function(e){
          console.log(e)
          console.log('set sign5');
          this.$store.state.sign5 = e;
          return 'Set Email'
        }
      }, 
        csign4:{
        get:function(e){
        console.log('csign4');
        console.log(e);
        console.log(this)
        return this.$store.state.sign4
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.sign4 = e;
          return 'Set Email'
        }
      }, 
      csign3:{
        get:function(e){
        console.log('csign3');
        console.log(e);
        console.log(this)
        return this.$store.state.sign3
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.sign3 = e;
          return 'Set Email'
        }
      },      csign1:{
        get:function(e){
        console.log('csign1');
        console.log(e);
        console.log(this)
        return this.$store.state.sign1
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.sign1 = e;
          return 'Set Email'
        }
      },
      csign2:{
        get:function(e){
        console.log('csign2');
        console.log(e);
        console.log(this)
        return this.$store.state.sign2
        },
        set:function(e){
          console.log(e)
          console.log('set sign2');
          this.$store.state.sign2 = e;
          return 'Set Email'
        }
      },
      cpractice_type:{
        get:function(e){
        console.log('ctherpay');
        console.log(e);
        console.log(this)
        return this.$store.state.practice_type
        },
        set:function(e){
          console.log(e)
          console.log('set ctherapist ype');
          this.$store.state.practice_type = e;
          return 'Set Email'
        }
        },
       ctherapist_type:{
                  get:function(e){
        console.log('ctherpay');
        console.log(e);
        console.log(this)
        return this.$store.state.therapist_type
        },
        set:function(e){
          console.log(e)
          console.log('set ctherapist ype');
          this.$store.state.therapist_type = e;
          return 'Set Email'
        }
        },
        cphone : {
        get:function(e){
        console.log('cphone');
        console.log(e);
        console.log(this)
        return this.$store.state.phone
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.phone = e;
          return 'Set Email'
        },
        },
        cssn : {
        get:function(e){
        console.log('computed name');
        //console.log(text);
        return this.$store.state.ssn
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.ssn = e;
          return 'Set Email'
        },
        },
        caddress : {
        get:function(e){
        console.log('computed name');
        //console.log(text);
        return this.$store.state.address
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.address = e;
          return 'Set Email'
        },
        },
      cname : {
        get:function(e){
        console.log('computed name');
        //console.log(text);
        return this.$store.state.name
        },
        set:function(e){
          console.log(e)
          console.log('set computed name');
          this.$store.state.name = e;
          return 'Set Email'
        }

      },
      cemail : {
        get:function(){
        console.log('computed');
        //console.log(text);
        return this.$store.state.email
        },
        set:function(e){
          console.log(e)
          this.$store.state.email = e;
          return 'Set Email'
        }

      },     
       caddress : {
        get:function(){
        console.log('computed');
        //console.log(text);
        return this.$store.state.address
        },
        set:function(e){
          console.log(e)
          this.$store.state.address = e;
          return 'Set Email'
        }

      },     
      ctype : {
        get:function(){
        console.log('computed');
        //console.log(text);
        return this.$store.state.type
        },
        set:function(e){
          console.log(e)
          this.$store.state.type = e;
          return 'Set Email'
        }

      },
      progress :  { 
        
                get:function(e){
        console.log('get cs8');
        console.log(e);
        console.log(this)
        return this.$store.state.progress
        },
        set:function(e){
          console.log(e)
          console.log('set cs8');
          this.$store.state.progress = e;
          return 'Set Resume'
            } 
        }
    },
  methods: {
    changetoprofile(){
      this.$store.state.progress=1
      clearInterval(this.clock)
    },
    changetosign(){
      this.$store.state.progress = 2;
      clearInterval(this.clock)
      this.clock = setInterval(this.checkContractStatus,7000);
    },
    changetoupload(){
      this.$store.state.progress = 10;
      clearInterval(this.clock)
    },
    goToProgress(){},
    update(){
      //update application with new profile details
      let data = Object.entries(this.$store.state);
      data.forEach((key,value) => {
        console.log(key,value)
        if(key[1]==null){
          this.$store.state[key[0]]='';
        }
      });
      console.log(JSON.stringify(this.$store.state))
     fetch("/api/applications/"+this.$store.state.id,{method:"PATCH",headers:{"Content-Type": "application/json; charset=utf-8",},body:JSON.stringify(this.$store.state)}).then()
      
    },
    resumeApp(){
      if(this.progress==0){ 
          
          this.$store.state.email = this.email;
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
              "name":this.$store.state.id
            }) 
          }).then(response=>{console.log(response)})

          }
          else{
            let json = application;
                 this.$store.state.email = json.email;
                  this.$store.state.name = json.name;
                    this.$store.state.phone = json.phone;
                  this.$store.state.ssn = json.ssn;
                this.$store.state.therapist_type = json.type;
                this.$store.state.practice_type = json.practice_type;
                  this.$store.state.address = json.address;
               this.$store.state.sign1 = json.sign1;
                      this.$store.state.sign2 = json.sign2;
               this.$store.state.sign3 = json.sign3;
                this.$store.state.sign4 = json.sign4;
                        this.$store.state.sign5 = json.sign5;
                      this.$store.state.sign6 = json.sign6;
                this.$store.state.sign7 = json.sign7;
               this.$store.state.sign8 = json.sign8;
                        this.$store.state.s1 = json.s1;
                  this.$store.state.s2 = json.s2;
                      this.$store.state.s3 = json.s3;
                      this.$store.state.s4 = json.s4;
                    this.$store.state.s5 = json.s5;
                    this.$store.state.s6 = json.s6;
                   this.$store.state.s7 = json.s7;
                  this.$store.state.s8 = json.s8;
               this.$store.state.id = json.id;
                 this.$store.state.resume = json.resume;
                  this.$store.state.ces = json.ces;
               this.$store.state.license = json.license;
                 this.$store.state.liability = json.liability;
                       this.$store.state.progress = 1;
                this.$store.state.approved = json.approved;
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
    rejectApp(){
      let dt = this.$store.state;
      dt.approved=0;
      console.log("REJECT APP")

    },
    approvalCheck(){
      if(this.checkbox13==true &&  this.checkbox12==true && this.checkbox11==true && this.checkbox10==true && this.checkbox9==true && this.checkbox2==true && this.checkbox3==true && this.checkbox4==true && this.checkbox5==true && this.checkbox6==true && this.checkbox7==true && this.checkbox8==true){
        return true
      }
    },
    filterApp(txt){
      console.log(txt);
      console.log(this.list);
      console.log(this.listlength)
      if(this.list[0]==undefined)
        fetch('https://jott.thewaveint.com/api/applications').then(response=>response.json()).then(json=>{console.log(json)
        
          this.list =[];
          this.list = json.map(item=>{ 
            console.log(item)
            if(item){
            let em = item.email;
            if(em==txt){console.log(txt,em);return{name:item.name,email:item.email,id:item.id}}

          }
          }
          )
          console.log(this.list)
        })
    },
    getApps(){
        fetch('https://jott.thewaveint.com/api/applications').then(response=>response.json()).then(json=>{console.log(json)
        
          this.list =[];
          this.list = json.map(item=>{ if(true)return{name:item.name,email:item.email,id:item.id}})

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
    approveApp(){
      console.log('HIT API and APPROVE APPLICATION')
        let st = this.$store.state
       
      if(this.checkbox13==true &&  this.checkbox12==true && this.checkbox11==true && this.checkbox10==true && this.checkbox9==true && this.checkbox2==true && this.checkbox3==true && this.checkbox4==true && this.checkbox5==true && this.checkbox6==true && this.checkbox7==true && this.checkbox8==true){
         st.approved='1';
         fetch('/api/applications/approve/'+this.$store.state.id,{
          method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},
          body:JSON.stringify(st)

      });
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
        let i = this.$store.state.id;
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
        this.$store.state.email = json.email;
        this.$store.state.name = json.name;
          this.$store.state.phone = json.phone;
        this.$store.state.ssn = json.ssn;
        this.$store.state.therapist_type = json.type;
        this.$store.state.practice_type = json.practice_type;
        this.$store.state.address = json.address;
          this.$store.state.sign1 = json.sign1;
        this.$store.state.sign2 = json.sign2;
        this.$store.state.sign3 = json.sign3;
        this.$store.state.sign4 = json.sign4;
        this.$store.state.sign5 = json.sign5;
        this.$store.state.sign6 = json.sign6;
        this.$store.state.sign7 = json.sign7;
        this.$store.state.sign8 = json.sign8;
        this.$store.state.id = json.id;
        this.$store.state.resume = json.resume;
        this.$store.state.ces = json.ces;
        this.$store.state.license = json.license;
        this.$store.state.liability = json.liability;
        this.$store.state.progress = json.progress;
        this.$store.state.visible = this.visible(1);

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
     
        console.log(this.$store.state.progress);
        console.log("this.progress",this.progress)
        console.log(this.cemail)
          console.log(this)
          
      if(this.progress==0){ 
           this.$store.commit('increment')
          this.$store.state.email = this.email;
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
              "name":this.$store.state.id
            }) 
          }).then(response=>{console.log(response)})

          }
          else{
            let json = application;
                 this.$store.state.email = json.email;
                  this.$store.state.name = json.name;
                    this.$store.state.phone = json.phone;
                  this.$store.state.ssn = json.ssn;
                this.$store.state.therapist_type = json.type;
                this.$store.state.practice_type = json.practice_type;
                  this.$store.state.address = json.address;
               this.$store.state.sign1 = json.sign1;
                      this.$store.state.sign2 = json.sign2;
               this.$store.state.sign3 = json.sign3;
                this.$store.state.sign4 = json.sign4;
                        this.$store.state.sign5 = json.sign5;
                      this.$store.state.sign6 = json.sign6;
                this.$store.state.sign7 = json.sign7;
               this.$store.state.sign8 = json.sign8;
                        this.$store.state.s1 = json.s1;
                  this.$store.state.s2 = json.s2;
                      this.$store.state.s3 = json.s3;
                      this.$store.state.s4 = json.s4;
                    this.$store.state.s5 = json.s5;
                    this.$store.state.s6 = json.s6;
                   this.$store.state.s7 = json.s7;
                  this.$store.state.s8 = json.s8;
               this.$store.state.id = json.id;
                 this.$store.state.resume = json.resume;
                  this.$store.state.ces = json.ces;
               this.$store.state.license = json.license;
                 this.$store.state.liability = json.liability;
                       this.$store.state.progress = json.progress;
                this.$store.state.approved = json.approved;
                      window.sessionStorage.progress = json.progress;
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
              let nd = Object.entries(this.$store.state)
              nd.forEach((key,value) => {
       // console.log(key,value)
        if(key[1]==null){
          this.$store.state[key[0]]='';
        }
      });
          //data.sign1 = this.csign1;
          //data.links = this.clinks;
          let open = true;
          switch(this.progress){
            case 2:
            console.log('SWICHHHHHHHHHHHH2')
            if(this.cs1==0 && this.csign1!=undefined){open=false};
            if(this.cs1==1 && this.csign2!=''){open=false};            
            break;
            case 3:
            console.log('SWICHHHHHHHHHHHH3')
            if(this.cs2==0 && this.csign2!=undefined){open=false};
            if(this.cs2==1 && this.csign3!=''){open=false};            
            break;
            case 4:
            console.log('SWICHHHHHHHHHHHH4')
            if(this.cs3==0 && this.csign3!=undefined){open=false};
            if(this.cs3==1 && this.csign4!=''){open=false};
            break;
            case 5:
            console.log('SWICHHHHHHHHHHHH5')
            if(this.cs4==0 && this.csign4!=undefined){open=false};
            if(this.cs4==1 && this.csign5!=''){open=false};
            break;
            case 6:
            console.log('SWICHHHHHHHHHHHH6')
            if(this.cs5==0 && this.csign5!=undefined){open=false};
            if(this.cs5==1 && this.csign6!=''){open=false};
            break;
            case 7:
            console.log('SWICHHHHHHHHHHHH7')
            if(this.cs6==0 && this.csign6!=undefined){open=false};
            if(this.cs6==1 && this.csign7!=''){open=false};
            break;
            case 8:
            console.log('SWICHHHHHHHHHHHH8')
            if(this.cs7==0 && this.csign7!=undefined){open=false};
            if(this.cs7==1 && this.csign8!=''){open=false};
            break;
            case 9:
            console.log('SWICHHHHHHHHHHHH9')
            open=false;
            break;

 }         console.log(open)
          if(open){
          fetch('https://jott.thewaveint.com/api/create/contracts/'+id,{method:"POST",
              headers:{"Content-Type": "application/json; charset=utf-8","accept": "*/*"},body:JSON.stringify(this.$store.state)}).then(response=>{
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
        this.progress = app.progress;
        })
             
       // this.$store.commit('increment')
        window.sessionStorage.progress = this.progress;
        
        })
          
          }
        clearInterval(this.clock)
        if(this.progress<9 && open){
         console.log("CHECKKKKKKKKKKKKKKKK CONTRACT")
        this.clock = setInterval(this.checkContractStatus,7000);
        }
        else if(!open){
 //this.clock = setInterval(this.checkContractStatus,7000);
  this.$store.commit('increment')
        }
        else{
          this.$store.commit('increment')
          
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

            document.getElementById(type).click();
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
            let pre = e.target.id.split(" ").last().toLowerCase();
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
            this.$store.state[pre] = 1;
            fetch('https://jott.thewaveint.com/api/containers/'+this.cid+'/upload', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
 
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: formData, // body data type must match "Content-Type" header
                  })
            .then(response =>{console.log( response.json())
            //mark as uploaded
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
        data.progress = parseInt(this.progress);
        data.resume = this.cresume;
        data.license = this.clicense;
        data.liability = this.cliability;
        data.ces = this.cces;
        //data.sign1 = this.csign1;
        //data.links = this.clinks;
        
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
       
    }
    }

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

 Array.prototype.last = function(){
        return this[this.length - 1];
    };

</script>