
<template>

                <div class="col-md-4">
                    <div class="white-box">
                        <h3 class="box-title m-b-0">New Lead/Patient/Applicant Form</h3>
                        <div class="row">
                            <div class="col-sm-12 col-xs-12">




              <form ref="form" @submit.prevent="handleSubmit">
                <div class="form-group mt-5">
                  <label for="exampleInputuname">First Name</label>

                  <div class="input-group">
                    <input
                      v-model="app.first_name"
                      type="text"
                      v-validate="'required'"
                      class="form-control"
                      placeholder="First Name"
                      name="first_name"
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
                      v-model="app.last_name"
                      type="text"
                      v-validate="'required'"
                      class="form-control"
                      placeholder="Last Name"
                      name="last_name"
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

<div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
<div class="radio radio-warning">
    <input v-model="app.userType" type="radio" name="radio" id="lead" value="lead">
    <label for="radio1"> Lead </label>
</div>
<div class="radio radio-warning">
    <input v-model="app.userType" type="radio" name="radio" id="affiliate" value="affiliate">
    <label for="radio2"> Applicant </label>
</div>


<div class="radio radio-warning">
    <input v-model="app.userType" type="radio" name="radio" id="patient" value="patient">
    <label for="radio2">Patient </label>
</div>


</div>


<input type="file" class="hidden" accept="image/*">
  <div class="text-right">
    <button
      type="submit"
      class="btn btn-success waves-effect waves-light m-r-10"
    >Submit</button>
  </div>
</form>




<!-- <p v-show="message">{{message}}</p> -->
<!-- <div class="smallbox col-sm-12 col-xs-12" v-if="checkroute()">
<div class="">
<h4 class="card-title">Applications </h4>
<applicationslist></applicationslist>
</div>

</div> -->


            </div>
            </div>
          </div>
        </div>



</template>

<script>
import { mapState, mapActions } from "vuex";
import VeeValidate from "vee-validate";
import applicationslist from '../salesComponents/applicationslist'

export default {
  name: "NewAffiliateform",

  data() {
    return {
      // errors: [],
      app: {
        first_name: "",
        last_name: "",
        firstname:app.first_name,
        lastname:app.last_name,

        phone: "",
        type: "",
        email: "",
        status:"new",
        userType:""

      },
      submitted: false
    };
  },
  components:{
    applicationslist,
  },
  computed: {
    ...mapState("alert", ["message", "type"]),
    ...mapActions("leads", ["createLead"]),    
  },
  methods: {
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
            console.log(this.userType)

      }
       if (this.app.userType == "affiliate"){
          //check what value is in box
          //if value equals lead send to one api / function
          this.newApp();

      } else if(this.app.userType == "lead"){
          //check what value is in box
          //if value equals lead send to one api / function
        this.createLead(this.app)

      } else if(document.getElementById('patient').checked){
                this.createLead(this.app)

      }
    })
    },
   newApp(){     
        let data = {
          firstname:this.app.first_name,
          lastname:this.app.last_name,
          email:this.app.email,
          phone:this.app.phone
        }
        
          fetch('https://2020i.site/api/register',{method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},body:JSON.stringify(data)}).then(response=>{
        
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

 
              this.app.first_name ='';
              this.app.last_name ='';
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

