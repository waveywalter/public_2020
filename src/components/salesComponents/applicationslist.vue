<template>
<div class="list-group">
                <div v-for="apps in cfilterlist" > 
                 <router-link class="list-group-item " :key="apps.id"  tag="li" :to="'/sales/applicant/'+apps.id" @click.native="updateId(apps.id)">
                <div class="mr15 minw125"><a> {{apps.firstname}} {{apps.lastname}}</a></div>
                <span class="ti-close" v-on:click="openmodal(apps.id)"></span>
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
            listkey:0,
          //  test:'My Life'
        }
    },
methods:{
  openmodal(id){
    if(this.modalopen===1){
      this.modalopen=0
      this.modalid = '';
      
    }
    else{
      this.modalopen=1
      this.modalid = id;
    }

  },
    deleteApp(id){
      fetch('/api/applications/'+id,{method:"DELETE"}).then(()=>{this.getApps()})
  if (this.modalopen===1){
    this.modalopen=0;
    this.modalid=''
  }
     },
    getApps(){
       this.$store.commit('apps/getApps')
      },
    updateId(id){
      console.log("UPATEEEEEEEEEEEEEE")
      this.cid = id;
      this.getrecord(id);
        },
    getrecord(id){
      console.log('RECORDSSSSSSSSSSSSSSSSSSSSSSS')
     // window.sessionStorage.id = id;
      this.cid = id;
      if(id!=undefined){
       fetch('https://jott.thewaveint.com/api/applications/'+id,{method:"GET",headers:{"Content-Type": "application/json; charset=utf-8",}}).then(response=>response.json()).then(json=>{console.log(json)
 
        this.$store.state.apps.application = json;
        //this.$store.state.apps.application.visible = this.visible(1);
      if(json.s1==0){
          console.log("Not Signed")
          //check to see if signed start interval check
          this.clock = setInterval(this.checkContractStatus,7000);

        }
        else{
          console.log("Signed")
          //update ui
          clearInterval(this.clock)
        }
      console.log(this)
      }
        )
        //this.getState();
      }

      },
},
computed:{
    clist:{
            get:function(e){
            return this.$store.state.apps.wholelist
        },
        set:function(list){
          this.$store.state.apps.wholelist  = list
        }
    },
      cfilterlist:{
        get:function(e){
            return this.$store.state.apps.list
        },
        set:function(list){
          this.$store.state.apps.list  = list
        }
        
      },
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
          },
      listlength:function(){
         if(this.appfilter!=""){
         let ar = this.$store.state.apps.list.filter(item=>{console.log("ITEMMMSSSSSSSSSS");console.log(item); return item.email==this.appfilter });
         return ar.length
         }
         return this.$store.state.apps.list.length
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
        ...mapState("alert", ["message", "type"]),




    }


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
 Array.prototype.last = function(){
        return this[this.length - 1];
    };
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