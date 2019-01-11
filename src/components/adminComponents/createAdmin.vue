<template>
  <div>
    <div class="row">
      <div class="col-md-7 ">
          <h3 class="box-title m-b-5">Create new User</h3>
          <div class="row">
            <div class="col-sm-12 col-xs-12">
              <form ref="form" @submit.prevent="handleSubmit">
                <div class="form-group mt-5">
                  <label for="exampleInputuname">First Name</label>
                  <div class="input-group">
                    <input
                      v-model="reg.firstname"
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
                      v-model="reg.lastname"
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
                  <label for="exampleInputuname">User Name</label>
                  <div class="input-group">
                    <input
                      v-model="reg.username"
                      type="text"
                      v-validate="'required'"
                      class="form-control"
                      placeholder="Username"
                      name="username"
                      v-on:change="clearAlert"
                    >
                    <div class="input-group-addon">
                      <i class="ti-user"></i>
                    </div>
                  </div>
                  <span>{{ errors.first("username")}}</span>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1" type="text" name="role">Role</label>
                  <div class="input-group">
                    <select
                      v-model="reg.role"
                      v-validate="'required'"
                      name="list"
                      class="form-control"
                    >
                      <option value="admin">Admin</option>
                      <option value="sales">Sales Director</option>
                      <option value="owner">Owner</option>
                      <option value="humanResource">Human Resource Director</option>
                      <option value="rtf">RTF Manager</option>
                    </select>
                    <div class="input-group-addon">
                      <i class="ti-shield"></i>
                    </div>
                  </div>
                  <span>{{ errors.first("role")}}</span>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <div class="input-group">
                    <input
                      v-model="reg.email"
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
                  <label for="exampleInputpwd1">Password</label>
                  <div class="input-group">
                    <input
                      v-model="reg.password"
                      type="password"
                      v-validate.continues="'required|min:6'"
                      class="form-control"
                      placeholder="Enter password"
                      name="password"
                    >
                    <div class="input-group-addon">
                      <i class="ti-lock"></i>
                    </div>
                  </div>
                  <span>{{ errors.first('password') }}</span>
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
</template>
<script>
import { mapState, mapActions } from "vuex";
import VeeValidate from "vee-validate";
export default {
  name: "CreateAdmin",
  data() {
    return {
      // errors: [],
      reg: {
        firstname: "",
        lastname: "",
        username: "",
        role: "",
        email: "",
        password: ""
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
          this.register(this.reg);
          this.reg = {
            firstname: "",
            lastname: "",
            username: "",
            role: "",
            email: "",
            password: ""
          };
          this.$validator.reset();
        }
      });
    }
  }
};
</script>
<style scoped>
</style>