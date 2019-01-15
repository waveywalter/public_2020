<style scoped>
.col-md-6.col-lg-4.col-sm-12 {
    flex: 1  1 100%;max-width:100%;
}
li {
    list-style: none;
}
.list-group-item:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
}
.list-group-item:last-child {
    margin-bottom: 0;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
}
 .list-group-item.router-link-active, .list-group .list-group-item.router-link-active:hover {
    background: #fb9678;
    border-color: #fb9678;
}
.btn-link, a {
    color: #ffffff;
    text-decoration: none;
}
.router-link-active{display:none}
</style>
<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-lg-4 col-sm-12">
        <div class="white-box mt-5 ml-5">
          <h3 class="box-title m-b-5">New Affiliate Applicant</h3>
          <div class="row">
            <div class="col-sm-12 col-xs-12">
              <form ref="form" @submit.prevent="handleSubmit">
                <div class="form-group mt-5">
                  <label for="exampleInputuname">First Name</label>

                  <div class="input-group">
                    <input
                      v-model="app.firstname"
                      type="text"
                      v-validate="'required'"
                      class="form-control"
                      placeholder="First Name"
                      name="firstname"
                      v-on:change="clearAlert"
                    >
                    <div class="input-group-addon">
                      <i class="ti-user"></i>
                    </div>
                  </div>
                  <span>{{ errors.first("firstname")}}</span>
                </div>
                <div class="form-group mt-5">
                  <label for="exampleInputuname">Last Name</label>
                  <div class="input-group">
                    <input
                      v-model="app.lastname"
                      type="text"
                      v-validate="'required'"
                      class="form-control"
                      placeholder="Last Name"
                      name="lastname"
                    >
                    <div class="input-group-addon">
                      <i class="ti-user"></i>
                    </div>
                  </div>
                  <span>{{ errors.first("lastname")}}</span>
                </div>
                <div class="form-group mt-5">
                  <label for="exampleInputuname">Phone</label>
                  <div class="input-group">
                    <input
                      v-model="app.phone"
                      type="text"
                      v-validate="'required'"
                      class="form-control"
                      placeholder="phone"
                      name="phone"
                      v-on:change="clearAlert"
                    >
                    <div class="input-group-addon">
                      <i class="ti-user"></i>
                    </div>
                  </div>
                  <span>{{ errors.first("phone")}}</span>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <div class="input-group">
                    <input
                      v-model="app.email"
                      type="text"
                      v-validate="'required|email'"
                      class="form-control"
                      placeholder="Enter email"
                      name="email"
                    >
                    <div class="input-group-addon">
                      <i class="ti-email"></i>
                    </div>
                  </div>
                  <span>{{ errors.first('email') }}</span>
                </div>

                <div class="text-right">
                  <button
                    type="submit"
                    class="btn btn-success waves-effect waves-light m-r-10"
                  >Submit</button>
                </div>
              </form>
              <p v-show="message">{{message}}</p>
            <div class="col-sm-12 col-xs-12" v-if="this.$root._route.params.id">
            <div class="">
                                        <h4 class="card-title">Applications </h4>
                         
                                        <div class="list-group">
                 <router-link class="list-group-item" v-for="apps in clist" :key="app.id" tag="li" :to="'/salesdashboard/'+apps.id" @click.native="updateId(apps.id)">
                <a >{{apps.firstname}} {{apps.lastname}}</a>
                </router-link>                                         
                                       </div>
                                    </div>
 
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VeeValidate from "vee-validate";

export default {
  name: "NewAffiliateform",

  data() {
    return {
      // errors: [],
      app: {
        firstname: "Walter",
        lastname: "Johnson",
        phone: "3219486950",
        type: "",
        email: "walterj@thewaveint.com",

      },
      submitted: false
    };
  },
  computed: {
       clist:{
        get:function(e){
            return this.$store.state.apps.wholelist
        },
        set:function(list){
          this.$store.state.apps.wholelist  = list
        }
        
      },
    ...mapState("alert", ["message", "type"]),
  
  },
  methods: {
        getrecord(id){
      console.log('RECORDSSSSSSSSSSSSSSSSSSSSSSS')
     // window.sessionStorage.id = id;
      
      if(id!=undefined){
       fetch('https://2020i.site/api/applications/'+id,{method:"GET",headers:{"Content-Type": "application/json; charset=utf-8",}}).then(response=>response.json()).then(json=>{console.log(json)
 
        
        this.$store.state.apps.application = json;
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
        checkContractStatus(){
        console.log("Hit API - Get APP and check for signing");
        console.log(this);
        let i = this.$store.state.apps.application.id;
        fetch('/api/applications/'+i).then(response=>{
              console.log(response);
              response.text().then(text=>{
              

              let a = JSON.parse(text);
              
                let s = 's1';
                let t = a[s];
                console.log(this.$store.state[s])
                console.log(a[s]);
                this.$store.state.apps.application

                if(a[s]!=this.$store.state.apps.application[s] ){
                  
                  clearInterval(this.clock)
                  //if they are not equal then document has been signed .
                
                this.$store.state.apps.application = a;
               
                }
   

              
              })
        })
      },
        updateId(id){
      console.log("UPATEEEEEEEEEEEEEE")
      this.cid = id;
      this.getrecord(id);
     },
    test(){
      console.log("TESTTTTTTTTTTTTTTTTTTTTTT")
    },
    ...mapActions("account", ["register"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    handleSubmit(e) {
      console.log("HANDLEDDDDDDDDDDDDDD")
      this.submitted = true;
      this.$validator.validate().then(valid => {
        console.log("VALIDDDDDDDDDDDDDDDDDD")
        if (valid) {
          console.log("VALIDDDDDDDDDDDDDDDDDD2222")
            // register applicant in with email
            console.log('Send Application to api')
            this.newApp();
      }
    })
    },
   newApp(){     
        let data = this.app
          fetch('https://2020i.site/api/register',{method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},body:JSON.stringify(this.app)}).then(response=>{
        
          response.text().then(text=>{
                  let application = JSON.parse(text);

                console.log(application)
          fetch('https://2020i.site/api/containers',{
            method:"POST",headers:{"Content-Type": "application/json; charset=utf-8"},
            body:JSON.stringify({
              "provider": "filesystem",
              "root": "./server/storage",
              "nameConflict": "makeUnique",
              "name":application.id
            }) 
          }).then(response=>{console.log(response)})

 
              this.app.firstname ='';
              this.app.lastname ='';
              this.app.type ='';
              this.app.phone ='';
              this.app.email ='';
              this.app.address ='';
               this.$nextTick(() => {
                this.$validator.reset()
               })
              
              
          //data.sign1 = this.csign1;
          //data.links = this.clinks;
          fetch('https://2020i.site/api/create/newcontract/'+application.id,{method:"POST",
              headers:{"Content-Type": "application/json; charset=utf-8","accept": "*/*"},body:JSON.stringify(application)}).then(response=>{
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
           application.csign1 = app.sign1;
           application.cs1 = app.cs1;
        // this.csign2 = app.sign2;
        // this.csign3 = app.sign3;
        // this.csign4 = app.sign4;
        // this.csign5 = app.sign5;
        // this.csign6 = app.sign6;
        // this.csign7 = app.sign7;
        // this.csign8 = app.sign8;
        // this.csign9 = app.sign9;
        
        })
        
       // this.$store.commit('increment')
        
        
        })
    //this.$store.state.apps.application = application;
         this.$store.commit('apps/getApps') 
          })
          


          }) 
         
        
   }
  }
}
</script>

<style scoped>
</style>