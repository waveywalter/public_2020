
<template>
  <div class="col-md-4">
    <div class="white-box">
      <h3 class="box-title m-b-0">New Position</h3>
      <div class="row">
        <div class="col-sm-12 col-xs-12">
          <form ref="form" @submit.prevent="handleSubmit">
            <div class="form-group mt-5">
              <label for="exampleInputuname">Position</label>
              <div class="input-group">
                <input
                  v-model="app.first_name"
                  type="text"
                  v-validate="'required'"
                  class="form-control"
                  placeholder="Position"
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
              <label for="exampleInputuname">Title</label>
              <div class="input-group">
                <input
                  v-model="app.last_name"
                  type="text"
                  v-validate="'required'"
                  class="form-control"
                  placeholder="Title"
                  name="last_name"
                >
                <div class="input-group-addon">
                  <i class="ti-world"></i>
                </div>
              </div>
              <span>{{ errors.first("lastname")}}</span>
            </div>
            <div class="form-group mt-5">
              <label for="exampleInputuname">Salary</label>
              <div class="input-group">
                <input
                  v-model="app.phone"
                  type="text"
                  v-validate="'required'"
                  class="form-control"
                  placeholder="Salary"
                  name="phone"
                  v-on:change="clearAlert"
                >
                <span class="input-group-addon">$</span>
              </div>
              <span>{{ errors.first("phone")}}</span>
            </div>
            <input type="file" class="hidden" accept="image/*">
            <div class="text-right">
              <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VeeValidate from "vee-validate";
import applicationslist from "../salesComponents/applicationslist";

export default {
  name: "HrNewPosition",
  data() {
    return {
      app: {
        first_name: "",
        last_name: "",
        firstname: app.first_name,
        lastname: app.last_name,
        phone: "",
        type: "",
        email: "",
        status: "new",
        userType: ""
      },
      submitted: false
    };
  },
  components: {
    applicationslist
  },
  computed: {
    ...mapState("alert", ["message", "type"]),
    ...mapActions("leads", ["createLead"])
  },
  methods: {
    ...mapActions("account", ["register"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          // register applicant in with email
        }
        if (this.app.userType == "affiliate") {
          //check what value is in box
          //if value equals lead send to one api / function
          this.newApp();
        } else if (this.app.userType == "lead") {
          //check what value is in box
          //if value equals lead send to one api / function
          this.createLead(this.app);
        } else if (document.getElementById("patient").checked) {
          this.createLead(this.app);
        }
      });
    },
    newApp() {
      let data = {
        firstname: this.app.first_name,
        lastname: this.app.last_name,
        email: this.app.email,
        phone: this.app.phone
      };
      fetch("https://2020i.site/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data)
      }).then(response => {
        response.text().then(text => {
          let application = JSON.parse(text);
          fetch("https://2020i.site/api/containers", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              provider: "filesystem",
              root: "./server/storage",
              nameConflict: "makeUnique",
              name: application.id
            })
          }).then(response => {
          });
          this.app.first_name = "";
          this.app.last_name = "";
          this.app.type = "";
          this.app.phone = "";
          this.app.email = "";
          this.app.address = "";
          this.$nextTick(() => {
            this.$validator.reset();
          });
          fetch("https://2020i.site/api/create/newcontract/" + application.id, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              accept: "*/*"
            },
            body: JSON.stringify(application)
          }).then(response => {
            console.log(response);
            response.text().then(text => {
              console.log(text);
              let app = JSON.parse(text);
              //generate code
              //send email with code
              //attach code to app
              application.csign1 = app.sign1;
              application.cs1 = app.cs1;
            });
          });
          this.$store.commit("apps/getApps");
        });
      });
    }
  }
};
</script>

