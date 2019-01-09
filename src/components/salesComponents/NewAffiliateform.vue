<style scoped>
.col-md-6.col-lg-4.col-sm-12 {
    flex: 1  1 100%;max-width:100%;
}
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
                <div class="form-group">
                  <label for="exampleInputEmail1" type="text" name="type">Type</label>
                  <div class="input-group">
                    <select
                      v-model="app.type"
                      v-validate="'required'"
                      name="list"
                      class="form-control"
                    >
                      <option value="admin">MSC</option>
                      <option value="owner">LFTV</option>
                      <option value="exdir">MSPOM</option>
                      <option value="nursdir">LMBD</option>
                      <option value="nurse1">PGLOI</option>
                    </select>
                    <div class="input-group-addon">
                      <i class="ti-shield"></i>
                    </div>
                  </div>
                
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
                <div class="form-group">
                  <label for="exampleInputpwd1">Address</label>
                  <div class="input-group">
                    <input
                      v-model="app.address"
                      type="text"
                      
                      class="form-control"
                      placeholder="Address"
                      name="address"
                    >
                    <div class="input-group-addon">
                      <i class="ti-lock"></i>
                    </div>
                  </div>
                  
                </div>
                <div class="text-right">
                  <button
                    type="submit"
                    class="btn btn-success waves-effect waves-light m-r-10"
                  >Submit</button>
                </div>
              </form>
              <p v-show="message">{{message}}</p>
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
        firstname: "",
        lastname: "",
        phone: "",
        type: "",
        email: "",

      },
      submitted: false
    };
  },
  computed: {
    ...mapState("alert", ["message", "type"])
  },
  methods: {
    ...mapActions("account", ["register"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
            // register applicant in with email
            console.log('Send Application to api')
            this.newApp();
      }
    })
    },
   newApp(){     
        let data = this.app
          fetch('https://jott.thewaveint.com/api/register',{method:"POST",headers:{"Content-Type": "application/json; charset=utf-8",},body:JSON.stringify(this.app)}).then(response=>{
        
          response.text().then(text=>{
                  let application = JSON.parse(text);

         
          fetch('https://jott.thewaveint.com/api/containers',{
            method:"POST",headers:{"Content-Type": "application/json; charset=utf-8"},
            body:JSON.stringify({
              "provider": "filesystem",
              "root": "./server/storage",
              "nameConflict": "makeUnique",
              "name":this.$store.state.apps.application.id
            }) 
          }).then(response=>{console.log(response)})
        console.log(this)
              this.app.firstname ='';
              this.app.lastname ='';
              this.app.type ='';
              this.app.phone ='';
              this.app.email ='';
              this.app.address ='';
               this.$nextTick(() => {
                this.$validator.reset()
              })
         
          })
          


          }) 
        
   }
  }
}
</script>

<style scoped>
</style>