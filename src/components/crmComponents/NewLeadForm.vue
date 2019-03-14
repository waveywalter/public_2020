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
        <div class=" mt-5 ">
          <h3 class="box-title m-b-5">New Leads</h3>
          <div class="row">
            <div class="col-sm-12 col-xs-12">
              <form ref="form" @submit.prevent="handleSubmit">
                <div class="form-group mt-5">
                  <label for="exampleInputuname">First Name</label>

                  <div class="input-group">
                    <input
                      v-model="lead.first_name"
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
                      v-model="lead.last_name"
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
                      v-model="lead.phone"
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
                      v-model="lead.email"
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
<input type="file" class="hidden" accept="image/*">
                <div class="text-right">
                  <button
                    type="submit"
                    class="btn btn-success waves-effect waves-light m-r-10"
                  >Submit</button>
                </div>
              </form>
              <p v-show="message">{{message}}</p>
            <div class="col-sm-12 col-xs-12" v-if="checkroute">
            <div class="">
              
                                        <h4 class="card-title">Applications </h4>
                                        <applicationslist></applicationslist>
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
  name: "NewLeadform",

  data() {
    return {
      // errors: [],
      lead: {
        first_name: "",
        last_name: "",
        phone: "",
        type: "",
        email: "",

      },
      submitted: false
    };
  },
  mounted(){

  },
  components:{
    
  },
  computed: {
    checkroute(){
      if(this.$root._route.params.id && this.$root._route.params.root!='crm'){
        return true
      }
    },
    ...mapState("alert", ["message", "type"]),
  
  },
  methods: {
    ...mapActions({ clearAlert: "alert/clear" }),
     ...mapActions("leads", ["getLeads","createLead"]),
    handleSubmit(e) {
      console.log("HANDLEDDDDDDDDDDDDDD")
      this.submitted = true;
      this.$validator.validate().then(valid => {
        console.log(" SEND LEAD TO API")
        
        this.createLead(this.lead)
        e.target.reset
      })
    }

  }
}
  
</script>

<style scoped>
</style>